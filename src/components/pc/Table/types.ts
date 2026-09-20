import React from "react";

export interface TableProps {
  columns: TableColumn[];
  dataSource: Record<string, any>[];
  className?: string;
  style?: React.CSSProperties;
  bordered?: boolean;
  /** 行选中配置 */
  rowSelection?: RowSelection;
  /** 行拖拽排序 */
  draggable?: boolean;
  /** 行拖拽排序完成回调 */
  onDragEnd?: (
    fromIndex: number,
    toIndex: number,
    newData: Record<string, any>[],
  ) => void;
  /** 行操作菜单配置，开启后每行末尾显示 ... 按钮 */
  rowActions?: RowAction[];
  /** 是否显示表头左侧的全选框 (rowSelection 开启时自动生效) */
  showHeaderSelectAll?: boolean;
  /** 自定义 row key 字段 */
  rowKey?: string;
}

export interface TableColumn {
  title: React.ReactNode;
  dataIndex?: string;
  key?: string;
  width?: number | string;
  align?: "left" | "center" | "right";
  render?: (value: any, record: any, index: number) => React.ReactNode;
  /** 是否固定列 */
  fixed?: "left" | "right";
}

export interface RowSelection {
  /** 受控选中行 key 数组 */
  selectedRowKeys?: (string | number)[];
  /** 默认选中行 key 数组 */
  defaultSelectedRowKeys?: (string | number)[];
  /** 单选或多选 */
  type?: "checkbox" | "radio";
  /** 选中回调 */
  onChange?: (keys: (string | number)[], rows: Record<string, any>[]) => void;
  /** 手动阻止某些行被选中 */
  getCheckboxProps?: (record: any, index: number) => { disabled?: boolean };
}

export interface RowAction {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  danger?: boolean;
  disabled?: boolean;
  onClick?: (record: any, index: number) => void;
  divider?: boolean;
}
