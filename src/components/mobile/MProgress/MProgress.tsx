import React from 'react';
import classNames from 'classnames';

import './MProgress.less';
interface ProgressProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const MProgress: React.FC<ProgressProps> = ({
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
export default MProgress;
