import React from 'react';
import classNames from 'classnames';

import './Empty.less';
interface EmptyProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Empty: React.FC<EmptyProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-mobile-empty', className)} style={style}>
      {children}
    </div>
  );
};
export default Empty;
