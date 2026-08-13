import React, { useEffect } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import classNames from 'classnames';
import type { NotificationConfig, NotificationType, NotificationPlacement } from './types';
import Icon from '../Icon/Icon';

import './Notification.less';

interface NotificationItemProps extends NotificationConfig {
  id: number;
  onRemove: (id: number) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  id,
  message,
  description,
  type = 'info',
  duration = 4500,
  closable = true,
  onRemove,
  onClose: onCloseProp,
  onClick,
  btn
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onRemove(id);
        onCloseProp?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, id, onRemove, onCloseProp]);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(id);
    onCloseProp?.();
  };

  const handleClick = () => {
    onClick?.();
  };

  const iconMap: Record<NotificationType, React.ReactNode> = {
    success: (<Icon type='confirm' />),
    info: (<Icon type='info' />),
    warning: (<Icon type='warning' />),
    error: (<Icon type='error' />)
  };

  return (
    <div
      className={classNames('zdy-notification', `zdy-notification--${type}`)}
      onClick={handleClick}
    >
      <span className="zdy-notification-icon">{iconMap[type]}</span>
      <div className="zdy-notification-content">
        <div className="zdy-notification-message">{message}</div>
        {description && (
          <div className="zdy-notification-description">{description}</div>
        )}
        {btn && <div className="zdy-notification-btn">{btn}</div>}
      </div>
      {closable && (
        <button className="zdy-notification-close" onClick={handleClose}>
          <Icon type='close' size={'sm'} />
        </button>
      )}
    </div>
  );
};

interface NotificationContainerProps {
  messages: NotificationItemProps[];
  placement: NotificationPlacement;
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({ messages, placement }) => {
  return (
    <div className={classNames('zdy-notification-container', `zdy-notification-container--${placement}`)}>
      {messages.map(msg => (
        <NotificationItem key={msg.id} {...msg} />
      ))}
    </div>
  );
};

interface NotificationHolder {
  messages: NotificationItemProps[];
  containerRef: HTMLDivElement | null;
  rootRef: Root | null;
}

const holders: Record<string, NotificationHolder> = {};

const getHolder = (placement: NotificationPlacement) => {
  if (!holders[placement]) {
    holders[placement] = {
      messages: [],
      containerRef: null,
      rootRef: null
    };
  }
  return holders[placement];
};

const render = (placement: NotificationPlacement) => {
  const holder = getHolder(placement);
  if (!holder.rootRef) {
    holder.containerRef = document.createElement('div');
    document.body.appendChild(holder.containerRef);
    holder.rootRef = createRoot(holder.containerRef);
  }
  
  holder.rootRef.render(
    <NotificationContainer messages={holder.messages} placement={placement} />
  );
};

let notificationId = 0;

const createNotification = (config: NotificationConfig | string) => {
  const id = ++notificationId;
  const placement = (typeof config === 'string' ? 'topRight' : config.placement) || 'topRight';
  const holder = getHolder(placement);
  
  const removeNotification = (removeId: number) => {
    const index = holder.messages.findIndex(m => m.id === removeId);
    if (index > -1) {
      holder.messages.splice(index, 1);
      render(placement);
    }
  };
  
  const message: NotificationItemProps = {
    id,
    message: typeof config === 'string' ? config : config.message,
    description: typeof config === 'string' ? undefined : config.description,
    type: typeof config === 'string' ? 'info' : config.type || 'info',
    duration: typeof config === 'string' ? 4500 : config.duration ?? 4500,
    closable: typeof config === 'string' ? true : config.closable !== undefined ? config.closable : true,
    btn: typeof config === 'string' ? undefined : config.btn,
    onRemove: removeNotification,
    onClose: typeof config === 'string' ? undefined : config.onClose,
    onClick: typeof config === 'string' ? undefined : config.onClick
  };
  
  holder.messages.push(message);
  render(placement);
  
  return {
    id,
    close: () => removeNotification(id)
  };
};

const Notification = {
  success: (config: NotificationConfig | string) => createNotification({ ...(typeof config === 'string' ? { message: config } : config), type: 'success' }),
  info: (config: NotificationConfig | string) => createNotification({ ...(typeof config === 'string' ? { message: config } : config), type: 'info' }),
  warning: (config: NotificationConfig | string) => createNotification({ ...(typeof config === 'string' ? { message: config } : config), type: 'warning' }),
  error: (config: NotificationConfig | string) => createNotification({ ...(typeof config === 'string' ? { message: config } : config), type: 'error' }),
  open: (config: NotificationConfig | string) => createNotification(config),
  close: (key: string) => {
    Object.values(holders).forEach(holder => {
      const index = holder.messages.findIndex(m => m.notificationKey === key);
      if (index > -1) {
        holder.messages.splice(index, 1);
      }
    });
    Object.keys(holders).forEach(placement => {
      render(placement as NotificationPlacement);
    });
  }
};

export default Notification;