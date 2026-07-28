import React, { useEffect } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import classNames from 'classnames';
import type { MessageType, MessageConfig } from '../../../types';

import './Message.less';

interface MessageItemProps extends MessageConfig {
  id: number;
  onRemove: (id: number) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({
  id,
  content,
  type = 'info',
  duration = 3000,
  closable = true,
  onRemove,
  onClose: onCloseProp
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

  const handleClose = () => {
    onRemove(id);
    onCloseProp?.();
  };

  const iconMap: Record<MessageType, React.ReactNode> = {
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
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
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
    <div className={classNames('zdy-message', `zdy-message--${type}`)}>
      <span className="zdy-message-icon">{iconMap[type]}</span>
      <span className="zdy-message-content">{content}</span>
      {closable && (
        <button className="zdy-message-close" onClick={handleClose}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
};

interface MessageContainerProps {
  messages: MessageItemProps[];
}

const MessageContainer: React.FC<MessageContainerProps> = ({ messages }) => {
  return (
    <div className="zdy-message-container">
      {messages.map(msg => (
        <MessageItem key={msg.id} {...msg} />
      ))}
    </div>
  );
};

let messageId = 0;
const messages: MessageItemProps[] = [];
let containerRef: HTMLDivElement | null = null;
let rootRef: Root | null = null;

const render = () => {
  if (!rootRef) {
    containerRef = document.createElement('div');
    document.body.appendChild(containerRef);
    rootRef = createRoot(containerRef);
  }
  
  rootRef.render(
    <MessageContainer messages={messages} />
  );
};

const createMessage = (config: MessageConfig | string) => {
  const id = ++messageId;
  
  const removeMessage = (removeId: number) => {
    const index = messages.findIndex(m => m.id === removeId);
    if (index > -1) {
      messages.splice(index, 1);
      render();
    }
  };
  
  const message: MessageItemProps = {
    id,
    content: typeof config === 'string' ? config : config.content,
    type: typeof config === 'string' ? 'info' : config.type || 'info',
    duration: typeof config === 'string' ? 3000 : config.duration || 3000,
    closable: typeof config === 'string' ? true : config.closable !== undefined ? config.closable : true,
    onRemove: removeMessage,
    onClose: typeof config === 'string' ? undefined : config.onClose
  };
  
  messages.push(message);
  render();
  
  return {
    id,
    close: () => removeMessage(id)
  };
};

const Message = {
  success: (config: MessageConfig | string) => createMessage({ ...(typeof config === 'string' ? { content: config } : config), type: 'success' }),
  info: (config: MessageConfig | string) => createMessage({ ...(typeof config === 'string' ? { content: config } : config), type: 'info' }),
  warning: (config: MessageConfig | string) => createMessage({ ...(typeof config === 'string' ? { content: config } : config), type: 'warning' }),
  error: (config: MessageConfig | string) => createMessage({ ...(typeof config === 'string' ? { content: config } : config), type: 'error' }),
  loading: (config: MessageConfig | string) => createMessage({ ...(typeof config === 'string' ? { content: config } : config), type: 'info', duration: 0 }),
  closeAll: () => {
    messages.length = 0;
    render();
  }
};

export default Message;