import React from 'react';
import type { BaseComponentProps } from '../../../types';

export interface BaseRadioProps extends BaseComponentProps {
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  children?: React.ReactNode;
}

export interface BaseRadioGroupProps extends BaseComponentProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  children?: React.ReactNode;
}
