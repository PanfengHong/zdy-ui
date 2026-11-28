import type { CSSProperties, ReactNode } from 'react';

export interface MSliderMark {
  value: number;
  label?: ReactNode;
  style?: CSSProperties;
  labelStyle?: CSSProperties;
}

export type MSliderTooltipConfig =
  | boolean
  | {
      visible?: boolean;
      formatter?: (value: number) => ReactNode;
    };

export type MSliderValue = number | [number, number];

export interface MSliderProps {
  /** 当前值，传入即为受控 */
  value?: MSliderValue;
  /** 默认值 */
  defaultValue?: MSliderValue;
  /** 最小值，默认 0 */
  min?: number;
  /** 最大值，默认 100 */
  max?: number;
  /** 步长，默认 1；小于等于 0 时连续取值 */
  step?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否垂直方向 */
  vertical?: boolean;
  /** 是否为双滑块范围选择 */
  range?: boolean;
  /** 刻度标记 */
  marks?: MSliderMark[];
  /** 拖动/聚焦时显示的值气泡 */
  tooltip?: MSliderTooltipConfig;
  /** 是否支持键盘操作 */
  keyboard?: boolean;
  /** 尺寸 */
  size?: 'default' | 'small';
  /** 滑块的无障碍名称 */
  ariaLabel?: string;
  /** 拖动过程中触发 */
  onChange?: (value: MSliderValue) => void;
  /** 拖动结束 / 点击轨道 / 键盘调整后触发 */
  onAfterChange?: (value: MSliderValue) => void;
  className?: string;
  style?: CSSProperties;
}
