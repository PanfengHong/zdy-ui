import type { CSSProperties, ReactNode } from 'react';

export type MProgressType = 'line' | 'circle';

export type MProgressStatus = 'normal' | 'success' | 'exception' | 'active';

export interface MProgressProps {
  /** 进度百分比，范围 0-100 */
  percent?: number;
  /** 进度条类型 */
  type?: MProgressType;
  /** 状态，不传时 100% 自动视为 success */
  status?: MProgressStatus;
  /** 自定义进度颜色，线形支持传入渐变字符串 */
  strokeColor?: string;
  /** 进度条宽度，line 默认 6，circle 默认 6 */
  strokeWidth?: number;
  /** 是否显示进度文字 */
  showInfo?: boolean;
  /** 自定义进度文字 */
  format?: (percent: number) => ReactNode;
  /** 轨道背景色 */
  trailColor?: string;
  /** 环形进度条直径 */
  width?: number;
  /** 环形进度条缺口角度 */
  gapDegree?: number;
  /** 无障碍名称 */
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
}
