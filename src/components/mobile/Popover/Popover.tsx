import React from 'react';
import classNames from 'classnames';

import './Popover.less';
interface PopoverProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Popover: React.FC<PopoverProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-mobile-popover', className)} style={style}>
      {children}
    </div>
  );
};
export default Popover;
