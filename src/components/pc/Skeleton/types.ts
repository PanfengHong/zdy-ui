import React from 'react';
import type { BaseComponentProps } from '../../../types';

export interface SkeletonParagraphProps {
  rows?: number;
  width?: number | string | Array<number | string>;
}

export interface BaseSkeletonProps extends BaseComponentProps {
  active?: boolean;
  avatar?: boolean | { size?: number; shape?: 'circle' | 'square' };
  title?: boolean | { width?: number | string };
  paragraph?: boolean | SkeletonParagraphProps;
  loading?: boolean;
  children?: React.ReactNode;
}
