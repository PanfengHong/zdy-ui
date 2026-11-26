import React from 'react';
import classNames from 'classnames';

import './MTabs.less';
interface TabsProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const MTabs: React.FC<TabsProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-mobile-tabs', className)} style={style}>
      {children}
    </div>
  );
};
export default MTabs;
