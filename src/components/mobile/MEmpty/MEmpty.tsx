import React from 'react';
import classNames from 'classnames';

import './MEmpty.less';
interface EmptyProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const MEmpty: React.FC<EmptyProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-mobile-empty', className)} style={style}>
      {children}
    </div>
  );
};
export default MEmpty;
