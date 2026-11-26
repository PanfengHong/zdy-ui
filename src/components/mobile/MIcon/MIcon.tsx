import React from 'react';
import classNames from 'classnames';

import './MIcon.less';
interface IconProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const MIcon: React.FC<IconProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-icon-m', className)} style={style}>
      {children}
    </div>
  );
};
export default MIcon;
