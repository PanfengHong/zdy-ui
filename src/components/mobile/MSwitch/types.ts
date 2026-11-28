import type { ReactNode } from 'react';
import type { BaseComponentProps } from '../../../types';

export interface MSwitchProps extends BaseComponentProps {
  /** 是否开启（受控） */
  checked?: boolean;
  /** 默认是否开启（非受控） */
  defaultChecked?: boolean;
  /** 开关状态变化回调 */
  onChange?: (checked: boolean) => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否加载中：显示菊花并禁止交互，用于提交中避免重复点击 */
  loading?: boolean;
  /** 尺寸 */
  size?: 'small' | 'medium';
  /** 开关标题：传入后整行可点击，开关右对齐 */
  label?: ReactNode;
  /** 标题下方的说明文字 */
  description?: ReactNode;
  /** 无标题时的无障碍名称 */
  'aria-label'?: string;
}
