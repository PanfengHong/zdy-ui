import React, { useState } from 'react';
import classNames from 'classnames';
import type { BaseCheckboxProps, CheckboxGroupProps, CheckboxSingleProps } from './types';

import './Checkbox.less';

interface CheckboxItemProps {
  content: React.ReactNode;
  checked: boolean;
  disabled: boolean;
  value?: string;
  /** 参数为切换后的选中状态 */
  onToggle: (checked: boolean) => void;
}

// 选项节点：组用法与单个用法共用
const CheckboxItem = ({ content, checked, disabled, value, onToggle }: CheckboxItemProps) => (
  <label
    className={classNames(
      'zdy-checkbox-option',
      { 'zdy-checkbox-option--checked': checked },
      { 'zdy-checkbox-option--disabled': disabled }
    )}
  >
    <input
      type="checkbox"
      value={value}
      checked={checked}
      disabled={disabled}
      onChange={(e) => onToggle(e.target.checked)}
      className="zdy-checkbox-option-input"
    />
    <span className="zdy-checkbox-option-inner" />
    <span className="zdy-checkbox-option-label">{content}</span>
  </label>
);

/**
 * 组用法：options 决定选项，选中值为选中项 id 组成的数组
 */
const CheckboxGroup = ({
  options,
  value: valueProp,
  defaultValue,
  onChange,
  disabled = false,
  className,
  style
}: CheckboxGroupProps) => {
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue ?? []);

  const isControlled = valueProp !== undefined;
  const currentValue = isControlled ? valueProp : internalValue;

  const handleToggle = (id: string, checked: boolean) => {
    if (disabled) return;

    const nextValue = checked
      ? [...currentValue, id]
      : currentValue.filter((item) => item !== id);

    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onChange?.(nextValue);
  };

  return (
    <div className={classNames('zdy-checkbox', { 'zdy-checkbox--disabled': disabled }, className)} style={style}>
      {options.map((option) => (
        <CheckboxItem
          key={option.id}
          value={option.id}
          content={option.content}
          checked={currentValue.includes(option.id)}
          disabled={disabled}
          onToggle={(checked) => handleToggle(option.id, checked)}
        />
      ))}
    </div>
  );
};

/**
 * 单个用法：children 即唯一选项的内容，选中态由 value / defaultValue 控制
 */
const CheckboxSingle = ({
  value: valueProp,
  defaultValue = false,
  onChange,
  disabled = false,
  children,
  className,
  style
}: CheckboxSingleProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = valueProp !== undefined;
  const isChecked = isControlled ? valueProp : internalValue;

  const handleToggle = (value: boolean) => {
    if (disabled) return;
    if (!isControlled) {
      setInternalValue(value);
    }
    onChange?.(value);
  };

  if (children === undefined || children === null) return null;

  return (
    <div className={classNames('zdy-checkbox', { 'zdy-checkbox--disabled': disabled }, className)} style={style}>
      <CheckboxItem content={children} checked={isChecked} disabled={disabled} onToggle={handleToggle} />
    </div>
  );
};

// 传了非空 options 走组用法，否则按单个用法渲染 children
const isGroupMode = (props: BaseCheckboxProps): props is CheckboxGroupProps =>
  Array.isArray(props.options) && props.options.length > 0;

/**
 * Checkbox 多选框
 *
 * 单个：<Checkbox checked={value} onChange={setValue}>复选</Checkbox>
 * 一组：<Checkbox options={[{ id: 'a', content: '选项A' }]} value={value} onChange={setValue} />
 */
// 用重载调用签名而非 props 联合类型：两种用法下 onChange 的参数都能被正确推断
interface CheckboxComponent {
  (props: CheckboxSingleProps): React.ReactElement | null;
  (props: CheckboxGroupProps): React.ReactElement | null;
}

const Checkbox: CheckboxComponent = (props: BaseCheckboxProps) =>
  isGroupMode(props) ? <CheckboxGroup {...props} /> : <CheckboxSingle {...props} />;

export default Checkbox;
