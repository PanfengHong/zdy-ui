import React, { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
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
    </>
  );
};

export default SelectDemo;