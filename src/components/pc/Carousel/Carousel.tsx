import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import type { BaseCarouselProps } from '../../../types';

import './Carousel.less';

const Carousel: React.FC<BaseCarouselProps> = ({
  autoplay = true,
  interval = 3000,
  effect = 'slide',
  dots = true,
  arrows = true,
  loop = true,
  pauseOnHover = true,
  afterChange,
  beforeChange,
  defaultActiveIndex = 0,
  children,
  className,
  style,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isHoveringRef = useRef(false);
  const isTransitioningRef = useRef(false);

  const items = useMemo(() => React.Children.toArray(children), [children]);
  const count = items.length;

  const getInitialIndex = useCallback(() => {
    if (effect === 'slide' && loop && count > 1) {
      return defaultActiveIndex + 1;
    }
    return defaultActiveIndex;
  }, [effect, loop, count, defaultActiveIndex]);

  const [activeIndex, setActiveIndex] = useState(getInitialIndex);
  const [isPaused, setIsPaused] = useState(false);
  const [disableTransition, setDisableTransition] = useState(false);

  const realIndex = effect === 'slide' && loop && count > 1 ? activeIndex - 1 : activeIndex;

  const getSlides = () => {
    if (effect === 'slide' && loop && count > 1) {
      const firstClone = items[0];
      const lastClone = items[count - 1];
      return [
        <div key="clone-last" className="carousel-slide">
          {lastClone}
        </div>,
        ...items.map((item, index) => (
          <div key={index} className="carousel-slide">
            {item}
          </div>
        )),
        <div key="clone-first" className="carousel-slide">
          {firstClone}
        </div>,
      ];
    }
    return items.map((item, index) => (
      <div key={index} className="carousel-slide">
        {item}
      </div>
    ));
  };

  const slides = getSlides();

  const goTo = useCallback(
    (index: number) => {
      if (count <= 1 || isTransitioningRef.current) return;

      if (effect === 'slide' && loop) {
        const target = index;
        beforeChange?.(realIndex, ((target - 1) % count + count) % count);
        setDisableTransition(false);
        isTransitioningRef.current = true;
        setActiveIndex(target);
      } else {
        const target = ((index % count) + count) % count;
        if (target === realIndex) return;
        beforeChange?.(realIndex, target);
        isTransitioningRef.current = true;
        setActiveIndex(target);
      }
    },
    [effect, loop, count, realIndex, beforeChange]
  );

  const next = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const prev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  useEffect(() => {
    if (effect !== 'slide' || !loop || count <= 1) return;

    const track = trackRef.current;
    if (!track) return;

    const handleTransitionEnd = () => {
      isTransitioningRef.current = false;

      if (activeIndex === 0) {
        setDisableTransition(true);
        setActiveIndex(count);
        afterChange?.(count - 1);
      } else if (activeIndex === count + 1) {
        setDisableTransition(true);
        setActiveIndex(1);
        afterChange?.(0);
      } else {
        afterChange?.(activeIndex - 1);
      }
    };

    track.addEventListener('transitionend', handleTransitionEnd);
    return () => track.removeEventListener('transitionend', handleTransitionEnd);
  }, [effect, loop, count, activeIndex, afterChange]);

  useEffect(() => {
    if (disableTransition) {
      const timer = requestAnimationFrame(() => {
        setDisableTransition(false);
      });
      return () => cancelAnimationFrame(timer);
    }
  }, [disableTransition]);

  useEffect(() => {
    if (effect === 'slide') return;
    isTransitioningRef.current = false;
    afterChange?.(realIndex);
  }, [activeIndex, effect, realIndex, afterChange]);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    if (autoplay && count > 1) {
      timerRef.current = setInterval(() => {
        if (!isHoveringRef.current && !isPaused) {
          next();
        }
      }, interval);
    }
  }, [autoplay, interval, count, next, isPaused]);

  const stopAutoplay = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
    if (pauseOnHover) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    if (pauseOnHover) setIsPaused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prev();
    } else if (e.key === 'ArrowRight') {
      next();
    }
  };

  const getTrackStyle = (): React.CSSProperties => {
    if (effect === 'slide') {
      const offset = -activeIndex * 100;
      return {
        transform: `translateX(${offset}%)`,
        transition: disableTransition ? 'none' : 'transform 0.5s ease',
      };
    }
    return {};
  };

  const getSlideWrapperStyle = (index: number): React.CSSProperties => {
    if (effect === 'slide') {
      return {
        flex: '0 0 100%',
        width: '100%',
      };
    }

    if (effect === 'fade') {
      const isActive = index === realIndex;
      return {
        opacity: isActive ? 1 : 0,
        zIndex: isActive ? 2 : 1,
        transition: 'opacity 0.5s ease',
        pointerEvents: isActive ? 'auto' : 'none',
      };
    }

    if (effect === 'stack') {
      let offset = index - realIndex;
      // 环形最短路径，避免循环时回退
      const halfCount = count / 2;
      if (offset > halfCount) offset -= count;
      if (offset < -halfCount) offset += count;

      const absOffset = Math.abs(offset);
      const isActive = offset === 0;

      const z = isActive ? 100 : 100 - absOffset * 10;
      const scale = isActive ? 1 : Math.max(0.82, 1 - absOffset * 0.12);
      const translateX = offset * 80;
      const translateY = absOffset * 6;
      const translateZ = isActive ? 0 : -absOffset * 120;
      const opacity = absOffset > 1 ? 0 : Math.max(0.4, 1 - absOffset * 0.3);

      return {
        width: '85%',
        justifySelf: 'center',
        alignSelf: 'center',
        transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) scale(${scale})`,
        transformStyle: 'preserve-3d',
        zIndex: z,
        opacity,
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: isActive ? 'auto' : 'none',
      };
    }

    return {};
  };

  const handleDotClick = (index: number) => {
    if (effect === 'slide' && loop && count > 1) {
      goTo(index + 1);
    } else {
      goTo(index);
    }
  };

  return (
    <div
      className={classNames(
        'carousel',
        `carousel--${effect}`,
        { 'carousel--no-dots': !dots },
        { 'carousel--no-arrows': !arrows },
        className
      )}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="轮播"
    >
      <div
        ref={trackRef}
        className={classNames('carousel-track', {
          'carousel-track--slide': effect === 'slide',
          'carousel-track--fade': effect === 'fade',
          'carousel-track--stack': effect === 'stack',
          'carousel-track--no-transition': disableTransition,
        })}
        style={getTrackStyle()}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={classNames('carousel-slide-wrapper', {
              'carousel-slide--active':
                index === (effect === 'slide' && loop ? activeIndex : realIndex),
            })}
            style={getSlideWrapperStyle(index)}
          >
            {slide}
          </div>
        ))}
      </div>

      {arrows && count > 1 && (
        <>
          <button
            className="carousel-arrow carousel-arrow--prev"
            onClick={prev}
            aria-label="上一张"
            type="button"
          >
            <span className="carousel-arrow-icon">‹</span>
          </button>
          <button
            className="carousel-arrow carousel-arrow--next"
            onClick={next}
            aria-label="下一张"
            type="button"
          >
            <span className="carousel-arrow-icon">›</span>
          </button>
        </>
      )}

      {dots && count > 1 && (
        <div className="carousel-dots">
          {items.map((_, index) => (
            <button
              key={index}
              className={classNames('carousel-dot', {
                'carousel-dot--active': index === realIndex,
              })}
              onClick={() => handleDotClick(index)}
              aria-label={`跳转到第 ${index + 1} 张`}
              type="button"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;