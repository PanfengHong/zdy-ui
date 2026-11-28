import type { CSSProperties, ReactNode } from 'react';

export interface MSkeletonAvatarConfig {
  /** 头像尺寸，数字按 px 处理 */
  size?: number;
  /** 头像形状 */
  shape?: 'circle' | 'square';
}

export interface MSkeletonTitleConfig {
  /** 标题宽度 */
  width?: number | string;
}

export interface MSkeletonParagraphConfig {
  /** 段落行数 */
  rows?: number;
  /** 每行宽度，可传数组按行指定 */
  width?: number | string | Array<number | string>;
}

export interface MSkeletonProps {
  /** 是否显示微光动画 */
  active?: boolean;
  /** 是否显示头像占位，可配置尺寸与形状 */
  avatar?: boolean | MSkeletonAvatarConfig;
  /** 是否显示标题占位，可配置宽度 */
  title?: boolean | MSkeletonTitleConfig;
  /** 是否显示段落占位，可配置行数与每行宽度 */
  paragraph?: boolean | MSkeletonParagraphConfig;
  /** 是否处于加载中；为 false 时渲染 children */
  loading?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
