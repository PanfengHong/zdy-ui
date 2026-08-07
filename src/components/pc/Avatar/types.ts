import React from 'react';
import type { BaseComponentProps, SizeType } from '../../../types';

/** 头像形状 */
export type AvatarShape = 'circle' | 'square';

/** 头像状态点类型 */
export type AvatarStatus = 'online' | 'busy' | 'away' | 'offline';

/** Avatar 组件 Props */
export interface AvatarProps extends BaseComponentProps {
  /** 图片地址 */
  src?: string;
  /** 图片 srcset */
  srcSet?: string;
  /** 图片加载失败的替代内容（图片、文字或图标） */
  alt?: string;
  /** 自定义图标，在无图片时展示 */
  icon?: React.ReactNode;
  /** 文字内容，在无图片时展示（如姓名首字母） */
  text?: React.ReactNode;
  /** 头像尺寸 */
  size?: SizeType | number;
  /** 头像形状 */
  shape?: AvatarShape;
  /** 状态点 */
  status?: AvatarStatus;
  /** 自定义状态点颜色 */
  statusColor?: string;
  /** 文字头像与背景的间距比例（0-1），用于文字自适应缩放 */
  gap?: number;
  /** 图片加载失败回调，返回 false 可阻止默认回退行为 */
  onError?: () => boolean;
  /** 点击回调 */
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

/** Avatar.Group 组件 Props */
export interface AvatarGroupProps extends BaseComponentProps {
  /** 最大显示数量，超出以 +N 形式展示 */
  maxCount?: number;
  /** 超出部分的样式（背景色等） */
  maxStyle?: React.CSSProperties;
  /** 头像之间的重叠间距（像素） */
  maxPopoverPlacement?: 'top' | 'bottom';
  /** 组内头像尺寸 */
  size?: SizeType | number;
  /** 组内头像形状 */
  shape?: AvatarShape;
}
