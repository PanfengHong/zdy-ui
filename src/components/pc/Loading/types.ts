import React from 'react';
import type { BaseComponentProps, SizeType } from '../../../types';

export interface BaseLoadingProps extends BaseComponentProps {
  loading?: boolean;
  size?: SizeType;
  tip?: React.ReactNode;
  fullscreen?: boolean;
  indicator?: React.ReactNode;
  children?: React.ReactNode;
}

export interface LoadingConfig {
  tip?: React.ReactNode;
  size?: SizeType;
  indicator?: React.ReactNode;
}
