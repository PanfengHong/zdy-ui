import React from 'react';
import type { BaseComponentProps } from '../../../types';

export type StepStatus = 'wait' | 'process' | 'finish' | 'error';

export interface StepItem {
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  status?: StepStatus;
  disabled?: boolean;
}

export interface StepsProps extends BaseComponentProps {
  current?: number;
  initial?: number;
  direction?: 'horizontal' | 'vertical';
  status?: StepStatus;
  size?: 'default' | 'small';
  labelPlacement?: 'horizontal' | 'vertical';
  percent?: number;
  type?: 'default' | 'navigation';
  onChange?: (current: number) => void;
}

export interface StepProps extends BaseComponentProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  status?: StepStatus;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
