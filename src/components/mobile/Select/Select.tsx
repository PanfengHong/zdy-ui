import React from 'react';
import classNames from 'classnames';

import './Select.less';
interface SelectProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Select: React.FC<SelectProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-mobile-select', className)} style={style}>
      {children}
    </div>
  );
};
export default Select;
