import type React from 'react';

// ============================================================
// 公共基础类型（全局通用，不归属于具体组件）
// ============================================================

export type SizeType = 'small' | 'medium' | 'large';

// 通用 Props
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// ============================================================
// 各组件类型统一 re-export
// 说明：类型定义已迁移至各组件目录下的 types.ts，
//       此处仅做集中再导出，保持外部 `from '@/types'` 的导入路径不变。
// ============================================================

export * from '../components/pc/Alert/types';
export * from '../components/pc/Anchor/types';
export * from '../components/pc/Board/types';
export * from '../components/pc/Breadcrumb/types';
export * from '../components/pc/Button/types';
export * from '../components/pc/Calendar/types';
export * from '../components/pc/Carousel/types';
export * from '../components/pc/Checkbox/types';
export * from '../components/pc/Collapse/types';
export * from '../components/pc/ColorPicker/types';
export * from '../components/pc/DatePicker/types';
export * from '../components/pc/DateTimePicker/types';
export * from '../components/pc/Dialog/types';
export * from '../components/pc/Empty/types';
export * from '../components/pc/Grid/types';
export * from '../components/pc/Icon/types';
export * from '../components/pc/Input/types';
export * from '../components/pc/Intro/types';
export * from '../components/pc/Layout/types';
export * from '../components/pc/List/types';
export * from '../components/pc/Loading/types';
export * from '../components/pc/Masonry/types';
export * from '../components/pc/Menu/types';
export * from '../components/pc/Message/types';
export * from '../components/pc/Notification/types';
export * from '../components/pc/Pagination/types';
export * from '../components/pc/Popover/types';
export * from '../components/pc/Progress/types';
export * from '../components/pc/Radio/types';
export * from '../components/pc/Rate/types';
export * from '../components/pc/Select/types';
export * from '../components/pc/Skeleton/types';
export * from '../components/pc/Slider/types';
export * from '../components/pc/Steps/types';
export * from '../components/pc/Switch/types';
export * from '../components/pc/Table/types';
export * from '../components/pc/Tabs/types';
export * from '../components/pc/Tag/types';
export * from '../components/pc/TimePicker/types';
export * from '../components/pc/Transfer/types';
export * from '../components/pc/Tree/types';
export * from '../components/pc/Upload/types';
export * from '../components/pc/Watermark/types';
