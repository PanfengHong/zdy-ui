import type React from 'react';
import type { BaseComponentProps } from '../../../types';

export type ImageFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';

export interface ImageProps extends BaseComponentProps {
  // 图片地址
  src?: string;
  alt?: string;
  // 容器宽高，数字按 px 处理
  width?: number | string;
  height?: number | string;
  // 图片填充模式，对应 object-fit
  fit?: ImageFit;
  // 懒加载
  lazy?: boolean;
  // 点击预览大图
  preview?: boolean;
  // 加载中占位内容
  placeholder?: React.ReactNode;
  // 加载失败内容
  fallback?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onLoad?: React.ReactEventHandler<HTMLImageElement>;
  onError?: React.ReactEventHandler<HTMLImageElement>;
}
