import React from 'react';
import type { BaseComponentProps, SizeType } from '../../../types';

export interface BaseInputProps extends BaseComponentProps {
  type?: 'text' | 'password' | 'number' | 'email' | 'tel';
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  disabled?: boolean;
  size?: InputSizeType;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export type InputSizeType = 'small' | 'medium' | 'large';