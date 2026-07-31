import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import type { BaseMasonryProps } from '../../../types';

import './Masonry.less';

interface LayoutPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

const DEFAULT_BREAKPOINTS: { [key: number]: number } = {
  1200: 4,
  992: 3,
  768: 2,
  0: 1,
};

const Masonry: React.FC<BaseMasonryProps> = ({
  columns,
  gap = 16,
  breakpoints,
  data,
  renderItem,
  keyField = 'id',
  children,
  className,
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string | number, HTMLDivElement>>(new Map());
  const [positions, setPositions] = useState<Map<string | number, LayoutPosition>>(new Map());
  const [containerHeight, setContainerHeight] = useState(0);
  const [currentColumns, setCurrentColumns] = useState(
    columns || DEFAULT_BREAKPOINTS[1200]
  );

  const effectiveBreakpoints = breakpoints || DEFAULT_BREAKPOINTS;

  const getColumnCount = useCallback(
    (containerWidth: number): number => {
      if (columns) return columns;
      const sorted = Object.entries(effectiveBreakpoints)
        .map(([bp, cols]) => ({ bp: Number(bp), cols }))
        .sort((a, b) => b.bp - a.bp);
      for (const { bp, cols } of sorted) {
        if (containerWidth >= bp) return cols;
      }
      return sorted[sorted.length - 1]?.cols || 1;
    },
    [columns, effectiveBreakpoints]
  );

  const layout = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.offsetWidth;
    const colCount = getColumnCount(containerWidth);
    setCurrentColumns(colCount);

    const items = data
      ? data.map((item, index) => ({
          key: item[keyField] ?? index,
          content: renderItem ? renderItem(item, index) : null,
          data: item,
        }))
      : React.Children.toArray(children).map((child, index) => ({
          key: (child as any).key ?? index,
          content: child,
          data: null,
        }));

    if (items.length === 0) {
      setPositions(new Map());
      setContainerHeight(0);
      return;
    }

    const columnWidth = (containerWidth - gap * (colCount - 1)) / colCount;
    const columnHeights = new Array(colCount).fill(0);
    const newPositions = new Map<string | number, LayoutPosition>();

    items.forEach(({ key }, index) => {
      const itemEl = itemRefs.current.get(key);
      if (!itemEl) return;

      const itemHeight = itemEl.offsetHeight;
      const shortestCol = columnHeights.indexOf(
        Math.min(...columnHeights)
      );

      const top = columnHeights[shortestCol];
      const left = shortestCol * (columnWidth + gap);

      newPositions.set(key, {
        top,
        left,
        width: columnWidth,
        height: itemHeight,
      });

      columnHeights[shortestCol] = top + itemHeight + gap;
    });

    setPositions(newPositions);
    setContainerHeight(Math.max(...columnHeights) - gap);
  }, [data, renderItem, keyField, children, gap, getColumnCount]);

  useEffect(() => {
    const timer = setTimeout(() => {
      layout();
    }, 0);
    return () => clearTimeout(timer);
  }, [layout]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      layout();
    });
    observer.observe(container);

    items.forEach(({ key }) => {
      const itemEl = itemRefs.current.get(key);
      if (itemEl) observer.observe(itemEl);
    });

    return () => observer.disconnect();
  }, [layout, data, children, keyField, renderItem]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => layout(), 200);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [layout]);

  const items = useMemo(() => {
    if (data && renderItem) {
      return data.map((item, index) => ({
        key: item[keyField] ?? index,
        content: renderItem(item, index),
      }));
    }
    return React.Children.toArray(children).map((child, index) => ({
      key: (child as any).key ?? index,
      content: child,
    }));
  }, [data, renderItem, keyField, children]);

  const setItemRef = (key: string | number) => (el: HTMLDivElement | null) => {
    if (el) {
      itemRefs.current.set(key, el);
    } else {
      itemRefs.current.delete(key);
    }
  };

  return (
    <div
      ref={containerRef}
      className={classNames('masonry', className)}
      style={{ height: containerHeight || 'auto', ...style }}
    >
      {items.map(({ key, content }) => {
        const pos = positions.get(key);
        const itemStyle: React.CSSProperties = pos
          ? {
              position: 'absolute',
              top: pos.top,
              left: pos.left,
              width: pos.width,
              transition: 'top 0.3s ease, left 0.3s ease, width 0.3s ease',
            }
          : {
              visibility: 'hidden',
              position: 'absolute',
            };

        return (
          <div
            key={key}
            ref={setItemRef(key)}
            className="masonry-item"
            style={itemStyle}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
};

export default Masonry;