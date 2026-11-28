import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import Icon from '../../pc/Icon/Icon';
import type { CSSProperties, ReactNode } from 'react';

import './MSelect.less';

// 选择项配置
export interface MSelectOption {
  label: ReactNode;
  value: string | number;
  disabled?: boolean;
}

export interface MSelectProps {
  options?: MSelectOption[];
  // 受控值
  value?: string | number;
  // 非受控初始值
  defaultValue?: string | number;
  placeholder?: string;
  // 弹层标题
  title?: ReactNode;
  disabled?: boolean;
  // 点击遮罩是否关闭
  closeOnMaskClick?: boolean;
  // 内联渲染：相对最近的定位父级铺满（用于手机预览等受限容器）
  inline?: boolean;
  onChange?: (value: string | number, option: MSelectOption) => void;
  onOpen?: () => void;
  onClose?: () => void;
  className?: string;
  style?: CSSProperties;
}

// 与 CSS 中的退出动画时长保持一致
const ANIMATION_DURATION = 220;

const MSelect = ({
  options = [],
  value,
  defaultValue,
  placeholder = '请选择',
  title = '请选择',
  disabled = false,
  closeOnMaskClick = true,
  inline = false,
  onChange,
  onOpen,
  onClose,
  className = '',
  style
}: MSelectProps) => {
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = useState<string | number | undefined>(defaultValue);
  const currentValue = isControlled ? value : innerValue;

  const [opened, setOpened] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);

  const selectedOption = options.find(option => option.value === currentValue);

  const openSheet = () => {
    if (disabled) return;
    setOpened(true);
    onOpen?.();
  };

  const closeSheet = () => {
    if (!opened) return;
    setOpened(false);
    onClose?.();
  };

  // 控制挂载与退出动画
  useEffect(() => {
    if (opened) {
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
  }, [opened, mounted]);

  // 支持 ESC 关闭
  useEffect(() => {
    if (!mounted) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeSheet();
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

  const handleSelect = (option: MSelectOption) => {
    if (option.disabled) return;
    if (!isControlled) {
      setInnerValue(option.value);
    }
    onChange?.(option.value, option);
    closeSheet();
  };

  const sheet = (
    <div
      className={classNames('zdy-mobile-select-root', {
        'zdy-mobile-select-root--inline': inline,
        'zdy-mobile-select-root--closing': closing
      })}
    >
      <div
        className="zdy-mobile-select-mask"
        onClick={closeOnMaskClick ? closeSheet : undefined}
      />
      <div className="zdy-mobile-select-panel" role="dialog" aria-modal="true">
        <div className="zdy-mobile-select-header">
          <span className="zdy-mobile-select-title">{title}</span>
          <button
            type="button"
            className="zdy-mobile-select-close"
            aria-label="关闭"
            onClick={closeSheet}
          >
            <Icon type="close" size={16} />
          </button>
        </div>

        <div className="zdy-mobile-select-options">
          {options.length === 0 ? (
            <div className="zdy-mobile-select-empty">暂无可选项</div>
          ) : (
            options.map(option => {
              const active = option.value === currentValue;
              return (
                <button
                  key={option.value}
                  type="button"
                  className={classNames('zdy-mobile-select-option', {
                    'zdy-mobile-select-option--active': active,
                    'zdy-mobile-select-option--disabled': option.disabled
                  })}
                  disabled={option.disabled}
                  onClick={() => handleSelect(option)}
                >
                  <span className="zdy-mobile-select-option-label">{option.label}</span>
                  {active && <Icon type="check" size={16} />}
                </button>
              );
            })
          )}
        </div>

        <div className="zdy-mobile-select-cancel-wrap">
          <button type="button" className="zdy-mobile-select-cancel" onClick={closeSheet}>
            取消
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        className={classNames('zdy-mobile-select', className)}
        style={style}
        disabled={disabled}
        onClick={openSheet}
        aria-haspopup="dialog"
        aria-expanded={opened}
      >
        <span
          className={classNames('zdy-mobile-select-value', {
            'zdy-mobile-select-value--placeholder': !selectedOption
          })}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <Icon
          type="down"
          size={14}
          className={classNames('zdy-mobile-select-arrow', {
            'zdy-mobile-select-arrow--opened': opened
          })}
        />
      </button>

      {mounted && (inline ? sheet : createPortal(sheet, document.body))}
    </>
  );
};

export default MSelect;
