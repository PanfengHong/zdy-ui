import React from 'react';
import type { BaseComponentProps } from '../../../types';

export type PopoverTrigger = 'hover' | 'click' | 'focus';
export type PopoverPlacement =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'left'
  | 'leftTop'
  | 'leftBottom'
  | 'right'
  | 'rightTop'
  | 'rightBottom';

export interface PopoverProps extends BaseComponentProps {
  content?: React.ReactNode;
  title?: React.ReactNode;
  trigger?: PopoverTrigger;
  placement?: PopoverPlacement;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  arrow?: boolean;
  showClose?: boolean;
  width?: number | string;
  mouseEnterDelay?: number; // 秒
  mouseLeaveDelay?: number; // 秒
  destroyOnHide?: boolean;
  zIndex?: number;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  onVisibleChange?: (visible: boolean) => void;
}
