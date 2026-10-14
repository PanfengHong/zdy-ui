import React, { useId, useState } from 'react';
import classNames from 'classnames';
import type { BaseRadioProps, RadioGroupProps, RadioSingleProps } from './types';

import './Radio.less';

type OptionType = 'default' | 'button' | 'text';

// optionType → 类名后缀（option 圆点 / button 按钮 / text 纯文字），三种形态样式各自独立
const kindOf = (optionType: OptionType = 'default') =>
  optionType === 'button' ? 'button' : optionType === 'text' ? 'text' : 'option';

const rootClassOf = (optionType: OptionType, disabled: boolean, className?: string) =>
  classNames(
    'zdy-radio',
    { 'zdy-radio--button': optionType === 'button' },
    { 'zdy-radio--text': optionType === 'text' },
    { 'zdy-radio--disabled': disabled },
    className
  );

interface RadioItemProps {
  kind: string;
  content: React.ReactNode;
  checked: boolean;
  disabled: boolean;
  name?: string;
  value?: string;
  onSelect: () => void;
}

// 选项节点：组用法与单个用法共用
const RadioItem = ({ kind, content, checked, disabled, name, value, onSelect }: RadioItemProps) => {
  const itemClass = `zdy-radio-${kind}`;

  return (
    <label
      className={classNames(
        itemClass,
        { [`${itemClass}--checked`]: checked },
        { [`${itemClass}--disabled`]: disabled }
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onSelect}
        className={`${itemClass}-input`}
      />
      {kind === 'option' && <span className="zdy-radio-option-inner" />}
      <span className={`${itemClass}-label`}>{content}</span>
    </label>
  );
};

/**
 * 组用法：options 决定选项，选中值即选项的 id
 */
const RadioGroup = ({
  options,
  value: valueProp,
  defaultValue,
  onChange,
  optionType = 'default',
  disabled = false,
  name,
  className,
  style
}: RadioGroupProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const autoName = useId();
  const groupName = name ?? autoName;

  const isControlled = valueProp !== undefined;
  const currentValue = isControlled ? valueProp : internalValue;

  const handleSelect = (id: string) => {
    if (disabled) return;
    if (!isControlled) {
      setInternalValue(id);
    }
    onChange?.(id);
  };

  const kind = kindOf(optionType);

  return (
    <div className={rootClassOf(optionType, disabled, className)} style={style}>
      {options.map((option) => (
        <RadioItem
          key={option.id}
          kind={kind}
          value={option.id}
          content={option.content}
          checked={currentValue === option.id}
          disabled={disabled}
          name={groupName}
          onSelect={() => handleSelect(option.id)}
        />
      ))}
    </div>
  );
};

/**
 * 单个用法：children 即唯一选项的内容，选中态由 value / defaultValue 控制
 */
const RadioSingle = ({
  value: valueProp,
  defaultValue = false,
  onChange,
  optionType = 'default',
  disabled = false,
  name,
  children,
  className,
  style
}: RadioSingleProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = valueProp !== undefined;
  const isChecked = isControlled ? valueProp : internalValue;

  // 单选：已选中时点击不产生变化，且不能取消选中
  const handleSelect = () => {
    if (disabled || isChecked) return;
    if (!isControlled) {
      setInternalValue(true);
    }
    onChange?.(true);
  };

  if (children === undefined || children === null) return null;

  const kind = kindOf(optionType);

  return (
    <div className={rootClassOf(optionType, disabled, className)} style={style}>
      <RadioItem
        kind={kind}
        content={children}
        checked={isChecked}
        disabled={disabled}
        name={name}
        onSelect={handleSelect}
      />
    </div>
  );
};

// 传了非空 options 走组用法，否则按单个用法渲染 children
const isGroupMode = (props: BaseRadioProps): props is RadioGroupProps =>
  Array.isArray(props.options) && props.options.length > 0;

/**
 * Radio 单选框
 *
 * 单个：<Radio checked={value} onChange={setValue}>radio</Radio>
 * 一组：<Radio options={[{ id: 'a', content: '选项A' }]} value={value} onChange={setValue} />
 */
// 用重载调用签名而非 props 联合类型：两种用法下 onChange 的参数都能被正确推断
interface RadioComponent {
  (props: RadioSingleProps): React.ReactElement | null;
  (props: RadioGroupProps): React.ReactElement | null;
}

const Radio: RadioComponent = (props: BaseRadioProps) =>
  isGroupMode(props) ? <RadioGroup {...props} /> : <RadioSingle {...props} />;

export default Radio;
