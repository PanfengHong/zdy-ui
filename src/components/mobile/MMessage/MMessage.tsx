import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';
import classNames from 'classnames';

import './MMessage.less';
import type {
  MMessageConfig,
  MMessageGlobalConfig,
  MMessageProps,
  MMessageType
} from './types';

const DEFAULT_DURATION = 3000;
// 与样式表中的退出动画时长保持一致
const ANIMATION_DURATION = 200;

const noop = () => {};

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 10.8v5.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="7.8" r="1" fill="currentColor" />
  </svg>
);

const SuccessIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M8 12.3l2.7 2.7 5.5-5.8"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WarningIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 7.8v5.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="16.4" r="1" fill="currentColor" />
  </svg>
);

const ErrorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M9.2 9.2l5.6 5.6m0-5.6l-5.6 5.6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const typeIconMap: Record<MMessageType, ReactNode> = {
  info: <InfoIcon />,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />
};

interface MessageLayerProps {
  inline?: boolean;
  children?: ReactNode;
}

const MessageLayer = ({ inline = false, children }: MessageLayerProps) => (
  <div
    className={classNames('zdy-mobile-message-layer', {
      'zdy-mobile-message-layer--inline': inline
    })}
  >
    <div className="zdy-mobile-message-group">{children}</div>
  </div>
);

interface MessagePanelProps {
  type?: MMessageType;
  content?: ReactNode;
  showIcon?: boolean;
  closable?: boolean;
  closing?: boolean;
  className?: string;
  style?: CSSProperties;
  onClose: () => void;
}

const MessagePanel = ({
  type = 'info',
  content,
  showIcon = true,
  closable = true,
  closing = false,
  className,
  style,
  onClose
}: MessagePanelProps) => (
  <div
    className={classNames(
      'zdy-mobile-message',
      `zdy-mobile-message--${type}`,
      { 'zdy-mobile-message--closing': closing },
      className
    )}
    style={style}
    role="status"
  >
    {showIcon && <span className="zdy-mobile-message-icon">{typeIconMap[type]}</span>}
    {content !== undefined && content !== null && content !== false && content !== '' && (
      <div className="zdy-mobile-message-content">{content}</div>
    )}
    {closable && (
      <button
        type="button"
        className="zdy-mobile-message-close"
        onClick={onClose}
        aria-label="关闭提示"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M7 7l10 10M17 7L7 17"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>
    )}
  </div>
);

interface MessageItemViewProps {
  config: MMessageConfig;
  className?: string;
  style?: CSSProperties;
  onClose: () => void;
}

// 单条横幅：负责自动关闭计时与退出动画，位置由外层图层决定
const MessageItemView = ({ config, className, style, onClose }: MessageItemViewProps) => {
  const { duration = DEFAULT_DURATION } = config;
  const [closing, setClosing] = useState(false);

  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!duration) return;
    const closingTimer = window.setTimeout(() => setClosing(true), duration);
    const closeTimer = window.setTimeout(
      () => onCloseRef.current(),
      duration + ANIMATION_DURATION
    );
    return () => {
      window.clearTimeout(closingTimer);
      window.clearTimeout(closeTimer);
    };
  }, [duration]);

  return (
    <MessagePanel
      type={config.type}
      content={config.content}
      showIcon={config.showIcon}
      closable={config.closable}
      closing={closing}
      className={className}
      style={style}
      onClose={onClose}
    />
  );
};

interface MMessageComponent extends FC<MMessageProps> {
  show: (config?: MMessageConfig) => void;
  hide: () => void;
  config: (options?: MMessageGlobalConfig) => void;
  info: (content?: ReactNode, duration?: number) => void;
  success: (content?: ReactNode, duration?: number) => void;
  warning: (content?: ReactNode, duration?: number) => void;
  error: (content?: ReactNode, duration?: number) => void;
}

const MMessage = (({
  visible,
  type = 'info',
  duration,
  showIcon = true,
  closable = true,
  content,
  children,
  inline = false,
  onClose,
  className,
  style
}: MMessageProps) => {
  if (!visible) return null;

  const message = (
    <MessageLayer inline={inline}>
      <MessageItemView
        config={{
          type,
          content: content ?? children,
          duration,
          showIcon,
          closable
        }}
        className={className}
        style={style}
        onClose={onClose ?? noop}
      />
    </MessageLayer>
  );

  return inline ? message : createPortal(message, document.body);
}) as MMessageComponent;

// ---------------- 静态方法：页面级顶部横幅 ----------------

interface MessageItem {
  id: number;
  config: MMessageConfig;
}

let messages: MessageItem[] = [];
const listeners = new Set<() => void>();
let seed = 0;
let getContainer: () => HTMLElement = () => document.body;
let hostInline = false;

const notify = () => {
  listeners.forEach(listener => listener());
};

const removeMessage = (id: number) => {
  const target = messages.find(item => item.id === id);
  messages = messages.filter(item => item.id !== id);
  notify();
  target?.config.onClose?.();
};

const MessageHost = () => {
  const [list, setList] = useState(messages);

  useEffect(() => {
    const listener = () => setList(messages);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return (
    <MessageLayer inline={hostInline}>
      {list.map(item => (
        <MessageItemView
          key={item.id}
          config={item.config}
          onClose={() => removeMessage(item.id)}
        />
      ))}
    </MessageLayer>
  );
};

let hostRoot: Root | null = null;
let hostContainer: HTMLDivElement | null = null;

const ensureHost = () => {
  if (hostRoot) return;
  hostContainer = document.createElement('div');
  hostContainer.setAttribute('data-zdy-message-host', '');
  (getContainer() || document.body).appendChild(hostContainer);
  hostRoot = createRoot(hostContainer);
  hostRoot.render(<MessageHost />);
};

const showMessage = (config: MMessageConfig = {}) => {
  ensureHost();
  messages = [...messages, { id: (seed += 1), config }];
  notify();
};

MMessage.show = (config?: MMessageConfig) => {
  showMessage(config);
};

MMessage.hide = () => {
  messages = [];
  if (hostRoot) {
    hostRoot.unmount();
    hostRoot = null;
  }
  if (hostContainer?.parentNode) {
    hostContainer.parentNode.removeChild(hostContainer);
  }
  hostContainer = null;
};

MMessage.config = (options?: MMessageGlobalConfig) => {
  // 更换容器时先清理已有横幅，下一次 show 在新容器中挂载
  if (hostRoot) MMessage.hide();
  getContainer = options?.getContainer ?? (() => document.body);
  hostInline = Boolean(options?.getContainer);
};

const createShortcut =
  (type: MMessageType) =>
  (content?: ReactNode, duration?: number) => {
    showMessage({ content, type, duration: duration ?? DEFAULT_DURATION });
  };

MMessage.info = createShortcut('info');
MMessage.success = createShortcut('success');
MMessage.warning = createShortcut('warning');
MMessage.error = createShortcut('error');

export default MMessage;
