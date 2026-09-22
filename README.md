# zdy-design

一套基于 React + TypeScript 的跨端组件库，同时提供 PC 端与移动端两套组件实现，覆盖通用、布局、表单、反馈、展示等常用场景，开箱即用。

npm: https://www.npmjs.com/package/zdy-design
git: https://github.com/PanfengHong/zdy-ui

## 特性

- **跨端支持**：同一套 API 设计下提供 PC 端与移动端两套组件实现，按需引入。
- **TypeScript 全量类型**：所有组件均使用 TypeScript 编写，并导出完整类型定义，开发体验友好。
- **两种引入方式**：支持具名解构引入（`import { Alert } from 'zdy-design'`）和子路径按需引入（`import Alert from 'zdy-design/pc/Alert'`），使用灵活。
- **CSS 自动加载**：样式已内联注入到每个组件 JS chunk 中，无需手动引入 CSS 文件，SSR 环境下自动跳过。
- **按需加载 / Tree-shaking**：通过 `exports` 子路径支持单组件引入，配合 Vite/Rollup 的 Tree-shaking 进一步减小体积。
- **主题变量**：基于 Less 变量统一管理主色、字号、圆角、阴影等设计 Token，便于定制主题。
- **无障碍**：关键交互组件支持键盘操作与 ARIA 属性。
- **零额外运行时依赖**：除 `react` / `react-dom` / `classnames` 外不依赖任何第三方库。

## 技术栈

| 分类     | 技术                                          |
| -------- | --------------------------------------------- |
| 核心框架 | React 19                                      |
| 开发语言 | TypeScript 5.9                                |
| 构建工具 | Vite 8                                        |
| 样式方案 | Less 4                                        |
| 类型检查 | tsc（`tsconfig.types.json` 独立产出 `.d.ts`） |
| 代码规范 | ESLint 9 + typescript-eslint                  |
| 类名组合 | classnames                                    |
| 包管理   | npm                                           |

## 组件总览

### PC 端组件（47 个）

| 分类 | 组件                                                                                                                                                                                                                                                         |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 通用 | Button 按钮、Icon 图标、Avatar 头像                                                                                                                                                                                                                          |
| 布局 | Layout 布局、Grid 栅格、Masonry 瀑布流                                                                                                                                                                                                                       |
| 表单 | Input 输入框、Textarea 文本域、Select 下拉选择、Radio 单选框、Checkbox 多选框、Switch 开关、Slider 滑块、Rate 评分、Upload 上传、DatePicker 日期选择、TimePicker 时间选择、DateTimePicker 日期时间选择器、ColorPicker 颜色选择器、Form 表单、Transfer 穿梭框 |
| 反馈 | Dialog 弹框、Drawer 抽屉、Alert 提醒、Message 消息、Notification 通知、Loading 加载、Skeleton 骨架屏、Watermark 水印、Progress 进度条                                                                                                                        |
| 展示 | Menu 菜单、Carousel 走马灯、Table 表格、List 列表、Breadcrumb 面包屑、Steps 步骤条、Anchor 锚点、Pagination 分页、Tabs 标签页、Tree 树形控件、Calendar 日历、Empty 空状态、Popover 气泡、Collapse 折叠面板、Tag 标签、Intro 引导、Board 看板                 |

### 移动端组件（43 个）

与 PC 端组件清单一一对应，按移动端交互习惯进行适配实现。

## 安装

```bash
# npm
npm install zdy-design

# pnpm
pnpm add zdy-design

# yarn
yarn add zdy-design
```

> 依赖要求：`react >= 18`、`react-dom >= 18`（推荐 React 19）。

## 引入方式 ✨

组件库支持多种引入方式，**样式会随组件 JS 自动加载，无需手动 import CSS 文件**。

---

### 方式一：具名解构引入（推荐，适合大多数场景）

PC 端组件全部做顶层具名导出，解构出来直接使用，Vite / Webpack 会自动 Tree-shaking 移除未引用组件。

```tsx
import { Alert, Button, Input, Form } from "zdy-design";

const App = () => (
  <>
    <Alert type="info" message="提示" description="这是一条通知" />
    <Button type="primary">主要按钮</Button>
    <Input placeholder="请输入内容" />
  </>
);
```

> 移动端组件因与 PC 同名，不能直接顶层解构，需通过命名空间或子路径引入（见方式三、四）。

---

### 方式二：子路径按需引入（单组件、极致体积）

每个组件通过 `package.json` 的 `exports` 子路径单独暴露，**只加载这一个组件的代码和样式**，适合对产物体积极度敏感的场景。

```tsx
// 引入单个 PC 组件
import Alert from "zdy-design/pc/Alert";
import Button from "zdy-design/pc/Button";
import Select from "zdy-design/pc/Select";

// 引入单个移动端组件
import Alert from "zdy-design/mobile/Alert";
import Button from "zdy-design/mobile/Button";

const App = () => <Alert type="success" message="操作成功" />;
```

---

### 方式三：PC 平台整体命名空间引入

```tsx
import { PC } from 'zdy-design';

<PC.Button type="primary">主要按钮</PC.Button>
<PC.Input placeholder="请输入" />
<PC.Select options={[{ value: '1', label: '选项一' }]} />
<PC.Form>
  <PC.Form.Item label="姓名">
    <PC.Input />
  </PC.Form.Item>
</PC.Form>
```

---

### 方式四：移动端命名空间引入

```tsx
import { Mobile } from 'zdy-design';

<Mobile.Button type="primary">移动端按钮</Mobile.Button>
<Mobile.Input placeholder="请输入" />
<Mobile.Alert type="warning" message="注意" />
```

---

### 方式五：仅引入类型

```ts
// 从主入口直接引类型（与组件是同一份类型）
import type { AlertProps, ButtonProps, SelectProps } from "zdy-design";

// 或从 types 子路径引
import type {
  AlertProps,
  BaseComponentProps,
  SizeType,
} from "zdy-design/types";
```

---

### 关于样式（无需手动引入）

每个组件的 CSS 已通过构建时 `injectCssIntoJs` 插件内联注入到对应 JS chunk，
运行时自动创建 `<style data-zdy-css>` 标签注入到 `document.head`：

- ✅ `import { Alert } from 'zdy-design'` → 样式自动加载
- ✅ `import Alert from 'zdy-design/pc/Alert'` → 样式自动加载
- ✅ SSR / Node 环境下 `typeof document === 'undefined'` 自动跳过，不报错

如需单独引用 CSS（例如 SSR 时手动内联、或深度主题定制）仍可使用：

```ts
// 全量样式（可选，通常不需要）
import "zdy-design/styles.css";
```

Less 变量定制：

```less
@import "zdy-design/src/styles/variables.less";

// 覆盖主色等设计 Token
@primary-color: #722ed1;
@border-radius-base: 6px;
```

---

## 使用示例

```tsx
import React, { useState } from "react";

// ✅ 方式一：解构引入（样式自动加载）
import { Form, Input, Radio, Button, Alert } from "zdy-design";

const Demo = () => {
  const [gender, setGender] = useState("1");

  return (
    <>
      <Alert
        type="info"
        message="提示"
        description="样式已自动加载，无需额外 import CSS"
      />

      <Form layout="vertical">
        <Form.Item label="姓名">
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item label="性别">
          <Radio.Group value={gender} onChange={setGender}>
            <Radio value="1">男</Radio>
            <Radio value="2">女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary">提交</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Demo;
```

## 本地开发

```bash
# 安装依赖
npm install

# 启动文档 / Demo 站点（Vite）
npm run dev

# 构建组件库（ES 多入口 + UMD 单入口 + 类型 + barrel 文件）
npm run build

# 仅构建 ES 产物（每个组件独立 chunk）
npm run build:es

# 仅构建 UMD 产物（全量打包一个文件）
npm run build:umd

# 仅生成 TypeScript 类型声明（.d.ts）
npm run build:types

# 仅重新生成 barrel 文件 + package.json exports
npm run build:barrels

# Lint 校验
npm run lint

# 预览构建产物
npm run preview

# 构建 Demo 站点到 dist-demo/（GitHub Pages 用）
npm run build:demo

# 本地预览 Demo（端口 4173），模拟 GitHub Pages 环境
npm run preview:demo
```

## 目录结构

```
zdy-ui/
├── src/
│   ├── components/
│   │   ├── pc/              # PC 端组件（47 个，每个独立目录）
│   │   │   ├── Alert/
│   │   │   │   ├── Alert.tsx        # 组件实现
│   │   │   │   ├── Alert.less       # 组件样式
│   │   │   │   ├── demo.tsx         # Demo 用例
│   │   │   │   ├── types.ts         # Props 类型
│   │   │   │   └── index.ts         # default 导出
│   │   │   ├── Button/
│   │   │   └── ...
│   │   ├── mobile/          # 移动端组件（43 个，结构同 pc）
│   │   ├── ApiTable/        # Demo 站点辅助组件
│   │   └── DemoBlock/
│   ├── pages/               # Demo 站点页面
│   ├── routes/              # Demo 站点路由
│   ├── assets/              # 缩略图等静态资源
│   ├── types/
│   │   └── index.ts         # 公共类型 + 各组件类型集中再导出
│   ├── App.tsx              # Demo 站点入口
│   ├── main.tsx             # Demo 站点挂载点
│   └── index.ts             # 组件库主入口（PC 具名 + PC/Mobile 命名空间）
├── scripts/
│   ├── generate-barrels.mjs # barrel JS + 类型桥接 + package.json exports 生成
│   └── generate-thumbnails.mjs
├── vite.config.ts           # Vite 配置（含 injectCssIntoJs CSS 注入插件）
├── tsconfig.json
├── tsconfig.types.json      # .d.ts 专用编译配置
├── package.json             # name: zdy-design，含 exports 子路径映射
└── README.md
```

## 构建产物说明

```
dist/
├── index.js                 # 主入口：PC 具名导出 + Mobile 命名空间（ES 格式）
├── index.d.ts               # 主入口类型声明
├── zdy-design.umd.js        # UMD 全量包（可直接 <script> 标签使用）
├── zdy-design.css           # 全量 CSS（可选手动引用）
├── pc/
│   ├── index.js             # PC 所有组件具名导出
│   ├── index.d.ts
│   ├── Alert.js             # 单个 PC 组件 ES 入口（含 CSS 自动注入）
│   ├── Alert.d.ts
│   ├── Button.js
│   └── ...
├── mobile/
│   ├── index.js             # Mobile 所有组件具名导出
│   ├── index.d.ts
│   ├── Alert.js             # 单个 Mobile 组件 ES 入口（含 CSS 自动注入）
│   └── ...
├── types/
│   └── index.d.ts           # 公共类型
└── components/              # tsc 生成的原始 .d.ts 结构（被 pc/*/mobile/* 下 d.ts 桥接引用）
```

## 浏览器兼容性

- Chrome / Edge >= 90
- Firefox >= 88
- Safari >= 14

## License

MIT
