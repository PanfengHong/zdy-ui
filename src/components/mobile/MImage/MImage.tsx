import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import Icon from '../../pc/Icon/Icon';
import type { CSSProperties, MouseEventHandler, ReactEventHandler, ReactNode } from 'react';

import './MImage.less';

export type MImageFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';

export interface MImageProps {
  src?: string;
  alt?: string;
  // 容器宽高，数字按 px 处理
  width?: number | string;
  height?: number | string;
  // 图片填充模式，对应 object-fit
  fit?: MImageFit;
  // 圆角，数字按 px 处理
  radius?: number | string;
  // 懒加载
  lazy?: boolean;
  // 点击预览大图
  preview?: boolean;
  // 预览层内联渲染，铺满最近定位父级（手机预览场景）
  inline?: boolean;
  placeholder?: ReactNode;
  fallback?: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onLoad?: ReactEventHandler<HTMLImageElement>;
  onError?: ReactEventHandler<HTMLImageElement>;
  className?: string;
  style?: CSSProperties;
}

type ImageStatus = 'loading' | 'loaded' | 'error';

const MImage = ({
  src,
  alt = '',
  width,
  height,
  fit = 'cover',
  radius,
  lazy = false,
  preview = false,
  inline = false,
  placeholder,
  fallback,
  onClick,
  onLoad,
  onError,
  className = '',
  style
}: MImageProps) => {
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

  // 预览态：ESC 关闭；非内联时锁定页面滚动
  useEffect(() => {
    if (!previewVisible) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPreviewVisible(false);
    };
    document.addEventListener('keydown', handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    if (!inline) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [previewVisible, inline]);

  const closePreview = () => setPreviewVisible(false);

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

  const previewOverlay = (
    <div
      className={classNames('zdy-mobile-image-preview', {
        'zdy-mobile-image-preview--inline': inline
      })}
      onClick={closePreview}
    >
      <img src={src} alt={alt} onClick={event => event.stopPropagation()} />
      <button
        type="button"
        className="zdy-mobile-image-preview-close"
        aria-label="关闭预览"
        onClick={closePreview}
      >
        <Icon type="close" size={18} />
      </button>
    </div>
  );

  return (
    <>
      <div
        className={classNames(
          'zdy-mobile-image',
          `zdy-mobile-image--${status}`,
          { 'zdy-mobile-image--preview': preview && status === 'loaded' },
          className
        )}
        style={{ width, height, borderRadius: radius, ...style }}
        onClick={handleClick}
      >
        {src && (
          <img
            ref={imgRef}
            className="zdy-mobile-image-img"
            src={src}
            alt={alt}
            loading={lazy ? 'lazy' : 'eager'}
            style={{ objectFit: fit }}
            onLoad={handleLoad}
            onError={handleError}
          />
        )}
        {status === 'loading' && (
          <span className="zdy-mobile-image-placeholder">{placeholder ?? '加载中'}</span>
        )}
        {(status === 'error' || !src) && (
          <span className="zdy-mobile-image-error">{fallback ?? '加载失败'}</span>
        )}
      </div>

      {preview &&
        previewVisible &&
        (inline ? previewOverlay : createPortal(previewOverlay, document.body))}
    </>
  );
};

export default MImage;
