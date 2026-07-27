import React from 'react';
import classNames from 'classnames';

import './DateTimePicker.less';
interface DateTimePickerProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const DateTimePicker: React.FC<DateTimePickerProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-mobile-datetimepicker', className)} style={style}>
      {children}
    </div>
  );
};
export default DateTimePicker;
