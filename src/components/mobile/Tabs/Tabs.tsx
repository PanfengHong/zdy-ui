import React from 'react';
import classNames from 'classnames';

import './Tabs.less';
interface TabsProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Tabs: React.FC<TabsProps> = ({
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
export default Tabs;
