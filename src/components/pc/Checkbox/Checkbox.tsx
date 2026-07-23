import React, { useState, useContext, createContext, useRef, useEffect } from 'react';
import classNames from 'classnames';
import type { BaseCheckboxProps, BaseCheckboxGroupProps } from '../../../types';

import './Checkbox.less';

interface CheckboxGroupContextValue {
  value?: string[];
  onChange?: (value: string[]) => void;
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null);

interface CheckboxComponent extends React.FC<BaseCheckboxProps> {
  Group: React.FC<BaseCheckboxGroupProps>;
}

const Checkbox = ({
  value,
  checked: checkedProp,
  defaultChecked = false,
  indeterminate = false,
  onChange,
  disabled = false,
  label,
  children,
  className = '',
  style
}: BaseCheckboxProps) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const context = useContext(CheckboxGroupContext);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const isControlled = checkedProp !== undefined || context !== null;
  const isChecked = context !== null 
    ? context.value?.includes(value ?? '') ?? false
    : (isControlled ? checkedProp : internalChecked);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate && !isChecked;
    }
  }, [indeterminate, isChecked]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    
    if (!isControlled && context === null) {
      setInternalChecked(e.target.checked);
    }
    
    onChange?.(e);
    
    if (context !== null && value !== undefined) {
      const currentValues = context.value || [];
      if (e.target.checked) {
        context.onChange?.([...currentValues, value]);
      } else {
        context.onChange?.(currentValues.filter(v => v !== value));
      }
    }
  };

  return (
    <label className={classNames('zdy-checkbox', { 'zdy-checkbox--checked': isChecked }, { 'zdy-checkbox--disabled': disabled }, { 'zdy-checkbox--indeterminate': indeterminate && !isChecked }, className)} style={style}>
      <input
        ref={inputRef}
        type="checkbox"
        value={value}
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        className="zdy-checkbox-input"
      />
      <span className="zdy-checkbox-inner" />
      {(label || children) && (
        <span className="zdy-checkbox-label">
          {label || children}
        </span>
      )}
    </label>
  );
};

const CheckboxGroup = ({
  value: valueProp,
  defaultValue,
  onChange,
  children,
  className = '',
  style
}: BaseCheckboxGroupProps) => {
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue || []);
  const isControlled = valueProp !== undefined;
  const currentValue = isControlled ? valueProp : internalValue;

  const handleChange = (value: string[]) => {
    if (!isControlled) {
      setInternalValue(value);
    }
    onChange?.(value);
  };

  return (
    <div className={classNames('zdy-checkbox-group', className)} style={style}>
      <CheckboxGroupContext.Provider value={{ value: currentValue, onChange: handleChange }}>
        {children}
      </CheckboxGroupContext.Provider>
    </div>
  );
};

(Checkbox as CheckboxComponent).Group = CheckboxGroup;

export default Checkbox as CheckboxComponent;