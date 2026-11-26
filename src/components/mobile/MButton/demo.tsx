import type { DemoConfig } from '../../../pages/Components/Demo/types';
import MButton from './MButton';

const mButtonDemo: DemoConfig = {
  intro:
    '移动端按钮用于触发操作，提供多种类型、状态与尺寸，点击区域适配触屏交互，最小高度 44px。',
  demos: [
    {
      title: '基础用法',
      desc: '通过 type 设置按钮类型，默认为 default。',
      code: `<MButton type="primary">主要按钮</MButton>
<MButton>次要按钮</MButton>`,
      render: (
        <div className="mdemo-stack">
          <MButton type="primary">主要按钮</MButton>
          <MButton>次要按钮</MButton>
        </div>
      )
    },
    {
      title: '状态与类型',
      desc: '通过 disabled 与 loading 控制按钮状态。',
      code: `<MButton type="success">成功</MButton>
<MButton type="warning">警告</MButton>
<MButton type="error">危险</MButton>
<MButton disabled>禁用</MButton>
<MButton loading>加载中</MButton>`,
      render: (
        <div className="mdemo-stack">
          <MButton type="success">成功</MButton>
          <MButton type="warning">警告</MButton>
          <MButton type="error">危险</MButton>
          <MButton disabled>禁用</MButton>
          <MButton loading>加载中</MButton>
        </div>
      )
    }
  ]
};

export default mButtonDemo;
