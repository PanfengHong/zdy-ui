import React from 'react';
import type { BaseComponentProps } from '../../../types';

/** 抽屉弹出方向 */
export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

/** Drawer 组件 Props */
export interface DrawerProps extends BaseComponentProps {
  /** 是否可见（受控） */
  visible?: boolean;
  /** 标题 */
  title?: React.ReactNode;
  /** 抽屉弹出方向 */
  placement?: DrawerPlacement;
  /** 宽度（左右方向时生效） */
  width?: string | number;
  /** 高度（上下方向时生效） */
  height?: string | number;
  /** 是否显示关闭按钮 */
  closable?: boolean;
  /** 是否显示遮罩 */
  mask?: boolean;
  /** 点击遮罩是否允许关闭 */
  maskClosable?: boolean;
  /** 按ESC是否允许关闭 */
  keyboard?: boolean;
  /** 是否在关闭时销毁子组件 */
  destroyOnClose?: boolean;
  /** 底部内容 */
  footer?: React.ReactNode;
  /** 遮罩样式 */
  maskStyle?: React.CSSProperties;
  /** 内容区样式 */
  bodyStyle?: React.CSSProperties;
  /** 关闭回调 */
  onClose?: () => void;
  /** 打开后的回调 */
  afterOpenChange?: (open: boolean) => void;
}
