import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

import './MDialog.less';
import type { MDialogProps } from './types';

// 与样式表中的退出动画时长保持一致
const ANIMATION_DURATION = 220;

const MDialog = ({
  visible,
  defaultVisible = false,
  title,
  description,
  children,
  footer,
  closable = true,
  maskClosable = true,
  keyboard = true,
  inline = false,
  onClose,
  className = '',
  bodyClassName = '',
  style
}: MDialogProps) => {
  const isControlled = visible !== undefined;
  const [innerVisible, setInnerVisible] = useState(defaultVisible);
  const open = isControlled ? Boolean(visible) : innerVisible;

  // rendered 控制挂载：打开时立即挂载，关闭时延迟卸载以播放退出动画
  const [rendered, setRendered] = useState(open);
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open && !rendered) setRendered(true);
  }

  useEffect(() => {
    if (open || !rendered) return;
    const timer = window.setTimeout(() => setRendered(false), ANIMATION_DURATION);
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

  const closing = !open;

  const dialog = (
    <div
      className={classNames('zdy-mobile-dialog-root', {
        'zdy-mobile-dialog-root--inline': inline,
        'zdy-mobile-dialog-root--closing': closing
      })}
    >
      <div
        className="zdy-mobile-dialog-mask"
        onClick={maskClosable ? close : undefined}
      />
      <div
        className={classNames('zdy-mobile-dialog', className)}
        style={style}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : undefined}
      >
        {closable && (
          <button
            type="button"
            className="zdy-mobile-dialog-close"
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

        {(title || description) && (
          <div className="zdy-mobile-dialog-header">
            {title && <div className="zdy-mobile-dialog-title">{title}</div>}
            {description && (
              <div className="zdy-mobile-dialog-description">{description}</div>
            )}
          </div>
        )}

        <div className={classNames('zdy-mobile-dialog-body', bodyClassName)}>
          {children}
        </div>

        {footer !== null && footer !== undefined && footer !== false && (
          <div className="zdy-mobile-dialog-footer">{footer}</div>
        )}
      </div>
    </div>
  );

  return inline ? dialog : createPortal(dialog, document.body);
};

export default MDialog;
