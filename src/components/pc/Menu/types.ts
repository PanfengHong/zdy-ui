import React from 'react';
import type { BaseComponentProps } from '../../../types';

export type MenuMode = 'vertical' | 'horizontal' | 'inline';
export type MenuTheme = 'light' | 'dark';

export interface MenuItemProps extends BaseComponentProps {
  itemKey: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export interface SubMenuProps extends BaseComponentProps {
  itemKey: string;
  icon?: React.ReactNode;
  title: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
}

export interface MenuProps extends BaseComponentProps {
  mode?: MenuMode;
  theme?: MenuTheme;
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  openKeys?: string[];
  defaultOpenKeys?: string[];
  inlineCollapsed?: boolean;
  onSelect?: (key: string) => void;
  onOpenChange?: (keys: string[]) => void;
  children?: React.ReactNode;
}
