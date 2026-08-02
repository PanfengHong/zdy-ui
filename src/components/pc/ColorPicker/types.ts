import React from 'react';
import type { BaseComponentProps, SizeType } from '../../../types';

export type ColorPickerFormat = 'hex' | 'rgb' | 'hsb';

export interface ColorPickerProps extends BaseComponentProps {
  value?: string;
  defaultValue?: string;
  format?: ColorPickerFormat;
  disabled?: boolean;
  disabledAlpha?: boolean;
  showText?: boolean;
  presets?: { label: React.ReactNode; colors: string[] }[];
  size?: SizeType;
  allowClear?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onChange?: (value: string, color: ColorInfo) => void;
  onClear?: () => void;
}

export interface ColorInfo {
  hex: string;
  rgb: { r: number; g: number; b: number; a: number };
  hsb: { h: number; s: number; b: number; a: number };
}
