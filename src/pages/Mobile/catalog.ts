export interface MobileItem {
  name: string;
  label: string;
}

export interface MobileGroup {
  label: string;
  items: MobileItem[];
}

export const mobileGroups: MobileGroup[] = [
  {
    label: '通用',
    items: [
      { name: 'Button', label: '按钮' },
      { name: 'Icon', label: '图标' }
    ]
  },
  {
    label: '布局',
    items: [
      { name: 'Layout', label: '布局' },
      { name: 'Grid', label: '栅格' },
      { name: 'Masonry', label: '瀑布流' }
    ]
  },
  {
    label: '反馈',
    items: [
      { name: 'Dialog', label: '弹框' },
      { name: 'Alert', label: '提醒' },
      { name: 'Message', label: '消息' },
      { name: 'Notification', label: '通知' },
      { name: 'Loading', label: '加载' },
      { name: 'Skeleton', label: '骨架屏' },
      { name: 'Watermark', label: '水印' },
      { name: 'Progress', label: '进度条' }
    ]
  },
  {
    label: '展示',
    items: [
      { name: 'Menu', label: '菜单' },
      { name: 'Carousel', label: '走马灯' },
      { name: 'Table', label: '表格' },
      { name: 'List', label: '列表' },
      { name: 'Breadcrumb', label: '面包屑' },
      { name: 'Steps', label: '步骤条' },
      { name: 'Pagination', label: '分页' },
      { name: 'Anchor', label: '锚点' },
      { name: 'Tabs', label: '标签页' },
      { name: 'Tree', label: '树形控件' },
      { name: 'Calendar', label: '日历' },
      { name: 'Empty', label: '空状态' },
      { name: 'Popover', label: '气泡卡片' },
      { name: 'Collapse', label: '折叠面板' },
      { name: 'Intro', label: '引导' },
      { name: 'Tag', label: '标签' },
      { name: 'Board', label: '看板' }
    ]
  },
  {
    label: '表单',
    items: [
      { name: 'Input', label: '输入框' },
      { name: 'Textarea', label: '文本域' },
      { name: 'Select', label: '选择器' },
      { name: 'Radio', label: '单选框' },
      { name: 'Checkbox', label: '多选框' },
      { name: 'Upload', label: '上传' },
      { name: 'Switch', label: '开关' },
      { name: 'DateTimePicker', label: '日期时间选择' },
      { name: 'ColorPicker', label: '颜色选择' },
      { name: 'Form', label: '表单' },
      { name: 'Transfer', label: '穿梭框' },
      { name: 'Slider', label: '滑动输入条' },
      { name: 'Rate', label: '评分' }
    ]
  }
];

export const totalComponents = mobileGroups.reduce((total, group) => total + group.items.length, 0);

export const mobileItems: MobileItem[] = mobileGroups.flatMap(group => group.items);
