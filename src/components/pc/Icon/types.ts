import React from 'react';
import type { BaseComponentProps } from '../../../types';

export type IconType = 'add' | 'delete' | 'close' | 'edit' | 'search' | 'save' | 'cancel' | 'confirm' | 'back' | 'forward' | 'up' | 'down' | 'left' | 'right' | 'caret-up' | 'caret-down' | 'caret-left' | 'caret-right' | 'check' | 'error' | 'warning' | 'info' | 'home' | 'user' | 'people' | 'bell' | 'star' | 'heart' | 'settings' | 'spin' | 'loading' | 'github';

export type IconSizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface BaseIconProps extends BaseComponentProps {
  type?: IconType;
  size?: IconSizeType | number;
  color?: string;
  spin?: boolean;
}
