import React, { useState } from 'react';
import classNames from 'classnames';
import type { BaseAlertProps, AlertType } from '../../../types';

import './Alert.less';

const Alert: React.FC<BaseAlertProps> = ({
  type = 'info',
  title,
  message,
  closable = false,
  showIcon = true,
  onClose,
  className = '',
  style,
  children
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const iconColorMap: Record<AlertType, string> = {
    success: '#52c41a',
    info: '#1890ff',
    warning: '#faad14',
    error: '#f5222d'
  };

  if (!isVisible) return null;

  return (
    <div
      className={classNames(
        'zdy-alert',
        `zdy-alert--${type}`,
        { 'zdy-alert--closable': closable },
        { 'zdy-alert--no-icon': !showIcon },
        className
      )}
      style={style}
    >
      {showIcon && (
        <span className="zdy-alert-icon" style={{ color: iconColorMap[type] }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {type === 'success' && (
              <polyline points="20 6 9 17 4 12" />
            )}
            {type === 'info' && (
              <>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </>
            )}
            {type === 'warning' && (
              <>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </>
            )}
            {type === 'error' && (
              <>
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </>
            )}
          </svg>
        </span>
      )}

      <div className="zdy-alert-content">
        {title && <h4 className="zdy-alert-title">{title}</h4>}
        {(message || children) && (
          <p className="zdy-alert-message">
            {message || children}
          </p>
        )}
      </div>

      {closable && (
        <button
          type="button"
          className="zdy-alert-close-icon"
          onClick={handleClose}
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Alert;