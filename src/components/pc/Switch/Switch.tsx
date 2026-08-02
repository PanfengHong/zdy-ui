import { useState } from 'react';
import classNames from 'classnames';
import type { BaseSwitchProps } from './types';

import './Switch.less';

const Switch = ({
  checked: checkedProp,
  defaultChecked = false,
  onChange,
  disabled = false,
  size = 'medium',
  className,
  style
}: BaseSwitchProps) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = checkedProp !== undefined;
  const isChecked = isControlled ? checkedProp : internalChecked;

  const handleClick = () => {
    if (disabled) return;
    const newValue = !isChecked;
    if (!isControlled) {
      setInternalChecked(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <div
      className={classNames(
        'zdy-switch',
        `zdy-switch--${size}`,
        { 'zdy-switch--checked': isChecked },
        { 'zdy-switch--disabled': disabled },
        className
      )}
      style={style}
      onClick={handleClick}
    >
      <div className="zdy-switch-inner">
        <div className="zdy-switch-thumb" />
      </div>
      {isChecked && <span className="zdy-switch-label">ON</span>}
      {!isChecked && <span className="zdy-switch-label">OFF</span>}
    </div>
  );
};

export default Switch;
