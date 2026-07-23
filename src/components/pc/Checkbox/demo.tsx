import React, { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import Checkbox from './Checkbox';

const CheckboxDemo = () => {
  const [groupValue, setGroupValue] = useState<string[]>(['apple', 'orange']);

  return (
    <>
      <div className="component-group">
        <h3>基础示例</h3>
        <DemoBlock
          code={`
<Checkbox>默认复选框</Checkbox>
<Checkbox defaultChecked>默认选中</Checkbox>
<Checkbox disabled>禁用状态</Checkbox>
<Checkbox disabled defaultChecked>禁用且选中</Checkbox>
          `.trim()}
        >
          <div style={{ display: 'flex', gap: '20px' }}>
            <Checkbox>默认复选框</Checkbox>
            <Checkbox defaultChecked>默认选中</Checkbox>
            <Checkbox disabled>禁用状态</Checkbox>
            <Checkbox disabled defaultChecked>禁用且选中</Checkbox>
          </div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>使用 label 属性</h3>
        <DemoBlock
          code={`
<Checkbox label="使用 label 属性" />
<Checkbox label="选中状态" defaultChecked />
          `.trim()}
        >
          <div style={{ display: 'flex', gap: '20px' }}>
            <Checkbox label="使用 label 属性" />
            <Checkbox label="选中状态" defaultChecked />
          </div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>半选状态（Indeterminate）</h3>
        <DemoBlock
          code={`
<Checkbox indeterminate>半选状态</Checkbox>
<Checkbox indeterminate checked>半选且选中</Checkbox>
          `.trim()}
        >
          <div style={{ display: 'flex', gap: '20px' }}>
            <Checkbox indeterminate>半选状态</Checkbox>
            <Checkbox indeterminate checked>半选且选中</Checkbox>
          </div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>复选框组</h3>
        <DemoBlock
          code={`
<Checkbox.Group defaultValue={['apple', 'orange']}>
  <Checkbox value="apple">苹果</Checkbox>
  <Checkbox value="orange">橙子</Checkbox>
  <Checkbox value="banana">香蕉</Checkbox>
</Checkbox.Group>
          `.trim()}
        >
          <Checkbox.Group defaultValue={['apple', 'orange']}>
            <Checkbox value="apple">苹果</Checkbox>
            <Checkbox value="orange">橙子</Checkbox>
            <Checkbox value="banana">香蕉</Checkbox>
          </Checkbox.Group>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>受控复选框组</h3>
        <DemoBlock
          code={`
const [value, setValue] = useState(['apple', 'orange']);

<Checkbox.Group value={value} onChange={setValue}>
  <Checkbox value="apple">苹果</Checkbox>
  <Checkbox value="orange">橙子</Checkbox>
  <Checkbox value="banana">香蕉</Checkbox>
</Checkbox.Group>
          `.trim()}
        >
          <Checkbox.Group value={groupValue} onChange={setGroupValue}>
            <Checkbox value="apple">苹果</Checkbox>
            <Checkbox value="orange">橙子</Checkbox>
            <Checkbox value="banana">香蕉</Checkbox>
          </Checkbox.Group>
          <p style={{ marginTop: '12px', color: '#666', fontSize: '14px' }}>
            当前选中：{groupValue.join('、') || '无'}
          </p>
        </DemoBlock>
      </div>
    </>
  );
};

export default CheckboxDemo;