import type { DemoConfig } from '../../pages/Components/Demo/types';

import MAlertDemo from './MAlert/demo';
import MActionSheetDemo from './MActionSheet/demo';
import MSwipeActionDemo from './MSwipeAction/demo';
import MButtonDemo from './MButton/demo';
import MCheckboxDemo from './MCheckbox/demo';
import MInputDemo from './MInput/demo';
import MImageDemo from './MImage/demo';
import MSelectDemo from './MSelect/demo';
import MRadioDemo from './MRadio/demo';
import MPaginationDemo from './MPagination/demo';
import MTextareaDemo from './MTextarea/demo';

// 各移动端组件 demo 配置的统一注册表
export const mobileDemoConfigs: Record<string, DemoConfig> = {
  MButton: MButtonDemo,
  MInput: MInputDemo,
  MImage: MImageDemo,
  MSelect: MSelectDemo,
  MAlert: MAlertDemo,
  MActionSheet: MActionSheetDemo,
  MSwipeAction: MSwipeActionDemo,
  MCheckbox: MCheckboxDemo,
  MRadio: MRadioDemo,
  MPagination: MPaginationDemo,
  MTextarea: MTextareaDemo
};
