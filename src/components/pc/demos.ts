import type React from 'react';

import ButtonDemo from './Button/demo';
import AvatarDemo from './Avatar/demo';
import InputDemo from './Input/demo';
import TabsDemo from './Tabs/demo';
import SwitchDemo from './Switch/demo';
import DialogDemo from './Dialog/demo';
import IconDemo from './Icon/demo';
import LayoutDemo from './Layout/demo';
import GridDemo from './Grid/demo';
import AlertDemo from './Alert/demo';
import RadioDemo from './Radio/demo';
import CheckboxDemo from './Checkbox/demo';
import SelectDemo from './Select/demo';
import UploadDemo from './Upload/demo';
import TextareaDemo from './Textarea/demo';
import MessageDemo from './Message/demo';
import NotificationDemo from './Notification/demo';
import LoadingDemo from './Loading/demo';
import TableDemo from './Table/demo';
import WatermarkDemo from './Watermark/demo';
import MasonryDemo from './Masonry/demo';
import CarouselDemo from './Carousel/demo';
import ListDemo from './List/demo';
import MenuDemo from './Menu/demo';
import BreadcrumbDemo from './Breadcrumb/demo';
import PaginationDemo from './Pagination/demo';
import CalendarDemo from './Calendar/demo';
import RateDemo from './Rate/demo';
import TransferDemo from './Transfer/demo';
import TagDemo from './Tag/demo';
import StepsDemo from './Steps/demo';
import AnchorDemo from './Anchor/demo';
import EmptyDemo from './Empty/demo';
import TreeDemo from './Tree/demo';
import SkeletonDemo from './Skeleton/demo';
import ProgressDemo from './Progress/demo';
import CollapseDemo from './Collapse/demo';
import ColorPickerDemo from './ColorPicker/demo';
import SliderDemo from './Slider/demo';
import BoardDemo from './Board/demo';
import PopoverDemo from './Popover/demo';
import IntroDemo from './Intro/demo';
import DatePickerDemo from './DatePicker/demo';
import TimePickerDemo from './TimePicker/demo';
import DateTimePickerDemo from './DateTimePicker/demo';
import FormDemo from './Form/demo';

// 各组件 demo 的统一注册表
export const demoComponents: Record<string, React.ComponentType> = {
  Button: ButtonDemo,
  Avatar: AvatarDemo,
  Input: InputDemo,
  Tabs: TabsDemo,
  Switch: SwitchDemo,
  DatePicker: DatePickerDemo,
  TimePicker: TimePickerDemo,
  DateTimePicker: DateTimePickerDemo,
  Form: FormDemo,
  Dialog: DialogDemo,
  Icon: IconDemo,
  Layout: LayoutDemo,
  Grid: GridDemo,
  Alert: AlertDemo,
  Radio: RadioDemo,
  Checkbox: CheckboxDemo,
  Select: SelectDemo,
  Upload: UploadDemo,
  Textarea: TextareaDemo,
  Message: MessageDemo,
  Notification: NotificationDemo,
  Loading: LoadingDemo,
  Table: TableDemo,
  Watermark: WatermarkDemo,
  Masonry: MasonryDemo,
  Carousel: CarouselDemo,
  List: ListDemo,
  Menu: MenuDemo,
  Breadcrumb: BreadcrumbDemo,
  Pagination: PaginationDemo,
  Calendar: CalendarDemo,
  Rate: RateDemo,
  Transfer: TransferDemo,
  Tag: TagDemo,
  Steps: StepsDemo,
  Anchor: AnchorDemo,
  Empty: EmptyDemo,
  Tree: TreeDemo,
  Skeleton: SkeletonDemo,
  Progress: ProgressDemo,
  Collapse: CollapseDemo,
  ColorPicker: ColorPickerDemo,
  Slider: SliderDemo,
  Board: BoardDemo,
  Popover: PopoverDemo,
  Intro: IntroDemo,
};
