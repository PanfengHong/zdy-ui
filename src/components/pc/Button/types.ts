import React from 'react';
import type { BaseComponentProps, SizeType } from '../../../types';

export type ButtonType = 'primary' | 'default' | 'success' | 'info' | 'warning' | 'danger' | 'error' | 'text' | 'link';
export type ButtonShape = 'default' | 'circle' | 'round';

export interface BaseButtonProps extends BaseComponentProps {
  type?: ButtonType;
  size?: SizeType;
  shape?: ButtonShape;
  disabled?: boolean;
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
