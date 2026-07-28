import React, { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import Table from '../Table/Table';
import Checkbox from './Checkbox';

const CheckboxDemo = () => {
  const [groupValue, setGroupValue] = useState<string[]>(['apple', 'orange']);

  const apiColumns = [
    { title: '参数', dataIndex: 'prop' },
    { title: '说明', dataIndex: 'desc' },
    { title: '类型', dataIndex: 'type' },
    { title: '默认值', dataIndex: 'default' }
  ];

  const apiData = [
    { prop: 'value', desc: '当前选中值（用于Group）', type: 'string', default: '-' },
    { prop: 'checked', desc: '是否选中', type: 'boolean', default: '-' },
    { prop: 'defaultChecked', desc: '默认是否选中', type: 'boolean', default: 'false' },
    { prop: 'indeterminate', desc: '半选状态', type: 'boolean', default: 'false' },
    { prop: 'onChange', desc: '值变化回调', type: 'function', default: '-' },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' },
    { prop: 'label', desc: '标签内容', type: 'ReactNode', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ];

  const groupApiData = [
    { prop: 'value', desc: '当前选中值', type: 'string[]', default: '-' },
    { prop: 'defaultValue', desc: '默认选中值', type: 'string[]', default: '-' },
    { prop: 'onChange', desc: '值变化回调', type: 'function(value[])', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ];

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

      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>Checkbox API</h3>
        <Table columns={apiColumns} dataSource={apiData} className="zdy-table-api" />
      </div>

      <div className="component-group">
        <h3>Checkbox.Group API</h3>
        <Table columns={apiColumns} dataSource={groupApiData} className="zdy-table-api" />
      </div>
    </>
  );
};

export default CheckboxDemo;