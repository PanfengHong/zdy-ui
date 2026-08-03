import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import type { TimePickerProps } from './types';
import TimePanel from './TimePanel';
import { formatDate, parseDate } from '../../../utils/picker-utils';
import '../../../styles/picker.less';

const DEFAULT_FORMAT = 'HH:mm:ss';

const ClockIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const TimePicker: React.FC<TimePickerProps> = ({
  value: valueProp,
  defaultValue,
  format = DEFAULT_FORMAT,
  placeholder = '请选择时间',
  disabled = false,
  allowClear = true,
  size = 'medium',
  hourStep = 1,
  minuteStep = 1,
  secondStep = 1,
  use12Hours = false,
  hideDisabledOptions = false,
  disabledHours,
  disabledMinutes,
  disabledSeconds,
  onChange,
  onOpenChange,
  className = '',
  style,
}) => {
  const [internalValue, setInternalValue] = useState<Date | null>(defaultValue ?? null);
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState(() => formatDate(valueProp ?? defaultValue ?? null, format));
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isControlled = valueProp !== undefined;
  const selected = isControlled ? valueProp : internalValue;

  useEffect(() => {
    setInputText(formatDate(selected, format));
  }, [selected, format]);

  const hour = selected?.getHours() ?? 0;
  const minute = selected?.getMinutes() ?? 0;
  const second = selected?.getSeconds() ?? 0;

  const updatePosition = useCallback(() => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const width = rect.width;
    const panelHeight = 280;
    let top = rect.bottom + 4;
    let left = rect.left;
    if (top + panelHeight > window.innerHeight) {
      top = rect.top - panelHeight - 4;
    }
    if (left + width > window.innerWidth) {
      left = window.innerWidth - width;
    }
    setDropdownStyle({
      position: 'absolute',
      top: top + window.scrollY,
      left: left + window.scrollX,
      width,
    });
  }, []);

  useEffect(() => {
    if (open) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      onOpenChange?.(true);
    } else {
      onOpenChange?.(false);
    }
    return () => window.removeEventListener('resize', updatePosition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (wrapperRef.current?.contains(t)) return;
      if (dropdownRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const applyChange = (d: Date | null) => {
    if (!isControlled) setInternalValue(d);
    setInputText(formatDate(d, format));
    onChange?.(d);
  };

  const handleSelect = (h: number, m: number, s: number) => {
    const base = selected ?? new Date();
    const d = new Date(base.getFullYear(), base.getMonth(), base.getDate(), h, m, s);
    applyChange(d);
  };

  const handleNow = () => {
    applyChange(new Date());
    setOpen(false);
  };

  const handleOk = () => setOpen(false);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    applyChange(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputText(text);
    const parsed = parseDate(text, format);
    if (parsed) {
      if (!isControlled) setInternalValue(parsed);
      onChange?.(parsed);
    }
  };

  const handleToggle = () => {
    if (disabled) return;
    setOpen((o) => !o);
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className={classNames('zdy-picker', `zdy-picker--${size}`, {
          'zdy-picker--disabled': disabled,
          'zdy-picker--open': open,
        }, className)}
        style={style}
        onClick={handleToggle}
      >
        <input
          className="zdy-picker-input"
          placeholder={placeholder}
          disabled={disabled}
          value={inputText}
          onChange={handleInputChange}
        />
        <span className="zdy-picker-suffix">
          {allowClear && selected ? (
            <span className="zdy-picker-clear" onClick={handleClear}>×</span>
          ) : (
            <ClockIcon />
          )}
        </span>
      </div>
      {open && typeof window !== 'undefined' && ReactDOM.createPortal(
        <div ref={dropdownRef} className="zdy-picker-dropdown" style={dropdownStyle}>
          <TimePanel
            hour={hour}
            minute={minute}
            second={second}
            hourStep={hourStep}
            minuteStep={minuteStep}
            secondStep={secondStep}
            use12Hours={use12Hours}
            hideDisabledOptions={hideDisabledOptions}
            disabledHours={disabledHours}
            disabledMinutes={disabledMinutes}
            disabledSeconds={disabledSeconds}
            onSelect={handleSelect}
          />
          <div className="zdy-picker-panel-footer">
            <button className="zdy-picker-footer-btn" onClick={handleNow}>此刻</button>
            <button className="zdy-picker-footer-btn zdy-picker-footer-btn--primary" onClick={handleOk}>确定</button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default TimePicker;
