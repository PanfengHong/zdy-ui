import React from 'react';
import type { BaseComponentProps } from '../../../types';

export type TagColor = 'default' | 'success' | 'processing' | 'error' | 'warning' | 'magenta' | 'red' | 'volcano' | 'orange' | 'gold' | 'lime' | 'green' | 'cyan' | 'blue' | 'geekblue' | 'purple';

export type TagStatus = 'default' | 'success' | 'processing' | 'error' | 'warning';

export interface TagProps extends BaseComponentProps {
  color?: TagColor | string;
  status?: TagStatus;
  closable?: boolean;
  closeIcon?: React.ReactNode;
  visible?: boolean;
  defaultVisible?: boolean;
  bordered?: boolean;
  icon?: React.ReactNode;
  size?: 'small' | 'default' | 'large';
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  onClose?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  onChange?: (visible: boolean) => void;
}

export interface CheckableTagProps extends BaseComponentProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}
