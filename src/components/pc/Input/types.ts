import React from 'react';
import type { BaseComponentProps, SizeType } from '../../../types';

export interface BaseInputProps extends BaseComponentProps {
  type?: 'text' | 'password' | 'number' | 'email' | 'tel';
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  disabled?: boolean;
  size?: SizeType;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  prepend?: React.ReactNode;
  append?: React.ReactNode;
  clearable?: boolean;
}