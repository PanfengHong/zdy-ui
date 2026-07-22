import React from 'react';
import classNames from 'classnames';

import './Notification.less';
interface NotificationProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Notification: React.FC<NotificationProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('notification', className)} style={style}>
      {children}
    </div>
  );
};
export default Notification;
