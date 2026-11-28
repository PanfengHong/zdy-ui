import type { ReactNode } from 'react';
import type { BaseComponentProps } from '../../../types';

export type MUploadStatus = 'uploading' | 'done' | 'error';

export interface MUploadFile {
  uid: string;
  name: string;
  /** 预览地址，本地选择时自动生成 */
  url?: string;
  size?: number;
  type?: string;
  status?: MUploadStatus;
  /** 上传进度 0-100 */
  percent?: number;
}

export interface MUploadProps extends BaseComponentProps {
  /** 文件列表（受控） */
  value?: MUploadFile[];
  /** 默认文件列表（非受控） */
  defaultValue?: MUploadFile[];
  /** 文件列表变化回调 */
  onChange?: (files: MUploadFile[]) => void;
  /**
   * 自定义上传：返回文件可访问地址
   * 不传时仅生成本地预览地址，不发起网络请求
   */
  upload?: (file: File, onProgress: (percent: number) => void) => Promise<string | void>;
  /** 可选文件类型，默认 image/* */
  accept?: string;
  /** 是否允许多选，默认 true */
  multiple?: boolean;
  /** 最多上传数量，默认 9 */
  maxCount?: number;
  /** 单文件大小上限（字节），默认 10MB */
  maxFileSize?: number;
  disabled?: boolean;
  /** 点击缩略图是否全屏预览，默认 true */
  preview?: boolean;
  /** 预览层内联渲染，铺满最近定位父级（手机预览等受限容器） */
  inline?: boolean;
  /** 直接调起前置/后置摄像头 */
  capture?: 'user' | 'environment';
  /** 底部提示文案，不传时按数量与大小限制自动生成 */
  tip?: ReactNode;
  /** 上传前校验，返回 false 或 rejected 时跳过该文件 */
  beforeUpload?: (file: File) => boolean | Promise<boolean>;
  /** 上传进度回调 */
  onProgress?: (percent: number, file: MUploadFile) => void;
  /** 上传成功回调，response 为 upload 的返回值 */
  onSuccess?: (response: unknown, file: MUploadFile) => void;
  /** 上传失败回调 */
  onError?: (error: Error, file: MUploadFile) => void;
  /** 选择数量超限或文件过大时触发 */
  onExceed?: (files: File[]) => void;
  /** 点击缩略图预览时触发 */
  onPreview?: (file: MUploadFile, index: number) => void;
  /** 移除文件时触发 */
  onRemove?: (file: MUploadFile) => void;
}
