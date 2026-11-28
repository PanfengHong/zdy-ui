import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import type {
  CSSProperties,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode
} from 'react';

import './MSwipeAction.less';

// 滑动操作项
export interface MSwipeActionItem {
  key?: string;
  text: ReactNode;
  danger?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface MSwipeActionProps {
  // 左侧滑动后展示的操作项
  actions?: MSwipeActionItem[];
  children?: ReactNode;
  // 禁用滑动
  disabled?: boolean;
  // 触发展开的位移比例，0 ~ 1
  threshold?: number;
  // 点击操作项后是否自动收起
  closeOnAction?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  className?: string;
  style?: CSSProperties;
}

const MSwipeAction = ({
  actions = [],
  children,
  disabled = false,
  threshold = 0.4,
  closeOnAction = true,
  onOpen,
  onClose,
  className = '',
  style
}: MSwipeActionProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  // 操作区宽度（用于计算位移与吸附）
  const [actionsWidth, setActionsWidth] = useState(0);
  // 内容区当前位移，范围 [-actionsWidth, 0]
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [opened, setOpened] = useState(false);

  const offsetRef = useRef(0);
  const openedRef = useRef(false);
  const dragRef = useRef({
    startX: 0,
    startY: 0,
    base: 0,
    axis: '' as '' | 'x' | 'y',
    moved: false
  });

  const syncOffset = (value: number) => {
    offsetRef.current = value;
    setOffset(value);
  };

  const syncOpened = (value: boolean) => {
    openedRef.current = value;
    setOpened(value);
  };

  // 测量操作区宽度
  useLayoutEffect(() => {
    const el = actionsRef.current;
    if (!el) return;

    const measure = () => setActionsWidth(el.offsetWidth);
    measure();

    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [actions.length]);

  // 容器宽度变化时保持展开状态下的位移正确
  useEffect(() => {
    if (openedRef.current) syncOffset(-actionsWidth);
  }, [actionsWidth]);

  // 禁用时自动收起
  useEffect(() => {
    if (disabled && openedRef.current) {
      syncOpened(false);
      syncOffset(0);
      onClose?.();
    }
  }, [disabled]);

  // 拖动过程中监听全局事件
  useEffect(() => {
    if (!dragging) return;

    const handleMove = (event: PointerEvent) => {
      const state = dragRef.current;
      const dx = event.clientX - state.startX;
      const dy = event.clientY - state.startY;

      // 首次移动时判定方向：水平滑动才接管，垂直滑动交还给页面滚动
      if (!state.axis) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        state.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
        if (state.axis === 'y') return;
      }
      if (state.axis !== 'x') return;

      let next = state.base + dx;
      if (next > 0) next = 0;
      if (next < -actionsWidth) next = -actionsWidth;
      if (Math.abs(dx) > 6) state.moved = true;
      syncOffset(next);
    };

    const handleUp = () => {
      const state = dragRef.current;
      setDragging(false);
      if (state.axis !== 'x') return;

      const shouldOpen = offsetRef.current <= -actionsWidth * threshold;
      if (shouldOpen !== openedRef.current) {
        syncOpened(shouldOpen);
        if (shouldOpen) {
          onOpen?.();
        } else {
          onClose?.();
        }
      }
      syncOffset(shouldOpen ? -actionsWidth : 0);
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
    window.addEventListener('pointercancel', handleUp);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
      window.removeEventListener('pointercancel', handleUp);
    };
  }, [dragging, actionsWidth, threshold]);

  // 展开状态下点击空白处收起
  useEffect(() => {
    if (!opened) return;

    const handleDocPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        syncOpened(false);
        syncOffset(0);
        onClose?.();
      }
    };

    document.addEventListener('pointerdown', handleDocPointerDown);
    return () => document.removeEventListener('pointerdown', handleDocPointerDown);
  }, [opened]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (disabled || actionsWidth === 0) return;
    dragRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      base: openedRef.current ? -actionsWidth : 0,
      axis: '',
      moved: false
    };
    setDragging(true);
  };

  // 拖动结束后拦截一次点击，避免误触内容；展开时点击内容先收起
  const handleContentClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (dragRef.current.moved) {
      dragRef.current.moved = false;
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (openedRef.current) {
      syncOpened(false);
      syncOffset(0);
      onClose?.();
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const handleActionClick = (action: MSwipeActionItem) => {
    if (action.disabled) return;
    action.onClick?.();
    if (closeOnAction) {
      syncOpened(false);
      syncOffset(0);
      onClose?.();
    }
  };

  return (
    <div
      ref={rootRef}
      className={classNames('zdy-mobile-swipe-action', {
        'zdy-mobile-swipe-action--disabled': disabled,
        'zdy-mobile-swipe-action--opened': opened
      }, className)}
      style={style}
    >
      <div ref={actionsRef} className="zdy-mobile-swipe-action-actions">
        {actions.map((action, index) => (
          <button
            key={action.key ?? index}
            type="button"
            className={classNames('zdy-mobile-swipe-action-item', {
              'zdy-mobile-swipe-action-item--danger': action.danger,
              'zdy-mobile-swipe-action-item--disabled': action.disabled
            })}
            disabled={action.disabled}
            onClick={() => handleActionClick(action)}
          >
            {action.text}
          </button>
        ))}
      </div>

      <div
        className={classNames('zdy-mobile-swipe-action-content', {
          'zdy-mobile-swipe-action-content--dragging': dragging
        })}
        style={{ transform: `translateX(${offset}px)` }}
        onPointerDown={handlePointerDown}
        onClickCapture={handleContentClickCapture}
      >
        {children}
      </div>
    </div>
  );
};

export default MSwipeAction;
