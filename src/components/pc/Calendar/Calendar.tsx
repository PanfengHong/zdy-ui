import React, { useState, useMemo, useCallback } from 'react';
import classNames from 'classnames';
import type { CalendarProps, CalendarMode } from './types';
import Icon from '../Icon/Icon';

import './Calendar.less';

const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六'];
const MONTHS = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

const isSameDay = (a: Date | null, b: Date | null): boolean => {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
};

const isSameMonth = (a: Date, b: Date): boolean => {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
};

const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

// 获取月视图的日期网格（6行 x 7列）
const getMonthDates = (viewDate: Date): Date[] => {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const firstDayOfWeek = firstDay.getDay(); // 0=周日
  const startDate = new Date(year, month, 1 - firstDayOfWeek);

  const dates: Date[] = [];
  for (let i = 0; i < 42; i++) {
    dates.push(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i));
  }
  return dates;
};

const Calendar: React.FC<CalendarProps> = ({
  value: controlledValue,
  defaultValue,
  mode: controlledMode = 'month',
  fullscreen = true,
  disabledDate,
  dateCellRender,
  monthCellRender,
  headerRender,
  onChange,
  onPanelChange,
  onSelect,
  className = '',
  style
}) => {
  const today = new Date();
  const [internalValue, setInternalValue] = useState(defaultValue ?? today);
  const [internalMode, setInternalMode] = useState<CalendarMode>(controlledMode);
  const [viewDate, setViewDate] = useState(defaultValue ?? today);

  const selectedDate = controlledValue ?? internalValue;
  const mode = controlledMode ?? internalMode;

  // 日期导航
  const goPrev = useCallback(() => {
    const newDate = mode === 'month'
      ? new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1)
      : new Date(viewDate.getFullYear() - 1, 0, 1);
    setViewDate(newDate);
    onPanelChange?.(newDate, mode);
  }, [viewDate, mode, onPanelChange]);

  const goNext = useCallback(() => {
    const newDate = mode === 'month'
      ? new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1)
      : new Date(viewDate.getFullYear() + 1, 0, 1);
    setViewDate(newDate);
    onPanelChange?.(newDate, mode);
  }, [viewDate, mode, onPanelChange]);

  const goToday = useCallback(() => {
    const now = new Date();
    setViewDate(now);
    if (controlledValue === undefined) {
      setInternalValue(now);
    }
    onChange?.(now, mode);
    onSelect?.(now);
    onPanelChange?.(now, mode);
  }, [controlledValue, mode, onChange, onSelect, onPanelChange]);

  // 模式切换
  const handleModeChange = useCallback((newMode: CalendarMode) => {
    if (controlledMode === undefined) {
      setInternalMode(newMode);
    }
    onPanelChange?.(viewDate, newMode);
  }, [controlledMode, viewDate, onPanelChange]);

  // 日期选择
  const handleDateSelect = useCallback((date: Date) => {
    if (disabledDate?.(date)) return;
    if (controlledValue === undefined) {
      setInternalValue(date);
    }
    // 如果选中的日期不在当前视图月份，切换视图
    if (!isSameMonth(date, viewDate)) {
      const newView = new Date(date.getFullYear(), date.getMonth(), 1);
      setViewDate(newView);
    }
    onChange?.(date, mode);
    onSelect?.(date);
  }, [controlledValue, disabledDate, viewDate, mode, onChange, onSelect]);

  // 月份选择（年模式下）
  const handleMonthSelect = useCallback((month: number) => {
    const newDate = new Date(viewDate.getFullYear(), month, 1);
    setViewDate(newDate);
    if (controlledMode === undefined) {
      setInternalMode('month');
    }
    onPanelChange?.(newDate, 'month');
  }, [viewDate, controlledMode, onPanelChange]);

  const monthDates = useMemo(() => getMonthDates(viewDate), [viewDate]);

  const headerTitle = mode === 'month'
    ? `${viewDate.getFullYear()}年 ${MONTHS[viewDate.getMonth()]}`
    : `${viewDate.getFullYear()}年`;

  const rootClass = classNames(
    'zdy-calendar',
    `zdy-calendar--${mode}`,
    { 'zdy-calendar--fullscreen': fullscreen, 'zdy-calendar--card': !fullscreen },
    className
  );

  return (
    <div className={rootClass} style={style}>
      {/* 头部 */}
      {headerRender ? (
        headerRender(viewDate, mode)
      ) : (
        <div className="zdy-calendar-header">
          <div className="zdy-calendar-header-left">
            <button className="zdy-calendar-btn" onClick={goPrev} title="上一个">
              <Icon type="left" size={16} />
            </button>
            <span className="zdy-calendar-header-title">{headerTitle}</span>
            <button className="zdy-calendar-btn" onClick={goNext} title="下一个">
              <Icon type="right" size={16} />
            </button>
          </div>
          <div className="zdy-calendar-header-right">
            <button className="zdy-calendar-today-btn" onClick={goToday}>今天</button>
            <div className="zdy-calendar-mode-switch">
              <button
                className={classNames('zdy-calendar-mode-btn', { 'zdy-calendar-mode-btn--active': mode === 'month' })}
                onClick={() => handleModeChange('month')}
              >
                月
              </button>
              <button
                className={classNames('zdy-calendar-mode-btn', { 'zdy-calendar-mode-btn--active': mode === 'year' })}
                onClick={() => handleModeChange('year')}
              >
                年
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 月视图 */}
      {mode === 'month' && (
        <div className="zdy-calendar-body">
          <div className="zdy-calendar-week-header">
            {WEEK_DAYS.map((day) => (
              <div key={day} className="zdy-calendar-week-day">{day}</div>
            ))}
          </div>
          <div className="zdy-calendar-date-grid">
            {monthDates.map((date, index) => {
              const isCurrentMonth = isSameMonth(date, viewDate);
              const isSelected = isSameDay(date, selectedDate);
              const isDisabled = disabledDate?.(date) ?? false;
              const todayFlag = isToday(date);

              return (
                <div
                  key={index}
                  className={classNames('zdy-calendar-date-cell', {
                    'zdy-calendar-date-cell--other-month': !isCurrentMonth,
                    'zdy-calendar-date-cell--selected': isSelected,
                    'zdy-calendar-date-cell--today': todayFlag,
                    'zdy-calendar-date-cell--disabled': isDisabled
                  })}
                  onClick={() => !isDisabled && handleDateSelect(date)}
                >
                  <div className="zdy-calendar-date-value">{date.getDate()}</div>
                  {dateCellRender && (
                    <div className="zdy-calendar-date-content">{dateCellRender(date)}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 年视图（月份选择） */}
      {mode === 'year' && (
        <div className="zdy-calendar-year-body">
          {MONTHS.map((monthName, monthIndex) => {
            const monthDate = new Date(viewDate.getFullYear(), monthIndex, 1);
            const isSelected = selectedDate.getFullYear() === viewDate.getFullYear() &&
              selectedDate.getMonth() === monthIndex;
            const isCurrentMonth = today.getFullYear() === viewDate.getFullYear() &&
              today.getMonth() === monthIndex;

            return (
              <div
                key={monthIndex}
                className={classNames('zdy-calendar-month-cell', {
                  'zdy-calendar-month-cell--selected': isSelected,
                  'zdy-calendar-month-cell--current': isCurrentMonth
                })}
                onClick={() => handleMonthSelect(monthIndex)}
              >
                <div className="zdy-calendar-month-value">{monthName}</div>
                {monthCellRender && (
                  <div className="zdy-calendar-month-content">{monthCellRender(monthDate)}</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Calendar;
