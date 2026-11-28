# 新增组件文件模板与注册片段

将 `Name` 替换为组件名（PC 大写驼峰，移动端在原名前加 `M`），`xxx` 替换为小写类名片段。

## 目录结构

```
src/components/pc/Name/
├── Name.tsx
├── Name.less
├── types.ts
├── index.ts
└── demo.tsx
```

移动端把目录与组件名换成 `MName`。

## PC 组件实现（Name.tsx）

```tsx
import type { CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';

import './Name.less';

export interface NameProps {
  /** 是否禁用 */
  disabled?: boolean;
  /** 受控值 */
  value?: string;
  /** 默认值 */
  defaultValue?: string;
  /** 值变化回调 */
  onChange?: (value: string) => void;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

const Name = ({
  disabled = false,
  value,
  defaultValue,
  onChange,
  className = '',
  style,
  children
}: NameProps) => {
  return (
    <div
      className={classNames('zdy-name', { 'zdy-name--disabled': disabled }, className)}
      style={style}
    >
      {children}
    </div>
  );
};

export default Name;
```

`types.ts` 放公共类型，`Name.tsx` 引入使用：

```ts
// types.ts
import type { CSSProperties, ReactNode } from 'react';

export interface NameProps {
  // ...
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}
```

`index.ts`：

```ts
export { default } from './Name';
export type { NameProps } from './types';
```

## 移动端组件实现（MName.tsx）

```tsx
import { useState } from 'react';
import classNames from 'classnames';

import './MName.less';
import type { MNameProps } from './types';

const MName = ({
  value,
  defaultValue = '',
  disabled = false,
  onChange,
  className = '',
  style
}: MNameProps) => {
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = useState(defaultValue);
  const current = isControlled ? value : innerValue;

  const handleChange = (next: string) => {
    if (!isControlled) setInnerValue(next);
    onChange?.(next);
  };

  return (
    <div
      className={classNames(
        'zdy-mobile-name',
        { 'zdy-mobile-name--disabled': disabled },
        className
      )}
      style={style}
      onClick={() => handleChange(`${current}x`)}
    >
      {current}
    </div>
  );
};

export default MName;
```

移动端 `types.ts` 中的接口使用 `MNameProps`，注释写在属性上方，供 demo 与 editor 提示使用。

## 弹层类组件骨架

需要遮罩、进出场动画与 ESC 关闭时，按下面的结构实现（详细实现参考 `src/components/mobile/MDialog/MDialog.tsx` 与 `MActionSheet.tsx`）：

```tsx
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

import './MName.less';
import type { MNameProps } from './types';

const ANIMATION_DURATION = 220;

const MName = ({ visible, defaultVisible = false, inline = false, onClose }: MNameProps) => {
  const isControlled = visible !== undefined;
  const [innerVisible, setInnerVisible] = useState(defaultVisible);
  const open = isControlled ? Boolean(visible) : innerVisible;

  // 打开时在渲染期挂载，关闭后延迟卸载播放退出动画
  const [rendered, setRendered] = useState(open);
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open && !rendered) setRendered(true);
  }

  useEffect(() => {
    if (open || !rendered) return;
    const timer = window.setTimeout(() => setRendered(false), ANIMATION_DURATION);
    return () => window.clearTimeout(timer);
  }, [open, rendered]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (!isControlled) setInnerVisible(false);
      onClose?.();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, isControlled, onClose]);

  // 非 inline 时锁定页面滚动
  useEffect(() => {
    if (!open || inline) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open, inline]);

  if (!rendered) return null;

  const close = () => {
    if (!isControlled) setInnerVisible(false);
    onClose?.();
  };

  const overlay = (
    <div
      className={classNames('zdy-mobile-name-root', {
        'zdy-mobile-name-root--inline': inline,
        'zdy-mobile-name-root--closing': !open
      })}
    >
      <div className="zdy-mobile-name-mask" onClick={close} />
      <div className="zdy-mobile-name-content" role="dialog" aria-modal="true">
        {/* 内容 */}
      </div>
    </div>
  );

  return inline ? overlay : createPortal(overlay, document.body);
};

export default MName;
```

样式中的根节点与动画：

```less
@import '../../../styles/variables.less';

.zdy-mobile-name-root {
  position: fixed;
  inset: 0;
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 24px 16px;

  &--inline {
    position: absolute;
  }
}

.zdy-mobile-name-mask {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  animation: zdy-mobile-name-fade-in 0.22s ease;
}

.zdy-mobile-name-content {
  position: relative;
  width: 100%;
  max-width: 400px;
  max-height: 82%;
  border-radius: 16px;
  background: #fff;
  overflow: hidden;
  animation: zdy-mobile-name-zoom-in 0.22s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.zdy-mobile-name-root--closing {
  .zdy-mobile-name-mask {
    animation: zdy-mobile-name-fade-out 0.22s ease forwards;
  }

  .zdy-mobile-name-content {
    animation: zdy-mobile-name-zoom-out 0.22s ease forwards;
  }
}
```

## demo 模板（demo.tsx）

```tsx
import { useState } from 'react';

import type { DemoConfig } from '../../../pages/Components/Demo/types';
import MButton from '../MButton/MButton';
import MName from './MName';

const BasicDemo = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="mdemo-stack">
      <MButton type="primary" onClick={() => setVisible(true)}>
        打开示例
      </MButton>
      <MName inline visible={visible} onClose={() => setVisible(false)} />
    </div>
  );
};

const mNameDemo: DemoConfig = {
  intro: '一句话说明组件定位、移动端适配方式与主要交互。',
  demos: [
    {
      title: '基础用法',
      desc: '说明该示例展示的关键属性或交互。',
      code: `<MName inline visible={visible} onClose={() => setVisible(false)} />`,
      render: <BasicDemo />
    }
  ],
  api: [
    { prop: 'visible', desc: '是否显示（受控）', type: 'boolean', default: '-' },
    { prop: 'defaultVisible', desc: '初始是否显示（非受控）', type: 'boolean', default: 'false' },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' },
    { prop: 'onChange', desc: '值变化回调', type: '(value) => void', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ]
};

export default mNameDemo;
```

若 demo 文件中定义了 `BasicDemo` 这类局部组件，文件首行加：

```ts
/* eslint-disable react-refresh/only-export-components */
```

PC demo 结构相同，`DemoConfig` 路径一致，触发器换成 `Button`，示例直接渲染在文档页中（无需 `inline`）。

## 注册片段

`src/components/pc/index.ts`（对应分类注释下）：

```ts
export { default as Name } from './Name';
```

`src/components/mobile/index.ts`：

```ts
export { default as MName } from './MName';
```

`src/types/index.ts`（仅 PC）：

```ts
export * from '../components/pc/Name/types';
```

`src/components/pc/demos.ts`：

```ts
import NameDemo from './Name/demo';

export const pcDemoConfigs: Record<string, DemoConfig> = {
  // ...
  Name: NameDemo
};
```

`src/components/mobile/demos.ts`：

```ts
import MNameDemo from './MName/demo';

export const mobileDemoConfigs: Record<string, DemoConfig> = {
  // ...
  MName: MNameDemo
};
```

`src/routes/menuConfig.ts`：

```ts
// PC：menuGroups 中对应分类
{ id: 'name', label: 'Name 名称', icon: '🧩', type: 'component', component: 'Name', path: '/components/Name', thumbnail: 'name' }

// 移动端：mobileMenuGroups 中对应分类
{ id: 'm-name', label: 'MName 名称', icon: '🧩', type: 'component', component: 'MName', path: '/components/MName?platform=mobile' }
```

`package.json`：

```json
"./pc/Name": {
  "import": "./dist/pc/Name.js",
  "require": "./dist/pc/Name.js",
  "types": "./dist/pc/Name.d.ts"
},
"./mobile/MName": {
  "import": "./dist/mobile/MName.js",
  "require": "./dist/mobile/MName.js",
  "types": "./dist/mobile/MName.d.ts"
}
```

`README.md`：

- 更新「PC 端组件（N 个）」与总览表格对应分类；
- 更新「移动端组件（N 个）」；
- 更新「目录结构」中 `pc/`、`mobile/` 后面的数量说明。
