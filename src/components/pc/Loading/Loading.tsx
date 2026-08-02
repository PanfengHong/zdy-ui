import React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import classNames from 'classnames';
import type { BaseLoadingProps, LoadingConfig } from './types';

import './Loading.less';

const LoadingIndicator: React.FC<{ size?: 'small' | 'medium' | 'large'; indicator?: React.ReactNode }> = ({
  size = 'medium',
  indicator
}) => {
  if (indicator) {
    return <span className="zdy-loading-custom-indicator">{indicator}</span>;
  }

  return (
    <span className={classNames('zdy-loading-spinner', `zdy-loading-spinner--${size}`)}>
      <svg viewBox="0 0 50 50">
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

const Loading: React.FC<BaseLoadingProps> & {
  show: (config?: LoadingConfig) => void;
  hide: () => void;
} = ({
  loading = false,
  size = 'medium',
  tip,
  fullscreen = false,
  indicator,
  children,
  className,
  style
}) => {
  if (fullscreen) {
    return (
      <div className={classNames('zdy-loading', 'zdy-loading--fullscreen', className)} style={style}>
        <LoadingIndicator size={size} indicator={indicator} />
        {tip && <div className="zdy-loading-text">{tip}</div>}
      </div>
    );
  }

  if (!loading) {
    return <>{children}</>;
  }

  return (
    <div className={classNames('zdy-loading-wrapper', className)} style={style}>
      {children}
      <div className="zdy-loading-mask">
        <LoadingIndicator size={size} indicator={indicator} />
        {tip && <div className="zdy-loading-text">{tip}</div>}
      </div>
    </div>
  );
};

let fullscreenRoot: Root | null = null;
let fullscreenContainer: HTMLDivElement | null = null;

Loading.show = (config?: LoadingConfig) => {
  if (!fullscreenContainer) {
    fullscreenContainer = document.createElement('div');
    document.body.appendChild(fullscreenContainer);
    fullscreenRoot = createRoot(fullscreenContainer);
  }

  fullscreenRoot!.render(
    <div className="zdy-loading-fullscreen-root">
      <Loading
        size={config?.size}
        tip={config?.tip}
        indicator={config?.indicator}
        fullscreen
      />
    </div>
  );
};

Loading.hide = () => {
  if (fullscreenRoot) {
    fullscreenRoot.unmount();
    fullscreenRoot = null;
  }
  if (fullscreenContainer && fullscreenContainer.parentNode) {
    fullscreenContainer.parentNode.removeChild(fullscreenContainer);
    fullscreenContainer = null;
  }
};

export default Loading;