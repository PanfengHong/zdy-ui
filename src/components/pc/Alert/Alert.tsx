import React from 'react';
import classNames from 'classnames';

import './Alert.less';
interface AlertProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Alert: React.FC<AlertProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('alert', className)} style={style}>
      {children}
    </div>
  );
};
export default Alert;
