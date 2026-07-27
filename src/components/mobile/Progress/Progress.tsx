import React from 'react';
import classNames from 'classnames';

import './Progress.less';
interface ProgressProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Progress: React.FC<ProgressProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-mobile-progress', className)} style={style}>
      {children}
    </div>
  );
};
export default Progress;
