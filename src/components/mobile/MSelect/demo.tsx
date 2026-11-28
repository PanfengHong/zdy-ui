import { useState } from 'react';

import type { DemoConfig } from '../../../pages/Components/Demo/types';
import MSelect from './MSelect';
import type { MSelectOption } from './MSelect';

const cityOptions: MSelectOption[] = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
  { label: '杭州', value: 'hangzhou' }
];

const BasicDemo = () => {
  const [value, setValue] = useState<string | number>('');
  const current = cityOptions.find(option => option.value === value);

  return (
    <div className="mdemo-stack">
      <MSelect
        inline
        placeholder="请选择城市"
        options={cityOptions}
        value={value}
        onChange={next => setValue(next)}
      />
      <p className="mdemo-tip">当前选择：{current ? current.label : '未选择'}</p>
    </div>
  );
};

const DisabledDemo = () => {
  const [value, setValue] = useState<string | number>('express');

  return (
    <div className="mdemo-stack">
      <MSelect
        inline
        title="选择配送方式"
        options={[
          { label: '标准配送（包邮）', value: 'standard' },
          { label: '次日达', value: 'express' },
          { label: '当日达（暂不可用）', value: 'same-day', disabled: true }
        ]}
        value={value}
        onChange={next => setValue(next)}
      />
      <MSelect inline disabled placeholder="禁用状态" options={cityOptions} />
    </div>
  );
};

const mSelectDemo: DemoConfig = {
  intro:
    '移动端选择器用于从一组选项中选择单个值。点击触发区从底部弹出选项面板，选中项高亮并带勾选标记，支持禁用选项、禁用整个选择器与自定义弹层标题。',
  demos: [
    {
      title: '基础用法',
      desc: '通过 options 配置选项，value 受控、onChange 获取选择结果。',
      code: `<MSelect
  placeholder="请选择城市"
  options={[
    { label: '北京', value: 'beijing' },
    { label: '上海', value: 'shanghai' },
    { label: '广州', value: 'guangzhou' }
  ]}
  value={value}
  onChange={next => setValue(next)}
/>`,
      render: <BasicDemo />
    },
    {
      title: '禁用项与自定义标题',
      desc: '单个选项可通过 disabled 置灰，选择器整体也可禁用；title 自定义弹层标题。',
      code: `<MSelect
  title="选择配送方式"
  options={[
    { label: '标准配送（包邮）', value: 'standard' },
    { label: '次日达', value: 'express' },
    { label: '当日达（暂不可用）', value: 'same-day', disabled: true }
  ]}
  value={value}
  onChange={next => setValue(next)}
/>

<MSelect disabled placeholder="禁用状态" options={options} />`,
      render: <DisabledDemo />
    }
  ],
  api: [
    { prop: 'options', desc: '选项列表', type: 'MSelectOption[]', default: '[]' },
    { prop: 'value', desc: '当前选中值（受控）', type: 'string | number', default: '-' },
    { prop: 'defaultValue', desc: '初始选中值（非受控）', type: 'string | number', default: '-' },
    { prop: 'placeholder', desc: '未选择时的占位文案', type: 'string', default: "'请选择'" },
    { prop: 'title', desc: '弹层标题', type: 'ReactNode', default: "'请选择'" },
    { prop: 'disabled', desc: '是否禁用选择器', type: 'boolean', default: 'false' },
    { prop: 'closeOnMaskClick', desc: '点击遮罩是否关闭', type: 'boolean', default: 'true' },
    { prop: 'inline', desc: '内联渲染，铺满最近定位父级（预览场景）', type: 'boolean', default: 'false' },
    { prop: 'onChange', desc: '选中回调', type: '(value, option) => void', default: '-' },
    { prop: 'onOpen', desc: '弹层打开回调', type: 'function', default: '-' },
    { prop: 'onClose', desc: '弹层关闭回调', type: 'function', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' },
    { prop: 'options[].label', desc: '选项文案', type: 'ReactNode', default: '-' },
    { prop: 'options[].value', desc: '选项值', type: 'string | number', default: '-' },
    { prop: 'options[].disabled', desc: '是否禁用该选项', type: 'boolean', default: 'false' }
  ]
};

export default mSelectDemo;
