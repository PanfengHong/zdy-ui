import React from 'react';
import type { BaseComponentProps } from '../../../types';

export type ListItemLayout = 'horizontal' | 'vertical';

export interface ListItemProps {
  key?: string | number;
  title?: React.ReactNode;
  description?: React.ReactNode;
  avatar?: React.ReactNode;
  extra?: React.ReactNode;
  actions?: React.ReactNode[];
  content?: React.ReactNode;
}

export interface BaseListProps extends BaseComponentProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  loading?: boolean;
  itemLayout?: ListItemLayout;
  grid?: {
    gutter?: number;
    column?: number;
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
  };
  dataSource?: ListItemProps[];
  renderItem?: (item: ListItemProps, index: number) => React.ReactNode;
  pagination?: false | {
    current?: number;
    pageSize?: number;
    total?: number;
    onChange?: (page: number, pageSize?: number) => void;
  };
  locale?: {
    emptyText?: React.ReactNode;
  };
  children?: React.ReactNode;
}
