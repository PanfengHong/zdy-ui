import React from 'react';
import type { BaseComponentProps, SizeType } from '../../../types';

export type IconType = 'add' | 'delete' | 'close' | 'edit' | 'search' | 'save' | 'cancel' | 'confirm' | 'back' | 'forward' | 'up' | 'down' | 'left' | 'right' | 'caret-up' | 'caret-down' | 'caret-left' | 'caret-right' | 'check' | 'error' | 'warning' | 'info' | 'home' | 'user' | 'bell' | 'star' | 'heart' | 'settings' | 'spin' | 'loading' | 'github';

export interface BaseIconProps extends BaseComponentProps {
  type?: IconType;
  size?: SizeType | number;
  color?: string;
  spin?: boolean;
}
