import React from 'react';
import type { BaseComponentProps } from '../../../types';

export interface SelectOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface BaseSelectProps extends BaseComponentProps {
  value?: string;
  defaultValue?: string;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}
