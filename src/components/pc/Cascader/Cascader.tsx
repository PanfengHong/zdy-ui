import { Fragment, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import type {
  CSSProperties,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent
} from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import type { CascaderOption, CascaderProps } from './types';

import './Cascader.less';

const getOptionPath = (options: CascaderOption[], values: string[]): CascaderOption[] => {
  const path: CascaderOption[] = [];
  let level = options;

  for (const value of values) {
    const option = level.find(item => item.value === value);
    if (!option) break;
    path.push(option);
    level = option.children ?? [];
  }

  return path;
};

const buildColumns = (options: CascaderOption[], activePath: string[]): CascaderOption[][] => {
  const columns: CascaderOption[][] = [options];
  let level = options;

  for (const value of activePath) {
    const option = level.find(item => item.value === value);
    if (!option?.children?.length) break;
    columns.push(option.children);
    level = option.children;
  }

  return columns;
};

const Cascader = ({
  options,
  value,
  defaultValue,
  placeholder = '请选择',
  disabled = false,
  allowClear = true,
  changeOnSelect = false,
  expandTrigger = 'click',
  size = 'medium',
  displayRender,
  onChange,
  className = '',
  style
}: CascaderProps) => {
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = useState<string[]>(defaultValue ?? []);
  const currentValue = useMemo(
    () => (isControlled ? (value ?? []) : innerValue),
    [isControlled, value, innerValue]
  );

  const [open, setOpen] = useState(false);
  const [activePath, setActivePath] = useState<string[]>([]);
  const [dropdownStyle, setDropdownStyle] = useState<CSSProperties>({});

  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownId = useId();

  const currentPath = useMemo(() => getOptionPath(options, currentValue), [options, currentValue]);
  const columns = useMemo(() => buildColumns(options, activePath), [options, activePath]);

  const updateDropdownPosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger || typeof window === 'undefined') return;

    const rect = trigger.getBoundingClientRect();
    const dropdown = dropdownRef.current;
    const width = Math.max(rect.width, dropdown?.offsetWidth ?? 260);
    const height = dropdown?.offsetHeight ?? 260;

    let left = rect.left;
    let top = rect.bottom + 6;

    if (left + width > window.innerWidth - 8) {
      left = Math.max(8, window.innerWidth - width - 8);
    }
    if (top + height > window.innerHeight - 8) {
      top = Math.max(8, rect.top - height - 6);
    }

    setDropdownStyle({
      position: 'fixed',
      top,
      left,
      minWidth: rect.width
    });
  }, []);

  const openDropdown = () => {
    if (disabled) return;
    setActivePath(currentPath.map(option => option.value));
    setOpen(true);
    updateDropdownPosition();
  };

  const closeDropdown = () => {
    setOpen(false);
  };

  const commitValue = (values: string[], close: boolean) => {
    const selectedOptions = getOptionPath(options, values);
    if (!isControlled) {
      setInnerValue(values);
    }
    onChange?.(values, selectedOptions);
    if (close) setOpen(false);
  };

  const handleTriggerClick = () => {
    if (disabled) return;
    if (open) closeDropdown();
    else openDropdown();
  };

  const handleClear = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!isControlled) setInnerValue([]);
    onChange?.([], []);
    setOpen(false);
  };

  const handleOptionClick = (option: CascaderOption, columnIndex: number) => {
    if (option.disabled) return;

    const nextPath = [...activePath.slice(0, columnIndex), option.value];
    setActivePath(nextPath);

    if (option.children?.length) {
      if (changeOnSelect) commitValue(nextPath, false);
    } else {
      commitValue(nextPath, true);
    }
  };

  const handleOptionHover = (option: CascaderOption, columnIndex: number) => {
    if (expandTrigger !== 'hover' || option.disabled) return;

    const nextPath = [...activePath.slice(0, columnIndex), option.value];
    if (nextPath.join('/') === activePath.join('/')) return;
    setActivePath(nextPath);
  };

  const handleTriggerKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
      event.preventDefault();
      if (open) closeDropdown();
      else openDropdown();
    }
    if (event.key === 'Escape' && open) {
      event.preventDefault();
      closeDropdown();
    }
  };

  // 下拉层挂载到 body，需要在窗口变化时重新定位
  useEffect(() => {
    if (!open) return;

    const handleReposition = () => updateDropdownPosition();
    const frame = window.requestAnimationFrame(handleReposition);
    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition, true);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition, true);
    };
  }, [open, activePath, updateDropdownPosition]);

  // 点击外部或按 ESC 关闭
  useEffect(() => {
    if (!open) return;

    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (dropdownRef.current?.contains(target)) return;
      setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const labels = currentPath.map(option => option.label);
  const hasFullPath = currentPath.length > 0 && currentPath.length === currentValue.length;

  const displayContent = displayRender ? (
    displayRender(labels, currentPath)
  ) : hasFullPath ? (
    <span className="zdy-cascader-value-text">
      {labels.map((label, index) => (
        <Fragment key={index}>
          {index > 0 && <span className="zdy-cascader-separator">/</span>}
          {label}
        </Fragment>
      ))}
    </span>
  ) : currentValue.length > 0 ? (
    <span className="zdy-cascader-value-text">{currentValue.join(' / ')}</span>
  ) : (
    <span className="zdy-cascader-placeholder">{placeholder}</span>
  );

  return (
    <>
      <div
        ref={triggerRef}
        className={classNames(
          'zdy-cascader',
          `zdy-cascader--${size}`,
          {
            'zdy-cascader--open': open,
            'zdy-cascader--disabled': disabled
          },
          className
        )}
        style={style}
        role="combobox"
        tabIndex={disabled ? -1 : 0}
        aria-expanded={open}
        aria-haspopup="tree"
        aria-controls={open ? dropdownId : undefined}
        aria-disabled={disabled}
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
      >
        <span className="zdy-cascader-value">{displayContent}</span>
        {allowClear && currentValue.length > 0 && !disabled && (
          <button
            type="button"
            className="zdy-cascader-clear"
            aria-label="清空选择"
            onClick={handleClear}
          >
            <Icon type="close" size={12} />
          </button>
        )}
        <span className={classNames('zdy-cascader-arrow', { 'zdy-cascader-arrow--open': open })}>
          <Icon type="down" size={14} />
        </span>
      </div>

      {open &&
        createPortal(
          <div
            id={dropdownId}
            ref={dropdownRef}
            className="zdy-cascader-dropdown"
            style={dropdownStyle}
          >
            {options.length === 0 ? (
              <div className="zdy-cascader-empty">暂无数据</div>
            ) : (
              columns.map((column, columnIndex) => (
                <div key={columnIndex} className="zdy-cascader-column">
                  {column.map(option => {
                    const active = activePath[columnIndex] === option.value;
                    const selected = currentValue[columnIndex] === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        className={classNames('zdy-cascader-option', {
                          'zdy-cascader-option--active': active,
                          'zdy-cascader-option--selected': selected,
                          'zdy-cascader-option--disabled': option.disabled
                        })}
                        disabled={option.disabled}
                        onClick={() => handleOptionClick(option, columnIndex)}
                        onMouseEnter={() => handleOptionHover(option, columnIndex)}
                      >
                        <span className="zdy-cascader-option-label">{option.label}</span>
                        {option.children?.length ? (
                          <Icon type="right" size={12} />
                        ) : selected ? (
                          <Icon type="check" size={14} />
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>,
          document.body
        )}
    </>
  );
};

export default Cascader;
