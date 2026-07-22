import React from 'react';
import classNames from 'classnames';
import type { BaseButtonProps } from '../../../types';

import './Button.less';
const Button: React.FC<BaseButtonProps> = ({
  type = 'default',
  size = 'medium',
  shape,
  disabled = false,
  loading = false,
  onClick,
  className = '',
  style,
  children
}) => {

  return (
    <button
      className={classNames(
        'zdy-button',
        `zdy-button--${type}`,
        `zdy-button--${size}`,
        {[`zdy-button--shape-${shape}`]: shape},
        {'zdy-button--disabled': disabled},
        {'zdy-button--loading': loading},
        className
      )}
      style={style}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <span className="zdy-button-loading-icon">⏳</span>}
      {children}
    </button>
  );
};
export default Button;
