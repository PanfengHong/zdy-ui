import { useState } from 'react';
import classNames from 'classnames';
import Icon from '../../pc/Icon/Icon';
import type { MSwitchProps } from './types';

import './MSwitch.less';

const MSwitch = ({
  checked: checkedProp,
  defaultChecked = false,
  onChange,
  disabled = false,
  loading = false,
  size = 'medium',
  label,
  description,
  'aria-label': ariaLabel,
  className = '',
  style
}: MSwitchProps) => {
  const [innerChecked, setInnerChecked] = useState(defaultChecked);
  const isControlled = checkedProp !== undefined;
  const isChecked = isControlled ? checkedProp : innerChecked;
  const isRow = label !== undefined && label !== null;

  const handleClick = () => {
    if (disabled || loading) return;

    const nextChecked = !isChecked;
    if (!isControlled) setInnerChecked(nextChecked);
    onChange?.(nextChecked);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      aria-label={isRow ? undefined : ariaLabel}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={classNames(
        'zdy-mobile-switch',
        `zdy-mobile-switch--${size}`,
        {
          'zdy-mobile-switch--checked': isChecked,
          'zdy-mobile-switch--disabled': disabled,
          'zdy-mobile-switch--loading': loading,
          'zdy-mobile-switch--row': isRow
        },
        className
      )}
      style={style}
      onClick={handleClick}
    >
      {isRow && (
        <span className="zdy-mobile-switch-content">
          <span className="zdy-mobile-switch-label">{label}</span>
          {description ? (
            <span className="zdy-mobile-switch-desc">{description}</span>
          ) : null}
        </span>
      )}

      <span className="zdy-mobile-switch-track" aria-hidden="true">
        <span className="zdy-mobile-switch-thumb">
          {loading ? (
            <Icon type="loading" size={12} className="zdy-mobile-switch-spinner" />
          ) : null}
        </span>
      </span>
    </button>
  );
};

export default MSwitch;
