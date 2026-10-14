import React, { useId, useState } from 'react';
import classNames from 'classnames';
import type { RadioOption } from '../../../types';

import './Radio.less';

interface MobileRadioCommonProps {
  /** 是否禁用 */
  disabled?: boolean;
  /** 原生 name，同组 radio 共享；不传时自动生成 */
  name?: string;
  className?: string;
  style?: React.CSSProperties;
}

/** 单个用法：children 即唯一选项的内容，选中态统一由 value / defaultValue 表示（boolean） */
interface MobileRadioSingleProps extends MobileRadioCommonProps {
  options?: undefined;
  children?: React.ReactNode;
  /** 当前值：是否选中（受控） */
  value?: boolean;
  /** 默认值：默认是否选中（非受控） */
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
}

/** 组用法：options 决定选项，选中值即选项的 id */
interface MobileRadioGroupProps extends MobileRadioCommonProps {
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
}

type MobileRadioProps = MobileRadioSingleProps | MobileRadioGroupProps;

interface RadioItemProps {
  content: React.ReactNode;
  checked: boolean;
  disabled: boolean;
  name?: string;
  value?: string;
  onSelect: () => void;
}

const RadioItem = ({ content, checked, disabled, name, value, onSelect }: RadioItemProps) => (
  <label
    className={classNames('zdy-mobile-radio-option', {
      'zdy-mobile-radio-option--checked': checked,
      'zdy-mobile-radio-option--disabled': disabled
    })}
  >
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      disabled={disabled}
      onChange={onSelect}
      className="zdy-mobile-radio-option-input"
    />
    <span className="zdy-mobile-radio-option-inner" />
    <span className="zdy-mobile-radio-option-label">{content}</span>
  </label>
);

/** 组用法 */
const RadioGroup = ({
  options,
  value: valueProp,
  defaultValue,
  onChange,
  disabled = false,
  name,
  className = '',
  style
}: MobileRadioGroupProps) => {
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

  return (
    <div
      className={classNames('zdy-mobile-radio', { 'zdy-mobile-radio--disabled': disabled }, className)}
      style={style}
    >
      {options.map((option) => (
        <RadioItem
          key={option.id}
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

/** 单个用法 */
const RadioSingle = ({
  value: valueProp,
  defaultValue = false,
  onChange,
  disabled = false,
  name,
  children,
  className = '',
  style
}: MobileRadioSingleProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = valueProp !== undefined;
  const isChecked = isControlled ? valueProp : internalValue;

  const handleSelect = () => {
    if (disabled || isChecked) return;
    if (!isControlled) {
      setInternalValue(true);
    }
    onChange?.(true);
  };

  if (children === undefined || children === null) return null;

  return (
    <div
      className={classNames('zdy-mobile-radio', { 'zdy-mobile-radio--disabled': disabled }, className)}
      style={style}
    >
      <RadioItem
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
const isGroupMode = (props: MobileRadioProps): props is MobileRadioGroupProps =>
  Array.isArray(props.options) && props.options.length > 0;

/**
 * 移动端 Radio 单选框
 *
 * 单个：<Radio checked={value} onChange={setValue}>radio</Radio>
 * 一组：<Radio options={[{ id: 'a', content: '选项A' }]} value={value} onChange={setValue} />
 */
// 用重载调用签名而非 props 联合类型：两种用法下 onChange 的参数都能被正确推断
interface MobileRadioComponent {
  (props: MobileRadioSingleProps): React.ReactElement | null;
  (props: MobileRadioGroupProps): React.ReactElement | null;
}

const Radio: MobileRadioComponent = (props: MobileRadioProps) =>
  isGroupMode(props) ? <RadioGroup {...props} /> : <RadioSingle {...props} />;

export default Radio;
