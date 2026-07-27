import React from 'react';
import classNames from 'classnames';

import './Table.less';
interface TableProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Table: React.FC<TableProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-mobile-table', className)} style={style}>
      {children}
    </div>
  );
};
export default Table;
