import React from 'react';
import classNames from 'classnames';

import './Message.less';
interface MessageProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Message: React.FC<MessageProps> = ({
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
export default Message;
