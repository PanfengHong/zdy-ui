import React from 'react';
import type { BaseComponentProps } from '../../../types';

export type ProgressType = 'line' | 'circle';

export type ProgressStatus = 'normal' | 'success' | 'exception' | 'active';

export interface BaseProgressProps extends BaseComponentProps {
  percent?: number;
  type?: ProgressType;
  status?: ProgressStatus;
  strokeColor?: string;
  strokeWidth?: number;
  showInfo?: boolean;
  format?: (percent: number) => React.ReactNode;
  trailColor?: string;
  width?: number;
  gapDegree?: number;
}
