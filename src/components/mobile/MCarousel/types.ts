import type { ReactNode } from 'react';
import type { BaseComponentProps } from '../../../types';

export type MCarouselEffect = 'slide' | 'fade';

export interface MCarouselProps extends BaseComponentProps {
  /** 是否自动播放，默认 true */
  autoplay?: boolean;
  /** 自动播放间隔（毫秒），默认 3000 */
  interval?: number;
  /** 切换效果，默认 slide */
  effect?: MCarouselEffect;
  /** 是否显示指示点，默认 true */
  dots?: boolean;
  /** 是否循环播放，默认 true */
  loop?: boolean;
  /** 触摸时暂停自动播放，默认 true */
  pauseOnTouch?: boolean;
  /** 容器高度，数字按 px 处理，默认 180 */
  height?: number | string;
  /** 初始索引，默认 0 */
  defaultActiveIndex?: number;
  /** 切换前回调，返回目标索引下标（从 0 开始） */
  beforeChange?: (from: number, to: number) => void;
  /** 切换完成回调 */
  afterChange?: (current: number) => void;
  children?: ReactNode;
}
