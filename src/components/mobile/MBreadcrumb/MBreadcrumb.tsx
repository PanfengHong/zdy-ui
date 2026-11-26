import React from 'react';
import classNames from 'classnames';

import './MBreadcrumb.less';
interface BreadcrumbProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const MBreadcrumb: React.FC<BreadcrumbProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-mobile-breadcrumb', className)} style={style}>
      {children}
    </div>
  );
};
export default MBreadcrumb;
