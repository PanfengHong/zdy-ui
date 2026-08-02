import React from 'react';
import type { BaseComponentProps } from '../../../types';

export type ColSpanType = number | string;

export interface BaseRowProps extends BaseComponentProps {
  gutter?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
  align?: 'top' | 'middle' | 'bottom';
  children?: React.ReactNode;
}

export interface BaseColProps extends BaseComponentProps {
  span?: ColSpanType;
  offset?: ColSpanType;
  push?: ColSpanType;
  pull?: ColSpanType;
  xs?: ColSpanType | { span?: ColSpanType; offset?: ColSpanType };
  sm?: ColSpanType | { span?: ColSpanType; offset?: ColSpanType };
  md?: ColSpanType | { span?: ColSpanType; offset?: ColSpanType };
  lg?: ColSpanType | { span?: ColSpanType; offset?: ColSpanType };
  xl?: ColSpanType | { span?: ColSpanType; offset?: ColSpanType };
  children?: React.ReactNode;
}
