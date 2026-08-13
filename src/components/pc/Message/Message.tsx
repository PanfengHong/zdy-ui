import React, { useEffect } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import classNames from 'classnames';
import type { MessageType, MessageConfig } from './types';
import Icon from '../Icon/Icon';

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
    success: (<Icon type='confirm' />),
    info: (<Icon type='info' />),
    warning: (<Icon type='warning' />),
    error: (<Icon type='error' />)
  };

  return (
    <div className={classNames('zdy-message', `zdy-message--${type}`)}>
      <span className="zdy-message-icon">{iconMap[type]}</span>
      <span className="zdy-message-content">{content}</span>
      {closable && (
        <button className="zdy-message-close" onClick={handleClose}>
          <Icon type='close' size={'sm'} />
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
    duration: typeof config === 'string' ? 3000 : config.duration ?? 3000,
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