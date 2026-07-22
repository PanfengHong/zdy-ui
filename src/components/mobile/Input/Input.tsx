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
      'mobile-input-wrapper',
      `mobile-input-wrapper-${size}`,
      {'mobile-input-wrapper-disabled': disabled},
      {'mobile-input-wrapper-prefix': prefix},
      {'mobile-input-wrapper-suffix': suffix},
      className
    )} style={style}>
      {prefix && <span className="mobile-input-prefix">{prefix}</span>}
      <input
        ref={ref}
        type={type}
        className="mobile-input"
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
      />
      {suffix && <span className="mobile-input-suffix">{suffix}</span>}
    </div>
  );
});
Input.displayName = 'Input';
export default Input;
