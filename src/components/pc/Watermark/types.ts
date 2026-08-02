import React from 'react';
import type { BaseComponentProps } from '../../../types';

export interface WatermarkFontConfig {
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: 'normal' | 'light' | 'weight' | number;
}

export interface BaseWatermarkProps extends BaseComponentProps {
  content?: string | string[];
  image?: string;
  width?: number;
  height?: number;
  rotate?: number;
  zIndex?: number;
  gap?: [number, number];
  offset?: [number, number];
  font?: WatermarkFontConfig;
  inherit?: boolean;
  children?: React.ReactNode;
}
