import { forwardRef } from 'react';
import classNames from 'classnames';
import type { BaseInputProps } from './types';

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
  prepend,
  append,
  clearable = false,
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
      {prepend && <span className="zdy-input__prepend">{prepend}</span>}
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
      {clearable && <span className="zdy-input__clearable">x</span>}
      {suffix && <span className="zdy-input__suffix">{suffix}</span>}
      {append && <span className="zdy-input__append">{append}</span>}
    </div>
  );
});
Input.displayName = 'Input';
export default Input;
