import type { CSSProperties, ReactNode } from 'react';

export interface MLayoutProps {
  /** 占满视口高度；默认由父容器决定高度 */
  fullscreen?: boolean;
  /** 是否避让顶部 / 底部安全区，默认 true */
  safeArea?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface MLayoutHeaderProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface MLayoutContentProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface MLayoutFooterProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
