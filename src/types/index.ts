// 基础组件类型定义

export type SizeType = 'small' | 'medium' | 'large';
export type ButtonType = 'primary' | 'default' | 'success' | 'info' | 'warning' | 'danger' | 'error' | 'text' | 'link';
export type ButtonShape = 'default' | 'circle' | 'round';

// 通用Props
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
}

// Button组件通用Props
export interface BaseButtonProps extends BaseComponentProps {
  type?: ButtonType;
  size?: SizeType;
  shape?: ButtonShape;
  disabled?: boolean;
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

// Input组件通用Props
export interface BaseInputProps extends BaseComponentProps {
  type?: 'text' | 'password' | 'number' | 'email' | 'tel';
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  disabled?: boolean;
  size?: SizeType;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

// Card组件通用Props
export interface BaseCardProps extends BaseComponentProps {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  bordered?: boolean;
  children?: React.ReactNode;
}

// Tabs组件类型定义
export type TabsType = 'default' | 'capsule' | 'pill';

// TabPane组件Props
export interface TabPaneProps extends BaseComponentProps {
  tabKey: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}

// Tabs组件通用Props
export interface BaseTabsProps extends BaseComponentProps {
  type?: TabsType;
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  children?: React.ReactNode;
}

// Switch组件通用Props
export interface BaseSwitchProps extends BaseComponentProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: SizeType;
}

// Dialog组件通用Props
export interface BaseDialogProps extends BaseComponentProps {
  visible?: boolean;
  title?: React.ReactNode;
  width?: string | number;
  closable?: boolean;
  mask?: boolean;
  maskClosable?: boolean;
  onClose?: () => void;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

// Icon组件类型定义
export type IconType = 'add' | 'delete' | 'close' | 'edit' | 'search' | 'save' | 'cancel' | 'confirm' | 'back' | 'forward' | 'up' | 'down' | 'left' | 'right' | 'check' | 'error' | 'warning' | 'info';

// Icon组件通用Props
export interface BaseIconProps extends BaseComponentProps {
  type?: IconType;
  size?: SizeType | number;
  color?: string;
}

// Layout组件类型定义
export interface LayoutProps extends BaseComponentProps {
  hasSider?: boolean;
  children?: React.ReactNode;
}

export interface LayoutHeaderProps extends BaseComponentProps {
  children?: React.ReactNode;
}

export interface LayoutContentProps extends BaseComponentProps {
  children?: React.ReactNode;
}

export interface LayoutFooterProps extends BaseComponentProps {
  children?: React.ReactNode;
}

export interface LayoutSiderProps extends BaseComponentProps {
  width?: string | number;
  collapsible?: boolean;
  collapsed?: boolean;
  collapsedWidth?: string | number;
  onCollapse?: (collapsed: boolean) => void;
  children?: React.ReactNode;
}

export interface BaseRadioProps extends BaseComponentProps {
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  children?: React.ReactNode;
}

export interface BaseRadioGroupProps extends BaseComponentProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  children?: React.ReactNode;
}

export type ColSpanType = number | string;

export interface BaseRowProps extends BaseComponentProps {
  gutter?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
  align?: 'top' | 'middle' | 'bottom';
  children?: React.ReactNode;
}

export interface BaseColProps extends BaseComponentProps {
  span?: ColSpanType;
  offset?: ColSpanType;
  push?: ColSpanType;
  pull?: ColSpanType;
  xs?: ColSpanType | { span?: ColSpanType; offset?: ColSpanType };
  sm?: ColSpanType | { span?: ColSpanType; offset?: ColSpanType };
  md?: ColSpanType | { span?: ColSpanType; offset?: ColSpanType };
  lg?: ColSpanType | { span?: ColSpanType; offset?: ColSpanType };
  xl?: ColSpanType | { span?: ColSpanType; offset?: ColSpanType };
  children?: React.ReactNode;
}