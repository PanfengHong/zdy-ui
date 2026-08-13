import React, { useState, useRef, useCallback } from 'react';
import classNames from 'classnames';
import type { BaseUploadProps, UploadFile } from './types';
import Icon from '../Icon/Icon';

import './Upload.less';

const getFileSize = (size: number): string => {
  if (size < 1024) {
    return size + ' B';
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(1) + ' KB';
  } else {
    return (size / (1024 * 1024)).toFixed(2) + ' MB';
  }
};

const UploadList = ({ 
  fileList, 
  onRemove, 
  onRetry 
}: { 
  fileList: UploadFile[]; 
  onRemove: (file: UploadFile) => void;
  onRetry?: (file: UploadFile) => void;
}) => {
  return (
    <div className="zdy-upload-list">
      {fileList.map((file) => (
        <div 
          key={file.uid} 
          className={classNames('zdy-upload-list-item', { 
            'zdy-upload-list-item--done': file.status === 'done',
            'zdy-upload-list-item--error': file.status === 'error',
            'zdy-upload-list-item--uploading': file.status === 'uploading'
          })}
        >
          <div className="zdy-upload-list-item-info">
            <div className="zdy-upload-list-item-name">{file.name}</div>
            <div className="zdy-upload-list-item-size">{getFileSize(file.size || 0)}</div>
          </div>
          
          {file.status === 'uploading' && (
            <div className="zdy-upload-list-item-progress">
              <div className="zdy-upload-list-item-progress-bar" style={{ width: file.percent + '%' }} />
            </div>
          )}
          
          <div className="zdy-upload-list-item-status">
            {file.status === 'uploading' && (
              <span className="zdy-upload-list-item-status-text">{file.percent}%</span>
            )}
            {file.status === 'done' && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#52c41a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
            {file.status === 'error' && (
              <span className="zdy-upload-list-item-status-text zdy-upload-list-item-status-text--error">上传失败</span>
            )}
          </div>
          
          <div className="zdy-upload-list-item-actions">
            {file.status === 'error' && onRetry && (
              <button 
                className="zdy-upload-list-item-action-btn zdy-upload-list-item-action-btn--retry"
                onClick={() => onRetry(file)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 0 0-2.12-9.36L23 4" />
                </svg>
              </button>
            )}
            <button 
              className="zdy-upload-list-item-action-btn zdy-upload-list-item-action-btn--remove"
              onClick={() => onRemove(file)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const Upload = ({
  action,
  method = 'post',
  headers = {},
  data = {},
  accept,
  multiple = false,
  maxFileSize,
  maxCount,
  disabled = false,
  showUploadList = true,
  beforeUpload,
  onProgress,
  onSuccess,
  onError,
  onChange,
  onRemove
}: BaseUploadProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (file: File, uid: string) => {
    const uploadFileItem: UploadFile = {
      uid,
      name: file.name,
      status: 'uploading',
      percent: 0,
      size: file.size,
      type: file.type
    };

    setFileList(prev => {
      const newList = [...prev];
      const index = newList.findIndex(item => item.uid === uid);
      if (index >= 0) {
        newList[index] = uploadFileItem;
      } else {
        newList.push(uploadFileItem);
      }
      onChange?.(newList);
      return newList;
    });

    const formData = new FormData();
    formData.append('file', file);
    
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    try {
      const xhr = new XMLHttpRequest();
      
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          setFileList(prev => {
            const newList = [...prev];
            const index = newList.findIndex(item => item.uid === uid);
            if (index >= 0) {
              newList[index].percent = percent;
            }
            onChange?.(newList);
            return newList;
          });
          onProgress?.(percent, uploadFileItem);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const response = JSON.parse(xhr.responseText || '{}');
          setFileList(prev => {
            const newList = [...prev];
            const index = newList.findIndex(item => item.uid === uid);
            if (index >= 0) {
              newList[index].status = 'done';
              newList[index].url = response.url || '';
            }
            onChange?.(newList);
            return newList;
          });
          onSuccess?.(response, uploadFileItem);
        } else {
          throw new Error('上传失败');
        }
      };

      xhr.onerror = () => {
        throw new Error('网络错误');
      };

      xhr.open(method.toUpperCase(), action, true);
      
      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.send(formData);
    } catch (error) {
      setFileList(prev => {
        const newList = [...prev];
        const index = newList.findIndex(item => item.uid === uid);
        if (index >= 0) {
          newList[index].status = 'error';
        }
        onChange?.(newList);
        return newList;
      });
      onError?.(error as Error, uploadFileItem);
    }
  }, [action, method, headers, data, onProgress, onSuccess, onError, onChange]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    
    for (const file of fileArray) {
      if (maxCount && fileList.length >= maxCount) {
        break;
      }

      if (maxFileSize && file.size > maxFileSize) {
        continue;
      }

      const uid = Date.now().toString(36) + Math.random().toString(36).substr(2);

      if (beforeUpload) {
        const result = beforeUpload(file);
        if (result instanceof Promise) {
          const allowed = await result;
          if (!allowed) continue;
        } else if (!result) {
          continue;
        }
      }

      await uploadFile(file, uid);
    }

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleRemove = (file: UploadFile) => {
    setFileList(prev => {
      const newList = prev.filter(item => item.uid !== file.uid);
      onChange?.(newList);
      return newList;
    });
    onRemove?.(file);
  };

  const handleRetry = (file: UploadFile) => {
    const inputFile = new File([], file.name, { type: file.type });
    uploadFile(inputFile, file.uid);
  };

  const handleClick = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className={classNames('zdy-upload', { 'zdy-upload--disabled': disabled })}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      
      <div className="zdy-upload-trigger" onClick={handleClick}>
        <Icon type="upload" size="md" />
        <span className="zdy-upload-text">点击或拖拽上传文件</span>
        {accept && <span className="zdy-upload-hint">支持 {accept} 格式</span>}
      </div>

      {showUploadList && fileList.length > 0 && (
        <UploadList 
          fileList={fileList} 
          onRemove={handleRemove} 
          onRetry={handleRetry} 
        />
      )}
    </div>
  );
};

export default Upload;