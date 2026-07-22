import React from 'react';
import classNames from 'classnames';

import './Checkbox.less';
interface CheckboxProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Checkbox: React.FC<CheckboxProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('checkbox', className)} style={style}>
      {children}
    </div>
  );
};
export default Checkbox;
