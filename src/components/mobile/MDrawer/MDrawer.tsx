import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

import './MDrawer.less';
import type { MDrawerProps } from './types';

// 略大于 CSS 中的过渡时长，确保退出动画播放完再卸载
const TRANSITION_DURATION = 300;

const toCssSize = (value: string | number) =>
  typeof value === 'number' ? `${value}px` : value;

const MDrawer = ({
  visible,
  defaultVisible = false,
  placement = 'bottom',
  width = '80%',
  height = '50%',
  title,
  closable = true,
  maskClosable = true,
  keyboard = true,
  footer,
  inline = false,
  onClose,
  className = '',
  bodyClassName = '',
  style,
  children
}: MDrawerProps) => {
  const isControlled = visible !== undefined;
  const [innerVisible, setInnerVisible] = useState(defaultVisible);
  const open = isControlled ? Boolean(visible) : innerVisible;

  // rendered 控制挂载；entered 控制进入过渡，关闭后延迟卸载
  const [rendered, setRendered] = useState(open);
  const [entered, setEntered] = useState(false);
  const [prevOpen, setPrevOpen] = useState(open);

  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open && !rendered) setRendered(true);
  }

  // 先渲染一帧初始位置，再打开过渡，保证滑出过程平滑
  useEffect(() => {
    if (!open || !rendered || entered) return;
    let innerFrame = 0;
    const outerFrame = window.requestAnimationFrame(() => {
      innerFrame = window.requestAnimationFrame(() => setEntered(true));
    });
    return () => {
      window.cancelAnimationFrame(outerFrame);
      window.cancelAnimationFrame(innerFrame);
    };
  }, [open, rendered, entered]);

  // 关闭后等过渡结束再卸载
  useEffect(() => {
    if (open || !rendered) return;
    const timer = window.setTimeout(() => {
      setRendered(false);
      setEntered(false);
    }, TRANSITION_DURATION);
    return () => window.clearTimeout(timer);
  }, [open, rendered]);

  const close = () => {
    if (!isControlled) setInnerVisible(false);
    onClose?.();
  };

  // 支持 ESC 关闭
  useEffect(() => {
    if (!open || !keyboard) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (!isControlled) setInnerVisible(false);
      onClose?.();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, keyboard, isControlled, onClose]);

  // 非内联模式下锁定页面滚动
  useEffect(() => {
    if (!open || inline) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open, inline]);

  if (!rendered) return null;

  const opened = open && entered;
  const horizontal = placement === 'left' || placement === 'right';

  const drawer = (
    <div
      className={classNames('zdy-mobile-drawer-root', {
        'zdy-mobile-drawer-root--inline': inline,
        'zdy-mobile-drawer-root--open': opened,
        'zdy-mobile-drawer-root--closing': !open
      })}
    >
      <div
        className="zdy-mobile-drawer-mask"
        onClick={maskClosable ? close : undefined}
      />
      <div
        className={classNames(
          'zdy-mobile-drawer',
          `zdy-mobile-drawer--${placement}`,
          className
        )}
        style={{
          ...(horizontal ? { width: toCssSize(width) } : { height: toCssSize(height) }),
          ...style
        }}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : undefined}
      >
        {closable && (
          <button
            type="button"
            className="zdy-mobile-drawer-close"
            onClick={close}
            aria-label="关闭"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}

        {title && (
          <div className="zdy-mobile-drawer-header">
            <div className="zdy-mobile-drawer-title">{title}</div>
          </div>
        )}

        <div className={classNames('zdy-mobile-drawer-body', bodyClassName)}>
          {children}
        </div>

        {footer !== null && footer !== undefined && footer !== false && (
          <div className="zdy-mobile-drawer-footer">{footer}</div>
        )}
      </div>
    </div>
  );

  return inline ? drawer : createPortal(drawer, document.body);
};

export default MDrawer;
