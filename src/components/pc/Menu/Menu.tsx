import React from 'react';
import classNames from 'classnames';

import './Menu.less';
interface MenuProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Menu: React.FC<MenuProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-menu', className)} style={style}>
      {children}
    </div>
  );
};
export default Menu;
