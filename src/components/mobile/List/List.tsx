import React from 'react';
import classNames from 'classnames';

import './List.less';
interface ListProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const List: React.FC<ListProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-mobile-list', className)} style={style}>
      {children}
    </div>
  );
};
export default List;
