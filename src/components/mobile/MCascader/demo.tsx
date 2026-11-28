/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';

import type { DemoConfig } from '../../../pages/Components/Demo/types';
import MCascader from './MCascader';
import type { CascaderOption } from '../../../types';

const regionOptions: CascaderOption[] = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          { value: 'xihu', label: '西湖区' },
          { value: 'binjiang', label: '滨江区' },
          { value: 'yuhang', label: '余杭区' }
        ]
      },
      {
        value: 'ningbo',
        label: '宁波',
        children: [
          { value: 'haishu', label: '海曙区' },
          { value: 'yinzhou', label: '鄞州区' }
        ]
      }
    ]
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      {
        value: 'nanjing',
        label: '南京',
        children: [
          { value: 'xuanwu', label: '玄武区' },
          { value: 'gulou', label: '鼓楼区' }
        ]
      },
      {
        value: 'suzhou',
        label: '苏州',
        children: [
          { value: 'gusu', label: '姑苏区' },
          { value: 'wuzhong', label: '吴中区' }
        ]
      }
    ]
  },
  {
    value: 'guangdong',
    label: '广东',
    children: [
      {
        value: 'guangzhou',
        label: '广州',
        children: [
          { value: 'tianhe', label: '天河区' },
          { value: 'yuexiu', label: '越秀区' }
        ]
      },
      {
        value: 'shenzhen',
        label: '深圳',
        children: [
          { value: 'nanshan', label: '南山区' },
          { value: 'futian', label: '福田区' }
        ]
      }
    ]
  }
];

const BasicDemo = () => {
  const [value, setValue] = useState<string[]>(['zhejiang', 'hangzhou', 'xihu']);

  return (
    <div className="mdemo-stack">
      <MCascader inline options={regionOptions} value={value} onChange={next => setValue(next)} />
      <p className="mdemo-tip">当前路径：{value.join(' / ') || '未选择'}</p>
    </div>
  );
};

const DefaultValueDemo = () => (
  <div className="mdemo-stack">
    <MCascader
      inline
      title="选择所在地区"
      options={regionOptions}
      defaultValue={['jiangsu', 'nanjing', 'xuanwu']}
    />
    <p className="mdemo-tip">非受控用法，通过 defaultValue 设置初始路径。</p>
  </div>
);

const ChangeOnSelectDemo = () => {
  const [value, setValue] = useState<string[]>(['guangdong']);

  return (
    <div className="mdemo-stack">
      <MCascader
        inline
        options={regionOptions}
        value={value}
        changeOnSelect
        onChange={next => setValue(next)}
      />
      <p className="mdemo-tip">当前路径：{value.join(' / ') || '未选择'}</p>
    </div>
  );
};

const DisabledDemo = () => {
  const [value, setValue] = useState<string[]>([]);
  const optionsWithDisabled: CascaderOption[] = [
    {
      value: 'east',
      label: '华东',
      children: [
        { value: 'shanghai', label: '上海' },
        { value: 'hangzhou', label: '杭州' },
        { value: 'nanjing', label: '南京（暂未开通）', disabled: true }
      ]
    },
    {
      value: 'south',
      label: '华南',
      children: [
        { value: 'guangzhou', label: '广州' },
        { value: 'shenzhen', label: '深圳' }
      ]
    }
  ];

  return (
    <div className="mdemo-stack">
      <MCascader
        inline
        title="选择服务城市"
        options={optionsWithDisabled}
        value={value}
        onChange={next => setValue(next)}
      />
      <MCascader inline disabled placeholder="禁用状态" options={regionOptions} />
    </div>
  );
};

const mCascaderDemo: DemoConfig = {
  intro:
    '移动端级联选择用于从有层级关系的数据中逐级选择。点击触发区从底部弹出面板，已选层级以标签页形式展示，点击父级继续下钻，选中叶子节点后回填并关闭，适合省市区、组织架构等场景。',
  demos: [
    {
      title: '基础用法',
      desc: '点击区域后从底部弹出面板；点击父级下钻到下一级，选中叶子节点后自动回填并关闭。',
      code: `const [value, setValue] = useState(['zhejiang', 'hangzhou', 'xihu']);

<MCascader
  options={regionOptions}
  value={value}
  onChange={next => setValue(next)}
/>`,
      render: <BasicDemo />
    },
    {
      title: '默认值与自定义标题',
      desc: '非受控模式通过 defaultValue 设置初始路径，title 自定义弹层标题。',
      code: `<MCascader
  title="选择所在地区"
  options={regionOptions}
  defaultValue={['jiangsu', 'nanjing', 'xuanwu']}
/>`,
      render: <DefaultValueDemo />
    },
    {
      title: '任意级选择',
      desc: '开启 changeOnSelect 后，点击父级即触发 onChange 并保留面板，可继续下钻或直接关闭。',
      code: `const [value, setValue] = useState(['guangdong']);

<MCascader
  options={regionOptions}
  value={value}
  changeOnSelect
  onChange={next => setValue(next)}
/>`,
      render: <ChangeOnSelectDemo />
    },
    {
      title: '禁用项与禁用状态',
      desc: '单个选项可通过 disabled 置灰不可选，选择器整体也可禁用。',
      code: `<MCascader
  title="选择服务城市"
  options={[
    {
      value: 'east',
      label: '华东',
      children: [
        { value: 'shanghai', label: '上海' },
        { value: 'hangzhou', label: '杭州' },
        { value: 'nanjing', label: '南京（暂未开通）', disabled: true }
      ]
    }
  ]}
  value={value}
  onChange={next => setValue(next)}
/>

<MCascader disabled placeholder="禁用状态" options={regionOptions} />`,
      render: <DisabledDemo />
    }
  ],
  api: [
    { prop: 'options', desc: '级联数据', type: 'CascaderOption[]', default: '-' },
    { prop: 'value', desc: '选中路径（受控）', type: 'string[]', default: '-' },
    { prop: 'defaultValue', desc: '默认选中路径', type: 'string[]', default: '[]' },
    { prop: 'title', desc: '弹层标题', type: 'ReactNode', default: "'请选择'" },
    { prop: 'placeholder', desc: '占位提示', type: 'string', default: "'请选择'" },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' },
    { prop: 'changeOnSelect', desc: '任意层级选择是否触发 onChange', type: 'boolean', default: 'false' },
    { prop: 'inline', desc: '弹层内联渲染，用于手机预览等受限容器', type: 'boolean', default: 'false' },
    { prop: 'closeOnMaskClick', desc: '点击遮罩是否关闭弹层', type: 'boolean', default: 'true' },
    { prop: 'onChange', desc: '选中路径变化回调', type: '(value, selectedOptions) => void', default: '-' },
    { prop: 'onOpen', desc: '弹层打开回调', type: '() => void', default: '-' },
    { prop: 'onClose', desc: '弹层关闭回调', type: '() => void', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ]
};

export default mCascaderDemo;
