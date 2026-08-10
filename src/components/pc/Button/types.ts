import React from 'react';
import type { BaseComponentProps } from '../../../types';

export type ButtonType = 'primary' | 'default' | 'success' | 'info' | 'warning' | 'danger' | 'error' | 'text' | 'link';
export type ButtonShape = 'default' | 'circle' | 'round';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface BaseButtonProps extends BaseComponentProps {
  type?: ButtonType;
  size?: ButtonSize;
  shape?: ButtonShape;
  disabled?: boolean;
  loading?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
