import React from 'react';
import classNames from 'classnames';

import './MSwitch.less';
interface SwitchProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const MSwitch: React.FC<SwitchProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-mobile-switch', className)} style={style}>
      {children}
    </div>
  );
};
export default MSwitch;
