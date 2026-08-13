import React from 'react';
import type { BaseComponentProps } from '../../../types';

export interface BaseDialogProps extends BaseComponentProps {
  visible?: boolean;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  width?: string | number;
  closable?: boolean;
  mask?: boolean;
  maskClosable?: boolean;
  onClose?: () => void;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}
