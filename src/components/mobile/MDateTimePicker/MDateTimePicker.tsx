import React from 'react';
import classNames from 'classnames';

import './MDateTimePicker.less';
interface DateTimePickerProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const MDateTimePicker: React.FC<DateTimePickerProps> = ({
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
export default MDateTimePicker;
