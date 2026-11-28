import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import Icon from '../../pc/Icon/Icon';
import type { MUploadFile, MUploadProps } from './types';

import './MUpload.less';

const formatSize = (size?: number): string => {
  if (!size) return '';
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

const formatMegabytes = (bytes: number): string => {
  const megabytes = bytes / (1024 * 1024);
  return Number.isInteger(megabytes) ? `${megabytes}` : megabytes.toFixed(1);
};

const isImageFile = (file: MUploadFile): boolean => {
  if (file.type) return file.type.startsWith('image/');
  return /\.(png|jpe?g|gif|webp|svg|bmp)$/i.test(file.name);
};

const getExtension = (name: string): string => {
  const index = name.lastIndexOf('.');
  return index > -1 ? name.slice(index + 1).toUpperCase().slice(0, 4) : 'FILE';
};

const MUpload = ({
  value,
  defaultValue,
  onChange,
  upload,
  accept = 'image/*',
  multiple = true,
  maxCount = 9,
  maxFileSize = 10 * 1024 * 1024,
  disabled = false,
  preview = true,
  inline = false,
  capture,
  tip,
  beforeUpload,
  onProgress,
  onSuccess,
  onError,
  onExceed,
  onPreview,
  onRemove,
  className = '',
  style
}: MUploadProps) => {
  const [files, setFiles] = useState<MUploadFile[]>(value ?? defaultValue ?? []);
  const [syncedValue, setSyncedValue] = useState(value);
  const [lastEmitted, setLastEmitted] = useState<MUploadFile[] | null>(null);
  const [errorText, setErrorText] = useState('');
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const fileMapRef = useRef(new Map<string, File>());
  const objectUrlRef = useRef(new Map<string, string>());
  const errorTimerRef = useRef<number | null>(null);
  const filesRef = useRef(files);

  // 受控值变化时同步内部列表；忽略组件自身刚抛出的值，避免覆盖上传进度
  if (value !== syncedValue) {
    setSyncedValue(value);
    if (value !== lastEmitted) {
      setFiles(value ?? []);
    }
  }

  // 供事件与异步回调读取最新列表
  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  const emit = (next: MUploadFile[]) => {
    filesRef.current = next;
    setLastEmitted(next);
    setFiles(next);
    onChange?.(next);
  };

  const updateFile = (uid: string, patch: Partial<MUploadFile>) => {
    emit(filesRef.current.map(item => (item.uid === uid ? { ...item, ...patch } : item)));
  };

  const showError = (message: string) => {
    setErrorText(message);
    if (errorTimerRef.current !== null) window.clearTimeout(errorTimerRef.current);
    errorTimerRef.current = window.setTimeout(() => {
      setErrorText('');
      errorTimerRef.current = null;
    }, 2600);
  };

  useEffect(
    () => () => {
      if (errorTimerRef.current !== null) window.clearTimeout(errorTimerRef.current);
    },
    []
  );

  const startUpload = async (uid: string) => {
    const file = fileMapRef.current.get(uid);
    if (!file || !upload) return;

    const getEntry = () => filesRef.current.find(item => item.uid === uid);

    updateFile(uid, { status: 'uploading', percent: 0 });

    try {
      const response = await upload(file, percent => {
        const value = Math.min(100, Math.max(0, Math.round(percent)));
        updateFile(uid, { percent: value });
        const current = getEntry();
        if (current) onProgress?.(value, { ...current, status: 'uploading', percent: value });
      });

      const current = getEntry();
      const completed: MUploadFile = {
        ...(current ?? { uid, name: file.name }),
        status: 'done',
        percent: 100,
        url: (typeof response === 'string' && response) || current?.url
      };
      updateFile(uid, { status: 'done', percent: 100, url: completed.url });
      onSuccess?.(response, completed);
    } catch (error) {
      updateFile(uid, { status: 'error', percent: 0 });
      const current = getEntry();
      onError?.(error instanceof Error ? error : new Error(String(error)), {
        ...(current ?? { uid, name: file.name }),
        status: 'error',
        percent: 0
      });
    }
  };

  const handleSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []);
    event.target.value = '';
    if (!selected.length) return;

    let accepted = selected;

    if (maxFileSize > 0) {
      const oversize = accepted.filter(file => file.size > maxFileSize);
      if (oversize.length) {
        onExceed?.(oversize);
        accepted = accepted.filter(file => file.size <= maxFileSize);
        showError(`单个文件不能超过 ${formatMegabytes(maxFileSize)}MB`);
      }
    }

    if (beforeUpload && accepted.length) {
      const results = await Promise.all(
        accepted.map(async file => {
          try {
            return await beforeUpload(file);
          } catch {
            return false;
          }
        })
      );
      accepted = accepted.filter((_, index) => results[index]);
    }

    if (!accepted.length) return;

    const room = Math.max(0, maxCount - filesRef.current.length);
    if (room === 0) {
      onExceed?.(accepted);
      showError(`最多只能上传 ${maxCount} 个文件`);
      return;
    }

    if (accepted.length > room) {
      onExceed?.(accepted.slice(room));
      accepted = accepted.slice(0, room);
      showError(`最多只能上传 ${maxCount} 个文件`);
    }

    const entries: MUploadFile[] = accepted.map(file => {
      const uid = `upload-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      fileMapRef.current.set(uid, file);

      let url: string | undefined;
      if (isImageFile({ uid, name: file.name, type: file.type })) {
        url = URL.createObjectURL(file);
        objectUrlRef.current.set(uid, url);
      }

      return {
        uid,
        name: file.name,
        size: file.size,
        type: file.type,
        url,
        status: upload ? 'uploading' : 'done',
        percent: upload ? 0 : 100
      };
    });

    emit([...filesRef.current, ...entries]);
    entries.forEach(entry => {
      if (upload) void startUpload(entry.uid);
    });
  };

  const handleRemove = (file: MUploadFile) => {
    const objectUrl = objectUrlRef.current.get(file.uid);
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      objectUrlRef.current.delete(file.uid);
    }
    fileMapRef.current.delete(file.uid);

    emit(filesRef.current.filter(item => item.uid !== file.uid));
    onRemove?.(file);

    if (previewIndex !== null) setPreviewIndex(null);
  };

  const previewFiles = files.filter(item => item.url && isImageFile(item));
  const previewFile = previewIndex !== null ? previewFiles[previewIndex] : undefined;
  const previewOpen = Boolean(previewFile);

  const handlePreview = (file: MUploadFile, index: number) => {
    onPreview?.(file, index);
    if (!preview || !file.url || !isImageFile(file)) return;

    const targetIndex = previewFiles.findIndex(item => item.uid === file.uid);
    if (targetIndex >= 0) setPreviewIndex(targetIndex);
  };

  // 预览态：ESC 关闭、左右切换；非内联时锁定页面滚动
  useEffect(() => {
    if (!previewOpen) return;

    const count = previewFiles.length;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPreviewIndex(null);
      if (event.key === 'ArrowLeft') {
        setPreviewIndex(index => (index === null ? null : (index - 1 + count) % count));
      }
      if (event.key === 'ArrowRight') {
        setPreviewIndex(index => (index === null ? null : (index + 1) % count));
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    if (!inline) document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [previewOpen, inline, previewFiles.length]);

  const canAdd = !disabled && files.length < maxCount;
  const defaultTip =
    maxFileSize > 0
      ? `最多上传 ${maxCount} 个文件，单个不超过 ${formatMegabytes(maxFileSize)}MB`
      : `最多上传 ${maxCount} 个文件`;

  const previewOverlay = previewFile ? (
    <div
      className={classNames('zdy-mobile-upload-preview', {
        'zdy-mobile-upload-preview--inline': inline
      })}
      role="dialog"
      aria-modal="true"
      aria-label="文件预览"
      onClick={() => setPreviewIndex(null)}
    >
      <img
        className="zdy-mobile-upload-preview-image"
        src={previewFile.url}
        alt={previewFile.name}
        onClick={event => event.stopPropagation()}
      />
      <button
        type="button"
        className="zdy-mobile-upload-preview-close"
        aria-label="关闭预览"
        onClick={() => setPreviewIndex(null)}
      >
        <Icon type="close" size={18} />
      </button>

      {previewFiles.length > 1 && (
        <>
          <button
            type="button"
            className="zdy-mobile-upload-preview-nav zdy-mobile-upload-preview-nav--prev"
            aria-label="上一张"
            onClick={event => {
              event.stopPropagation();
              setPreviewIndex(index =>
                index === null ? null : (index - 1 + previewFiles.length) % previewFiles.length
              );
            }}
          >
            <Icon type="left" size={18} />
          </button>
          <button
            type="button"
            className="zdy-mobile-upload-preview-nav zdy-mobile-upload-preview-nav--next"
            aria-label="下一张"
            onClick={event => {
              event.stopPropagation();
              setPreviewIndex(index => (index === null ? null : (index + 1) % previewFiles.length));
            }}
          >
            <Icon type="right" size={18} />
          </button>
          <span className="zdy-mobile-upload-preview-counter">
            {(previewIndex ?? 0) + 1} / {previewFiles.length}
          </span>
        </>
      )}
    </div>
  ) : null;

  return (
    <div
      className={classNames(
        'zdy-mobile-upload',
        { 'zdy-mobile-upload--disabled': disabled },
        className
      )}
      style={style}
    >
      <div className="zdy-mobile-upload-grid">
        {files.map((file, index) => {
          const uploading = file.status === 'uploading';
          const failed = file.status === 'error';
          const image = isImageFile(file);

          return (
            <div
              key={file.uid}
              className={classNames('zdy-mobile-upload-item', {
                'zdy-mobile-upload-item--error': failed
              })}
            >
              <button
                type="button"
                className="zdy-mobile-upload-item-main"
                aria-label={`预览 ${file.name}`}
                onClick={() => handlePreview(file, index)}
              >
                {image && file.url ? (
                  <img className="zdy-mobile-upload-item-image" src={file.url} alt={file.name} />
                ) : (
                  <span className="zdy-mobile-upload-item-file">
                    <Icon type="upload" size={20} />
                    <span className="zdy-mobile-upload-item-ext">{getExtension(file.name)}</span>
                    <span className="zdy-mobile-upload-item-size">{formatSize(file.size)}</span>
                  </span>
                )}
              </button>

              {uploading && (
                <span className="zdy-mobile-upload-item-status" aria-hidden="true">
                  <Icon type="loading" size={16} className="zdy-mobile-upload-spinner" />
                  <span>{file.percent ?? 0}%</span>
                </span>
              )}

              {failed && (
                <span className="zdy-mobile-upload-item-status zdy-mobile-upload-item-status--error">
                  <span>上传失败</span>
                  {upload && (
                    <button
                      type="button"
                      className="zdy-mobile-upload-retry"
                      onClick={() => void startUpload(file.uid)}
                    >
                      重试
                    </button>
                  )}
                </span>
              )}

              {!disabled && (
                <button
                  type="button"
                  className="zdy-mobile-upload-remove"
                  aria-label={`移除 ${file.name}`}
                  onClick={() => handleRemove(file)}
                >
                  <Icon type="close" size={12} />
                </button>
              )}
            </div>
          );
        })}

        {canAdd && (
          <label className="zdy-mobile-upload-add">
            <input
              type="file"
              className="zdy-mobile-upload-input"
              accept={accept}
              multiple={multiple}
              capture={capture}
              disabled={disabled}
              onChange={handleSelect}
            />
            <Icon type="add" size={22} />
            <span className="zdy-mobile-upload-add-text">上传</span>
          </label>
        )}
      </div>

      <div className="zdy-mobile-upload-footer">
        <span className="zdy-mobile-upload-count">
          {files.length}/{maxCount}
        </span>
        <span
          className={classNames('zdy-mobile-upload-tip', {
            'zdy-mobile-upload-tip--error': Boolean(errorText)
          })}
          role={errorText ? 'alert' : undefined}
        >
          {errorText || tip || defaultTip}
        </span>
      </div>

      {previewFile && (inline ? previewOverlay : createPortal(previewOverlay, document.body))}
    </div>
  );
};

export default MUpload;
