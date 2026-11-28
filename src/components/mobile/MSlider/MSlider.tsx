import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import type { MSliderProps, MSliderValue } from './types';

import './MSlider.less';

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const getPrecision = (step: number) => {
  if (!Number.isFinite(step) || step <= 0) return 0;
  const text = String(step);
  const dotIndex = text.indexOf('.');
  return dotIndex >= 0 ? Math.min(text.length - dotIndex - 1, 10) : 0;
};

interface TrackRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface DragState {
  index: number;
  pointerId: number;
  /** 值比例与指针比例之差，保证按下滑块时不会跳动 */
  offset: number;
  rect: TrackRect;
}

const getZoomScale = (element: HTMLElement) => {
  let scale = 1;
  let node: HTMLElement | null = element;

  while (node) {
    const raw = getComputedStyle(node).getPropertyValue('zoom').trim();
    const zoom = raw.endsWith('%')
      ? Number.parseFloat(raw) / 100
      : Number.parseFloat(raw);
    if (Number.isFinite(zoom) && zoom > 0) scale *= zoom;
    node = node.parentElement;
  }

  return scale;
};

/**
 * 部分内核（如 Electron）的 CSS zoom 只影响绘制与命中测试，
 * getBoundingClientRect 仍返回布局坐标，而指针坐标已按 zoom 缩小。
 * 这里统一换算为屏幕坐标，普通页面（zoom = 1）逻辑不变。
 */
const getTrackRect = (track: HTMLDivElement): TrackRect => {
  const rect = track.getBoundingClientRect();
  const zoom = getZoomScale(track);

  if (zoom === 1) {
    return { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
  }

  const rectIgnoresZoom = Math.abs(rect.width - track.offsetWidth) < 0.5;
  if (!rectIgnoresZoom) {
    return { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
  }

  return {
    left: rect.left * zoom,
    top: rect.top * zoom,
    width: rect.width * zoom,
    height: rect.height * zoom
  };
};

const MSlider: React.FC<MSliderProps> = ({
  value,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  vertical = false,
  range = false,
  marks,
  tooltip = true,
  keyboard = true,
  size = 'default',
  ariaLabel,
  onChange,
  onAfterChange,
  className,
  style
}) => {
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = useState<MSliderValue>(() =>
    value !== undefined
      ? value
      : defaultValue !== undefined
        ? defaultValue
        : range
          ? [min, max]
          : min
  );

  const currentValue = isControlled ? (value as MSliderValue) : innerValue;
  const currentRef = useRef<MSliderValue>(currentValue);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);

  useEffect(() => {
    currentRef.current = currentValue;
  }, [currentValue]);

  const precision = getPrecision(step);

  const snapValue = (raw: number) => {
    const bounded = clamp(Number.isFinite(raw) ? raw : min, min, max);
    if (step <= 0) return bounded;
    const stepped = min + Math.round((bounded - min) / step) * step;
    return clamp(Number(stepped.toFixed(precision)), min, max);
  };

  const toPercent = (target: number) => {
    const span = max - min;
    if (span <= 0) return 0;
    return ((clamp(target, min, max) - min) / span) * 100;
  };

  const toRatio = (target: number) => {
    const span = max - min;
    if (span <= 0) return 0;
    return (clamp(target, min, max) - min) / span;
  };

  const readValues = (): [number, number] => {
    const raw = currentRef.current;
    return Array.isArray(raw) ? [raw[0], raw[1]] : [raw, raw];
  };

  const applyValue = (next: MSliderValue) => {
    currentRef.current = next;
    if (!isControlled) setInnerValue(next);
    onChange?.(next);
  };

  const commitAt = (index: number, next: number) => {
    if (!range) {
      applyValue(next);
      return;
    }

    const [start, end] = readValues();
    applyValue(
      index === 0
        ? [Math.min(next, end), end]
        : [start, Math.max(next, start)]
    );
  };

  const getPointerRatio = (
    clientX: number,
    clientY: number,
    rect: TrackRect
  ) => {
    const ratio = vertical
      ? 1 - (clientY - rect.top) / (rect.height || 1)
      : (clientX - rect.left) / (rect.width || 1);

    return Math.min(1, Math.max(0, ratio));
  };

  const valueFromRatio = (ratio: number, offset: number) =>
    snapValue(min + clamp(ratio + offset, 0, 1) * (max - min));

  const beginDrag = (
    index: number,
    event: React.PointerEvent<HTMLDivElement>,
    element: HTMLDivElement,
    offset: number,
    rect: TrackRect
  ) => {
    dragRef.current = { index, pointerId: event.pointerId, offset, rect };
    setActiveIndex(index);

    try {
      element.setPointerCapture(event.pointerId);
    } catch {
      // 指针已释放时部分浏览器会抛错，不影响本次拖动
    }
  };

  const handleTrackPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    event.preventDefault();

    const track = trackRef.current;
    if (!track) return;

    const rect = getTrackRect(track);
    const ratio = getPointerRatio(event.clientX, event.clientY, rect);
    const next = valueFromRatio(ratio, 0);
    const [start, end] = readValues();
    const index =
      range && Math.abs(next - end) < Math.abs(next - start) ? 1 : 0;

    commitAt(index, next);
    beginDrag(index, event, event.currentTarget, 0, rect);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const ratio = getPointerRatio(event.clientX, event.clientY, drag.rect);
    commitAt(drag.index, valueFromRatio(ratio, drag.offset));
  };

  const finishDrag = () => {
    dragRef.current = null;
    setActiveIndex(null);

    const [start, end] = readValues();
    onAfterChange?.(range ? [start, end] : start);
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    finishDrag();
  };

  const handleHandlePointerDown =
    (index: number) => (event: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return;
      event.preventDefault();
      event.stopPropagation();

      const track = trackRef.current;
      if (!track) return;

      const rect = getTrackRect(track);
      const [start, end] = readValues();
      const current = range && index === 1 ? end : start;
      const offset =
        toRatio(current) - getPointerRatio(event.clientX, event.clientY, rect);

      beginDrag(index, event, event.currentTarget, offset, rect);
    };

  const commitKeyboardValue = (index: number, delta: number, absolute?: number) => {
    const [start, end] = readValues();
    const current = range ? (index === 0 ? start : end) : start;
    const next = snapValue(absolute !== undefined ? absolute : current + delta);

    commitAt(index, next);
    const [nextStart, nextEnd] = readValues();
    onAfterChange?.(range ? [nextStart, nextEnd] : nextStart);
  };

  const handleKeyDown =
    (index: number) => (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled || !keyboard) return;

      const unit = step > 0 ? step : Math.max((max - min) / 100, 0);
      const shiftUnit = unit * 10;
      const arrowUnit = event.shiftKey ? shiftUnit : unit;

      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
          event.preventDefault();
          commitKeyboardValue(index, -arrowUnit);
          break;
        case 'ArrowRight':
        case 'ArrowUp':
          event.preventDefault();
          commitKeyboardValue(index, arrowUnit);
          break;
        case 'Home':
          event.preventDefault();
          commitKeyboardValue(index, 0, min);
          break;
        case 'End':
          event.preventDefault();
          commitKeyboardValue(index, 0, max);
          break;
        case 'PageUp':
          event.preventDefault();
          commitKeyboardValue(index, shiftUnit);
          break;
        case 'PageDown':
          event.preventDefault();
          commitKeyboardValue(index, -shiftUnit);
          break;
        default:
          break;
      }
    };

  const isTooltipVisible = (index: number) => {
    if (!tooltip) return false;
    if (typeof tooltip === 'object' && tooltip.visible === false) return false;
    return activeIndex === index || focusIndex === index;
  };

  const formatValue = (target: number) =>
    typeof tooltip === 'object' && tooltip.formatter
      ? tooltip.formatter(target)
      : target;

  const renderMarks = () => {
    if (!marks || marks.length === 0) return null;

    return (
      <div className="zdy-mobile-slider-marks">
        {marks.map(mark => (
          <div
            key={mark.value}
            className="zdy-mobile-slider-mark"
            style={{
              ...(vertical
                ? { bottom: `${toPercent(mark.value)}%` }
                : { left: `${toPercent(mark.value)}%` }),
              ...mark.style
            }}
          >
            <span className="zdy-mobile-slider-mark-dot" />
            {mark.label !== undefined && (
              <span
                className="zdy-mobile-slider-mark-label"
                style={mark.labelStyle}
              >
                {mark.label}
              </span>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderHandle = (index: number, target: number) => {
    const percent = toPercent(target);
    const baseLabel = ariaLabel || (vertical ? '垂直滑块' : '滑块');
    const handleLabel = range
      ? `${baseLabel}${index === 0 ? '起始值' : '结束值'}`
      : baseLabel;

    return (
      <div
        key={index}
        className={classNames('zdy-mobile-slider-handle', {
          'zdy-mobile-slider-handle--active': activeIndex === index
        })}
        style={vertical ? { bottom: `${percent}%` } : { left: `${percent}%` }}
        role="slider"
        aria-label={handleLabel}
        aria-orientation={vertical ? 'vertical' : 'horizontal'}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={clamp(target, min, max)}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
        onPointerDown={handleHandlePointerDown(index)}
        onKeyDown={handleKeyDown(index)}
        onFocus={() => setFocusIndex(index)}
        onBlur={() => setFocusIndex(null)}
      >
        {isTooltipVisible(index) && (
          <div className="zdy-mobile-slider-tooltip">{formatValue(target)}</div>
        )}
      </div>
    );
  };

  const [startValue, endValue] = Array.isArray(currentValue)
    ? currentValue
    : [currentValue, currentValue];
  const startPercent = toPercent(startValue);
  const endPercent = toPercent(endValue);
  const singlePercent = toPercent(startValue);

  const fillStyle: React.CSSProperties = range
    ? vertical
      ? { bottom: `${startPercent}%`, height: `${endPercent - startPercent}%` }
      : { left: `${startPercent}%`, width: `${endPercent - startPercent}%` }
    : vertical
      ? { height: `${singlePercent}%` }
      : { width: `${singlePercent}%` };

  return (
    <div
      className={classNames(
        'zdy-mobile-slider',
        `zdy-mobile-slider--${size}`,
        {
          'zdy-mobile-slider--vertical': vertical,
          'zdy-mobile-slider--disabled': disabled,
          'zdy-mobile-slider--range': range
        },
        className
      )}
      style={style}
    >
      <div
        ref={trackRef}
        className="zdy-mobile-slider-track"
        onPointerDown={handleTrackPointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onLostPointerCapture={handlePointerEnd}
      >
        <div className="zdy-mobile-slider-rail" />
        <div className="zdy-mobile-slider-fill" style={fillStyle} />
        {range
          ? [
              renderHandle(0, startValue),
              renderHandle(1, endValue)
            ]
          : renderHandle(0, startValue)}
      </div>
      {renderMarks()}
    </div>
  );
};

export default MSlider;
