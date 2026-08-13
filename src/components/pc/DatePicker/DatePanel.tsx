import React, { useMemo } from 'react';
import classNames from 'classnames';
import { getMonthDates, isSameDay, isSameMonth, isToday, MONTHS, WEEK_DAYS } from '../../../utils/picker-utils';
import Icon from '../Icon/Icon';

export interface DatePanelProps {
  viewDate: Date;
  selectedDate: Date | null;
  disabledDate?: (date: Date) => boolean;
  showToday?: boolean;
  onSelect: (date: Date) => void;
  onViewDateChange: (date: Date) => void;
  className?: string;
}

const DatePanel: React.FC<DatePanelProps> = ({
  viewDate,
  selectedDate,
  disabledDate,
  showToday = true,
  onSelect,
  onViewDateChange,
  className,
}) => {
  const dates = useMemo(() => getMonthDates(viewDate), [viewDate]);
  const title = `${viewDate.getFullYear()}年 ${MONTHS[viewDate.getMonth()]}`;

  const goPrev = () => onViewDateChange(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  const goNext = () => onViewDateChange(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  const goToday = () => {
    const now = new Date();
    onViewDateChange(new Date(now.getFullYear(), now.getMonth(), 1));
    onSelect(now);
  };

  return (
    <div className={classNames('zdy-picker-panel', 'zdy-picker-date-panel', className)}>
      <div className="zdy-picker-panel-header">
        <button className="zdy-picker-panel-btn" onClick={goPrev} title="上个月">
          <Icon type='left' />
        </button>
        <span className="zdy-picker-panel-title">{title}</span>
        <button className="zdy-picker-panel-btn" onClick={goNext} title="下个月">
          <Icon type='right' />
        </button>
      </div>
      <div className="zdy-picker-panel-body">
        <div className="zdy-picker-week-header">
          {WEEK_DAYS.map((d) => (
            <div key={d} className="zdy-picker-week-day">{d}</div>
          ))}
        </div>
        <div className="zdy-picker-date-grid">
          {dates.map((date, i) => {
            const currentMonth = isSameMonth(date, viewDate);
            const selected = isSameDay(date, selectedDate);
            const disabled = disabledDate?.(date) ?? false;
            const todayFlag = isToday(date);
            return (
              <div
                key={i}
                className={classNames('zdy-picker-date-cell', {
                  'zdy-picker-date-cell--other': !currentMonth,
                  'zdy-picker-date-cell--selected': selected,
                  'zdy-picker-date-cell--today': todayFlag,
                  'zdy-picker-date-cell--disabled': disabled,
                })}
                onClick={() => !disabled && onSelect(date)}
              >
                {date.getDate()}
              </div>
            );
          })}
        </div>
      </div>
      {showToday && (
        <div className="zdy-picker-panel-footer">
          <button className="zdy-picker-footer-btn" onClick={goToday}>今天</button>
        </div>
      )}
    </div>
  );
};

export default DatePanel;
