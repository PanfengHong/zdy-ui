import type { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';
import classNames from 'classnames';

import './MLoading.less';
import type { MLoadingConfig, MLoadingProps, MLoadingSize } from './types';

interface LoadingIndicatorProps {
  size?: MLoadingSize;
  indicator?: ReactNode;
}

const LoadingIndicator = ({ size = 'medium', indicator }: LoadingIndicatorProps) => {
  if (indicator) {
    return <span className="zdy-mobile-loading-indicator">{indicator}</span>;
  }

  return (
    <span
      className={classNames(
        'zdy-mobile-loading-spinner',
        `zdy-mobile-loading-spinner--${size}`
      )}
    >
      <svg viewBox="0 0 50 50" aria-hidden="true">
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="80 46"
        />
      </svg>
    </span>
  );
};

interface LoadingContentProps {
  size?: MLoadingSize;
  tip?: ReactNode;
  indicator?: ReactNode;
}

const LoadingContent = ({ size, tip, indicator }: LoadingContentProps) => (
  <div className="zdy-mobile-loading-content" role="status" aria-live="polite">
    <LoadingIndicator size={size} indicator={indicator} />
    {tip !== undefined && tip !== null && (
      <div className="zdy-mobile-loading-tip">{tip}</div>
    )}
  </div>
);

interface MLoadingComponent extends FC<MLoadingProps> {
  show: (config?: MLoadingConfig) => void;
  hide: () => void;
}

const MLoading = (({
  loading,
  size = 'medium',
  tip,
  indicator,
  fullscreen = false,
  inline = false,
  children,
  className = '',
  style
}: MLoadingProps) => {
  // fullscreen 模式下不传 loading 时默认展示
  const isLoading = loading ?? fullscreen;

  if (fullscreen) {
    if (!isLoading) return <>{children}</>;

    const overlay = (
      <div
        className={classNames(
          'zdy-mobile-loading-root',
          { 'zdy-mobile-loading-root--inline': inline },
          className
        )}
        style={style}
      >
        <LoadingContent size={size} tip={tip} indicator={indicator} />
      </div>
    );
    return inline ? overlay : createPortal(overlay, document.body);
  }

  if (!isLoading) {
    return <>{children}</>;
  }

  if (children === undefined || children === null) {
    return (
      <div className={classNames('zdy-mobile-loading', className)} style={style}>
        <LoadingContent size={size} tip={tip} indicator={indicator} />
      </div>
    );
  }

  return (
    <div
      className={classNames('zdy-mobile-loading-wrapper', className)}
      style={style}
      aria-busy="true"
    >
      {children}
      <div className="zdy-mobile-loading-mask">
        <LoadingContent size={size} tip={tip} indicator={indicator} />
      </div>
    </div>
  );
}) as MLoadingComponent;

let fullscreenRoot: Root | null = null;
let fullscreenContainer: HTMLDivElement | null = null;

MLoading.show = (config?: MLoadingConfig) => {
  if (!fullscreenContainer) {
    fullscreenContainer = document.createElement('div');
    document.body.appendChild(fullscreenContainer);
    fullscreenRoot = createRoot(fullscreenContainer);
  }

  fullscreenRoot!.render(
    <MLoading
      fullscreen
      size={config?.size}
      tip={config?.tip}
      indicator={config?.indicator}
    />
  );
};

MLoading.hide = () => {
  if (fullscreenRoot) {
    fullscreenRoot.unmount();
    fullscreenRoot = null;
  }
  if (fullscreenContainer && fullscreenContainer.parentNode) {
    fullscreenContainer.parentNode.removeChild(fullscreenContainer);
    fullscreenContainer = null;
  }
};

export default MLoading;
