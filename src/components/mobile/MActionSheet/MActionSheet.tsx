import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import type { CSSProperties, ReactNode } from 'react';

import './MActionSheet.less';

// 操作项配置
export interface MActionSheetAction {
  key?: string;
  text: ReactNode;
  description?: ReactNode;
  danger?: boolean;
  disabled?: boolean;
}

export interface MActionSheetProps {
  // 受控显示
  visible?: boolean;
  // 非受控初始显示
  defaultVisible?: boolean;
  title?: ReactNode;
  description?: ReactNode;
  actions?: MActionSheetAction[];
  // 取消按钮文案，传 null 隐藏
  cancelText?: ReactNode | null;
  // 点击遮罩是否关闭
  closeOnMaskClick?: boolean;
  // 内联渲染：相对最近的定位父级铺满（用于手机预览等受限容器）
  inline?: boolean;
  onClose?: () => void;
  onSelect?: (action: MActionSheetAction, index: number) => void;
  className?: string;
  style?: CSSProperties;
}

// 与 CSS 中的退出动画时长保持一致
const ANIMATION_DURATION = 220;

const MActionSheet = ({
  visible,
  defaultVisible = false,
  title,
  description,
  actions = [],
  cancelText = '取消',
  closeOnMaskClick = true,
  inline = false,
  onClose,
  onSelect,
  className = '',
  style
}: MActionSheetProps) => {
  const isControlled = visible !== undefined;
  const [innerVisible, setInnerVisible] = useState(defaultVisible);
  const open = isControlled ? Boolean(visible) : innerVisible;
  const [mounted, setMounted] = useState(open);
  const [closing, setClosing] = useState(false);

  // 控制挂载与退出动画
  useEffect(() => {
    if (open) {
      setMounted(true);
      setClosing(false);
      return;
    }
    if (!mounted) return;
    setClosing(true);
    const timer = window.setTimeout(() => {
      setMounted(false);
      setClosing(false);
    }, ANIMATION_DURATION);
    return () => window.clearTimeout(timer);
  }, [open, mounted]);

  const close = () => {
    if (!isControlled) {
      setInnerVisible(false);
    }
    onClose?.();
  };

  // 支持 ESC 关闭
  useEffect(() => {
    if (!mounted) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  // 非内联模式下锁定页面滚动
  useEffect(() => {
    if (!mounted || inline) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mounted, inline]);

  if (!mounted) return null;

  const handleSelect = (action: MActionSheetAction, index: number) => {
    if (action.disabled) return;
    onSelect?.(action, index);
    close();
  };

  const sheet = (
    <div
      className={classNames('zdy-mobile-action-sheet-root', {
        'zdy-mobile-action-sheet-root--inline': inline,
        'zdy-mobile-action-sheet-root--closing': closing
      })}
    >
      <div
        className="zdy-mobile-action-sheet-mask"
        onClick={closeOnMaskClick ? close : undefined}
      />
      <div
        className={classNames('zdy-mobile-action-sheet', className)}
        style={style}
        role="dialog"
        aria-modal="true"
      >
        {(title || description) && (
          <div className="zdy-mobile-action-sheet-header">
            {title && <div className="zdy-mobile-action-sheet-title">{title}</div>}
            {description && (
              <div className="zdy-mobile-action-sheet-description">{description}</div>
            )}
          </div>
        )}

        <div className="zdy-mobile-action-sheet-actions">
          {actions.map((action, index) => (
            <button
              key={action.key ?? index}
              type="button"
              className={classNames('zdy-mobile-action-sheet-item', {
                'zdy-mobile-action-sheet-item--danger': action.danger,
                'zdy-mobile-action-sheet-item--disabled': action.disabled
              })}
              disabled={action.disabled}
              onClick={() => handleSelect(action, index)}
            >
              <span className="zdy-mobile-action-sheet-item-text">{action.text}</span>
              {action.description && (
                <span className="zdy-mobile-action-sheet-item-desc">{action.description}</span>
              )}
            </button>
          ))}
        </div>

        {cancelText !== null && (
          <div className="zdy-mobile-action-sheet-cancel-wrap">
            <button
              type="button"
              className="zdy-mobile-action-sheet-cancel"
              onClick={close}
            >
              {cancelText}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return inline ? sheet : createPortal(sheet, document.body);
};

export default MActionSheet;
