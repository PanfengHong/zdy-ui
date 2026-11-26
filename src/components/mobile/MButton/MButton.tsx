import React from 'react';
import classNames from 'classnames';
import { Icon } from '../../pc';
import type { BaseButtonProps } from '../../../types';
import './MButton.less';

const MButton: React.FC<BaseButtonProps> = ({
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
      {loading &&  <Icon type="loading" size={20} spin className="zdy-button--loading-icon" />}
      <span className="zdy-mobile-button-content">{children}</span>
    </button>
  );
};
export default MButton;
