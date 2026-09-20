// 组件库主入口
// 支持两种使用方式：
//   1. import { Alert, Button } from 'zdy-design';        // PC 组件具名导出
//   2. import Alert from 'zdy-design/pc/Alert';          // PC 组件按需引入
//   3. import { Mobile } from 'zdy-design';              // 移动端命名空间
//   4. import MobileAlert from 'zdy-design/mobile/Alert';// 移动端组件按需引入

// PC 端组件：具名导出（顶层），支持解构引入
export * from './components/pc';

// PC 端组件命名空间（兼容，用于 PC.Alert 风格）
export * as PC from './components/pc';

// 移动端组件：命名空间导出（避免与 PC 同名组件冲突）
export * as Mobile from './components/mobile';

// 类型导出
export * from './types';

