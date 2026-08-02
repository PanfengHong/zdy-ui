import React, { useEffect } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import classNames from 'classnames';
import type { NotificationConfig, NotificationType, NotificationPlacement } from './types';

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
    success: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    info: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
    warning: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    error: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    )
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
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
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
    onRemove: removeNotification,
    onClose: typeof config === 'string' ? undefined : config.onClose,
    onClick: typeof config === 'string' ? undefined : config.onClick,
    btn: typeof config === 'string' ? undefined : config.btn
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