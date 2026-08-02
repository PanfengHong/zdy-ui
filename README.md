# Zdy UI

一套基于 React + TypeScript 的跨端组件库，同时提供 PC 端与移动端两套组件实现，覆盖通用、布局、表单、反馈、展示等常用场景，开箱即用。

## 特性

- **跨端支持**：同一套 API 设计下提供 PC 端与移动端两套组件实现，按需引入。
- **TypeScript 全量类型**：所有组件均使用 TypeScript 编写，并导出完整类型定义，开发体验友好。
- **按需加载**：通过 `exports` 子路径支持单组件引入，配合 Vite/Rollup 的 Tree-shaking 进一步减小体积。
- **主题变量**：基于 Less 变量统一管理主色、字号、圆角、阴影等设计 Token，便于定制主题。
- **无障碍**：关键交互组件支持键盘操作与 ARIA 属性。
- **零运行时依赖**：除 `react` / `react-dom` / `classnames` 外不依赖任何第三方库。

## 技术栈

| 分类 | 技术 |
| --- | --- |
| 核心框架 | React 19 |
| 开发语言 | TypeScript 5.9 |
| 构建工具 | Vite 8 |
| 样式方案 | Less 4 |
| 类型检查 | tsc（`tsconfig.types.json` 独立产出 `.d.ts`） |
| 代码规范 | ESLint 9 + typescript-eslint |
| 类名组合 | classnames |
| 包管理 | npm |

## 组件总览

### PC 端组件

| 分类 | 组件 |
| --- | --- |
| 通用 | Button 按钮、Icon 图标 |
| 布局 | Layout 布局、Grid 栅格、Masonry 瀑布流 |
| 表单 | Input 输入框、Textarea 文本域、Select 下拉选择、Radio 单选框、Checkbox 多选框、Switch 开关、Slider 滑块、Rate 评分、Upload 上传、DateTimePicker 日期时间选择器、ColorPicker 颜色选择器、Form 表单、Transfer 穿梭框 |
| 反馈 | Dialog 弹框、Alert 提醒、Message 消息、Notification 通知、Loading 加载、Skeleton 骨架屏、Watermark 水印、Progress 进度条 |
| 展示 | Menu 菜单、Carousel 走马灯、Table 表格、List 列表、Breadcrumb 面包屑、Steps 步骤条、Anchor 锚点、Pagination 分页、Tabs 标签页、Tree 树形控件、Calendar 日历、Empty 空状态、Popover 气泡、Collapse 折叠面板、Tag 标签、Intro 引导、Board 看板、ECharts 图表 |

### 移动端组件

与 PC 端组件清单一一对应，按移动端交互习惯进行适配实现。

## 安装

```bash
# npm
npm install react-ui-component-library

# pnpm
pnpm add react-ui-component-library

# yarn
yarn add react-ui-component-library
```

> 依赖要求：`react >= 18`、`react-dom >= 18`（推荐 React 19）。

## 引用方法

### 1. 按平台整体引入

```tsx
import { PC, Mobile } from 'react-ui-component-library';
import 'react-ui-component-library/styles.css';

// PC 端
const App = () => (
  <PC.Button type="primary">按钮</PC.Button>
);

// 移动端
const MApp = () => (
  <Mobile.Button type="primary">按钮</Mobile.Button>
);
```

### 2. 按平台命名空间引入（推荐，利于 Tree-shaking）

```tsx
import { PC } from 'react-ui-component-library';
import 'react-ui-component-library/styles.css';

<PC.Button type="primary">主要按钮</PC.Button>
<PC.Input placeholder="请输入" />
<PC.Select options={[{ value: '1', label: '选项一' }]} />
```

### 3. 单组件按需引入

每个组件都通过 `exports` 子路径单独暴露，适合对体积敏感的场景：

```tsx
// 引入 PC 端 Button
import Button from 'react-ui-component-library/pc/Button';
// 引入 PC 端 Select
import Select from 'react-ui-component-library/pc/Select';
// 引入移动端 Button
import Button from 'react-ui-component-library/mobile/Button';

import 'react-ui-component-library/styles.css';
```

### 4. 仅引入类型

```tsx
import type { ButtonType, BaseSelectProps, ColorInfo } from 'react-ui-component-library/types';
```

### 5. 引入样式

组件样式默认通过 `sideEffects` 标记，整体打包后输出在 `dist/react-ui-component-library.css`，使用时引入一次即可：

```ts
import 'react-ui-component-library/styles.css';
```

如需深度定制主题，可直接引用源码 Less 变量：

```less
@import 'react-ui-component-library/src/styles/variables.less';

// 覆盖主色
@primary-color: #722ed1;
```

## 使用示例

```tsx
import React, { useState } from 'react';
import { PC } from 'react-ui-component-library';
import 'react-ui-component-library/styles.css';

const Demo = () => {
  const [value, setValue] = useState('1');

  return (
    <PC.Form>
      <PC.Form.Item label="姓名">
        <PC.Input placeholder="请输入姓名" />
      </PC.Form.Item>
      <PC.Form.Item label="性别">
        <PC.Radio.Group value={value} onChange={setValue}>
          <PC.Radio value="1">男</PC.Radio>
          <PC.Radio value="2">女</PC.Radio>
        </PC.Radio.Group>
      </PC.Form.Item>
      <PC.Form.Item>
        <PC.Button type="primary">提交</PC.Button>
      </PC.Form.Item>
    </PC.Form>
  );
};

export default Demo;
```

## 本地开发

```bash
# 安装依赖
npm install

# 启动文档/Demo 站点（Vite）
npm run dev

# 构建组件库（ES + UMD + 类型 + barrel 文件）
npm run build

# 仅构建 ES 产物
npm run build:es

# 仅构建 UMD 产物
npm run build:umd

# 仅生成类型声明
npm run build:types

# Lint 校验
npm run lint

# 预览构建产物
npm run preview
```

## 目录结构

```
zdy-ui/
├── src/
│   ├── components/
│   │   ├── pc/              # PC 端组件
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.less
│   │   │   │   ├── demo.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Select/
│   │   │   └── ...
│   │   ├── mobile/          # 移动端组件
│   │   │   └── ...
│   │   ├── ApiTable/        # Demo 站点辅助组件
│   │   └── DemoBlock/
│   ├── styles/
│   │   └── variables.less   # 全局 Less 变量
│   ├── types/
│   │   └── index.ts         # 组件 Props 类型定义
│   ├── App.tsx              # Demo 站点入口
│   └── index.ts             # 组件库主入口
├── scripts/
│   └── generate-barrels.mjs # barrel 文件生成脚本
├── vite.config.ts
├── tsconfig.json
├── tsconfig.types.json
└── package.json
```

## 浏览器兼容性

- Chrome / Edge >= 90
- Firefox >= 88
- Safari >= 14

## License

MIT
