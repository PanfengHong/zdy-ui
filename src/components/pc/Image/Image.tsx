import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import type { MouseEventHandler, ReactEventHandler } from 'react';

import type { ImageProps } from './types';
import './Image.less';

type ImageStatus = 'loading' | 'loaded' | 'error';

const Image = ({
  src,
  alt = '',
  width,
  height,
  fit = 'cover',
  lazy = false,
  preview = false,
  placeholder,
  fallback,
  className = '',
  style,
  onClick,
  onLoad,
  onError
}: ImageProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [status, setStatus] = useState<ImageStatus>('loading');
  const [previewVisible, setPreviewVisible] = useState(false);

  // 地址变化时重置状态，并处理缓存图片（complete 时不会再触发 load）
  useEffect(() => {
    setStatus('loading');
    const img = imgRef.current;
    if (img?.complete) {
      setStatus(img.naturalWidth > 0 ? 'loaded' : 'error');
    }
  }, [src]);

  // 预览态：ESC 关闭并锁定页面滚动
  useEffect(() => {
    if (!previewVisible) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPreviewVisible(false);
    };
    document.addEventListener('keydown', handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [previewVisible]);

  const handleClick: MouseEventHandler<HTMLDivElement> = event => {
    onClick?.(event);
    if (preview && status === 'loaded') {
      setPreviewVisible(true);
    }
  };

  const handleLoad: ReactEventHandler<HTMLImageElement> = event => {
    setStatus('loaded');
    onLoad?.(event);
  };

  const handleError: ReactEventHandler<HTMLImageElement> = event => {
    setStatus('error');
    onError?.(event);
  };

  return (
    <>
      <div
        className={classNames(
          'zdy-image',
          `zdy-image--${status}`,
          { 'zdy-image--preview': preview && status === 'loaded' },
          className
        )}
        style={{ width, height, ...style }}
        onClick={handleClick}
      >
        {src && (
          <img
            ref={imgRef}
            className="zdy-image-img"
            src={src}
            alt={alt}
            loading={lazy ? 'lazy' : 'eager'}
            style={{ objectFit: fit }}
            onLoad={handleLoad}
            onError={handleError}
          />
        )}
        {status === 'loading' && (
          <span className="zdy-image-placeholder">{placeholder ?? '加载中'}</span>
        )}
        {(status === 'error' || !src) && (
          <span className="zdy-image-error">{fallback ?? '加载失败'}</span>
        )}
      </div>

      {preview &&
        previewVisible &&
        createPortal(
          <div className="zdy-image-preview" onClick={() => setPreviewVisible(false)}>
            <img src={src} alt={alt} onClick={event => event.stopPropagation()} />
            <button
              type="button"
              className="zdy-image-preview-close"
              aria-label="关闭预览"
              onClick={() => setPreviewVisible(false)}
            >
              ×
            </button>
          </div>,
          document.body
        )}
    </>
  );
};

export default Image;
