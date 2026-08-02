import React from 'react';

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export interface NotificationConfig {
  message: React.ReactNode;
  description?: React.ReactNode;
  type?: NotificationType;
  duration?: number;
  closable?: boolean;
  placement?: NotificationPlacement;
  onClose?: () => void;
  onClick?: () => void;
  btn?: React.ReactNode;
  notificationKey?: string;
}
