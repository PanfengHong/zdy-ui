import React from 'react';
import classNames from 'classnames';

import './Tree.less';
interface TreeProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Tree: React.FC<TreeProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('tree', className)} style={style}>
      {children}
    </div>
  );
};
export default Tree;
