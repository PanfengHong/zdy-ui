import React from 'react';
import type { BaseComponentProps } from '../../../types';

/** 单个选项：id 作为选中值，content 为展示内容 */
export interface CheckboxOption {
  id: string;
  content: string | React.ReactNode;
}

/** 两种用法共有的属性 */
export interface BaseCheckboxCommonProps extends Omit<BaseComponentProps, 'children'> {
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * 单个用法：children 即唯一选项的内容，选中态统一由 value / defaultValue 表示（boolean）
 *
 * <Checkbox value={checked} onChange={setChecked}>复选</Checkbox>
 */
export interface CheckboxSingleProps extends BaseCheckboxCommonProps {
  /** 单个用法不传 options */
  options?: undefined;
  /** 选项内容 */
  children?: React.ReactNode;
  /** 当前值：是否选中（受控） */
  value?: boolean;
  /** 默认值：默认是否选中（非受控） */
  defaultValue?: boolean;
  /** 选中状态变化回调 */
  onChange?: (value: boolean) => void;
}

/**
 * 组用法：options 决定选项，选中值为选中项 id 组成的数组
 *
 * <Checkbox options={[{ id: 'a', content: '选项A' }]} value={value} onChange={setValue} />
 */
export interface CheckboxGroupProps extends BaseCheckboxCommonProps {
  /** 选项列表 */
  options: CheckboxOption[];
  /** 当前选中项 id 数组（受控） */
  value?: string[];
  /** 默认选中项 id 数组（非受控） */
  defaultValue?: string[];
  /** 选中项变化回调，参数为选中项 id 数组 */
  onChange?: (ids: string[]) => void;
}

export type BaseCheckboxProps = CheckboxSingleProps | CheckboxGroupProps;
