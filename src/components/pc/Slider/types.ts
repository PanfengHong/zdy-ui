import React from 'react';
import type { BaseComponentProps } from '../../../types';

export interface SliderMark {
  value: number;
  label?: React.ReactNode;
  style?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
}

export type SliderTooltipConfig =
  | boolean
  | {
      visible?: boolean;
      formatter?: (value: number) => React.ReactNode;
    };

export interface BaseSliderProps extends BaseComponentProps {
  value?: number | [number, number];
  defaultValue?: number | [number, number];
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  vertical?: boolean;
  range?: boolean;
  marks?: SliderMark[];
  tooltip?: SliderTooltipConfig;
  onChange?: (value: number | [number, number]) => void;
  onAfterChange?: (value: number | [number, number]) => void;
  size?: 'default' | 'small';
  reverse?: boolean;
  keyboard?: boolean;
}
