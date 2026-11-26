import React from 'react';

import './MMenu.less';
interface MenuProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const MMenu: React.FC<MenuProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};
export default MMenu;
