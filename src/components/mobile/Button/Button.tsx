import React from 'react';
import classNames from 'classnames';
import type { BaseButtonProps } from '../../../types';

import './Button.less';
const Button: React.FC<BaseButtonProps> = ({
  type = 'default',
  size = 'medium',
  shape = 'default',
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
        'zdy-mobile-button',
        `zdy-mobile-button--${type}`,
        `zdy-mobile-button--${size}`,
        {[`zdy-mobile-button--shape-${shape}`]: shape !== 'default'},
        {'zdy-mobile-button--disabled': disabled},
        {'zdy-mobile-button--loading': loading},
        className
      )}
      style={style}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <span className="zdy-button-m--loading-icon">⏳</span>}
      {children}
    </button>
  );
};
export default Button;
