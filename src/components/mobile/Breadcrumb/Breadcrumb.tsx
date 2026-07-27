import React from 'react';
import classNames from 'classnames';

import './Breadcrumb.less';
interface BreadcrumbProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Breadcrumb: React.FC<BreadcrumbProps> = ({
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
export default Breadcrumb;
