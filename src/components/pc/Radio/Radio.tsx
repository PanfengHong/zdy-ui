import React, { useState, useContext, createContext } from 'react';
import classNames from 'classnames';
import type { BaseRadioProps, BaseRadioGroupProps } from '../../../types';

import './Radio.less';

interface RadioGroupContextValue {
  value?: string;
  onChange?: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

interface RadioComponent extends React.FC<BaseRadioProps> {
  Group: React.FC<BaseRadioGroupProps>;
}

const Radio = ({
  value,
  checked: checkedProp,
  defaultChecked = false,
  onChange,
  disabled = false,
  label,
  children,
  className = '',
  style
}: BaseRadioProps) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const context = useContext(RadioGroupContext);
  
  const isControlled = checkedProp !== undefined || context !== null;
  const isChecked = context !== null 
    ? context.value === value 
    : (isControlled ? checkedProp : internalChecked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (!isControlled && context === null) {
      setInternalChecked(true);
    }
    onChange?.(e);
    context?.onChange?.(value ?? '');
  };

  return (
    <label className={classNames('zdy-radio', { 'zdy-radio--checked': isChecked }, { 'zdy-radio--disabled': disabled }, className)} style={style}>
      <input
        type="radio"
        value={value}
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        className="zdy-radio-input"
      />
      <span className="zdy-radio-inner" />
      {(label || children) && (
        <span className="zdy-radio-label">
          {label || children}
        </span>
      )}
    </label>
  );
};

const RadioGroup = ({
  value: valueProp,
  defaultValue,
  onChange,
  children,
  className = '',
  style
}: BaseRadioGroupProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = valueProp !== undefined;
  const currentValue = isControlled ? valueProp : internalValue;

  const handleChange = (value: string) => {
    if (!isControlled) {
      setInternalValue(value);
    }
    onChange?.(value);
  };

  return (
    <div className={classNames('zdy-radio-group', className)} style={style}>
      <RadioGroupContext.Provider value={{ value: currentValue, onChange: handleChange }}>
        {children}
      </RadioGroupContext.Provider>
    </div>
  );
};

(Radio as RadioComponent).Group = RadioGroup;

export default Radio as RadioComponent;
