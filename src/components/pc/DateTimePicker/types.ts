import type React from 'react';
import type { BaseComponentProps, SizeType } from '../../../types';

export interface DateTimePickerProps extends BaseComponentProps {
  value?: Date | null;
  defaultValue?: Date | null;
  format?: string;
  placeholder?: string;
  disabled?: boolean;
  disabledDate?: (date: Date) => boolean;
  allowClear?: boolean;
  size?: SizeType;
  showTime?: boolean;
  onChange?: (date: Date | null) => void;
  onOpenChange?: (open: boolean) => void;
}
