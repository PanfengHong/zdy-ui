/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';

import type { DemoConfig } from '../../../pages/Components/Demo/types';
import MCheckbox from './MCheckbox';

const notifyOptions = [
  { id: 'email', content: '邮件通知' },
  { id: 'sms', content: '短信通知' },
  { id: 'app', content: '应用内通知' }
];

const VerticalDemo = () => {
  const [value, setValue] = useState<string[]>(['email']);
  const selected = notifyOptions
    .filter(option => value.includes(option.id))
    .map(option => option.content)
    .join('、');

  return (
    <div className="mdemo-stack">
      <MCheckbox options={notifyOptions} value={value} onChange={setValue} />
      <p className="mdemo-tip">已选：{selected || '无'}</p>
    </div>
  );
};

const HorizontalDemo = () => (
  <div className="mdemo-stack">
    <MCheckbox
      direction="horizontal"
      options={[
        { id: 'all', content: '全部' },
        { id: 'unread', content: '未读' },
        { id: 'starred', content: '星标' },
        { id: 'attachment', content: '附件' }
      ]}
      defaultValue={['all']}
    />
  </div>
);

const SingleDemo = () => {
  const [agreed, setAgreed] = useState(true);

  return (
    <div className="mdemo-stack">
      <MCheckbox value={agreed} onChange={setAgreed}>
        我已阅读并同意《用户协议》
      </MCheckbox>
      <MCheckbox options={[{ id: 'subscribe', content: '接收活动推送' }]} defaultValue={['subscribe']} disabled />
    </div>
  );
};

const mCheckboxDemo: DemoConfig = {
  intro:
    '移动端多选框默认按纵向列表展示，整行可点击、选中行高亮，适合触屏操作；需要紧凑筛选时可用 direction="horizontal" 切换为横向标签。支持选项组、单个选项与禁用状态。',
  demos: [
    {
      title: '纵向列表',
      desc: '默认布局，整行都是点击热区，最小高度 48px，适合表单与设置项。',
      code: `const [value, setValue] = useState(['email']);

<MCheckbox
  options={[
    { id: 'email', content: '邮件通知' },
    { id: 'sms', content: '短信通知' },
    { id: 'app', content: '应用内通知' }
  ]}
  value={value}
  onChange={setValue}
/>`,
      render: <VerticalDemo />
    },
    {
      title: '横向标签',
      desc: '适合少量短选项的筛选场景，标签高度 44px，超出自动换行。',
      code: `<MCheckbox
  direction="horizontal"
  options={[
    { id: 'all', content: '全部' },
    { id: 'unread', content: '未读' },
    { id: 'starred', content: '星标' },
    { id: 'attachment', content: '附件' }
  ]}
  defaultValue={['all']}
/>`,
      render: <HorizontalDemo />
    },
    {
      title: '单个选项与禁用',
      desc: '传入 children 即为单个多选项；disabled 时整行不可点击。',
      code: `const [agreed, setAgreed] = useState(true);

<MCheckbox value={agreed} onChange={setAgreed}>
  我已阅读并同意《用户协议》
</MCheckbox>

<MCheckbox
  options={[{ id: 'subscribe', content: '接收活动推送' }]}
  defaultValue={['subscribe']}
  disabled
/>`,
      render: <SingleDemo />
    }
  ],
  api: [
    { prop: 'options', desc: '选项组数据（组用法）', type: 'CheckboxOption[]', default: '-' },
    { prop: 'value', desc: '选中项 id 数组（组用法，受控）', type: 'string[]', default: '-' },
    { prop: 'defaultValue', desc: '默认选中项 id 数组（组用法）', type: 'string[]', default: '[]' },
    { prop: 'direction', desc: '选项布局', type: "'vertical' | 'horizontal'", default: "'vertical'" },
    { prop: 'children', desc: '单选项内容（单个用法）', type: 'ReactNode', default: '-' },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' },
    { prop: 'onChange', desc: '选中变化回调', type: '(value) => void', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ]
};

export default mCheckboxDemo;
