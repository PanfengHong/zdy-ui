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

  return (
    <>
      <div className="component-group">
        <h3>基础示例</h3>
        <DemoBlock
          code={`
const options = [
  { value: 'apple', label: '苹果' },
  { value: 'orange', label: '橙子' },
  { value: 'banana', label: '香蕉' }
];

<Select options={options} placeholder="请选择水果" />
          `.trim()}
        >
          <Select options={[
            { value: 'apple', label: '苹果' },
            { value: 'orange', label: '橙子' },
            { value: 'banana', label: '香蕉' }
          ]} placeholder="请选择水果" />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>默认选中</h3>
        <DemoBlock
          code={`
<Select options={options} defaultValue="orange" placeholder="请选择水果" />
          `.trim()}
        >
          <Select options={options} defaultValue="orange" placeholder="请选择水果" />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>受控模式</h3>
        <DemoBlock
          code={`
const [value, setValue] = useState('orange');

<Select options={options} value={value} onChange={setValue} placeholder="请选择水果" />
<p>当前选中：{value || '无'}</p>
          `.trim()}
        >
          <Select options={options} value={value} onChange={setValue} placeholder="请选择水果" />
          <p style={{ marginTop: '12px', color: '#666', fontSize: '14px' }}>
            当前选中：{value || '无'}
          </p>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>禁用状态</h3>
        <DemoBlock
          code={`
<Select options={options} disabled placeholder="禁用状态" />
          `.trim()}
        >
          <Select options={options} disabled placeholder="禁用状态" />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>禁用选项</h3>
        <DemoBlock
          code={`
<Select options={[
  { value: 'apple', label: '苹果' },
  { value: 'orange', label: '橙子（禁用）', disabled: true },
  { value: 'banana', label: '香蕉' }
]} placeholder="禁用选项" />
          `.trim()}
        >
          <Select options={[
            { value: 'apple', label: '苹果' },
            { value: 'orange', label: '橙子（禁用）', disabled: true },
            { value: 'banana', label: '香蕉' }
          ]} placeholder="禁用选项" />
        </DemoBlock>
      </div>

      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>API</h3>
        <ApiTable dataSource={apiData} />
      </div>
    </>
  );
};

export default SelectDemo;