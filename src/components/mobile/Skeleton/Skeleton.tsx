import React from 'react';
import classNames from 'classnames';

import './Skeleton.less';
interface SkeletonProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Skeleton: React.FC<SkeletonProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-mobile-skeleton', className)} style={style}>
      {children}
    </div>
  );
};
export default Skeleton;
