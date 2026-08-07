export type MenuItemType = 'overview' | 'changelog' | 'component' | 'design';

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  type: MenuItemType;
  component?: string;
  path: string;
  thumbnail?: string;
}

export interface MenuGroup {
  id: string;
  label: string;
  items: MenuItem[];
}

export const designMenuGroups: MenuGroup[] = [
  {
    id: 'design-intro',
    label: '设计',
    items: [
      { id: 'introduction', label: '介绍', icon: '📖', type: 'design', path: '/design/introduction' },
      { id: 'color', label: '色彩', icon: '🎨', type: 'design', path: '/design/color' },
      { id: 'typography', label: '字体', icon: '🔤', type: 'design', path: '/design/typography' },
      { id: 'spacing', label: '间距', icon: '📏', type: 'design', path: '/design/spacing' },
      { id: 'border', label: '边框', icon: '⬛', type: 'design', path: '/design/border' },
      { id: 'shadow', label: '阴影', icon: '🌑', type: 'design', path: '/design/shadow' },
    ],
  },
];

export const menuGroups: MenuGroup[] = [
  {
    id: 'info',
    label: '信息',
    items: [
      { id: 'overview', label: '组件总览', icon: '📊', type: 'overview', path: '/components/overview' },
      { id: 'changelog', label: '更新日志', icon: '📝', type: 'changelog', path: '/components/changelog' },
    ],
  },
  {
    id: 'general',
    label: '通用',
    items: [
      { id: 'button', label: 'Button 按钮', icon: '🔘', type: 'component', component: 'Button', path: '/components/Button', thumbnail: 'button' },
      { id: 'icon', label: 'Icon 图标', icon: '🎨', type: 'component', component: 'Icon', path: '/components/Icon', thumbnail: 'icon' },
      { id: 'avatar', label: 'Avatar 头像', icon: '🙂', type: 'component', component: 'Avatar', path: '/components/Avatar', thumbnail: 'avatar' },
    ],
  },
  {
    id: 'layout',
    label: '布局',
    items: [
      { id: 'layout', label: 'Layout 布局', icon: '📐', type: 'component', component: 'Layout', path: '/components/Layout', thumbnail: 'layout' },
      { id: 'grid', label: 'Grid 栅格', icon: '🔲', type: 'component', component: 'Grid', path: '/components/Grid', thumbnail: 'grid' },
      { id: 'masonry', label: 'Masonry 瀑布流', icon: '🧱', type: 'component', component: 'Masonry', path: '/components/Masonry', thumbnail: 'masonry' },
    ],
  },
  {
    id: 'feedback',
    label: '反馈',
    items: [
      { id: 'dialog', label: 'Dialog 弹框', icon: '💬', type: 'component', component: 'Dialog', path: '/components/Dialog', thumbnail: 'dialog' },
      { id: 'alert', label: 'Alert 提醒', icon: '⚠️', type: 'component', component: 'Alert', path: '/components/Alert', thumbnail: 'alert' },
      { id: 'message', label: 'Message 消息', icon: '📨', type: 'component', component: 'Message', path: '/components/Message', thumbnail: 'message' },
      { id: 'notification', label: 'Notification 通知', icon: '🔔', type: 'component', component: 'Notification', path: '/components/Notification', thumbnail: 'notification' },
      { id: 'loading', label: 'Loading 加载', icon: '⏳', type: 'component', component: 'Loading', path: '/components/Loading', thumbnail: 'loading' },
      { id: 'skeleton', label: 'Skeleton 骨架屏', icon: '💀', type: 'component', component: 'Skeleton', path: '/components/Skeleton', thumbnail: 'skeleton' },
      { id: 'watermark', label: 'Watermark 水印', icon: '💧', type: 'component', component: 'Watermark', path: '/components/Watermark', thumbnail: 'watermark' },
      { id: 'progress', label: 'Progress 进度条', icon: '📊', type: 'component', component: 'Progress', path: '/components/Progress', thumbnail: 'progress' },
    ],
  },
  {
    id: 'display',
    label: '展示',
    items: [
      { id: 'menu', label: 'Menu 菜单', icon: '📋', type: 'component', component: 'Menu', path: '/components/Menu', thumbnail: 'menu' },
      { id: 'carousel', label: 'Carousel 走马灯', icon: '🎠', type: 'component', component: 'Carousel', path: '/components/Carousel', thumbnail: 'carousel' },
      { id: 'table', label: 'Table 表格', icon: '📋', type: 'component', component: 'Table', path: '/components/Table', thumbnail: 'table' },
      { id: 'list', label: 'List 列表', icon: '📝', type: 'component', component: 'List', path: '/components/List', thumbnail: 'list' },
      { id: 'breadcrumb', label: 'Breadcrumb 面包屑', icon: '🍞', type: 'component', component: 'Breadcrumb', path: '/components/Breadcrumb', thumbnail: 'breadcrumb' },
      { id: 'steps', label: 'Steps 步骤条', icon: '📶', type: 'component', component: 'Steps', path: '/components/Steps', thumbnail: 'steps' },
      { id: 'anchor', label: 'Anchor 锚点', icon: '⚓', type: 'component', component: 'Anchor', path: '/components/Anchor', thumbnail: 'anchor' },
      { id: 'pagination', label: 'Pagination 分页', icon: '📄', type: 'component', component: 'Pagination', path: '/components/Pagination', thumbnail: 'pagination' },
      { id: 'tabs', label: 'Tabs 标签页', icon: '📑', type: 'component', component: 'Tabs', path: '/components/Tabs', thumbnail: 'tabs' },
      { id: 'tree', label: 'Tree 树形控件', icon: '🌳', type: 'component', component: 'Tree', path: '/components/Tree', thumbnail: 'tree' },
      { id: 'calendar', label: 'Calendar 日历', icon: '📅', type: 'component', component: 'Calendar', path: '/components/Calendar', thumbnail: 'calendar' },
      { id: 'empty', label: 'Empty 空状态', icon: '📭', type: 'component', component: 'Empty', path: '/components/Empty', thumbnail: 'empty' },
      { id: 'popover', label: 'Popover 气泡', icon: '💭', type: 'component', component: 'Popover', path: '/components/Popover', thumbnail: 'popover' },
      { id: 'collapse', label: 'Collapse 折叠面板', icon: '📁', type: 'component', component: 'Collapse', path: '/components/Collapse', thumbnail: 'collapse' },
      { id: 'intro', label: 'Intro 引导', icon: '🎯', type: 'component', component: 'Intro', path: '/components/Intro', thumbnail: 'intro' },
      { id: 'tag', label: 'Tag 标签', icon: '🏷️', type: 'component', component: 'Tag', path: '/components/Tag', thumbnail: 'tag' },
      { id: 'board', label: 'Board 看板', icon: '📊', type: 'component', component: 'Board', path: '/components/Board', thumbnail: 'board' },
    ],
  },
  {
    id: 'form',
    label: '表单',
    items: [
      { id: 'input', label: 'Input 输入框', icon: '📝', type: 'component', component: 'Input', path: '/components/Input', thumbnail: 'input' },
      { id: 'textarea', label: 'Textarea 文本域', icon: '📄', type: 'component', component: 'Textarea', path: '/components/Textarea', thumbnail: 'textarea' },
      { id: 'select', label: 'Select 下拉选择', icon: '📋', type: 'component', component: 'Select', path: '/components/Select', thumbnail: 'select' },
      { id: 'radio', label: 'Radio 单选框', icon: '⭕', type: 'component', component: 'Radio', path: '/components/Radio', thumbnail: 'radio' },
      { id: 'checkbox', label: 'Checkbox 多选框', icon: '☑️', type: 'component', component: 'Checkbox', path: '/components/Checkbox', thumbnail: 'checkbox' },
      { id: 'upload', label: 'Upload 上传', icon: '📤', type: 'component', component: 'Upload', path: '/components/Upload', thumbnail: 'upload' },
      { id: 'switch', label: 'Switch 开关', icon: '🔘', type: 'component', component: 'Switch', path: '/components/Switch', thumbnail: 'switch' },
      { id: 'datepicker', label: 'DatePicker 日期选择器', icon: '📅', type: 'component', component: 'DatePicker', path: '/components/DatePicker', thumbnail: 'datepicker' },
      { id: 'timepicker', label: 'TimePicker 时间选择器', icon: '⏰', type: 'component', component: 'TimePicker', path: '/components/TimePicker', thumbnail: 'timepicker' },
      { id: 'datetimepicker', label: 'DateTimePicker 日期时间选择器', icon: '🗓️', type: 'component', component: 'DateTimePicker', path: '/components/DateTimePicker', thumbnail: 'datetimepicker' },
      { id: 'colorpicker', label: 'ColorPicker 颜色选择器', icon: '🎨', type: 'component', component: 'ColorPicker', path: '/components/ColorPicker', thumbnail: 'colorpicker' },
      { id: 'form', label: 'Form 表单', icon: '📋', type: 'component', component: 'Form', path: '/components/Form', thumbnail: 'form' },
      { id: 'transfer', label: 'Transfer 穿梭框', icon: '↔️', type: 'component', component: 'Transfer', path: '/components/Transfer', thumbnail: 'transfer' },
      { id: 'slider', label: 'Slider 滑块', icon: '🎚️', type: 'component', component: 'Slider', path: '/components/Slider', thumbnail: 'slider' },
      { id: 'rate', label: 'Rate 评分', icon: '⭐', type: 'component', component: 'Rate', path: '/components/Rate', thumbnail: 'rate' },
    ],
  },
];

export const findMenuItemByComponent = (componentName: string): MenuItem | undefined => {
  for (const group of menuGroups) {
    const item = group.items.find(item => item.component === componentName);
    if (item) return item;
  }
  return undefined;
};

export const getNonInfoGroups = (): MenuGroup[] => {
  return menuGroups.filter(g => g.id !== 'info');
};
