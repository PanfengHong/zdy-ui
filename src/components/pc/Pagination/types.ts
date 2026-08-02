import React from 'react';
import type { BaseComponentProps } from '../../../types';

export type PaginationSize = 'default' | 'small';

export interface PaginationProps extends BaseComponentProps {
  current?: number;
  defaultCurrent?: number;
  pageSize?: number;
  defaultPageSize?: number;
  total?: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
  pageSizeOptions?: number[];
  size?: PaginationSize;
  disabled?: boolean;
  simple?: boolean;
  onChange?: (page: number, pageSize: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
}
