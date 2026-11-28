import type { ReactNode } from 'react';
import type { BaseComponentProps } from '../../../types';

// compact：上一页 / 当前页 / 下一页，点击中间页码弹出跳转面板
// number：可横向滚动的页码条，适合需要直接选页的场景
export type MPaginationMode = 'compact' | 'number';

export interface MPaginationProps extends BaseComponentProps {
  /** 当前页数（受控） */
  current?: number;
  /** 默认当前页数 */
  defaultCurrent?: number;
  /** 每页条数（受控） */
  pageSize?: number;
  /** 默认每页条数 */
  defaultPageSize?: number;
  /** 数据总数 */
  total?: number;
  /** 展示形态 */
  mode?: MPaginationMode;
  /** 是否允许左右滑动翻页 */
  swipeable?: boolean;
  /** 是否展示每页条数切换入口 */
  showSizeChanger?: boolean;
  /** 每页条数选项 */
  pageSizeOptions?: number[];
  /** 用于展示数据总量和当前数据范围 */
  showTotal?: (total: number, range: [number, number]) => ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 弹层内联渲染：相对最近的定位父级铺满（用于手机预览等受限容器） */
  inline?: boolean;
  /** 点击遮罩是否关闭弹层 */
  closeOnMaskClick?: boolean;
  /** 页码改变回调 */
  onChange?: (page: number, pageSize: number) => void;
  /** 每页条数改变回调 */
  onShowSizeChange?: (current: number, size: number) => void;
}
