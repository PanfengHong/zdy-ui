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
  /**
   * 表头固定时的表体最大高度（数字按 px 处理）。
   * 设置后内容超出出现纵向滚动条，表头自动吸顶；
   * 列宽超出容器时出现横向滚动，配合列 fixed 可固定列。
   */
  maxHeight?: number | string;
  /**
   * 分页配置。传 true 使用默认配置；传对象细粒度配置；false/不传 关闭分页。
   * - 不传 total：前端分页模式，组件自动对 dataSource 切片，total = dataSource.length
   * - 显式传 total：服务端分页模式，dataSource 视为当前页数据（由外部负责切片）
   */
  pagination?: boolean | TablePaginationConfig;
}

export interface TablePaginationConfig {
  /** 当前页（受控） */
  current?: number;
  /** 默认当前页（非受控） */
  defaultCurrent?: number;
  /** 每页条数（受控） */
  pageSize?: number;
  /** 默认每页条数（非受控），默认 10 */
  defaultPageSize?: number;
  /** 总条数。不传时取 dataSource.length（前端分页）；传入时为服务端分页 */
  total?: number;
  /** 是否展示每页条数切换器，默认 true */
  showSizeChanger?: boolean;
  /** 是否展示快速跳转输入框 */
  showQuickJumper?: boolean;
  /** 总数展示；返回 null 可隐藏左侧默认的"共 N 条" */
  showTotal?: ((total: number, range: [number, number]) => React.ReactNode) | null;
  /** 可选每页条数 */
  pageSizeOptions?: number[];
  /** 分页器尺寸 */
  size?: "default" | "small";
  /** 页码 / 每页条数变化回调 */
  onChange?: (page: number, pageSize: number) => void;
  /** 每页条数变化回调 */
  onShowSizeChange?: (current: number, size: number) => void;
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
