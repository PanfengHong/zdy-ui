import React from 'react';
import type { BaseComponentProps } from '../../../types';

export interface LayoutProps extends BaseComponentProps {
  hasSider?: boolean;
  children?: React.ReactNode;
}

export interface LayoutHeaderProps extends BaseComponentProps {
  children?: React.ReactNode;
}

export interface LayoutContentProps extends BaseComponentProps {
  children?: React.ReactNode;
}

export interface LayoutFooterProps extends BaseComponentProps {
  children?: React.ReactNode;
}

export interface LayoutSiderProps extends BaseComponentProps {
  width?: string | number;
  collapsible?: boolean;
  collapsed?: boolean;
  collapsedWidth?: string | number;
  onCollapse?: (collapsed: boolean) => void;
  children?: React.ReactNode;
  defaultCollapsed?: boolean;
}
