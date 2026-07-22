import React from 'react';
import classNames from 'classnames';

import './Calendar.less';
interface CalendarProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Calendar: React.FC<CalendarProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('calendar', className)} style={style}>
      {children}
    </div>
  );
};
export default Calendar;
