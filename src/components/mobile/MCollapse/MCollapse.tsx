import React from 'react';
import classNames from 'classnames';

import './MCollapse.less';
interface CollapseProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const MCollapse: React.FC<CollapseProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-mobile-collapse', className)} style={style}>
      {children}
    </div>
  );
};
export default MCollapse;
