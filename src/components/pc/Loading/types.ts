import React from 'react';
import type { BaseComponentProps, SizeType } from '../../../types';

export interface BaseLoadingProps extends BaseComponentProps {
  loading?: boolean;
  size?: SizeType;
  tip?: React.ReactNode;
  fullscreen?: boolean;
  indicator?: React.ReactNode;
  /** 全屏模式下是否在加载界面内显示关闭按钮 */
  closable?: boolean;
  /** 点击加载界面内关闭按钮时的回调（全屏模式下生效） */
  onClose?: () => void;
  children?: React.ReactNode;
}

export interface LoadingConfig {
  tip?: React.ReactNode;
  size?: SizeType;
  indicator?: React.ReactNode;
  /** 是否在加载界面内显示关闭按钮，点击后自动隐藏全屏加载 */
  closable?: boolean;
  /** 点击关闭按钮时的回调，会在自动隐藏之前触发 */
  onClose?: () => void;
}
