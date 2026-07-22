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
      'zdy-input-wrapper',
      `zdy-input-wrapper--${size}`,
      {'zdy-input-wrapper--disabled': disabled},
      {'zdy-input-wrapper--prefix': prefix},
      {'zdy-input-wrapper--suffix': suffix},
      className
    )} style={style}>
      {prefix && <span className="zdy-input__prefix">{prefix}</span>}
      <input
        ref={ref}
        type={type}
        className="zdy-input"
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
      />
      {suffix && <span className="zdy-input__suffix">{suffix}</span>}
    </div>
  );
});
Input.displayName = 'Input';
export default Input;
