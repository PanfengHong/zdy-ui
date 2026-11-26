import React from 'react';
import classNames from 'classnames';

import './MTree.less';
interface TreeProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const MTree: React.FC<TreeProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-mobile-tree', className)} style={style}>
      {children}
    </div>
  );
};
export default MTree;
