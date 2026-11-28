import type { CSSProperties, ReactNode } from 'react';

export interface MGridProps {
  /** 每行列数，默认 4，支持任意正整数 */
  columnNum?: number;
  /** 是否显示格子边框，默认 true */
  border?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface MGridItemProps {
  /** 图标，可为 emoji、文字或 SVG */
  icon?: ReactNode;
  /** 文案 */
  label?: ReactNode;
  /** 点击回调，传入后渲染为可点击按钮 */
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
