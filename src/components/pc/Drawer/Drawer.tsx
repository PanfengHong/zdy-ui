import React, { useEffect, useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import type { DrawerProps } from './types';
import Icon from '../Icon';

import './Drawer.less';

const Drawer: React.FC<DrawerProps> = ({
  visible = false,
  title,
  placement = 'right',
  width = 378,
  height = 378,
  closable = true,
  mask = true,
  maskClosable = true,
  keyboard = true,
  destroyOnClose = false,
  footer,
  maskStyle,
  bodyStyle,
  className = '',
  style,
  onClose,
  afterOpenChange,
  children,
}) => {
  // 用于控制动画：渲染后下一帧再触发动画
  const [animEntered, setAnimEntered] = useState(false);
  // 是否已渲染过一次（用于决定 destroyOnClose 后是否保留 DOM）
  const [rendered, setRendered] = useState(visible);
  const prevVisibleRef = useRef(visible);

  // 尺寸数值化
  const sizeValue = (v: string | number) => (typeof v === 'number' ? `${v}px` : v);

  // 打开/关闭动画处理
  useEffect(() => {
    if (visible) {
      setRendered(true);
      // 下一帧触发进入动画
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimEntered(true));
      });
    } else {
      setAnimEntered(false);
    }
  }, [visible]);

  // afterOpenChange 回调
  useEffect(() => {
    if (prevVisibleRef.current !== visible) {
      // 关闭时：等动画结束后再回调 & 清除渲染
      if (!visible) {
        const timer = setTimeout(() => {
          afterOpenChange?.(false);
          if (destroyOnClose) {
            setRendered(false);
          }
        }, 300);
        prevVisibleRef.current = visible;
        return () => clearTimeout(timer);
      } else {
        // 打开时：动画结束后回调
        const timer = setTimeout(() => {
          afterOpenChange?.(true);
        }, 300);
        prevVisibleRef.current = visible;
        return () => clearTimeout(timer);
      }
    }
  }, [visible, destroyOnClose, afterOpenChange]);

  // ESC 键关闭
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && keyboard && maskClosable) {
      onClose?.();
    }
  }, [keyboard, maskClosable, onClose]);

  useEffect(() => {
    if (visible) {
      document.addEventListener('keydown', handleKeyDown);
      // 锁定 body 滚动
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [visible, handleKeyDown]);

  const handleMaskClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget && maskClosable) {
      onClose?.();
    }
  }, [maskClosable, onClose]);

  // 如果不需要渲染
  if (!rendered && !visible) {
    return null;
  }

  const isHorizontal = placement === 'left' || placement === 'right';

  // 面板尺寸样式
  const panelStyle: React.CSSProperties = { ...style };
  if (isHorizontal) {
    panelStyle.width = sizeValue(width);
  } else {
    panelStyle.height = sizeValue(height);
  }

  const panelClasses = classNames(
    'zdy-drawer-panel',
    `zdy-drawer-panel--${placement}`,
    {
      'zdy-drawer-panel--open': animEntered,
    },
    className
  );

  return (
    <div className="zdy-drawer-root">
      {/* 遮罩 */}
      {mask && (
        <div
          className={classNames('zdy-drawer-mask', { 'zdy-drawer-mask--open': animEntered })}
          style={maskStyle}
          onClick={handleMaskClick}
        />
      )}
      {/* 抽屉面板 */}
      <div
        className={panelClasses}
        style={panelStyle}
      >
        {/* 头部 */}
        {(title || closable) && (
          <div className="zdy-drawer-header">
            {title && <div className="zdy-drawer-title">{title}</div>}
            {closable && (
              <button className="zdy-drawer-close" onClick={() => onClose?.()}>
                <Icon type="close" size={16} />
              </button>
            )}
          </div>
        )}
        {/* 内容区 */}
        <div className="zdy-drawer-body" style={bodyStyle}>
          {children}
        </div>
        {/* 底部 */}
        {footer && (
          <div className="zdy-drawer-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Drawer;
