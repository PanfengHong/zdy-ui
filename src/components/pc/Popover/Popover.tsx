import React, { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import type { PopoverProps, PopoverPlacement } from './types';
import Icon from '../Icon/Icon';

import './Popover.less';

interface Position {
  top: number;
  left: number;
}

interface PlacementInfo {
  placement: PopoverPlacement;
  position: Position;
}

// 触发器与气泡的间距
const GAP = 8;

// 计算气泡位置：基于触发器 rect 与气泡尺寸
const computePlacement = (
  triggerRect: DOMRect,
  popWidth: number,
  popHeight: number,
  placement: PopoverPlacement,
  container: HTMLElement
): PlacementInfo => {
  const containerRect = container.getBoundingClientRect();
  // 相对容器的坐标
  const tx = triggerRect.left - containerRect.left;
  const ty = triggerRect.top - containerRect.top;
  const tw = triggerRect.width;
  const th = triggerRect.height;

  // 容器滚动量
  const scrollX = container.scrollLeft;
  const scrollY = container.scrollTop;

  // 候选位置
  const candidates: Record<PopoverPlacement, Position> = {
    top: { top: ty - popHeight - GAP, left: tx + tw / 2 - popWidth / 2 },
    topLeft: { top: ty - popHeight - GAP, left: tx },
    topRight: { top: ty - popHeight - GAP, left: tx + tw - popWidth },
    bottom: { top: ty + th + GAP, left: tx + tw / 2 - popWidth / 2 },
    bottomLeft: { top: ty + th + GAP, left: tx },
    bottomRight: { top: ty + th + GAP, left: tx + tw - popWidth },
    left: { top: ty + th / 2 - popHeight / 2, left: tx - popWidth - GAP },
    leftTop: { top: ty, left: tx - popWidth - GAP },
    leftBottom: { top: ty + th - popHeight, left: tx - popWidth - GAP },
    right: { top: ty + th / 2 - popHeight / 2, left: tx + tw + GAP },
    rightTop: { top: ty, left: tx + tw + GAP },
    rightBottom: { top: ty + th - popHeight, left: tx + tw + GAP },
  };

  // 对应的回退方向（当超出视口时翻转）
  const flipMap: Record<PopoverPlacement, PopoverPlacement> = {
    top: 'bottom',
    topLeft: 'bottomLeft',
    topRight: 'bottomRight',
    bottom: 'top',
    bottomLeft: 'topLeft',
    bottomRight: 'topRight',
    left: 'right',
    leftTop: 'rightTop',
    leftBottom: 'rightBottom',
    right: 'left',
    rightTop: 'leftTop',
    rightBottom: 'leftBottom',
  };

  let finalPlacement = placement;
  let pos = candidates[placement];

  // 边界检测（基于 viewport）
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const absTop = triggerRect.top + (pos.top - ty); // 转回 viewport 坐标
  const absLeft = triggerRect.left + (pos.left - tx);

  const overflowTop = absTop < 8;
  const overflowBottom = absTop + popHeight > viewportHeight - 8;
  const overflowLeft = absLeft < 8;
  const overflowRight = absLeft + popWidth > viewportWidth - 8;

  if ((placement.startsWith('top') && overflowTop) || (placement.startsWith('bottom') && overflowBottom)) {
    finalPlacement = flipMap[placement];
    pos = candidates[finalPlacement];
  } else if ((placement.startsWith('left') && overflowLeft) || (placement.startsWith('right') && overflowRight)) {
    finalPlacement = flipMap[placement];
    pos = candidates[finalPlacement];
  }

  // 水平溢出修正
  const newAbsLeft = triggerRect.left + (pos.left - tx);
  if (newAbsLeft < 8) {
    pos.left = pos.left + (8 - newAbsLeft);
  } else if (newAbsLeft + popWidth > viewportWidth - 8) {
    pos.left = pos.left - (newAbsLeft + popWidth - (viewportWidth - 8));
  }

  return {
    placement: finalPlacement,
    position: { top: pos.top + scrollY, left: pos.left + scrollX },
  };
};

const Popover: React.FC<PopoverProps> = ({
  content,
  title,
  trigger = 'hover',
  placement = 'top',
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  disabled = false,
  arrow = true,
  showClose = false,
  width,
  mouseEnterDelay = 0.1,
  mouseLeaveDelay = 0.1,
  destroyOnHide = false,
  zIndex = 1050,
  getPopupContainer,
  onVisibleChange,
  className = '',
  style,
  children,
}) => {
  const isControlled = openProp !== undefined;
  const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);
  const open = isControlled ? openProp! : internalOpen;

  const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({});
  const [actualPlacement, setActualPlacement] = useState<PopoverPlacement>(placement);
  const [mounted, setMounted] = useState<boolean>(open);
  const [visible, setVisible] = useState<boolean>(open);

  const triggerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const enterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const containerRef = useRef<HTMLElement | null>(null);

  // 获取挂载容器
  const getContainer = useCallback((): HTMLElement => {
    if (containerRef.current) return containerRef.current;
    if (getPopupContainer && triggerRef.current) {
      containerRef.current = getPopupContainer(triggerRef.current);
    } else {
      containerRef.current = document.body;
    }
    return containerRef.current;
  }, [getPopupContainer]);

  const setOpenState = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
      onVisibleChange?.(next);
    },
    [isControlled, onOpenChange, onVisibleChange]
  );

  // 计算 & 更新位置
  const updatePosition = useCallback(() => {
    if (!open || !triggerRef.current || !popupRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popRect = popupRef.current.getBoundingClientRect();
    const container = getContainer();
    const { placement: finalPlacement, position } = computePlacement(
      triggerRect,
      popRect.width,
      popRect.height,
      placement,
      container
    );
    setActualPlacement(finalPlacement);
    setPopupStyle({
      position: 'absolute',
      top: position.top,
      left: position.left,
      zIndex,
    });
  }, [open, placement, getContainer, zIndex]);

  // 挂载/卸载与动画
  useLayoutEffect(() => {
    if (open) {
      setMounted(true);
      // 下一帧再触发动画
      requestAnimationFrame(() => {
        updatePosition();
        setVisible(true);
      });
    } else {
      setVisible(false);
      if (destroyOnHide) {
        const t = setTimeout(() => setMounted(false), 200);
        return () => clearTimeout(t);
      }
    }
  }, [open, updatePosition, destroyOnHide]);

  // 监听窗口变化
  useEffect(() => {
    if (!open) return;
    const handleResize = () => updatePosition();
    const handleScroll = () => updatePosition();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [open, updatePosition]);

  // 点击外部关闭
  useEffect(() => {
    if (!open || trigger !== 'click') return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current && !triggerRef.current.contains(target) &&
        popupRef.current && !popupRef.current.contains(target)
      ) {
        setOpenState(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, trigger, setOpenState]);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (enterTimerRef.current) clearTimeout(enterTimerRef.current);
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    };
  }, []);

  // 触发器事件
  const handleMouseEnter = useCallback(() => {
    if (disabled || trigger !== 'hover') return;
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    enterTimerRef.current = setTimeout(() => setOpenState(true), mouseEnterDelay * 1000);
  }, [disabled, trigger, mouseEnterDelay, setOpenState]);

  const handleMouseLeave = useCallback(() => {
    if (disabled || trigger !== 'hover') return;
    if (enterTimerRef.current) {
      clearTimeout(enterTimerRef.current);
      enterTimerRef.current = null;
    }
    leaveTimerRef.current = setTimeout(() => setOpenState(false), mouseLeaveDelay * 1000);
  }, [disabled, trigger, mouseLeaveDelay, setOpenState]);

  const handleClick = useCallback(() => {
    if (disabled || trigger !== 'click') return;
    setOpenState(!open);
  }, [disabled, trigger, open, setOpenState]);

  const handleFocus = useCallback(() => {
    if (disabled || trigger !== 'focus') return;
    setOpenState(true);
  }, [disabled, trigger, setOpenState]);

  const handleBlur = useCallback(() => {
    if (disabled || trigger !== 'focus') return;
    setOpenState(false);
  }, [disabled, trigger, setOpenState]);

  // 阻止 popup 上的 hover 事件导致气泡关闭
  const handlePopupMouseEnter = useCallback(() => {
    if (trigger !== 'hover') return;
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  }, [trigger]);

  const handlePopupMouseLeave = useCallback(() => {
    if (disabled || trigger !== 'hover') return;
    leaveTimerRef.current = setTimeout(() => setOpenState(false), mouseLeaveDelay * 1000);
  }, [disabled, trigger, mouseLeaveDelay, setOpenState]);

  const handleClose = useCallback(() => {
    setOpenState(false);
  }, [setOpenState]);

  // 渲染气泡内容
  const renderPopup = () => {
    if (!mounted) return null;
    const popupCls = classNames(
      'zdy-popover',
      `zdy-popover--${actualPlacement}`,
      {
        'zdy-popover--visible': visible,
        'zdy-popover--hidden': !visible,
        'zdy-popover--no-arrow': !arrow,
      },
      className
    );

    const popup = (
      <div
        ref={popupRef}
        className={popupCls}
        style={{ ...popupStyle, ...style, ...(width ? { width } : null) }}
        onMouseEnter={handlePopupMouseEnter}
        onMouseLeave={handlePopupMouseLeave}
      >
        {arrow && <div className="zdy-popover-arrow" />}
        <div className="zdy-popover-inner">
          {title && <div className="zdy-popover-title">{title}</div>}
          {content != null && <div className="zdy-popover-content">{content}</div>}
          {showClose && (
            <span className="zdy-popover-close" onClick={handleClose}>
              <Icon type="close" size={12} color="#999" />
            </span>
          )}
        </div>
      </div>
    );

    const container = getContainer();
    if (container === document.body) {
      return typeof window !== 'undefined' ? ReactDOM.createPortal(popup, document.body) : null;
    }
    return popup;
  };

  return (
    <>
      <div
        ref={triggerRef}
        className="zdy-popover-trigger"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{ display: 'inline-block' }}
      >
        {children}
      </div>
      {renderPopup()}
    </>
  );
};

export default Popover;
