import type { CSSProperties, ReactNode } from 'react';

export interface MMasonryProps<T = Record<string, unknown>> {
  /** 列数，默认 2 */
  columns?: number;
  /** 卡片间距（px），默认 10 */
  gap?: number;
  /** 数据源，需配合 renderItem 使用 */
  data?: T[];
  /** 自定义渲染每一项 */
  renderItem?: (item: T, index: number) => ReactNode;
  /** 数据项唯一标识字段，默认 id */
  keyField?: string;
  /** 子元素方式，与 data 二选一 */
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
