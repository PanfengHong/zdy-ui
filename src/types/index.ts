// 基础组件类型定义

export type SizeType = 'small' | 'medium' | 'large';
export type ButtonType = 'primary' | 'default' | 'success' | 'info' | 'warning' | 'danger' | 'error' | 'text' | 'link';
export type ButtonShape = 'default' | 'circle' | 'round';

// 通用Props
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// Button组件通用Props
export interface BaseButtonProps extends BaseComponentProps {
  type?: ButtonType;
  size?: SizeType;
  shape?: ButtonShape;
  disabled?: boolean;
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
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

// Textarea组件通用Props
export interface BaseTextareaProps extends BaseComponentProps {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  disabled?: boolean;
  size?: SizeType;
  rows?: number;
  cols?: number;
  maxLength?: number;
  showCount?: boolean;
  autoSize?: boolean;
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
export type IconType = 'add' | 'delete' | 'close' | 'edit' | 'search' | 'save' | 'cancel' | 'confirm' | 'back' | 'forward' | 'up' | 'down' | 'left' | 'right' | 'check' | 'error' | 'warning' | 'info' | 'home' | 'user' | 'bell' | 'star' | 'heart' | 'settings' | 'spin' | 'loading' | 'github';

export type AlertType = 'success' | 'info' | 'warning' | 'error';

export interface BaseAlertProps extends BaseComponentProps {
  type?: AlertType;
  title?: React.ReactNode;
  message?: React.ReactNode;
  closable?: boolean;
  showIcon?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

export type MessageType = 'success' | 'info' | 'warning' | 'error';

export interface MessageConfig {
  content: React.ReactNode;
  type?: MessageType;
  duration?: number;
  closable?: boolean;
  onClose?: () => void;
}

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export interface NotificationConfig {
  message: React.ReactNode;
  description?: React.ReactNode;
  type?: NotificationType;
  duration?: number;
  closable?: boolean;
  placement?: NotificationPlacement;
  onClose?: () => void;
  onClick?: () => void;
  btn?: React.ReactNode;
  notificationKey?: string;
}

// Icon组件通用Props
export interface BaseIconProps extends BaseComponentProps {
  type?: IconType;
  size?: SizeType | number;
  color?: string;
  spin?: boolean;
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
  defaultCollapsed?: boolean;
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

export interface BaseCheckboxProps extends BaseComponentProps {
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  children?: React.ReactNode;
}

export interface BaseCheckboxGroupProps extends BaseComponentProps {
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  children?: React.ReactNode;
}

export interface SelectOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface BaseSelectProps extends BaseComponentProps {
  value?: string;
  defaultValue?: string;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
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

export interface UploadFile {
  uid: string;
  name: string;
  status?: 'pending' | 'uploading' | 'done' | 'error';
  percent?: number;
  url?: string;
  thumbUrl?: string;
  size?: number;
  type?: string;
}

export interface BaseUploadProps extends BaseComponentProps {
  action: string;
  method?: 'post' | 'get';
  headers?: Record<string, string>;
  data?: Record<string, any>;
  accept?: string;
  multiple?: boolean;
  maxFileSize?: number;
  maxCount?: number;
  disabled?: boolean;
  showUploadList?: boolean;
  beforeUpload?: (file: File) => boolean | Promise<boolean>;
  onProgress?: (percent: number, file: UploadFile) => void;
  onSuccess?: (response: any, file: UploadFile) => void;
  onError?: (error: Error, file: UploadFile) => void;
  onChange?: (fileList: UploadFile[]) => void;
  onRemove?: (file: UploadFile) => void;
}

export interface BaseLoadingProps extends BaseComponentProps {
  loading?: boolean;
  size?: SizeType;
  tip?: React.ReactNode;
  fullscreen?: boolean;
  indicator?: React.ReactNode;
  children?: React.ReactNode;
}

export interface LoadingConfig {
  tip?: React.ReactNode;
  size?: SizeType;
  indicator?: React.ReactNode;
}

export interface SkeletonParagraphProps {
  rows?: number;
  width?: number | string | Array<number | string>;
}

export interface BaseSkeletonProps extends BaseComponentProps {
  active?: boolean;
  avatar?: boolean | { size?: number; shape?: 'circle' | 'square' };
  title?: boolean | { width?: number | string };
  paragraph?: boolean | SkeletonParagraphProps;
  loading?: boolean;
  children?: React.ReactNode;
}

export type ProgressType = 'line' | 'circle';

export type ProgressStatus = 'normal' | 'success' | 'exception' | 'active';

export interface BaseProgressProps extends BaseComponentProps {
  percent?: number;
  type?: ProgressType;
  status?: ProgressStatus;
  strokeColor?: string;
  strokeWidth?: number;
  showInfo?: boolean;
  format?: (percent: number) => React.ReactNode;
  trailColor?: string;
  width?: number;
  gapDegree?: number;
}

export interface WatermarkFontConfig {
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: 'normal' | 'light' | 'weight' | number;
}

export interface BaseWatermarkProps extends BaseComponentProps {
  content?: string | string[];
  image?: string;
  width?: number;
  height?: number;
  rotate?: number;
  zIndex?: number;
  gap?: [number, number];
  offset?: [number, number];
  font?: WatermarkFontConfig;
  inherit?: boolean;
  children?: React.ReactNode;
}

export interface SliderMark {
  value: number;
  label?: React.ReactNode;
  style?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
}

export type SliderTooltipConfig =
  | boolean
  | {
      visible?: boolean;
      formatter?: (value: number) => React.ReactNode;
    };

export interface BaseSliderProps extends BaseComponentProps {
  value?: number | [number, number];
  defaultValue?: number | [number, number];
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  vertical?: boolean;
  range?: boolean;
  marks?: SliderMark[];
  tooltip?: SliderTooltipConfig;
  onChange?: (value: number | [number, number]) => void;
  onAfterChange?: (value: number | [number, number]) => void;
  size?: 'default' | 'small';
  reverse?: boolean;
  keyboard?: boolean;
}

export type MasonryBreakpointConfig = Record<number, number>;

export interface BaseMasonryProps extends BaseComponentProps {
  columns?: number;
  gap?: number;
  breakpoints?: MasonryBreakpointConfig;
  data?: any[];
  renderItem?: (item: any, index: number) => React.ReactNode;
  keyField?: string;
}

export type CarouselEffect = 'slide' | 'fade' | 'stack';

export interface BaseCarouselProps extends BaseComponentProps {
  autoplay?: boolean;
  interval?: number;
  effect?: CarouselEffect;
  dots?: boolean;
  arrows?: boolean;
  loop?: boolean;
  pauseOnHover?: boolean;
  afterChange?: (current: number) => void;
  beforeChange?: (from: number, to: number) => void;
  defaultActiveIndex?: number;
  children?: React.ReactNode;
}

// List组件类型定义
export type ListItemLayout = 'horizontal' | 'vertical';

export interface ListItemProps {
  key?: string | number;
  title?: React.ReactNode;
  description?: React.ReactNode;
  avatar?: React.ReactNode;
  extra?: React.ReactNode;
  actions?: React.ReactNode[];
  content?: React.ReactNode;
}

export interface BaseListProps extends BaseComponentProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  loading?: boolean;
  itemLayout?: ListItemLayout;
  grid?: {
    gutter?: number;
    column?: number;
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
  };
  dataSource?: ListItemProps[];
  renderItem?: (item: ListItemProps, index: number) => React.ReactNode;
  pagination?: false | {
    current?: number;
    pageSize?: number;
    total?: number;
    onChange?: (page: number, pageSize?: number) => void;
  };
  locale?: {
    emptyText?: React.ReactNode;
  };
  children?: React.ReactNode;
}

// Menu组件类型定义
export type MenuMode = 'vertical' | 'horizontal' | 'inline';
export type MenuTheme = 'light' | 'dark';

export interface MenuItemProps extends BaseComponentProps {
  itemKey: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export interface SubMenuProps extends BaseComponentProps {
  itemKey: string;
  icon?: React.ReactNode;
  title: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
}

export interface MenuProps extends BaseComponentProps {
  mode?: MenuMode;
  theme?: MenuTheme;
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  openKeys?: string[];
  defaultOpenKeys?: string[];
  inlineCollapsed?: boolean;
  onSelect?: (key: string) => void;
  onOpenChange?: (keys: string[]) => void;
  children?: React.ReactNode;
}

// Breadcrumb组件类型定义
export interface BreadcrumbItemProps extends BaseComponentProps {
  href?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  icon?: React.ReactNode;
  overlay?: React.ReactNode;
  children?: React.ReactNode;
}

export interface BreadcrumbProps extends BaseComponentProps {
  separator?: React.ReactNode;
  items?: { title: React.ReactNode; href?: string; icon?: React.ReactNode; onClick?: () => void }[];
  children?: React.ReactNode;
}

// Pagination组件类型定义
export type PaginationSize = 'default' | 'small';

export interface PaginationProps extends BaseComponentProps {
  current?: number;
  defaultCurrent?: number;
  pageSize?: number;
  defaultPageSize?: number;
  total?: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
  pageSizeOptions?: number[];
  size?: PaginationSize;
  disabled?: boolean;
  simple?: boolean;
  onChange?: (page: number, pageSize: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
}

// Calendar组件类型定义
export type CalendarMode = 'month' | 'year';

export interface CalendarProps extends BaseComponentProps {
  value?: Date;
  defaultValue?: Date;
  mode?: CalendarMode;
  fullscreen?: boolean;
  disabledDate?: (date: Date) => boolean;
  dateCellRender?: (date: Date) => React.ReactNode;
  monthCellRender?: (date: Date) => React.ReactNode;
  headerRender?: (date: Date, mode: CalendarMode) => React.ReactNode;
  onChange?: (date: Date, mode: CalendarMode) => void;
  onPanelChange?: (date: Date, mode: CalendarMode) => void;
  onSelect?: (date: Date) => void;
}

// Rate组件类型定义
export interface RateProps extends BaseComponentProps {
  count?: number;
  value?: number;
  defaultValue?: number;
  allowHalf?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  character?: React.ReactNode;
  size?: 'small' | 'default' | 'large';
  tooltips?: string[];
  onChange?: (value: number) => void;
  onHoverChange?: (value: number) => void;
}

// Transfer组件类型定义
export interface TransferItem {
  key: string;
  title: string;
  description?: string;
  disabled?: boolean;
}

export interface TransferProps extends BaseComponentProps {
  dataSource: TransferItem[];
  targetKeys?: string[];
  defaultTargetKeys?: string[];
  selectedKeys?: string[];
  titles?: [string, string];
  operations?: [string, string];
  showSearch?: boolean;
  filterOption?: (inputValue: string, item: TransferItem) => boolean;
  listStyle?: React.CSSProperties;
  disabled?: boolean;
  oneWay?: boolean;
  render?: (item: TransferItem) => React.ReactNode;
  footer?: (props: { direction: 'left' | 'right' }) => React.ReactNode;
  onChange?: (targetKeys: string[], direction: 'left' | 'right', moveKeys: string[]) => void;
  onSelectChange?: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void;
  onSearch?: (direction: 'left' | 'right', value: string) => void;
}

// Tag组件类型定义
export type TagColor = 'default' | 'success' | 'processing' | 'error' | 'warning' | 'magenta' | 'red' | 'volcano' | 'orange' | 'gold' | 'lime' | 'green' | 'cyan' | 'blue' | 'geekblue' | 'purple';

export type TagStatus = 'default' | 'success' | 'processing' | 'error' | 'warning';

export interface TagProps extends BaseComponentProps {
  color?: TagColor | string;
  status?: TagStatus;
  closable?: boolean;
  closeIcon?: React.ReactNode;
  visible?: boolean;
  defaultVisible?: boolean;
  bordered?: boolean;
  icon?: React.ReactNode;
  size?: 'small' | 'default' | 'large';
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  onClose?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  onChange?: (visible: boolean) => void;
}

// Tag.CheckableTag
export interface CheckableTagProps extends BaseComponentProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}