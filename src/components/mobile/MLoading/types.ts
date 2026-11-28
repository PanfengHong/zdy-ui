import type { CSSProperties, ReactNode } from 'react';

export type MLoadingSize = 'small' | 'medium' | 'large';

export interface MLoadingProps {
  /** 是否处于加载状态；fullscreen 模式下不传时默认展示全屏加载 */
  loading?: boolean;
  /** 指示器尺寸 */
  size?: MLoadingSize;
  /** 加载提示文字 */
  tip?: ReactNode;
  /** 自定义指示器 */
  indicator?: ReactNode;
  /** 全屏加载：覆盖整个视口；inline 时改为覆盖最近的定位父级 */
  fullscreen?: boolean;
  /** 内联定位：相对最近的定位父级铺满，用于手机预览等受限容器 */
  inline?: boolean;
  /** 被遮罩包裹的内容；不传时只渲染独立的加载指示器 */
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface MLoadingConfig {
  size?: MLoadingSize;
  tip?: ReactNode;
  indicator?: ReactNode;
}
