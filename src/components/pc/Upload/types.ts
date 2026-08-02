import React from 'react';
import type { BaseComponentProps } from '../../../types';

export interface UploadFile {
  uid: string;
  name: string;
  status?: 'pending' | 'uploading' | 'done' | 'error';
  percent?: number;
  url?: string;
  thumbUrl?: string;
  size?: number;
  type?: string;
}

export interface BaseUploadProps extends BaseComponentProps {
  action: string;
  method?: 'post' | 'get';
  headers?: Record<string, string>;
  data?: Record<string, any>;
  accept?: string;
  multiple?: boolean;
  maxFileSize?: number;
  maxCount?: number;
  disabled?: boolean;
  showUploadList?: boolean;
  beforeUpload?: (file: File) => boolean | Promise<boolean>;
  onProgress?: (percent: number, file: UploadFile) => void;
  onSuccess?: (response: any, file: UploadFile) => void;
  onError?: (error: Error, file: UploadFile) => void;
  onChange?: (fileList: UploadFile[]) => void;
  onRemove?: (file: UploadFile) => void;
}
