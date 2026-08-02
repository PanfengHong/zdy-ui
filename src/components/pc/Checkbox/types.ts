import React from 'react';
import type { BaseComponentProps } from '../../../types';

export interface BaseCheckboxProps extends BaseComponentProps {
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  children?: React.ReactNode;
}

export interface BaseCheckboxGroupProps extends BaseComponentProps {
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  children?: React.ReactNode;
}
