/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';

import type { DemoConfig } from '../../../pages/Components/Demo/types';
import MTextarea from './MTextarea';

const BasicDemo = () => (
  <div className="mdemo-stack">
    <MTextarea placeholder="请输入反馈内容" rows={4} />
    <p className="mdemo-tip">默认 4 行，聚焦时边框高亮，固定 16px 字号避免 iOS 聚焦缩放</p>
  </div>
);

const CountDemo = () => {
  const maxLength = 100;
  const [value, setValue] = useState('移动端文本域需要更大的触控区域和清晰的字数反馈。');

  return (
    <div className="mdemo-stack">
      <MTextarea
        value={value}
        onChange={event => setValue(event.target.value)}
        placeholder="最多输入 100 个字"
        maxLength={maxLength}
        showCount
        rows={4}
      />
      <p className="mdemo-tip">还可输入 {maxLength - value.length} 个字</p>
    </div>
  );
};

const AutoSizeDemo = () => (
  <div className="mdemo-stack">
    <MTextarea
      autoSize
      minRows={2}
      maxRows={5}
      defaultValue={'第一行\n第二行\n第三行'}
      placeholder="输入内容后自动增高，最多 5 行"
    />
    <p className="mdemo-tip">高度限制在 2～5 行，超出后文本域内部滚动</p>
  </div>
);

const SizeDemo = () => (
  <div className="mdemo-stack">
    <MTextarea size="small" placeholder="小尺寸" rows={2} />
    <MTextarea size="medium" placeholder="中尺寸（默认）" rows={3} />
    <MTextarea size="large" placeholder="大尺寸" rows={4} />
    <MTextarea defaultValue="禁用状态下不可编辑" disabled rows={3} />
  </div>
);

const mTextareaDemo: DemoConfig = {
  intro:
    '移动端文本域针对触屏放大输入区域，固定 16px 字号防止 iOS 聚焦缩放，支持受控/非受控用法、字数统计、自动增高、尺寸与禁用状态。',
  demos: [
    {
      title: '基础用法',
      desc: '通过 rows 设置初始行数，聚焦时整块文本域显示主题色边框。',
      code: `<MTextarea placeholder="请输入反馈内容" rows={4} />`,
      render: <BasicDemo />
    },
    {
      title: '字数统计',
      desc: '设置 maxLength 与 showCount 后，右下角实时显示字数，达到上限时计数变色。',
      code: `const [value, setValue] = useState('移动端文本域需要更大的触控区域和清晰的字数反馈。');

<MTextarea
  value={value}
  onChange={event => setValue(event.target.value)}
  placeholder="最多输入 100 个字"
  maxLength={100}
  showCount
  rows={4}
/>`,
      render: <CountDemo />
    },
    {
      title: '自适应高度',
      desc: 'autoSize 会随内容增高，并用 minRows / maxRows 限制高度范围。',
      code: `<MTextarea
  autoSize
  minRows={2}
  maxRows={5}
  defaultValue={'第一行\\n第二行\\n第三行'}
  placeholder="输入内容后自动增高，最多 5 行"
/>`,
      render: <AutoSizeDemo />
    },
    {
      title: '尺寸与禁用',
      desc: 'small / medium / large 调整最小高度与内边距，disabled 时整块不可编辑。',
      code: `<MTextarea size="small" placeholder="小尺寸" rows={2} />
<MTextarea size="medium" placeholder="中尺寸（默认）" rows={3} />
<MTextarea size="large" placeholder="大尺寸" rows={4} />
<MTextarea defaultValue="禁用状态下不可编辑" disabled rows={3} />`,
      render: <SizeDemo />
    }
  ],
  api: [
    { prop: 'value', desc: '当前值（受控）', type: 'string', default: '-' },
    { prop: 'defaultValue', desc: '默认值（非受控）', type: 'string', default: "''" },
    { prop: 'onChange', desc: '内容变化回调', type: 'ChangeEventHandler<HTMLTextAreaElement>', default: '-' },
    { prop: 'placeholder', desc: '占位提示', type: 'string', default: '-' },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' },
    { prop: 'size', desc: '尺寸', type: "'small' | 'medium' | 'large'", default: "'medium'" },
    { prop: 'rows', desc: '初始行数', type: 'number', default: '4' },
    { prop: 'cols', desc: '原生 cols 属性', type: 'number', default: '-' },
    { prop: 'maxLength', desc: '最大字符数', type: 'number', default: '-' },
    { prop: 'showCount', desc: '是否显示字数统计', type: 'boolean', default: 'false' },
    { prop: 'autoSize', desc: '是否随内容自动增高', type: 'boolean', default: 'false' },
    { prop: 'minRows', desc: '自动增高的最小行数', type: 'number', default: 'rows' },
    { prop: 'maxRows', desc: '自动增高的最大行数', type: 'number', default: '6' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ]
};

export default mTextareaDemo;
