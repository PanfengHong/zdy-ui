import React from 'react';
import classNames from 'classnames';

import './Collapse.less';
interface CollapseProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Collapse: React.FC<CollapseProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('collapse', className)} style={style}>
      {children}
    </div>
  );
};
export default Collapse;
