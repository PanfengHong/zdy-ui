import React from 'react';
import type { BaseComponentProps } from '../../../types';

export interface RateProps extends BaseComponentProps {
  count?: number;
  value?: number;
  defaultValue?: number;
  allowHalf?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  character?: React.ReactNode;
  size?: 'small' | 'default' | 'large';
  tooltips?: string[];
  onChange?: (value: number) => void;
  onHoverChange?: (value: number) => void;
}
