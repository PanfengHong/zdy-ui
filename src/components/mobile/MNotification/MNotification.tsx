import React from 'react';
import classNames from 'classnames';

import './MNotification.less';
interface NotificationProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const MNotification: React.FC<NotificationProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-mobile-notification', className)} style={style}>
      {children}
    </div>
  );
};
export default MNotification;
