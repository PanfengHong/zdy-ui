import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import type { DatePickerProps } from './types';
import DatePanel from './DatePanel';
import { formatDate, parseDate } from '../../../utils/picker-utils';
import '../../../styles/picker.less';

const DEFAULT_FORMAT = 'YYYY-MM-DD';

const CalendarIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const DatePicker: React.FC<DatePickerProps> = ({
  value: valueProp,
  defaultValue,
  format = DEFAULT_FORMAT,
  placeholder = '请选择日期',
  disabled = false,
  disabledDate,
  allowClear = true,
  size = 'medium',
  onChange,
  onOpenChange,
  className = '',
  style,
}) => {
  const [internalValue, setInternalValue] = useState<Date | null>(defaultValue ?? null);
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState<Date>(() => valueProp ?? defaultValue ?? new Date());
  const [inputText, setInputText] = useState(() => formatDate(valueProp ?? defaultValue ?? null, format));
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isControlled = valueProp !== undefined;
  const selectedDate = isControlled ? valueProp : internalValue;

  useEffect(() => {
    setInputText(formatDate(selectedDate, format));
  }, [selectedDate, format]);

  const updatePosition = useCallback(() => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const width = rect.width;
    const panelHeight = 320;
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
      setViewDate(selectedDate ?? new Date());
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

  const handleSelect = (date: Date) => {
    if (!isControlled) setInternalValue(date);
    setInputText(formatDate(date, format));
    onChange?.(date);
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isControlled) setInternalValue(null);
    setInputText('');
    onChange?.(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputText(text);
    const parsed = parseDate(text, format);
    if (parsed) {
      if (!isControlled) setInternalValue(parsed);
      setViewDate(parsed);
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
          {allowClear && selectedDate ? (
            <span className="zdy-picker-clear" onClick={handleClear}>×</span>
          ) : (
            <CalendarIcon />
          )}
        </span>
      </div>
      {open && typeof window !== 'undefined' && ReactDOM.createPortal(
        <div ref={dropdownRef} className="zdy-picker-dropdown" style={dropdownStyle}>
          <DatePanel
            viewDate={viewDate}
            selectedDate={selectedDate}
            disabledDate={disabledDate}
            onSelect={handleSelect}
            onViewDateChange={setViewDate}
          />
        </div>,
        document.body
      )}
    </>
  );
};

export default DatePicker;
