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
  /** 单选类型：default 普通单选框，button 按钮组样式（配合 Radio.Button） */
  optionType?: 'default' | 'button';
  children?: React.ReactNode;
}
