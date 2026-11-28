import { Children, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
  CSSProperties,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
  TransitionEvent as ReactTransitionEvent
} from 'react';
import classNames from 'classnames';
import type { MCarouselProps } from './types';

import './MCarousel.less';

const toCssSize = (value: number | string): string =>
  typeof value === 'number' ? `${value}px` : value;

const MCarousel = ({
  autoplay = true,
  interval = 3000,
  effect = 'slide',
  dots = true,
  loop = true,
  pauseOnTouch = true,
  height = 180,
  defaultActiveIndex = 0,
  beforeChange,
  afterChange,
  children,
  className = '',
  style
}: MCarouselProps) => {
  const items = useMemo(() => Children.toArray(children), [children]);
  const count = items.length;
  const isLoop = loop && count > 1 && effect === 'slide';

  const initialIndex = Math.min(Math.max(defaultActiveIndex, 0), Math.max(count - 1, 0));
  const [activeIndex, setActiveIndex] = useState(isLoop ? initialIndex + 1 : initialIndex);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [disableTransition, setDisableTransition] = useState(false);
  const [paused, setPaused] = useState(false);

  const realIndex = isLoop ? activeIndex - 1 : activeIndex;
  // 循环衔接时 realIndex 可能落在克隆页，取模映射回真实下标用于指示点
  const displayIndex = count > 0 ? ((realIndex % count) + count) % count : 0;

  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ startX: 0, moved: false });
  const widthRef = useRef(0);
  const nextRef = useRef<() => void>(() => {});
  const reportedRef = useRef(initialIndex);

  const goTo = useCallback(
    (target: number) => {
      if (count <= 1) return;

      const normalized = ((target % count) + count) % count;
      if (normalized === realIndex) return;

      beforeChange?.(realIndex, normalized);
      setDragOffset(0);
      setActiveIndex(isLoop ? normalized + 1 : normalized);
    },
    [beforeChange, count, isLoop, realIndex]
  );

  // 前进一步：滑动 + 循环时移动到克隆页，过渡结束后再跳回真实页
  const step = useCallback(
    (direction: 1 | -1) => {
      if (count <= 1) return;

      const target = realIndex + direction;
      if (!loop && (target < 0 || target > count - 1)) return;

      if (!isLoop) {
        goTo(target);
        return;
      }

      const targetReal = (target + count) % count;
      beforeChange?.(realIndex, targetReal);
      setDragOffset(0);
      setActiveIndex(activeIndex + direction);
    },
    [activeIndex, beforeChange, count, goTo, isLoop, loop, realIndex]
  );

  const next = useCallback(() => step(1), [step]);
  const prev = useCallback(() => step(-1), [step]);

  useEffect(() => {
    nextRef.current = next;
  });

  // 自动播放；触摸时暂停（pauseOnTouch）
  useEffect(() => {
    if (!autoplay || count <= 1 || paused) return;

    const timer = window.setInterval(() => nextRef.current(), interval);
    return () => window.clearInterval(timer);
  }, [autoplay, count, interval, paused]);

  // 无动画跳转：克隆页 ↔ 真实页之间无缝衔接
  const jumpTo = useCallback((index: number) => {
    setDisableTransition(true);
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    if (!disableTransition) return;
    const frame = window.requestAnimationFrame(() => setDisableTransition(false));
    return () => window.cancelAnimationFrame(frame);
  }, [disableTransition]);

  const handleTransitionEnd = (event: ReactTransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || effect !== 'slide') return;

    let settled = realIndex;
    if (isLoop && activeIndex === 0) settled = count - 1;
    if (isLoop && activeIndex === count + 1) settled = 0;

    if (isLoop && (activeIndex === 0 || activeIndex === count + 1)) {
      jumpTo(activeIndex === 0 ? count : 1);
    }

    if (reportedRef.current !== settled) {
      reportedRef.current = settled;
      afterChange?.(settled);
    }
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (count <= 1) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    dragRef.current = { startX: event.clientX, moved: false };
    widthRef.current = containerRef.current?.clientWidth ?? 0;
    setDragging(true);
    setDragOffset(0);
    if (pauseOnTouch) setPaused(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging) return;

    let offset = event.clientX - dragRef.current.startX;
    if (Math.abs(offset) > 4) dragRef.current.moved = true;

    // 非循环时首尾拖动加阻尼，避免拖出空白
    if (!isLoop) {
      if ((realIndex === 0 && offset > 0) || (realIndex === count - 1 && offset < 0)) {
        offset *= 0.35;
      }
    }

    setDragOffset(offset);
  };

  const finishDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging) return;

    setDragging(false);
    if (pauseOnTouch) setPaused(false);

    const width = widthRef.current || containerRef.current?.clientWidth || 0;
    const threshold = Math.max(40, width * 0.15);
    const offset = event.clientX - dragRef.current.startX;

    if (offset <= -threshold) step(1);
    else if (offset >= threshold) step(-1);

    setDragOffset(0);
  };

  const cancelDrag = () => {
    if (!dragging) return;
    setDragging(false);
    setDragOffset(0);
    if (pauseOnTouch) setPaused(false);
  };

  // 拖动结束后拦截一次点击，避免误触幻灯片内的链接/按钮
  const handleClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!dragRef.current.moved) return;
    event.preventDefault();
    event.stopPropagation();
    dragRef.current.moved = false;
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      prev();
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      next();
    }
  };

  const slides = useMemo(() => {
    const renderSlide = (index: number, key: string, clone = false) => (
      <div
        key={key}
        className={classNames('zdy-mobile-carousel-slide', {
          'zdy-mobile-carousel-slide--clone': clone
        })}
        aria-hidden={clone || undefined}
      >
        {items[index]}
      </div>
    );

    if (isLoop) {
      return [
        renderSlide(count - 1, 'clone-last', true),
        ...items.map((_, index) => renderSlide(index, `slide-${index}`)),
        renderSlide(0, 'clone-first', true)
      ];
    }

    return items.map((_, index) => renderSlide(index, `slide-${index}`));
  }, [count, isLoop, items]);

  const trackStyle: CSSProperties =
    effect === 'slide'
      ? {
          transform: `translateX(calc(${-activeIndex * 100}% + ${dragOffset}px))`,
          transition: dragging || disableTransition
            ? 'none'
            : 'transform 0.35s cubic-bezier(0.22, 0.61, 0.36, 1)'
        }
      : {};

  const rootStyle: CSSProperties = { height: toCssSize(height), ...style };

  return (
    <div
      ref={containerRef}
      className={classNames(
        'zdy-mobile-carousel',
        `zdy-mobile-carousel--${effect}`,
        {
          'zdy-mobile-carousel--dragging': dragging,
          'zdy-mobile-carousel--single': count <= 1
        },
        className
      )}
      style={rootStyle}
      role="region"
      aria-roledescription="carousel"
      aria-label="轮播"
      tabIndex={count > 1 ? 0 : -1}
      onPointerDown={effect === 'slide' ? handlePointerDown : undefined}
      onPointerMove={effect === 'slide' ? handlePointerMove : undefined}
      onPointerUp={effect === 'slide' ? finishDrag : undefined}
      onPointerCancel={effect === 'slide' ? cancelDrag : undefined}
      onClickCapture={effect === 'slide' ? handleClickCapture : undefined}
      onKeyDown={handleKeyDown}
    >
      <div
        className={classNames('zdy-mobile-carousel-track', `zdy-mobile-carousel-track--${effect}`)}
        style={trackStyle}
        onTransitionEnd={handleTransitionEnd}
      >
        {effect === 'fade'
          ? items.map((item, index) => (
              <div
                key={`fade-${index}`}
                className={classNames('zdy-mobile-carousel-slide', {
                  'zdy-mobile-carousel-slide--active': index === displayIndex
                })}
              >
                {item}
              </div>
            ))
          : slides}
      </div>

      {dots && count > 1 && (
        <div className="zdy-mobile-carousel-dots" role="tablist" aria-label="轮播索引">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === displayIndex}
              aria-label={`第 ${index + 1} 张`}
              className={classNames('zdy-mobile-carousel-dot', {
                'zdy-mobile-carousel-dot--active': index === displayIndex
              })}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MCarousel;
