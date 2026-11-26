import type { DemoConfig } from '../../../pages/Components/Demo/types';
import Icon from '../../pc/Icon/Icon';
import MInput from './MInput';

const mInputDemo: DemoConfig = {
  intro:
    '移动端输入框用于文本录入，支持前后缀图标与禁用态，内置触屏友好的聚焦反馈。',
  demos: [
    {
      title: '基础用法',
      desc: '通过 placeholder 设置占位文案。',
      code: `<MInput placeholder="请输入手机号" />`,
      render: (
        <div className="mdemo-stack">
          <MInput placeholder="请输入手机号" />
        </div>
      )
    },
    {
      title: '前缀图标',
      desc: '通过 prefix 在输入框内添加图标。',
      code: `<MInput
  placeholder="搜索内容"
  prefix={<Icon type="search" size={14} />}
/>`,
      render: (
        <div className="mdemo-stack">
          <MInput
            placeholder="搜索内容"
            prefix={<Icon type="search" size={14} color="#94a3b8" />}
          />
        </div>
      )
    }
  ]
};

export default mInputDemo;
