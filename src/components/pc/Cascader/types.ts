import type { ReactNode } from 'react';
import type { BaseComponentProps, SizeType } from '../../../types';

export interface CascaderOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
  children?: CascaderOption[];
}

export interface CascaderProps extends BaseComponentProps {
  /** 级联数据 */
  options: CascaderOption[];
  /** 选中路径（受控） */
  value?: string[];
  /** 默认选中路径（非受控） */
  defaultValue?: string[];
  placeholder?: string;
  disabled?: boolean;
  /** 是否允许清空 */
  allowClear?: boolean;
  /** 是否在任意层级选择后都触发 onChange */
  changeOnSelect?: boolean;
  /** 展开子级的触发方式 */
  expandTrigger?: 'click' | 'hover';
  /** 尺寸 */
  size?: SizeType;
  /** 自定义选中路径的展示 */
  displayRender?: (labels: ReactNode[], selectedOptions: CascaderOption[]) => ReactNode;
  /** 选中路径变化回调 */
  onChange?: (value: string[], selectedOptions: CascaderOption[]) => void;
}
