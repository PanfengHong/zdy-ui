import React, { useState, useRef, useCallback } from 'react';
import classNames from 'classnames';
import type { BaseSliderProps, SliderMark } from '../../../types';

import './Slider.less';

const Slider: React.FC<BaseSliderProps> = ({
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
  onChange,
  onAfterChange,
  size = 'default',
  reverse = false,
  keyboard = true,
  className,
  style
}) => {
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = useState<number | [number, number]>(() => {
    const init = value !== undefined ? value : defaultValue !== undefined ? defaultValue : (range ? [min, max] : min);
    return init as number | [number, number];
  });

  const currentValue = isControlled ? (value as number | [number, number]) : innerValue;

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const getValueArray = useCallback((): [number, number] => {
    if (Array.isArray(currentValue)) {
      return currentValue as [number, number];
    }
    return [currentValue as number, currentValue as number];
  }, [currentValue]);

  const getPercent = useCallback((v: number) => {
    const clamped = Math.min(max, Math.max(min, v));
    return ((clamped - min) / (max - min)) * 100;
  }, [min, max]);

  const getValueFromPosition = useCallback((clientPos: number): number => {
    const track = trackRef.current;
    if (!track) return min;
    const rect = track.getBoundingClientRect();
    const rawPos = vertical
      ? (clientPos - rect.top) / rect.height
      : (clientPos - rect.left) / rect.width;
    const clampedPos = Math.min(1, Math.max(0, rawPos));
    const actualPos = reverse ? 1 - clampedPos : clampedPos;
    let newVal = min + actualPos * (max - min);
    if (step > 0) {
      newVal = Math.round(newVal / step) * step;
    }
    return Math.min(max, Math.max(min, newVal));
  }, [min, max, step, vertical, reverse]);

  const commitValue = useCallback((newVal: number | [number, number]) => {
    if (!isControlled) {
      setInnerValue(newVal);
    }
    onChange?.(newVal);
  }, [isControlled, onChange]);

  const handleTrackClick = useCallback((e: React.MouseEvent) => {
    if (disabled) return;
    const newVal = getValueFromPosition(vertical ? e.clientY : e.clientX);

    if (range) {
      const [start, end] = getValueArray();
      const deltaStart = Math.abs(newVal - start);
      const deltaEnd = Math.abs(newVal - end);
      if (deltaStart <= deltaEnd) {
        const updated: [number, number] = [Math.min(newVal, end), end];
        commitValue(updated);
      } else {
        const updated: [number, number] = [start, Math.max(newVal, start)];
        commitValue(updated);
      }
    } else {
      commitValue(newVal);
      onAfterChange?.(newVal);
    }
  }, [disabled, getValueFromPosition, range, getValueArray, commitValue, onAfterChange, vertical]);

  const handleStart = useCallback((index: number) => (e: React.MouseEvent | React.TouchEvent) => {
    if (disabled) return;
    e.stopPropagation();
    setDraggingIndex(index);
    setHoverIndex(index);

    const handleMove = (ev: MouseEvent | TouchEvent) => {
      const clientPos = vertical
        ? 'touches' in ev ? ev.touches[0].clientY : (ev as MouseEvent).clientY
        : 'touches' in ev ? ev.touches[0].clientX : (ev as MouseEvent).clientX;
      const newVal = getValueFromPosition(clientPos);

      if (range) {
        const arr = getValueArray();
        const updated = [...arr] as [number, number];
        if (index === 0) {
          updated[0] = Math.min(newVal, updated[1]);
        } else {
          updated[1] = Math.max(newVal, updated[0]);
        }
        commitValue(updated);
      } else {
        commitValue(newVal);
      }
    };

    const handleEnd = () => {
      setDraggingIndex(null);
      setHoverIndex(null);
      if (range) {
        onAfterChange?.(getValueArray());
      } else {
        onAfterChange?.(Array.isArray(currentValue) ? currentValue[0] : (currentValue as number));
      }
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('touchend', handleEnd);
  }, [disabled, vertical, getValueFromPosition, range, getValueArray, commitValue, onAfterChange, currentValue]);

  const handleKeyDown = useCallback((index: number) => (e: React.KeyboardEvent) => {
    if (disabled || !keyboard) return;
    const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'];
    if (!keys.includes(e.key)) return;
    e.preventDefault();

    let newVal: number | [number, number];
    const stepSize = e.shiftKey ? step * 10 : step;

    if (range) {
      const arr = getValueArray();
      const updated = [...arr] as [number, number];
      const current = updated[index];

      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
          updated[index] = Math.max(min, current - stepSize);
          break;
        case 'ArrowRight':
        case 'ArrowUp':
          updated[index] = Math.min(max, current + stepSize);
          break;
        case 'Home':
          updated[index] = min;
          break;
        case 'End':
          updated[index] = max;
          break;
        case 'PageUp':
          updated[index] = Math.min(max, current + stepSize * 10);
          break;
        case 'PageDown':
          updated[index] = Math.max(min, current - stepSize * 10);
          break;
      }

      if (index === 0 && updated[0] > updated[1]) {
        updated[0] = updated[1];
      }
      if (index === 1 && updated[1] < updated[0]) {
        updated[1] = updated[0];
      }
      newVal = updated;
    } else {
      const current = currentValue as number;
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
          newVal = Math.max(min, current - stepSize);
          break;
        case 'ArrowRight':
        case 'ArrowUp':
          newVal = Math.min(max, current + stepSize);
          break;
        case 'Home':
          newVal = min;
          break;
        case 'End':
          newVal = max;
          break;
        case 'PageUp':
          newVal = Math.min(max, current + stepSize * 10);
          break;
        case 'PageDown':
          newVal = Math.max(min, current - stepSize * 10);
          break;
        default:
          return;
      }
    }

    commitValue(newVal);
    onAfterChange?.(newVal);
  }, [disabled, keyboard, range, getValueArray, currentValue, min, max, step, commitValue, onAfterChange]);

  const getTooltipText = useCallback((v: number): React.ReactNode => {
    if (typeof tooltip === 'object' && tooltip.formatter) {
      return tooltip.formatter(v);
    }
    return v;
  }, [tooltip]);

  const isTooltipVisible = (idx: number) => {
    if (!tooltip) return false;
    if (typeof tooltip === 'object' && tooltip.visible === false) return false;
    return hoverIndex === idx || draggingIndex === idx;
  };

  const renderMarks = () => {
    if (!marks || marks.length === 0) return null;
    return (
      <div className="zdy-slider-marks">
        {marks.map((mark: SliderMark) => {
          const percent = getPercent(mark.value);
          return (
            <div
              key={mark.value}
              className="zdy-slider-mark"
              style={{
                ...(vertical
                  ? { bottom: `${percent}%`, ...mark.style }
                  : { left: `${percent}%`, ...mark.style })
              }}
            >
              {mark.label && (
                <span
                  className="zdy-slider-mark-label"
                  style={mark.labelStyle}
                >
                  {mark.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const [startVal, endVal] = getValueArray();
  const startPercent = getPercent(startVal);
  const endPercent = getPercent(endVal);
  const isSingle = !range;
  const singlePercent = getPercent(currentValue as number);

  const containerClasses = classNames(
    'zdy-slider',
    {
      'zdy-slider--vertical': vertical,
      'zdy-slider--disabled': disabled,
      'zdy-slider--small': size === 'small',
      'zdy-slider--reverse': reverse
    },
    className
  );

  return (
    <div
      ref={containerRef}
      className={containerClasses}
      style={style}
      onMouseLeave={() => setHoverIndex(null)}
    >
      <div
        ref={trackRef}
        className="zdy-slider-track"
        onClick={handleTrackClick}
      >
        <div className="zdy-slider-trail" />
        <div
          className="zdy-slider-filled"
          style={
            isSingle
              ? (vertical
                  ? { height: `${singlePercent}%`, width: undefined }
                  : { width: `${singlePercent}%`, height: undefined })
              : (vertical
                  ? {
                      height: `${endPercent - startPercent}%`,
                      bottom: `${startPercent}%`,
                      width: undefined
                    }
                  : {
                      width: `${endPercent - startPercent}%`,
                      left: `${startPercent}%`,
                      height: undefined
                    })
          }
        />
        {!isSingle && (
          <>
            <div
              className="zdy-slider-handle"
              style={
                vertical
                  ? { bottom: `${startPercent}%`, left: undefined }
                  : { left: `${startPercent}%`, bottom: undefined }
              }
              onMouseDown={handleStart(0)}
              onTouchStart={handleStart(0)}
              onKeyDown={handleKeyDown(0)}
              role="slider"
              tabIndex={disabled ? -1 : 0}
              aria-valuenow={startVal}
              aria-valuemin={min}
              aria-valuemax={max}
            >
              {isTooltipVisible(0) && (
                <div className="zdy-slider-tooltip">{getTooltipText(startVal)}</div>
              )}
            </div>
            <div
              className="zdy-slider-handle"
              style={
                vertical
                  ? { bottom: `${endPercent}%`, left: undefined }
                  : { left: `${endPercent}%`, bottom: undefined }
              }
              onMouseDown={handleStart(1)}
              onTouchStart={handleStart(1)}
              onKeyDown={handleKeyDown(1)}
              role="slider"
              tabIndex={disabled ? -1 : 0}
              aria-valuenow={endVal}
              aria-valuemin={min}
              aria-valuemax={max}
            >
              {isTooltipVisible(1) && (
                <div className="zdy-slider-tooltip">{getTooltipText(endVal)}</div>
              )}
            </div>
          </>
        )}
        {isSingle && (
          <div
            className="zdy-slider-handle"
            style={
              vertical
                ? { bottom: `${singlePercent}%`, left: undefined }
                : { left: `${singlePercent}%`, bottom: undefined }
            }
            onMouseDown={handleStart(0)}
            onTouchStart={handleStart(0)}
            onKeyDown={handleKeyDown(0)}
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-valuenow={currentValue as number}
            aria-valuemin={min}
            aria-valuemax={max}
          >
            {isTooltipVisible(0) && (
              <div className="zdy-slider-tooltip">{getTooltipText(currentValue as number)}</div>
            )}
          </div>
        )}
      </div>
      {renderMarks()}
    </div>
  );
};

export default Slider;