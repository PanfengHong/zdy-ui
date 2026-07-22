import React from 'react';
import classNames from 'classnames';

import './Switch.less';
interface SwitchProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Switch: React.FC<SwitchProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('switch', className)} style={style}>
      {children}
    </div>
  );
};
export default Switch;
