import type React from 'react';
import type { BaseComponentProps, SizeType } from '../../../types';

export interface TimePickerProps extends BaseComponentProps {
  value?: Date | null;
  defaultValue?: Date | null;
  format?: string;
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
  size?: SizeType;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  use12Hours?: boolean;
  hideDisabledOptions?: boolean;
  disabledHours?: () => number[];
  disabledMinutes?: (selectedHour: number) => number[];
  disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
  onChange?: (date: Date | null) => void;
  onOpenChange?: (open: boolean) => void;
}
