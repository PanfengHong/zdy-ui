import type React from 'react';
import type { BaseComponentProps, SizeType } from '../../../types';

export interface DatePickerProps extends BaseComponentProps {
  value?: Date | null;
  defaultValue?: Date | null;
  format?: string;
  placeholder?: string;
  disabled?: boolean;
  disabledDate?: (date: Date) => boolean;
  allowClear?: boolean;
  size?: SizeType;
  onChange?: (date: Date | null) => void;
  onOpenChange?: (open: boolean) => void;
}
