import React from 'react';

export interface TableProps {
  columns: TableColumn[];
  dataSource: Record<string, any>[];
  className?: string;
  style?: React.CSSProperties;
  bordered?: boolean;
}

export interface TableColumn {
  title: string;
  dataIndex: string;
  width?: number | string;
  render?: (value: any, record: any, index: number) => React.ReactNode;
}