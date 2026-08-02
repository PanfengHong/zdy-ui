import React, { useRef, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import type { BaseWatermarkProps, WatermarkFontConfig } from '../../../types';

import './Watermark.less';

const getPixelRatio = () => window.devicePixelRatio || 1;

const WATERMARK_ID = 'zdy-watermark-overlay';

const drawWatermark = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  content: string | string[] | undefined,
  image: string | undefined,
  width: number,
  height: number,
  rotate: number,
  font: WatermarkFontConfig,
  gap: [number, number],
  offset: [number, number]
) => {
  const ratio = getPixelRatio();
  canvas.width = (width + gap[0]) * ratio;
  canvas.height = (height + gap[1]) * ratio;
  ctx.scale(ratio, ratio);

  if (image) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.save();
      ctx.translate((width + gap[0]) / 2 + offset[0], (height + gap[1]) / 2 + offset[1]);
      ctx.rotate((rotate * Math.PI) / 180);
      ctx.drawImage(img, -width / 2, -height / 2, width, height);
      ctx.restore();
    };
    img.src = image;
  } else if (content) {
    const text = Array.isArray(content) ? content : [content];
    ctx.save();
    ctx.translate((width + gap[0]) / 2 + offset[0], (height + gap[1]) / 2 + offset[1]);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.font = `${font.fontWeight || 'normal'} ${font.fontSize || 14}px ${font.fontFamily || 'sans-serif'}`;
    ctx.fillStyle = font.color || 'rgba(0, 0, 0, 0.15)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const lineHeight = (font.fontSize || 14) * 1.4;
    const totalHeight = lineHeight * text.length;
    text.forEach((line, index) => {
      const y = index * lineHeight - totalHeight / 2 + lineHeight / 2;
      ctx.fillText(line, 0, y);
    });
    ctx.restore();
  }
};

const Watermark: React.FC<BaseWatermarkProps> = ({
  content = 'ZDY UI',
  image,
  width = 120,
  height = 64,
  rotate = -22,
  zIndex = 9,
  gap = [100, 100],
  offset = [0, 0],
  font,
  children,
  className,
  style
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);

  const createWatermark = useCallback(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawWatermark(ctx, canvas, content, image, width, height, rotate, font || {}, gap, offset);

    const url = canvas.toDataURL('image/png');
    const totalWidth = width + gap[0];
    const totalHeight = height + gap[1];

    if (!overlayRef.current) {
      overlayRef.current = document.createElement('div');
      overlayRef.current.id = WATERMARK_ID;
    }

    const overlay = overlayRef.current;
    overlay.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: ${zIndex};
      background-image: url("${url}");
      background-repeat: repeat;
      background-size: ${totalWidth}px ${totalHeight}px;
    `;

    const container = containerRef.current;
    if (container && overlay.parentNode !== container) {
      container.appendChild(overlay);
    }
  }, [content, image, width, height, rotate, font, gap, offset, zIndex]);

  const observeContainer = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    observerRef.current = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const overlayExists = container.querySelector(`#${WATERMARK_ID}`);
          if (!overlayExists) {
            createWatermark();
          }
        }
        if (mutation.type === 'attributes') {
          const overlay = container.querySelector(`#${WATERMARK_ID}`);
          if (overlay) {
            overlay.removeAttribute('style');
            const url = overlayRef.current?.style.backgroundImage;
            if (url) {
              overlay.setAttribute('style', overlayRef.current!.getAttribute('style') || '');
            }
          }
        }
      });
    });

    observerRef.current.observe(container, {
      childList: true,
      attributes: true,
      subtree: true
    });
  }, [createWatermark]);

  useEffect(() => {
    createWatermark();
    observeContainer();

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      const overlay = containerRef.current?.querySelector(`#${WATERMARK_ID}`);
      if (overlay) {
        overlay.remove();
      }
    };
  }, [createWatermark, observeContainer]);

  return (
    <div
      ref={containerRef}
      className={classNames('zdy-watermark', className)}
      style={style}
    >
      {children}
    </div>
  );
};

export default Watermark;