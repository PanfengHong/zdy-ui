import { forwardRef } from 'react';
import classNames from 'classnames';
import type { BaseInputProps } from '../../../types';

import './Input.less';
const Input = forwardRef<HTMLInputElement, BaseInputProps>(({
  type = 'text',
  size = 'medium',
  placeholder,
  disabled = false,
  value,
  onChange,
  prefix,
  suffix,
  className = '',
  style
}, ref) => {

  return (
    <div className={classNames(
      'zdy-mobile-input-wrapper',
      `zdy-mobile-input-wrapper--${size}`,
      {'zdy-mobile-input-wrapper--disabled': disabled},
      {'zdy-mobile-input-wrapper--prefix': prefix},
      {'zdy-mobile-input-wrapper--suffix': suffix},
      className
    )} style={style}>
      {prefix && <span className="zdy-mobile-input__prefix">{prefix}</span>}
      <input
        ref={ref}
        type={type}
        className="zdy-mobile-input"
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
      />
      {suffix && <span className="zdy-mobile-input__suffix">{suffix}</span>}
    </div>
  );
});
Input.displayName = 'Input';
export default Input;
