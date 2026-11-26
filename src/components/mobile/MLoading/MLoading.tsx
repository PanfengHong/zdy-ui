import React from 'react';
import classNames from 'classnames';

import './MLoading.less';
interface LoadingProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const MLoading: React.FC<LoadingProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-mobile-loading', className)} style={style}>
      {children}
    </div>
  );
};
export default MLoading;
