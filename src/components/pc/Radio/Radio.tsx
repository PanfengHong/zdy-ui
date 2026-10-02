import React, { useState, useContext, createContext } from 'react';
import classNames from 'classnames';
import type { BaseRadioProps, BaseRadioGroupProps } from './types';

import './Radio.less';

interface RadioGroupContextValue {
  value?: string;
  onChange?: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

interface RadioComponent extends React.FC<BaseRadioProps> {
  Group: React.FC<BaseRadioGroupProps>;
  Button: React.FC<BaseRadioProps>;
}

// Radio 与 Radio.Button 共用的选中逻辑
const useRadioState = ({
  value,
  checked: checkedProp,
  defaultChecked = false,
  onChange,
  disabled = false
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

  return { isChecked, handleChange };
};

const Radio = ({
  value,
  checked: checkedProp,
  defaultChecked,
  onChange,
  disabled = false,
  label,
  children,
  className = '',
  style
}: BaseRadioProps) => {
  const { isChecked, handleChange } = useRadioState({
    value,
    checked: checkedProp,
    defaultChecked,
    onChange,
    disabled
  });

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

// 按钮样式的单选（通常配合 Radio.Group 使用）
const RadioButton = ({
  value,
  checked: checkedProp,
  defaultChecked,
  onChange,
  disabled = false,
  label,
  children,
  className = '',
  style
}: BaseRadioProps) => {
  const { isChecked, handleChange } = useRadioState({
    value,
    checked: checkedProp,
    defaultChecked,
    onChange,
    disabled
  });

  return (
    <label
      className={classNames(
        'zdy-radio-button',
        { 'zdy-radio-button--checked': isChecked },
        { 'zdy-radio-button--disabled': disabled },
        className
      )}
      style={style}
    >
      <input
        type="radio"
        value={value}
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        className="zdy-radio-button-input"
      />
      <span className="zdy-radio-button-label">
        {label || children}
      </span>
    </label>
  );
};

const RadioGroup = ({
  value: valueProp,
  defaultValue,
  onChange,
  optionType = 'default',
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
    <div
      className={classNames(
        'zdy-radio-group',
        { 'zdy-radio-group--button': optionType === 'button' },
        className
      )}
      style={style}
    >
      <RadioGroupContext.Provider value={{ value: currentValue, onChange: handleChange }}>
        {children}
      </RadioGroupContext.Provider>
    </div>
  );
};

(Radio as RadioComponent).Group = RadioGroup;
(Radio as RadioComponent).Button = RadioButton;

export default Radio as RadioComponent;
