import React, { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import type { IntroProps, IntroStep, IntroPlacement } from './types';

import './Intro.less';

interface TargetRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface TooltipPos {
  top: number;
  left: number;
  placement: IntroPlacement;
}

const GAP = 12;

// 解析 target -> HTMLElement
const resolveTarget = (target: IntroStep['target']): HTMLElement | null => {
  if (typeof target === 'string') {
    return document.querySelector<HTMLElement>(target);
  }
  if (typeof target === 'function') {
    return target();
  }
  return target;
};

// 计算目标元素 rect（含滚动偏移）
const computeTargetRect = (el: HTMLElement): TargetRect => {
  const rect = el.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
    width: rect.width,
    height: rect.height,
  };
};

// 计算 tooltip 位置
const computeTooltipPos = (
  targetRect: TargetRect,
  tooltipWidth: number,
  tooltipHeight: number,
  placement: IntroPlacement
): TooltipPos => {
  const { top, left, width, height } = targetRect;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  const posMap: Record<IntroPlacement, { top: number; left: number }> = {
    top: { top: top - tooltipHeight - GAP, left: left + width / 2 - tooltipWidth / 2 },
    topLeft: { top: top - tooltipHeight - GAP, left: left },
    topRight: { top: top - tooltipHeight - GAP, left: left + width - tooltipWidth },
    bottom: { top: top + height + GAP, left: left + width / 2 - tooltipWidth / 2 },
    bottomLeft: { top: top + height + GAP, left: left },
    bottomRight: { top: top + height + GAP, left: left + width - tooltipWidth },
    left: { top: top + height / 2 - tooltipHeight / 2, left: left - tooltipWidth - GAP },
    right: { top: top + height / 2 - tooltipHeight / 2, left: left + width + GAP },
  };

  let finalPlacement = placement;
  let pos = posMap[placement];

  // 边界翻转
  const absTop = pos.top - scrollY;
  const absLeft = pos.left - scrollX;
  if (placement.startsWith('top') && absTop < 8) {
    finalPlacement = placement === 'top' ? 'bottom' : (placement === 'topLeft' ? 'bottomLeft' : 'bottomRight') as IntroPlacement;
    pos = posMap[finalPlacement];
  } else if (placement.startsWith('bottom') && absTop + tooltipHeight > vh - 8) {
    finalPlacement = placement === 'bottom' ? 'top' : (placement === 'bottomLeft' ? 'topLeft' : 'topRight') as IntroPlacement;
    pos = posMap[finalPlacement];
  } else if (placement === 'left' && absLeft < 8) {
    finalPlacement = 'right';
    pos = posMap[finalPlacement];
  } else if (placement === 'right' && absLeft + tooltipWidth > vw - 8) {
    finalPlacement = 'left';
    pos = posMap[finalPlacement];
  }

  // 水平修正
  if (pos.left - scrollX < 8) pos.left = scrollX + 8;
  if (pos.left - scrollX + tooltipWidth > vw - 8) pos.left = scrollX + vw - 8 - tooltipWidth;
  if (pos.top - scrollY < 8) pos.top = scrollY + 8;
  if (pos.top - scrollY + tooltipHeight > vh - 8) pos.top = scrollY + vh - 8 - tooltipHeight;

  return { top: pos.top, left: pos.left, placement: finalPlacement };
};

const Intro: React.FC<IntroProps> = ({
  steps,
  defaultOpen = false,
  open: openProp,
  current: currentProp,
  defaultCurrent = 0,
  mask = true,
  maskClosable = false,
  showSteps = true,
  showSkip = true,
  allowKeyboard = true,
  padding = 4,
  borderRadius = 4,
  scrollIntoView = true,
  highlightColor = '#1890ff',
  zIndex = 1100,
  onOpenChange,
  onCurrentChange,
  onChange,
  onClose,
  onDone,
  onSkip,
  onNext,
  onPrev,
  renderButtons,
  className = '',
  style,
}) => {
  const isOpenControlled = openProp !== undefined;
  const isCurrentControlled = currentProp !== undefined;
  const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);
  const [internalCurrent, setInternalCurrent] = useState<number>(defaultCurrent);
  const open = isOpenControlled ? openProp! : internalOpen;
  const current = isCurrentControlled ? currentProp! : internalCurrent;

  const [targetRect, setTargetRect] = useState<TargetRect | null>(null);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const [actualPlacement, setActualPlacement] = useState<IntroPlacement>('bottom');

  const tooltipRef = useRef<HTMLDivElement>(null);
  const targetElRef = useRef<HTMLElement | null>(null);

  const total = steps.length;
  const step = steps[current];

  const setOpenState = useCallback(
    (next: boolean) => {
      if (!isOpenControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isOpenControlled, onOpenChange]
  );

  const setCurrentState = useCallback(
    (next: number) => {
      if (!isCurrentControlled) setInternalCurrent(next);
      onCurrentChange?.(next);
      onChange?.(next);
    },
    [isCurrentControlled, onCurrentChange, onChange]
  );

  const goNext = useCallback(() => {
    if (current >= total - 1) {
      // 最后一步 -> 完成
      setOpenState(false);
      onDone?.();
      return;
    }
    const next = current + 1;
    setCurrentState(next);
    onNext?.(next);
  }, [current, total, setOpenState, setCurrentState, onDone, onNext]);

  const goPrev = useCallback(() => {
    if (current <= 0) return;
    const next = current - 1;
    setCurrentState(next);
    onPrev?.(next);
  }, [current, setCurrentState, onPrev]);

  const goSkip = useCallback(() => {
    setOpenState(false);
    onSkip?.();
    onClose?.();
  }, [setOpenState, onSkip, onClose]);

  const goClose = useCallback(() => {
    setOpenState(false);
    onClose?.();
  }, [setOpenState, onClose]);

  // 计算高亮位置 + tooltip 位置
  const updatePosition = useCallback(() => {
    if (!open || !step) return;
    const el = resolveTarget(step.target);
    if (!el) {
      // 找不到目标，关闭引导
      setOpenState(false);
      return;
    }
    targetElRef.current = el;

    if (scrollIntoView) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }

    const rect = computeTargetRect(el);
    setTargetRect({
      top: rect.top - padding,
      left: rect.left - padding,
      width: rect.width + padding * 2,
      height: rect.height + padding * 2,
    });

    if (tooltipRef.current) {
      const tw = tooltipRef.current.offsetWidth;
      const th = tooltipRef.current.offsetHeight;
      const pos = computeTooltipPos(rect, tw, th, step.placement || 'bottom');
      setTooltipStyle({ top: pos.top, left: pos.left });
      setActualPlacement(pos.placement);
    }
  }, [open, step, padding, scrollIntoView, setOpenState]);

  // 初次打开或步骤变化时，等 tooltip 渲染后再计算位置
  useLayoutEffect(() => {
    if (!open) return;
    // 第一帧：tooltip 还未挂载，先设置一次目标位置
    const el = step ? resolveTarget(step.target) : null;
    if (el) {
      const rect = computeTargetRect(el);
      setTargetRect({
        top: rect.top - padding,
        left: rect.left - padding,
        width: rect.width + padding * 2,
        height: rect.height + padding * 2,
      });
    }
    // 第二帧：tooltip 已挂载，计算位置
    requestAnimationFrame(() => {
      updatePosition();
    });
  }, [open, current, step, padding, updatePosition]);

  // 监听窗口变化
  useEffect(() => {
    if (!open) return;
    const handle = () => updatePosition();
    window.addEventListener('resize', handle);
    window.addEventListener('scroll', handle, true);
    return () => {
      window.removeEventListener('resize', handle);
      window.removeEventListener('scroll', handle, true);
    };
  }, [open, updatePosition]);

  // 键盘事件
  useEffect(() => {
    if (!open || !allowKeyboard) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        goClose();
      } else if (e.key === 'ArrowRight') {
        goNext();
      } else if (e.key === 'ArrowLeft') {
        goPrev();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, allowKeyboard, goNext, goPrev, goClose]);

  if (!open || !step || total === 0) return null;

  // 遮罩：使用全屏半透明 div（高亮区域通过 box-shadow 挖空）
  const renderMask = () => {
    if (!mask) return null;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    return (
      <div
        className="zdy-intro-mask"
        onClick={() => maskClosable && goClose()}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: vw,
          height: vh,
          background: 'rgba(0, 0, 0, 0.45)',
          pointerEvents: maskClosable ? 'auto' : 'none',
          zIndex,
        }}
      />
    );
  };

  // 高亮框（使用 box-shadow 制造遮罩）
  const renderHighlight = () => {
    if (!targetRect) return null;
    return (
      <div
        className="zdy-intro-highlight"
        style={{
          position: 'absolute',
          top: targetRect.top,
          left: targetRect.left,
          width: targetRect.width,
          height: targetRect.height,
          borderRadius,
          boxShadow: `0 0 0 9999px ${mask ? 'rgba(0, 0, 0, 0.45)' : 'rgba(0, 0, 0, 0)'}`,
          border: `2px solid ${highlightColor}`,
          transition: 'all 0.3s ease',
          zIndex: zIndex + 1,
          pointerEvents: 'none',
        }}
      />
    );
  };

  const renderTooltip = () => {
    const isLast = current === total - 1;
    const isFirst = current === 0;

    const buttons = renderButtons ? (
      renderButtons({ current, total, next: goNext, prev: goPrev, skip: goSkip, done: goNext })
    ) : (
      <div className="zdy-intro-buttons">
        {showSkip && !isLast && (
          <button className="zdy-intro-btn zdy-intro-btn--text" onClick={goSkip}>
            跳过
          </button>
        )}
        <div className="zdy-intro-buttons-right">
          {!isFirst && !step.hidePrev && (
            <button className="zdy-intro-btn" onClick={goPrev}>
              {step.prevBtnText || '上一步'}
            </button>
          )}
          {!isLast && !step.hideNext && (
            <button className="zdy-intro-btn zdy-intro-btn--primary" onClick={goNext}>
              {step.nextBtnText || '下一步'}
            </button>
          )}
          {isLast && (
            <button className="zdy-intro-btn zdy-intro-btn--primary" onClick={goNext}>
              {step.doneBtnText || '完成'}
            </button>
          )}
        </div>
      </div>
    );

    return (
      <div
        ref={tooltipRef}
        className={classNames('zdy-intro-tooltip', `zdy-intro-tooltip--${actualPlacement}`, className)}
        style={{ ...tooltipStyle, zIndex: zIndex + 2, ...style }}
      >
        <div className="zdy-intro-tooltip-arrow" />
        <div className="zdy-intro-tooltip-inner">
          {showSteps && (
            <div className="zdy-intro-tooltip-steps">
              {current + 1} / {total}
            </div>
          )}
          {step.title && <div className="zdy-intro-tooltip-title">{step.title}</div>}
          {step.content && <div className="zdy-intro-tooltip-content">{step.content}</div>}
          {buttons}
        </div>
      </div>
    );
  };

  const content = (
    <>
      {renderMask()}
      {renderHighlight()}
      {renderTooltip()}
    </>
  );

  return typeof window !== 'undefined'
    ? ReactDOM.createPortal(content, document.body)
    : null;
};

export default Intro;
