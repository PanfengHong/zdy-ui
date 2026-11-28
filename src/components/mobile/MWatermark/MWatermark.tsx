import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import type { MWatermarkFontConfig, MWatermarkProps } from './types';

import './MWatermark.less';

const DEFAULT_FONT: Required<MWatermarkFontConfig> = {
  color: 'rgba(0, 0, 0, 0.12)',
  fontSize: 12,
  fontFamily: 'sans-serif',
  fontWeight: 400
};

const resolveFontWeight = (weight: MWatermarkFontConfig['fontWeight']) => {
  if (weight === 'light') return 300;
  if (weight === 'bold') return 700;
  return weight || 400;
};

interface WatermarkOptions {
  content: string | string[];
  image?: string;
  width: number;
  height: number;
  rotate: number;
  font?: MWatermarkFontConfig;
  gap: [number, number];
  offset: [number, number];
}

// 把单格水印绘制到 canvas 上，生成可平铺的背景图
const drawWatermark = (
  canvas: HTMLCanvasElement,
  options: WatermarkOptions,
  onReady: (url: string) => void
) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const { content, image, width, height, rotate, font, gap, offset } = options;
  const tileWidth = width + gap[0];
  const tileHeight = height + gap[1];
  const ratio = window.devicePixelRatio || 1;

  canvas.width = Math.max(1, Math.round(tileWidth * ratio));
  canvas.height = Math.max(1, Math.round(tileHeight * ratio));
  ctx.scale(ratio, ratio);

  const paint = (draw: () => void) => {
    ctx.clearRect(0, 0, tileWidth, tileHeight);
    ctx.save();
    ctx.translate(tileWidth / 2 + offset[0], tileHeight / 2 + offset[1]);
    ctx.rotate((rotate * Math.PI) / 180);
    draw();
    ctx.restore();
    onReady(canvas.toDataURL('image/png'));
  };

  if (image) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      paint(() => ctx.drawImage(img, -width / 2, -height / 2, width, height));
    };
    img.src = image;
    return;
  }

  const lines = Array.isArray(content) ? content : [content];
  const fontSize = font?.fontSize || DEFAULT_FONT.fontSize;
  const lineHeight = fontSize * 1.4;
  const totalHeight = lineHeight * lines.length;
  ctx.font = `${resolveFontWeight(font?.fontWeight)} ${fontSize}px ${
    font?.fontFamily || DEFAULT_FONT.fontFamily
  }`;
  ctx.fillStyle = font?.color || DEFAULT_FONT.color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  paint(() => {
    lines.forEach((line, index) => {
      ctx.fillText(line, 0, index * lineHeight - totalHeight / 2 + lineHeight / 2);
    });
  });
};

const MWatermark = ({
  content = 'ZDY UI',
  image,
  width = 100,
  height = 60,
  rotate = -22,
  zIndex = 9,
  gap = [50, 60],
  offset = [0, 0],
  font,
  children,
  className,
  style
}: MWatermarkProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const canvas = document.createElement('canvas');

    drawWatermark(
      canvas,
      {
        content,
        image,
        width,
        height,
        rotate,
        font,
        gap: [gap[0] ?? 50, gap[1] ?? 60],
        offset: [offset[0] ?? 0, offset[1] ?? 0]
      },
      url => {
        if (cancelled || !overlayRef.current) return;
        overlayRef.current.style.backgroundImage = `url("${url}")`;
      }
    );

    return () => {
      cancelled = true;
    };
  }, [content, image, width, height, rotate, font, gap, offset]);

  // 防止遮罩层被误删（例如内容区域整体替换后重新插入）
  useEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;
    if (!container || !overlay) return;

    const observer = new MutationObserver(() => {
      if (overlay.parentNode !== container) {
        container.appendChild(overlay);
      }
    });
    observer.observe(container, { childList: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={classNames('zdy-mobile-watermark', className)}
      style={style}
    >
      {children}
      <div
        ref={overlayRef}
        className="zdy-mobile-watermark-overlay"
        style={{
          zIndex,
          backgroundSize: `${width + (gap[0] ?? 50)}px ${height + (gap[1] ?? 60)}px`
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export default MWatermark;
