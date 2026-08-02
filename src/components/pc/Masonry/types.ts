import React from 'react';
import type { BaseComponentProps } from '../../../types';

export type MasonryBreakpointConfig = Record<number, number>;

export interface BaseMasonryProps extends BaseComponentProps {
  columns?: number;
  gap?: number;
  breakpoints?: MasonryBreakpointConfig;
  data?: any[];
  renderItem?: (item: any, index: number) => React.ReactNode;
  keyField?: string;
}
