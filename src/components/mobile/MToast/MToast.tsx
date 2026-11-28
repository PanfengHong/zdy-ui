import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';
import classNames from 'classnames';

import './MToast.less';
import type { MToastConfig, MToastPosition, MToastProps, MToastType } from './types';

const DEFAULT_DURATION = 2000;
// 与样式表中的退出动画时长保持一致
const ANIMATION_DURATION = 180;

const noop = () => {};

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9.6" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M7.9 12.3l2.7 2.7 5.5-5.8"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CrossIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9.6" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M9.2 9.2l5.6 5.6m0-5.6l-5.6 5.6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const WarningIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9.6" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M12 7.4v5.4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle cx="12" cy="16.4" r="1" fill="currentColor" />
  </svg>
);

const LoadingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeDasharray="42 15"
    />
  </svg>
);

const typeIconMap: Record<Exclude<MToastType, 'info'>, ReactNode> = {
  success: <CheckIcon />,
  error: <CrossIcon />,
  warning: <WarningIcon />,
  loading: <LoadingIcon />
};

interface ToastLayerProps {
  position?: MToastPosition;
  mask?: boolean;
  inline?: boolean;
  children?: ReactNode;
}

const ToastLayer = ({ position = 'center', mask = false, inline = false, children }: ToastLayerProps) => (
  <div
    className={classNames('zdy-mobile-toast-layer', `zdy-mobile-toast-layer--${position}`, {
      'zdy-mobile-toast-layer--inline': inline,
      'zdy-mobile-toast-layer--mask': mask
    })}
  >
    {mask && <div className="zdy-mobile-toast-mask" />}
    <div className="zdy-mobile-toast-group">{children}</div>
  </div>
);

interface ToastPanelProps {
  type?: MToastType;
  content?: ReactNode;
  icon?: ReactNode;
  closing?: boolean;
  className?: string;
  style?: CSSProperties;
}

const ToastPanel = ({
  type = 'info',
  content,
  icon,
  closing = false,
  className,
  style
}: ToastPanelProps) => {
  const hasContent = content !== undefined && content !== null && content !== false && content !== '';
  const customIcon = icon !== undefined;
  const showDefaultIcon = !customIcon && type !== 'info';

  return (
    <div
      className={classNames(
        'zdy-mobile-toast',
        `zdy-mobile-toast--${type}`,
        { 'zdy-mobile-toast--closing': closing },
        className
      )}
      style={style}
      role="status"
    >
      {customIcon && <span className="zdy-mobile-toast-icon">{icon}</span>}
      {showDefaultIcon && (
        <span
          className={classNames(
            'zdy-mobile-toast-icon',
            `zdy-mobile-toast-icon--${type}`
          )}
        >
          {typeIconMap[type as Exclude<MToastType, 'info'>]}
        </span>
      )}
      {hasContent && <div className="zdy-mobile-toast-content">{content}</div>}
    </div>
  );
};

interface ToastItemViewProps {
  config: MToastConfig;
  className?: string;
  style?: CSSProperties;
  onClose: () => void;
}

// 单条提示：负责自动关闭计时与退出动画，图层与位置由外层决定
const ToastItemView = ({ config, className, style, onClose }: ToastItemViewProps) => {
  const { type = 'info', duration } = config;
  const timeout = duration ?? (type === 'loading' ? 0 : DEFAULT_DURATION);
  const [closing, setClosing] = useState(false);

  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!timeout) return;
    const closingTimer = window.setTimeout(() => setClosing(true), timeout);
    const closeTimer = window.setTimeout(
      () => onCloseRef.current(),
      timeout + ANIMATION_DURATION
    );
    return () => {
      window.clearTimeout(closingTimer);
      window.clearTimeout(closeTimer);
    };
  }, [timeout]);

  return (
    <ToastPanel
      type={type}
      content={config.content}
      icon={config.icon}
      closing={closing}
      className={className}
      style={style}
    />
  );
};

interface MToastComponent extends FC<MToastProps> {
  show: (config?: MToastConfig) => void;
  hide: () => void;
  info: (content?: ReactNode, duration?: number) => void;
  success: (content?: ReactNode, duration?: number) => void;
  error: (content?: ReactNode, duration?: number) => void;
  warning: (content?: ReactNode, duration?: number) => void;
  loading: (content?: ReactNode, duration?: number) => void;
}

const MToast = (({
  visible,
  type = 'info',
  position = 'center',
  duration,
  mask = false,
  icon,
  content,
  children,
  inline = false,
  onClose,
  className,
  style
}: MToastProps) => {
  if (!visible) return null;

  const toast = (
    <ToastLayer position={position} mask={mask} inline={inline}>
      <ToastItemView
        config={{
          type,
          content: content ?? children,
          duration,
          icon,
          mask,
          position
        }}
        className={className}
        style={style}
        onClose={onClose ?? noop}
      />
    </ToastLayer>
  );

  return inline ? toast : createPortal(toast, document.body);
}) as MToastComponent;

// ---------------- 静态方法：页面级轻提示 ----------------

interface ToastItem {
  id: number;
  config: MToastConfig;
}

let toastItems: ToastItem[] = [];
const listeners = new Set<() => void>();
let seed = 0;

const notify = () => {
  listeners.forEach(listener => listener());
};

const removeToast = (id: number) => {
  const target = toastItems.find(item => item.id === id);
  toastItems = toastItems.filter(item => item.id !== id);
  notify();
  target?.config.onClose?.();
};

const positions: MToastPosition[] = ['top', 'center', 'bottom'];

const ToastHost = () => {
  const [list, setList] = useState(toastItems);

  useEffect(() => {
    const listener = () => setList(toastItems);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return (
    <>
      {positions.map(position => {
        const group = list.filter(item => (item.config.position ?? 'center') === position);
        if (!group.length) return null;

        return (
          <ToastLayer
            key={position}
            position={position}
            mask={group.some(item => item.config.mask)}
          >
            {group.map(item => (
              <ToastItemView
                key={item.id}
                config={item.config}
                onClose={() => removeToast(item.id)}
              />
            ))}
          </ToastLayer>
        );
      })}
    </>
  );
};

let hostRoot: Root | null = null;
let hostContainer: HTMLDivElement | null = null;

const ensureHost = () => {
  if (hostRoot) return;
  hostContainer = document.createElement('div');
  hostContainer.setAttribute('data-zdy-toast-host', '');
  document.body.appendChild(hostContainer);
  hostRoot = createRoot(hostContainer);
  hostRoot.render(<ToastHost />);
};

const showToast = (config: MToastConfig = {}) => {
  ensureHost();
  toastItems = [...toastItems, { id: (seed += 1), config }];
  notify();
};

MToast.show = (config?: MToastConfig) => {
  showToast(config);
};

MToast.hide = () => {
  toastItems = [];
  if (hostRoot) {
    hostRoot.unmount();
    hostRoot = null;
  }
  if (hostContainer?.parentNode) {
    hostContainer.parentNode.removeChild(hostContainer);
  }
  hostContainer = null;
};

const createShortcut =
  (type: MToastType) =>
  (content?: ReactNode, duration?: number) => {
    showToast({
      content,
      type,
      duration: duration ?? (type === 'loading' ? 0 : DEFAULT_DURATION)
    });
  };

MToast.info = createShortcut('info');
MToast.success = createShortcut('success');
MToast.error = createShortcut('error');
MToast.warning = createShortcut('warning');
MToast.loading = createShortcut('loading');

export default MToast;
