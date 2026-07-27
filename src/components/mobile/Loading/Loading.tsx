import React from 'react';
import classNames from 'classnames';

import './Loading.less';
interface LoadingProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Loading: React.FC<LoadingProps> = ({
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
export default Loading;
