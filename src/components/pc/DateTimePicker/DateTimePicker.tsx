import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import type { DateTimePickerProps } from './types';
import { DatePanel } from '../DatePicker';
import { TimePanel } from '../TimePicker';
import { formatDate, parseDate, pad } from '../../../utils/picker-utils';
import '../../../styles/picker.less';  

const DEFAULT_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const CalendarIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  value: valueProp,
  defaultValue,
  format = DEFAULT_FORMAT,
  placeholder = '请选择日期时间',
  disabled = false,
  disabledDate,
  allowClear = true,
  size = 'medium',
  showTime = true,
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
  const [timePanelOpen, setTimePanelOpen] = useState(false);
  const [timeInputText, setTimeInputText] = useState('00:00:00');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeBoxRef = useRef<HTMLDivElement>(null);

  const isControlled = valueProp !== undefined;
  const selected = isControlled ? valueProp : internalValue;

  useEffect(() => {
    setInputText(formatDate(selected, format));
  }, [selected, format]);

  const hour = selected?.getHours() ?? 0;
  const minute = selected?.getMinutes() ?? 0;
  const second = selected?.getSeconds() ?? 0;

  useEffect(() => {
    setTimeInputText(`${pad(hour)}:${pad(minute)}:${pad(second)}`);
  }, [hour, minute, second]);

  const updatePosition = useCallback(() => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const width = rect.width;
    const panelHeight = showTime ? 340 : 320;
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
  }, [showTime]);

  useEffect(() => {
    if (open) {
      updatePosition();
      setViewDate(selected ?? new Date());
      setTimePanelOpen(false);
      window.addEventListener('resize', updatePosition);
      onOpenChange?.(true);
    } else {
      onOpenChange?.(false);
    }
    return () => window.removeEventListener('resize', updatePosition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // 主下拉面板的点击外部关闭
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

  // 时间浮层的点击外部关闭
  useEffect(() => {
    if (!timePanelOpen) return;
    const handler = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (timeBoxRef.current?.contains(t)) return;
      setTimePanelOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [timePanelOpen]);

  const applyChange = (d: Date | null) => {
    if (!isControlled) setInternalValue(d);
    setInputText(formatDate(d, format));
    onChange?.(d);
  };

  const handleDateSelect = (date: Date) => {
    const d = new Date(date);
    d.setHours(hour, minute, second);
    applyChange(d);
  };

  const handleTimeSelect = (h: number, m: number, s: number) => {
    const base = selected ?? new Date();
    const d = new Date(base);
    d.setHours(h, m, s);
    applyChange(d);
  };

  const handleTimeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setTimeInputText(text);
    const m = /^\s*(\d{1,2}):(\d{1,2}):(\d{1,2})\s*$/.exec(text);
    if (m) {
      const h = clamp(parseInt(m[1], 10), 0, 23);
      const mi = clamp(parseInt(m[2], 10), 0, 59);
      const s = clamp(parseInt(m[3], 10), 0, 59);
      handleTimeSelect(h, mi, s);
    }
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
      setViewDate(parsed);
      onChange?.(parsed);
    }
  };

  const handleToggle = () => {
    if (disabled) return;
    setOpen((o) => !o);
  };

  const toggleTimePanel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTimePanelOpen((o) => !o);
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
            <CalendarIcon />
          )}
        </span>
      </div>
      {open && typeof window !== 'undefined' && ReactDOM.createPortal(
        <div ref={dropdownRef} className="zdy-picker-dropdown zdy-picker-dropdown--datetime" style={dropdownStyle}>
          <div className="zdy-picker-datetime-wrapper">
            {showTime && (
              <div className="zdy-picker-datetime-timebar">
                <span className="zdy-picker-datetime-time-label">选择时间</span>
                <div className="zdy-picker-datetime-time-box" ref={timeBoxRef}>
                  <input
                    className="zdy-picker-datetime-time-input"
                    value={timeInputText}
                    onChange={handleTimeInputChange}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className="zdy-picker-datetime-time-icon" onClick={toggleTimePanel}>
                    <ClockIcon />
                  </span>
                  {timePanelOpen && (
                    <div className="zdy-picker-datetime-time-popover" onClick={(e) => e.stopPropagation()}>
                      <TimePanel
                        hour={hour}
                        minute={minute}
                        second={second}
                        onSelect={handleTimeSelect}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
            <DatePanel
              viewDate={viewDate}
              selectedDate={selected}
              disabledDate={disabledDate}
              showToday={false}
              onSelect={handleDateSelect}
              onViewDateChange={setViewDate}
            />
            <div className="zdy-picker-panel-footer">
              <button className="zdy-picker-footer-btn" onClick={handleNow}>此刻</button>
              <button className="zdy-picker-footer-btn zdy-picker-footer-btn--primary" onClick={handleOk}>确定</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default DateTimePicker;
