import type { DemoConfig } from '../../pages/Components/Demo/types';

import MAlertDemo from './MAlert/demo';
import MActionSheetDemo from './MActionSheet/demo';
import MSwipeActionDemo from './MSwipeAction/demo';
import MButtonDemo from './MButton/demo';
import MCarouselDemo from './MCarousel/demo';
import MCheckboxDemo from './MCheckbox/demo';
import MInputDemo from './MInput/demo';
import MImageDemo from './MImage/demo';
import MMasonryDemo from './MMasonry/demo';
import MSelectDemo from './MSelect/demo';
import MCascaderDemo from './MCascader/demo';
import MRadioDemo from './MRadio/demo';
import MPaginationDemo from './MPagination/demo';
import MSwitchDemo from './MSwitch/demo';
import MSliderDemo from './MSlider/demo';
import MUploadDemo from './MUpload/demo';
import MTextareaDemo from './MTextarea/demo';

// 各移动端组件 demo 配置的统一注册表
export const mobileDemoConfigs: Record<string, DemoConfig> = {
  MButton: MButtonDemo,
  MCarousel: MCarouselDemo,
  MInput: MInputDemo,
  MImage: MImageDemo,
  MMasonry: MMasonryDemo,
  MSelect: MSelectDemo,
  MCascader: MCascaderDemo,
  MAlert: MAlertDemo,
  MActionSheet: MActionSheetDemo,
  MSwipeAction: MSwipeActionDemo,
  MCheckbox: MCheckboxDemo,
  MRadio: MRadioDemo,
  MPagination: MPaginationDemo,
  MSwitch: MSwitchDemo,
  MSlider: MSliderDemo,
  MUpload: MUploadDemo,
  MTextarea: MTextareaDemo
};
