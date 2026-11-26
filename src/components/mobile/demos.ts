import type { DemoConfig } from '../../pages/Components/Demo/types';

import MAlertDemo from './MAlert/demo';
import MButtonDemo from './MButton/demo';
import MCheckboxDemo from './MCheckbox/demo';
import MInputDemo from './MInput/demo';
import MRadioDemo from './MRadio/demo';

// 各移动端组件 demo 配置的统一注册表
export const mobileDemoConfigs: Record<string, DemoConfig> = {
  MButton: MButtonDemo,
  MInput: MInputDemo,
  MAlert: MAlertDemo,
  MCheckbox: MCheckboxDemo,
  MRadio: MRadioDemo
};
