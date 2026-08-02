import React from 'react';
import type { BaseComponentProps } from '../../../types';

export type AlertType = 'success' | 'info' | 'warning' | 'error';

export interface BaseAlertProps extends BaseComponentProps {
  type?: AlertType;
  title?: React.ReactNode;
  message?: React.ReactNode;
  closable?: boolean;
  showIcon?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}
