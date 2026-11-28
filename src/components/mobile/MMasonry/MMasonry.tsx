import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import classNames from 'classnames';
import type { MMasonryProps } from './types';

import './MMasonry.less';

interface LayoutPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface MasonryItem {
  key: string | number;
  node: React.ReactNode;
}

interface MasonryLayout {
  positions: Map<string | number, LayoutPosition>;
  height: number;
  columnWidth: number;
}

const isSamePositions = (
  prev: Map<string | number, LayoutPosition>,
  next: Map<string | number, LayoutPosition>
) => {
  if (prev.size !== next.size) return false;

  for (const [key, position] of next) {
    const current = prev.get(key);
    if (
      !current ||
      current.top !== position.top ||
      current.left !== position.left ||
      current.width !== position.width ||
      current.height !== position.height
    ) {
      return false;
    }
  }

  return true;
};

function MMasonry<T extends Record<string, unknown> = Record<string, unknown>>({
  columns = 2,
  gap = 10,
  data,
  renderItem,
  keyField = 'id',
  children,
  className,
  style
}: MMasonryProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string | number, HTMLDivElement>>(new Map());
  const [layout, setLayout] = useState<MasonryLayout>({
    positions: new Map(),
    height: 0,
    columnWidth: 0
  });

  const columnCount = Math.max(1, Math.floor(columns));
  const spacing = Math.max(0, gap);

  const items = useMemo<MasonryItem[]>(() => {
    if (data && renderItem) {
      return data.map((item, index) => {
        const value = (item as Record<string, unknown>)[keyField];
        const key =
          typeof value === 'string' || typeof value === 'number'
            ? value
            : index;

        return { key, node: renderItem(item, index) };
      });
    }

    return React.Children.toArray(children).map((child, index) => ({
      key: React.isValidElement(child) && child.key != null ? String(child.key) : index,
      node: child
    }));
  }, [data, renderItem, keyField, children]);

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth;
    if (containerWidth <= 0) return;

    const count = Math.max(1, Math.floor(columns));
    const itemGap = Math.max(0, gap);
    const columnWidth = (containerWidth - itemGap * (count - 1)) / count;
    const columnHeights = new Array<number>(count).fill(0);
    const positions = new Map<string | number, LayoutPosition>();

    items.forEach(({ key }) => {
      const element = itemRefs.current.get(key);
      const height = element ? element.offsetHeight : 0;

      let target = 0;
      for (let index = 1; index < count; index += 1) {
        if (columnHeights[index] < columnHeights[target]) target = index;
      }

      positions.set(key, {
        top: columnHeights[target],
        left: target * (columnWidth + itemGap),
        width: columnWidth,
        height
      });

      columnHeights[target] += height + itemGap;
    });

    const height =
      items.length > 0 ? Math.max(...columnHeights) - itemGap : 0;

    setLayout(prev => {
      if (
        prev.height === height &&
        prev.columnWidth === columnWidth &&
        isSamePositions(prev.positions, positions)
      ) {
        return prev;
      }

      return { positions, height, columnWidth };
    });
  }, [items, columns, gap]);

  // 首屏在浏览器绘制前完成测量，避免可见的闪跳
  useLayoutEffect(() => {
    measure();
  }, [measure]);

  // 容器宽度变化、卡片内容（如图片加载完成）高度变化时重新排列
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      measure();
    });

    observer.observe(container);
    itemRefs.current.forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, [measure]);

  const setItemRef = (key: string | number) => (element: HTMLDivElement | null) => {
    if (element) {
      itemRefs.current.set(key, element);
    } else {
      itemRefs.current.delete(key);
    }
  };

  const itemWidth = `calc((100% - ${spacing * (columnCount - 1)}px) / ${columnCount})`;

  return (
    <div
      ref={containerRef}
      className={classNames('zdy-mobile-masonry', className)}
      style={{ ...style, height: layout.height || undefined }}
    >
      {items.map(({ key, node }) => {
        const position = layout.positions.get(key);
        const itemStyle: React.CSSProperties = { width: itemWidth };

        if (position) {
          itemStyle.top = position.top;
          itemStyle.left = position.left;
        }

        return (
          <div
            key={key}
            ref={setItemRef(key)}
            className={classNames('zdy-mobile-masonry-item', {
              'zdy-mobile-masonry-item--placed': Boolean(position)
            })}
            style={itemStyle}
          >
            {node}
          </div>
        );
      })}
    </div>
  );
}

export default MMasonry;
