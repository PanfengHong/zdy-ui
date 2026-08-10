import React, { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Select from './Select';

const SelectDemo = () => {
  const [value, setValue] = useState('orange');

  const options = [
    { value: 'apple', label: '苹果' },
    { value: 'orange', label: '橙子' },
    { value: 'banana', label: '香蕉' },
    { value: 'grape', label: '葡萄' },
    { value: 'mango', label: '芒果', disabled: true }
  ];

  const apiData = [
    { prop: 'value', desc: '当前选中值', type: 'string', default: '-' },
    { prop: 'defaultValue', desc: '默认选中值', type: 'string', default: '-' },
    { prop: 'options', desc: '选项列表', type: 'SelectOption[]', default: '-' },
    { prop: 'placeholder', desc: '占位提示', type: 'string', default: '-' },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' },
    { prop: 'onChange', desc: '值变化回调', type: 'function(value)', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ];

  const demos = [
    {
      title: '基础示例',
      code: `const options = [\n  { value: 'apple', label: '苹果' },\n  { value: 'orange', label: '橙子' },\n  { value: 'banana', label: '香蕉' }\n];\n\n<Select options={options} placeholder="请选择水果" />`,
      render: (
        <Select options={[
          { value: 'apple', label: '苹果' },
          { value: 'orange', label: '橙子' },
          { value: 'banana', label: '香蕉' }
        ]} placeholder="请选择水果" />
      ),
    },
    {
      title: '默认选中',
      code: `<Select options={options} defaultValue="orange" placeholder="请选择水果" />`,
      render: <Select options={options} defaultValue="orange" placeholder="请选择水果" />,
    },
    {
      title: '受控模式',
      code: `const [value, setValue] = useState('orange');\n\n<Select options={options} value={value} onChange={setValue} placeholder="请选择水果" />\n<p>当前选中：{value || '无'}</p>`,
      render: (
        <>
          <Select options={options} value={value} onChange={setValue} placeholder="请选择水果" />
          <p style={{ marginTop: '12px', color: '#666', fontSize: '14px' }}>
            当前选中：{value || '无'}
          </p>
        </>
      ),
    },
    {
      title: '禁用状态',
      code: `<Select options={options} disabled placeholder="禁用状态" />`,
      render: <Select options={options} disabled placeholder="禁用状态" />,
    },
    {
      title: '禁用选项',
      code: `<Select options={[\n  { value: 'apple', label: '苹果' },\n  { value: 'orange', label: '橙子（禁用）', disabled: true },\n  { value: 'banana', label: '香蕉' }\n]} placeholder="禁用选项" />`,
      render: (
        <Select options={[
          { value: 'apple', label: '苹果' },
          { value: 'orange', label: '橙子（禁用）', disabled: true },
          { value: 'banana', label: '香蕉' }
        ]} placeholder="禁用选项" />
      ),
    },
  ];

  return (
    <>
      {demos.map((demo) => (
        <div key={demo.title} className="component-group">
          <h3>{demo.title}</h3>
          <DemoBlock code={demo.code}>{demo.render}</DemoBlock>
        </div>
      ))}
      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>API</h3>
        <ApiTable dataSource={apiData} />
      </div>
    </>
  );
};

export default SelectDemo;
