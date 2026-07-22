import React from 'react';
import classNames from 'classnames';

import './Pagination.less';
interface PaginationProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Pagination: React.FC<PaginationProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('pagination', className)} style={style}>
      {children}
    </div>
  );
};
export default Pagination;
