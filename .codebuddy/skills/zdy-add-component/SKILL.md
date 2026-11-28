---
name: zdy-add-component
description: This skill should be used when adding a new PC or mobile component to the zdy-ui (zdy-design) component library, including implementation, Less styles, types, barrels, package.json exports, demo registration, docs menu, README counts and verification. 触发场景：新增组件、添加组件、实现 PC/M 开头组件、补组件 demo、把组件接入文档站点。
---

# 向 zdy-ui 新增组件

## 适用范围

- 在 `src/components/pc/` 下新增桌面端组件。
- 在 `src/components/mobile/` 下新增移动端组件（统一 `M` 前缀）。
- 为已有组件补齐 demo、菜单、导出或文档信息。

先阅读同类型、交互相近的现有组件再动手：PC 端参考 `Button`、`Dialog`、`Slider`；移动端参考 `MSlider`、`MDialog`、`MActionSheet`。保持文件结构、命名和交互方式与它们一致。

## 项目硬性约定

- 技术栈固定为 React 19 + TypeScript + `classnames` + Less，不新增任何运行时依赖（`react`、`react-dom`、`classnames` 之外）。
- 组件目录固定包含：`<Name>.tsx`、`<Name>.less`、`types.ts`、`index.ts`、`demo.tsx`。移动端目录名与组件名均为 `M<Name>`。历史移动端组件有把类型直接写在 `.tsx` 里的情况，新组件统一使用 `types.ts`，不要照搬旧写法。
- 组件默认导出；Props 接口命名为 `<Name>Props` / `M<Name>Props`，公共字段（`className`、`style`、`children`）优先复用或对齐 `BaseComponentProps`。
- `index.ts` 必须同时导出组件与类型：

```ts
export { default } from './MSlider';
export type { MSliderMark, MSliderProps, MSliderValue } from './types';
```

- 样式文件首行固定 `@import '../../../styles/variables.less';`，颜色、字号、圆角、边框使用变量（`@primary-color`、`@text-color`、`@text-color-secondary`、`@border-color-split`、`@mobile-font-size-base` 等），不要新造硬编码色值；仅遮罩等半透明中性色可直接写 `rgba()`。
- 类名统一 `zdy-` 前缀 + kebab-case：PC `zdy-dialog`，移动端 `zdy-mobile-dialog`；子元素用 `zdy-mobile-dialog-header`，状态用 `--` 修饰符（`--closing`、`--inline`、`--disabled`）。
- 不直接修改 `dist/`、`dist-demo/`，构建产物只由脚本生成。
- 移动端交互底线：点击区域不小于 44×44，底部操作按钮铺满宽度，弹层类组件支持 `inline` 模式供 iPhone 预览容器内渲染。

## 新增步骤

### 1. 创建组件目录与文件

按 `references/templates.md` 中的骨架创建 5 个文件。实现时：

- 受控/非受控属性成对提供（如 `value` / `defaultValue`、`visible` / `defaultVisible`）。
- 事件命名沿用 `onChange`、`onClose`、`onSelect` 等既有风格。
- 弹层类组件使用 `createPortal` 渲染到 `body`（`inline` 时改为容器内绝对定位），并处理 ESC 关闭、遮罩点击、`role="dialog"`、`aria-modal`、页面滚动锁定。
- 有进出场动画时保持 220ms 左右，并用 `--closing` 类播放退出动画，动画结束后再卸载。

### 2. 注册到组件总入口

- PC：在 `src/components/pc/index.ts` 对应的分类注释（通用/布局/反馈/展示/表单）下添加 `export { default as <Name> } from './<Name>';`。
- 移动端：在 `src/components/mobile/index.ts` 对应分类下添加 `export { default as M<Name> } from './M<Name>';`。移动端不要加到根入口的具名导出，根入口只通过 `export * as Mobile` 暴露。

### 3. 注册类型集中导出（仅 PC）

在 `src/types/index.ts` 的 re-export 列表添加：

```ts
export * from '../components/pc/<Name>/types';
```

移动端组件类型不进入 `src/types/index.ts`，使用方通过子路径 `zdy-design/mobile/M<Name>` 引入类型；根入口只提供 `Mobile.M<Name>` 组件本身，不聚合移动端类型。

### 4. 添加 package.json 子路径导出

在 `exports` 中按现有格式与位置插入（PC 端按字母序，移动端就近插入）：

```json
"./pc/<Name>": {
  "import": "./dist/pc/<Name>.js",
  "require": "./dist/pc/<Name>.js",
  "types": "./dist/pc/<Name>.d.ts"
}
```

移动端把 `pc`、`<Name>` 换成 `mobile`、`M<Name>`。不要为此执行 `npm run build:barrels`：该脚本会依据 `dist` 重写整份 `exports` 并重新格式化 `package.json`，容易产生无关 diff。仅在明确需要重新生成 barrel 时才运行，并检查 diff。

### 5. 编写 demo 并注册

- `demo.tsx` 默认导出一个 `DemoConfig`（`src/pages/Components/Demo/types.ts`）：
  - `intro`：一句话说明组件用途与关键能力。
  - `demos[]`：2–3 个由浅入深的用例，字段为 `title`、`desc`、`code`、`render`；`code` 必须是可直接复制运行的代码，并与 `render` 行为一致。
  - `api[]`：每个对外属性一行 `{ prop, desc, type, default }`，默认值用字符串（无默认写 `'-'`）。
- 在 `src/components/pc/demos.ts` 的 `pcDemoConfigs` 或 `src/components/mobile/demos.ts` 的 `mobileDemoConfigs` 中注册，key 必须是组件名（`Button` / `MButton`）。
- 移动端 demo 的预览位于 iPhone 容器内：
  - 使用 `MButton` 触发、`className="mdemo-stack"` 与 `className="mdemo-tip"` 布局。
  - 弹层、抽屉、气泡等必须传 `inline`，否则会 portal 到整页并遮住文档站点。
  - demo 内若定义了局部子组件，文件首行加 `/* eslint-disable react-refresh/only-export-components */`，否则 `react-refresh/only-export-components` 会报错。

### 6. 添加到文档菜单

- PC：在 `src/routes/menuConfig.ts` 的 `menuGroups` 对应分组添加：

```ts
// thumbnail 可选：提供时同步在 src/assets/thumbnails/ 下放同名 svg
{ id: 'xxx', label: 'Name 中文名', icon: '🧩', type: 'component', component: 'Name', path: '/components/Name' }
```

- 移动端：在 `mobileMenuGroups` 对应分组添加，`id` 以 `m-` 开头，路径带查询参数：

```ts
{ id: 'm-xxx', label: 'MName 中文名', icon: '🧩', type: 'component', component: 'MName', path: '/components/MName?platform=mobile' }
```

没有菜单项时详情页会显示“未找到该组件”；没有 demo 配置时显示“示例整理中”。两者都注册才算完整交付。路由 `/components/:componentName` 是通用路由，不需要改 `src/routes/index.tsx`。

### 7. 更新 README 计数

`README.md` 中的数量与目录说明是手写的，新增组件后必须同步：

- PC：「### PC 端组件（49 个）」数量、组件总览表格对应分类行、目录结构的「PC 端组件（49 个…）」。
- 移动端：「### 移动端组件（43 个）」与目录结构的「移动端组件（43 个，结构同 pc）」。
- 可用 `grep -n "49 个\|43 个" README.md` 找全所有出现位置。组件总览页的统计由菜单自动推导，无需改代码。

### 8. 可选：PC 总览缩略图

PC 总览卡片读取 `src/assets/thumbnails/<key>.svg`，由菜单项的 `thumbnail` 指定。不提供时卡片显示“预览”占位，不影响功能；需要时在 `scripts/generate-thumbnails.mjs` 增加条目并运行 `node scripts/generate-thumbnails.mjs`。移动端总览不使用缩略图。

## 验证清单

按顺序执行，全部通过才算完成：

```bash
# 移动端把 src/components/pc/<Name> 换成 src/components/mobile/M<Name>，并去掉 src/types/index.ts
npx eslint src/components/pc/<Name> src/components/pc/demos.ts src/routes/menuConfig.ts src/types/index.ts
npm run build:types
npm run build:es
npm run dev -- --host 127.0.0.1 --port 5173
```

- 浏览器打开 `http://127.0.0.1:5173/#/components/<Name>`（移动端追加 `?platform=mobile`），确认：
  - 侧边栏出现新条目，总览页可见新卡片且计数正确；
  - 每个 demo 可交互，`code` 与效果一致；
  - API 表格完整；
  - 控制台无 React 警告或报错。
- 验证完成后停止 5173 上的开发服务器，避免遗留进程。

命令说明：

- `npm run build:barrels` 不要作为常规验证步骤。
- `npm run build:es` 会清空 `dist`（包含 `.d.ts`），上述两条命令仅用于类型与构建校验，产物不会同时保留；需要完整产物时执行 `npm run build`（依次构建 ES、UMD、类型，最后生成 barrel 与 `exports`）。
- 项目没有单元测试脚本，行为验证以 TypeScript 编译、构建和浏览器实测为准。

## 常见问题

- **ESLint 报 `react-hooks/set-state-in-effect`**：不要在 effect 内同步 `setState`。参考 `MDialog` 的做法——打开时在渲染期同步挂载状态，关闭后用 `setTimeout` 在回调里卸载；退出动画状态由 `!open` 派生。
- **移动端弹层遮住整个文档页**：忘了给 demo 中的弹层传 `inline`。
- **类型在使用方不可见**：子路径 `types` 指向 `dist/<platform>/<Name>.d.ts`，该文件由 `build:types` + `build:barrels` 生成；只跑 `build:es` 不会产出声明文件。
- **总览计数不对**：PC/移动端计数分别由 `menuGroups`、`mobileMenuGroups` 推导，检查菜单项是否添加或被重复添加。
- **新增依赖**：一律不加，项目承诺零额外运行时依赖。
