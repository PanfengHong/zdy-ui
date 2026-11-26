import type { DemoConfig } from '../../../pages/Components/Demo/types';
import MRadio from './MRadio';

const mRadioDemo: DemoConfig = {
  intro:
    '移动端单选框用于在多个选项中选择一项，支持选项组与禁用状态。',
  demos: [
    {
      title: '选项组',
      desc: '通过 options 与 defaultValue 设置选项与默认值。',
      code: `<MRadio
  options={[
    { id: 'standard', content: '标准版' },
    { id: 'pro', content: '专业版' },
    { id: 'enterprise', content: '企业版' }
  ]}
  defaultValue="standard"
/>`,
      render: (
        <div className="mdemo-stack">
          <MRadio
            options={[
              { id: 'standard', content: '标准版' },
              { id: 'pro', content: '专业版' },
              { id: 'enterprise', content: '企业版' }
            ]}
            defaultValue="standard"
          />
        </div>
      )
    }
  ]
};

export default mRadioDemo;
