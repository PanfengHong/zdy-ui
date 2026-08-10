import React from 'react';
import classNames from 'classnames';
import type { BaseButtonProps } from './types';
import Icon from '../Icon/Icon';

import './Button.less';
const Button: React.FC<BaseButtonProps> = ({
  type = 'default',
  size = 'medium',
  shape,
  disabled = false,
  loading = false,
  prefix,
  suffix,
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
      {loading && <Icon type="loading" size={20} spin className="zdy-button--loading-icon" />}
      {prefix && <span className="zdy-button-prefix">{prefix}</span>}
      {children}
      {suffix && <span className="zdy-button-suffix">{suffix}</span>}
    </button>
  );
};
export default Button;
