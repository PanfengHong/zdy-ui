import React from 'react';
import type { BaseComponentProps } from '../../../types';

export interface EmptyProps extends BaseComponentProps {
  image?: React.ReactNode;
  description?: React.ReactNode;
  imageStyle?: React.CSSProperties;
  children?: React.ReactNode;
}
