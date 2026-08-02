import React from 'react';
import type { BaseComponentProps, SizeType } from '../../../types';

export interface BaseTextareaProps extends BaseComponentProps {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  disabled?: boolean;
  size?: SizeType;
  rows?: number;
  cols?: number;
  maxLength?: number;
  showCount?: boolean;
  autoSize?: boolean;
}
