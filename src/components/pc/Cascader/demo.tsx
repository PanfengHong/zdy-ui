/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';

import type { DemoConfig } from '../../../pages/Components/Demo/types';
import Cascader from './Cascader';
import type { CascaderOption } from './types';

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
    <>
      <div style={{ marginBottom: 12 }}>
        <span>当前路径：</span>
        <strong style={{ color: '#1890ff' }}>{value.join(' / ') || '未选择'}</strong>
      </div>
      <Cascader
        options={regionOptions}
        value={value}
        onChange={nextValue => setValue(nextValue)}
      />
    </>
  );
};

const ChangeOnSelectDemo = () => {
  const [value, setValue] = useState<string[]>(['jiangsu']);

  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <span>当前路径：</span>
        <strong style={{ color: '#1890ff' }}>{value.join(' / ') || '未选择'}</strong>
      </div>
      <Cascader
        options={regionOptions}
        value={value}
        changeOnSelect
        onChange={nextValue => setValue(nextValue)}
      />
    </>
  );
};

const CustomDisplayDemo = () => (
  <Cascader
    options={regionOptions}
    defaultValue={['guangdong', 'shenzhen', 'nanshan']}
    displayRender={labels => labels.join(' → ')}
  />
);

const cascaderDemo: DemoConfig = {
  intro:
    '级联选择用于从一组有层级关系的数据中逐级选择，适用于省市区、组织架构、商品分类等场景。PC 端以下拉多列形式展开，支持点击或悬浮展开、任意层级选择、清空和自定义展示。',
  demos: [
    {
      title: '基础用法',
      desc: '受控用法，选择到叶子节点后自动关闭下拉。',
      code: `const [value, setValue] = useState(['zhejiang', 'hangzhou', 'xihu']);

<Cascader
  options={regionOptions}
  value={value}
  onChange={nextValue => setValue(nextValue)}
/>`,
      render: <BasicDemo />
    },
    {
      title: '默认值与清空',
      desc: '非受控模式通过 defaultValue 设置初始路径，allowClear 控制是否显示清空按钮。',
      code: `<Cascader
  options={regionOptions}
  defaultValue={['jiangsu', 'nanjing', 'xuanwu']}
  allowClear
/>`,
      render: (
        <Cascader options={regionOptions} defaultValue={['jiangsu', 'nanjing', 'xuanwu']} allowClear />
      )
    },
    {
      title: '任意级选择',
      desc: '开启 changeOnSelect 后，选中任意层级都会触发 onChange，不必选到叶子节点。',
      code: `const [value, setValue] = useState(['jiangsu']);

<Cascader
  options={regionOptions}
  value={value}
  changeOnSelect
  onChange={nextValue => setValue(nextValue)}
/>`,
      render: <ChangeOnSelectDemo />
    },
    {
      title: '悬浮展开',
      desc: 'expandTrigger="hover" 时，鼠标移入父级即可展开下一列，点击叶子节点完成选择。',
      code: `<Cascader
  options={regionOptions}
  defaultValue={['guangdong', 'guangzhou', 'tianhe']}
  expandTrigger="hover"
/>`,
      render: (
        <Cascader
          options={regionOptions}
          defaultValue={['guangdong', 'guangzhou', 'tianhe']}
          expandTrigger="hover"
        />
      )
    },
    {
      title: '自定义展示与尺寸',
      desc: 'displayRender 自定义选中路径文案；size 支持 small / medium / large。',
      code: `<Cascader
  options={regionOptions}
  defaultValue={['guangdong', 'shenzhen', 'nanshan']}
  displayRender={labels => labels.join(' → ')}
/>

<Cascader options={regionOptions} size="small" placeholder="小尺寸" />
<Cascader options={regionOptions} size="large" placeholder="大尺寸" />`,
      render: (
        <>
          <div style={{ marginBottom: 16 }}>
            <CustomDisplayDemo />
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Cascader options={regionOptions} size="small" placeholder="小尺寸" />
            <Cascader options={regionOptions} size="large" placeholder="大尺寸" />
            <Cascader options={regionOptions} disabled placeholder="禁用状态" />
          </div>
        </>
      )
    }
  ],
  api: [
    { prop: 'options', desc: '级联数据', type: 'CascaderOption[]', default: '-' },
    { prop: 'value', desc: '选中路径（受控）', type: 'string[]', default: '-' },
    { prop: 'defaultValue', desc: '默认选中路径', type: 'string[]', default: '[]' },
    { prop: 'placeholder', desc: '占位提示', type: 'string', default: "'请选择'" },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' },
    { prop: 'allowClear', desc: '是否允许清空', type: 'boolean', default: 'true' },
    { prop: 'changeOnSelect', desc: '任意层级选择是否触发 onChange', type: 'boolean', default: 'false' },
    { prop: 'expandTrigger', desc: '展开子级的方式', type: "'click' | 'hover'", default: "'click'" },
    { prop: 'size', desc: '尺寸', type: "'small' | 'medium' | 'large'", default: "'medium'" },
    { prop: 'displayRender', desc: '自定义选中路径展示', type: '(labels, selectedOptions) => ReactNode', default: '-' },
    { prop: 'onChange', desc: '选中路径变化回调', type: '(value, selectedOptions) => void', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ]
};

export default cascaderDemo;
