import type { CSSProperties, ReactNode } from 'react';

export interface MWatermarkFontConfig {
  /** 文字颜色，默认 rgba(0, 0, 0, 0.12) */
  color?: string;
  /** 字号，默认 12 */
  fontSize?: number;
  /** 字体族，默认 sans-serif */
  fontFamily?: string;
  /** 字重 */
  fontWeight?: 'normal' | 'light' | 'bold' | number;
}

export interface MWatermarkProps {
  /** 水印文字，数组时按行绘制 */
  content?: string | string[];
  /** 水印图片地址，传入时优先于 content */
  image?: string;
  /** 单个水印宽度，默认 100 */
  width?: number;
  /** 单个水印高度，默认 60 */
  height?: number;
  /** 旋转角度，默认 -22 */
  rotate?: number;
  /** 遮罩层级，默认 9 */
  zIndex?: number;
  /** 水印之间的水平与垂直间距，默认 [50, 60] */
  gap?: [number, number];
  /** 水印在单格内的偏移，默认 [0, 0] */
  offset?: [number, number];
  /** 文字样式 */
  font?: MWatermarkFontConfig;
  /** 被水印覆盖的内容 */
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
