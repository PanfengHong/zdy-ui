import React from 'react';

export type MessageType = 'success' | 'info' | 'warning' | 'error';

export interface MessageConfig {
  content: React.ReactNode;
  type?: MessageType;
  duration?: number;
  closable?: boolean;
  onClose?: () => void;
}
