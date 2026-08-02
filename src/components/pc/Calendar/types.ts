import React from 'react';
import type { BaseComponentProps } from '../../../types';

export type CalendarMode = 'month' | 'year';

export interface CalendarProps extends BaseComponentProps {
  value?: Date;
  defaultValue?: Date;
  mode?: CalendarMode;
  fullscreen?: boolean;
  disabledDate?: (date: Date) => boolean;
  dateCellRender?: (date: Date) => React.ReactNode;
  monthCellRender?: (date: Date) => React.ReactNode;
  headerRender?: (date: Date, mode: CalendarMode) => React.ReactNode;
  onChange?: (date: Date, mode: CalendarMode) => void;
  onPanelChange?: (date: Date, mode: CalendarMode) => void;
  onSelect?: (date: Date) => void;
}
