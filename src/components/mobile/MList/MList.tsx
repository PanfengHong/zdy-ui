import React from 'react';
import classNames from 'classnames';

import './MList.less';
interface ListProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const MList: React.FC<ListProps> = ({
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
export default MList;
