import React, { useState } from 'react';
import classNames from 'classnames';
import type { BaseAlertProps, AlertType } from './types';
import Icon from '../Icon/Icon';


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
          {type === 'success' && (<Icon type="confirm" size={16} />)}
          {type === 'info' && (<Icon type="info" size={16} />)}
          {type === 'warning' && (<Icon type="warning" size={16} />)}
          {type === 'error' && (<Icon type="error" size={16} />)}
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