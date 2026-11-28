/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';

import type { DemoConfig } from '../../../pages/Components/Demo/types';
import MRadio from './MRadio';

const planOptions = [
  { id: 'standard', content: '标准版' },
  { id: 'pro', content: '专业版' },
  { id: 'enterprise', content: '企业版' }
];

const VerticalDemo = () => {
  const [value, setValue] = useState('standard');
  const selected = planOptions.find(option => option.id === value)?.content;

  return (
    <div className="mdemo-stack">
      <MRadio options={planOptions} value={value} onChange={setValue} />
      <p className="mdemo-tip">当前方案：{selected}</p>
    </div>
  );
};

const HorizontalDemo = () => (
  <div className="mdemo-stack">
    <MRadio
      direction="horizontal"
      options={[
        { id: 'month', content: '按月' },
        { id: 'year', content: '按年' },
        { id: 'forever', content: '永久' }
      ]}
      defaultValue="month"
    />
  </div>
);

const DisabledDemo = () => (
  <div className="mdemo-stack">
    <MRadio options={planOptions} defaultValue="pro" disabled />
  </div>
);

const mRadioDemo: DemoConfig = {
  intro:
    '移动端单选框默认按纵向列表展示，整行可点击、选中行高亮，适合套餐、地址等单选场景；也可用 direction="horizontal" 切换为横向标签，适合紧凑的切换项。',
  demos: [
    {
      title: '纵向列表',
      desc: '默认布局，整行 48px 触控高度，选中项整行高亮。',
      code: `const [value, setValue] = useState('standard');

<MRadio
  options={[
    { id: 'standard', content: '标准版' },
    { id: 'pro', content: '专业版' },
    { id: 'enterprise', content: '企业版' }
  ]}
  value={value}
  onChange={setValue}
/>`,
      render: <VerticalDemo />
    },
    {
      title: '横向标签',
      desc: '适合两项或三项的紧凑切换，标签高度 44px。',
      code: `<MRadio
  direction="horizontal"
  options={[
    { id: 'month', content: '按月' },
    { id: 'year', content: '按年' },
    { id: 'forever', content: '永久' }
  ]}
  defaultValue="month"
/>`,
      render: <HorizontalDemo />
    },
    {
      title: '禁用状态',
      desc: 'disabled 时整组选项不可点击，选中态仍然可见。',
      code: `<MRadio
  options={[
    { id: 'standard', content: '标准版' },
    { id: 'pro', content: '专业版' },
    { id: 'enterprise', content: '企业版' }
  ]}
  defaultValue="pro"
  disabled
/>`,
      render: <DisabledDemo />
    }
  ],
  api: [
    { prop: 'options', desc: '选项组数据（组用法）', type: 'RadioOption[]', default: '-' },
    { prop: 'value', desc: '选中项 id（组用法，受控）', type: 'string', default: '-' },
    { prop: 'defaultValue', desc: '默认选中项 id（组用法）', type: 'string', default: '-' },
    { prop: 'direction', desc: '选项布局', type: "'vertical' | 'horizontal'", default: "'vertical'" },
    { prop: 'name', desc: '原生 name，同组单选共享', type: 'string', default: '自动生成' },
    { prop: 'children', desc: '单选项内容（单个用法）', type: 'ReactNode', default: '-' },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' },
    { prop: 'onChange', desc: '选中变化回调', type: '(id) => void', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ]
};

export default mRadioDemo;
