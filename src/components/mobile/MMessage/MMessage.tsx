import React from 'react';
import classNames from 'classnames';

import './MMessage.less';
interface MessageProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const MMessage: React.FC<MessageProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-mobile-message', className)} style={style}>
      {children}
    </div>
  );
};
export default MMessage;
