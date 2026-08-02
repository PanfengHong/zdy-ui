import React from 'react';
import type { BaseComponentProps } from '../../../types';

export interface TransferItem {
  key: string;
  title: string;
  description?: string;
  disabled?: boolean;
}

export interface TransferProps extends BaseComponentProps {
  dataSource: TransferItem[];
  targetKeys?: string[];
  defaultTargetKeys?: string[];
  selectedKeys?: string[];
  titles?: [string, string];
  operations?: [string, string];
  showSearch?: boolean;
  filterOption?: (inputValue: string, item: TransferItem) => boolean;
  listStyle?: React.CSSProperties;
  disabled?: boolean;
  oneWay?: boolean;
  render?: (item: TransferItem) => React.ReactNode;
  footer?: (props: { direction: 'left' | 'right' }) => React.ReactNode;
  onChange?: (targetKeys: string[], direction: 'left' | 'right', moveKeys: string[]) => void;
  onSelectChange?: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void;
  onSearch?: (direction: 'left' | 'right', value: string) => void;
}
