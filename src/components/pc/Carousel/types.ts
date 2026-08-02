import React from 'react';
import type { BaseComponentProps } from '../../../types';

export type CarouselEffect = 'slide' | 'fade' | 'stack';

export interface BaseCarouselProps extends BaseComponentProps {
  autoplay?: boolean;
  interval?: number;
  effect?: CarouselEffect;
  dots?: boolean;
  arrows?: boolean;
  loop?: boolean;
  pauseOnHover?: boolean;
  afterChange?: (current: number) => void;
  beforeChange?: (from: number, to: number) => void;
  defaultActiveIndex?: number;
  children?: React.ReactNode;
}
