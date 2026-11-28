import type { ReactNode } from 'react';
import type { BaseComponentProps, CascaderOption } from '../../../types';

export interface MCascaderProps extends BaseComponentProps {
  /** 级联数据 */
  options: CascaderOption[];
  /** 选中路径（受控） */
  value?: string[];
  /** 默认选中路径（非受控） */
  defaultValue?: string[];
  /** 弹层标题 */
  title?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  /** 是否在任意层级选择后都触发 onChange */
  changeOnSelect?: boolean;
  /** 弹层内联渲染：相对最近的定位父级铺满（用于手机预览等受限容器） */
  inline?: boolean;
  /** 点击遮罩是否关闭弹层 */
  closeOnMaskClick?: boolean;
  /** 选中路径变化回调 */
  onChange?: (value: string[], selectedOptions: CascaderOption[]) => void;
  onOpen?: () => void;
  onClose?: () => void;
}
