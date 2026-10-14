import React from 'react';
import type { BaseComponentProps } from '../../../types';

/** 单个选项：id 作为选中值，content 为展示内容 */
export interface RadioOption {
  id: string;
  content: string | React.ReactNode;
}

/** 两种用法共有的属性 */
export interface BaseRadioCommonProps extends Omit<BaseComponentProps, 'children'> {
  /**
   * 展示形态：
   * default 圆点单选框
   * button  按钮组
   * text    纯文字，不展示选中框，选中后文字带背景色
   */
  optionType?: 'default' | 'button' | 'text';
  /** 是否禁用 */
  disabled?: boolean;
  /** 原生 name，同组 radio 共享；不传时自动生成 */
  name?: string;
}

/**
 * 单个用法：children 即唯一选项的内容，选中态统一由 value / defaultValue 表示（boolean）
 *
 * <Radio value={checked} onChange={setChecked}>radio</Radio>
 */
export interface RadioSingleProps extends BaseRadioCommonProps {
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
 * 组用法：options 决定选项，选中值即选项的 id
 *
 * <Radio options={[{ id: 'a', content: '选项A' }]} value={value} onChange={setValue} />
 */
export interface RadioGroupProps extends BaseRadioCommonProps {
  /** 选项列表 */
  options: RadioOption[];
  /** 当前选中项 id（受控） */
  value?: string;
  /** 默认选中项 id（非受控） */
  defaultValue?: string;
  /** 选中项变化回调，参数为选中项的 id */
  onChange?: (id: string) => void;
}

export type BaseRadioProps = RadioSingleProps | RadioGroupProps;
