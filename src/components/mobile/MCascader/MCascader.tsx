import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import Icon from '../../pc/Icon/Icon';
import type { CascaderOption } from '../../../types';
import type { MCascaderProps } from './types';

import './MCascader.less';

// 与 CSS 中的退出动画时长保持一致
const ANIMATION_DURATION = 220;

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

const MCascader = ({
  options,
  value,
  defaultValue,
  title = '请选择',
  placeholder = '请选择',
  disabled = false,
  changeOnSelect = false,
  inline = false,
  closeOnMaskClick = true,
  onChange,
  onOpen,
  onClose,
  className = '',
  style
}: MCascaderProps) => {
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = useState<string[]>(defaultValue ?? []);
  const currentValue = useMemo(
    () => (isControlled ? (value ?? []) : innerValue),
    [isControlled, value, innerValue]
  );

  const currentPath = useMemo(() => getOptionPath(options, currentValue), [options, currentValue]);

  const [opened, setOpened] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);
  const [activePath, setActivePath] = useState<string[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const closeTimerRef = useRef<number | null>(null);

  const columns = useMemo(() => buildColumns(options, activePath), [options, activePath]);
  const levelOptions = columns[activeTabIndex] ?? [];
  const pathOptions = useMemo(() => getOptionPath(options, activePath), [options, activePath]);
  const hasNextLevel = columns.length > activePath.length;

  const openSheet = () => {
    if (disabled) return;

    const path = currentPath.map(option => option.value);
    const nextColumns = buildColumns(options, path);

    setActivePath(path);
    setActiveTabIndex(nextColumns.length > path.length ? path.length : Math.max(0, path.length - 1));

    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setMounted(true);
    setClosing(false);
    setOpened(true);
    onOpen?.();
  };

  const closeSheet = () => {
    if (!opened) return;

    setOpened(false);
    setClosing(true);
    onClose?.();

    if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setMounted(false);
      setClosing(false);
      closeTimerRef.current = null;
    }, ANIMATION_DURATION);
  };

  useEffect(() => () => {
    if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
  }, []);

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

  const commitValue = (values: string[], close: boolean) => {
    const selectedOptions = getOptionPath(options, values);
    if (!isControlled) setInnerValue(values);
    onChange?.(values, selectedOptions);
    if (close) closeSheet();
  };

  const handleOptionClick = (option: CascaderOption, columnIndex: number) => {
    if (option.disabled) return;

    const nextPath = [...activePath.slice(0, columnIndex), option.value];
    setActivePath(nextPath);

    if (option.children?.length) {
      setActiveTabIndex(columnIndex + 1);
      if (changeOnSelect) commitValue(nextPath, false);
    } else {
      commitValue(nextPath, true);
    }
  };

  const tabs = [
    ...pathOptions.map((option, index) => ({
      key: option.value,
      label: option.label,
      index
    })),
    ...(hasNextLevel
      ? [{ key: '__next__', label: '请选择', index: pathOptions.length }]
      : [])
  ];

  const displayContent =
    currentPath.length > 0 && currentPath.length === currentValue.length ? (
      <span className="zdy-mobile-cascader-value-text">
        {currentPath.map((option, index) => (
          <Fragment key={option.value}>
            {index > 0 && <span className="zdy-mobile-cascader-separator">/</span>}
            {option.label}
          </Fragment>
        ))}
      </span>
    ) : currentValue.length > 0 ? (
      currentValue.join(' / ')
    ) : (
      placeholder
    );

  const sheet = (
    <div
      className={classNames('zdy-mobile-cascader-root', {
        'zdy-mobile-cascader-root--inline': inline,
        'zdy-mobile-cascader-root--closing': closing
      })}
    >
      <div
        className="zdy-mobile-cascader-mask"
        onClick={closeOnMaskClick ? closeSheet : undefined}
      />
      <div
        className="zdy-mobile-cascader-panel"
        role="dialog"
        aria-modal="true"
        aria-label="级联选择"
      >
        <div className="zdy-mobile-cascader-header">
          <span className="zdy-mobile-cascader-title">{title}</span>
          <button
            type="button"
            className="zdy-mobile-cascader-close"
            aria-label="关闭"
            onClick={closeSheet}
          >
            <Icon type="close" size={16} />
          </button>
        </div>

        <div className="zdy-mobile-cascader-tabs" role="tablist" aria-label="级联层级">
          {tabs.map(tab => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={activeTabIndex === tab.index}
              className={classNames('zdy-mobile-cascader-tab', {
                'zdy-mobile-cascader-tab--active': activeTabIndex === tab.index
              })}
              onClick={() => setActiveTabIndex(tab.index)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="zdy-mobile-cascader-options">
          {levelOptions.length === 0 ? (
            <div className="zdy-mobile-cascader-empty">暂无可选项</div>
          ) : (
            levelOptions.map(option => {
              const selected = activePath[activeTabIndex] === option.value;
              const hasChildren = !!option.children?.length;

              return (
                <button
                  key={option.value}
                  type="button"
                  className={classNames('zdy-mobile-cascader-option', {
                    'zdy-mobile-cascader-option--selected': selected,
                    'zdy-mobile-cascader-option--disabled': option.disabled
                  })}
                  disabled={option.disabled}
                  onClick={() => handleOptionClick(option, activeTabIndex)}
                >
                  <span className="zdy-mobile-cascader-option-label">{option.label}</span>
                  {hasChildren ? (
                    <Icon type="right" size={16} />
                  ) : selected ? (
                    <Icon type="check" size={16} />
                  ) : null}
                </button>
              );
            })
          )}
        </div>

        <div className="zdy-mobile-cascader-cancel-wrap">
          <button type="button" className="zdy-mobile-cascader-cancel" onClick={closeSheet}>
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
        className={classNames('zdy-mobile-cascader', className)}
        style={style}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={opened}
        onClick={openSheet}
      >
        <span
          className={classNames('zdy-mobile-cascader-value', {
            'zdy-mobile-cascader-value--placeholder': currentValue.length === 0
          })}
        >
          {displayContent}
        </span>
        <Icon
          type="down"
          size={14}
          className={classNames('zdy-mobile-cascader-arrow', {
            'zdy-mobile-cascader-arrow--opened': opened
          })}
        />
      </button>

      {mounted && (inline ? sheet : createPortal(sheet, document.body))}
    </>
  );
};

export default MCascader;
