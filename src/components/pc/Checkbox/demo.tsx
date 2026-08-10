import React, { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Checkbox from './Checkbox';

const CheckboxDemo = () => {
  const [groupValue, setGroupValue] = useState<string[]>(['apple', 'orange']);

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

  const demos = [
    {
      title: '基础示例',
      code: `<Checkbox>默认复选框</Checkbox>\n<Checkbox defaultChecked>默认选中</Checkbox>\n<Checkbox disabled>禁用状态</Checkbox>\n<Checkbox disabled defaultChecked>禁用且选中</Checkbox>`,
      render: (
        <div style={{ display: 'flex', gap: '20px' }}>
          <Checkbox>默认复选框</Checkbox>
          <Checkbox defaultChecked>默认选中</Checkbox>
          <Checkbox disabled>禁用状态</Checkbox>
          <Checkbox disabled defaultChecked>禁用且选中</Checkbox>
        </div>
      ),
    },
    {
      title: '使用 label 属性',
      code: `<Checkbox label="使用 label 属性" />\n<Checkbox label="选中状态" defaultChecked />`,
      render: (
        <div style={{ display: 'flex', gap: '20px' }}>
          <Checkbox label="使用 label 属性" />
          <Checkbox label="选中状态" defaultChecked />
        </div>
      ),
    },
    {
      title: '半选状态（Indeterminate）',
      code: `<Checkbox indeterminate>半选状态</Checkbox>\n<Checkbox indeterminate checked>半选且选中</Checkbox>`,
      render: (
        <div style={{ display: 'flex', gap: '20px' }}>
          <Checkbox indeterminate>半选状态</Checkbox>
          <Checkbox indeterminate checked>半选且选中</Checkbox>
        </div>
      ),
    },
    {
      title: '复选框组',
      code: `<Checkbox.Group defaultValue={['apple', 'orange']}>\n  <Checkbox value="apple">苹果</Checkbox>\n  <Checkbox value="orange">橙子</Checkbox>\n  <Checkbox value="banana">香蕉</Checkbox>\n</Checkbox.Group>`,
      render: (
        <Checkbox.Group defaultValue={['apple', 'orange']}>
          <Checkbox value="apple">苹果</Checkbox>
          <Checkbox value="orange">橙子</Checkbox>
          <Checkbox value="banana">香蕉</Checkbox>
        </Checkbox.Group>
      ),
    },
    {
      title: '受控复选框组',
      code: `const [value, setValue] = useState(['apple', 'orange']);\n\n<Checkbox.Group value={value} onChange={setValue}>\n  <Checkbox value="apple">苹果</Checkbox>\n  <Checkbox value="orange">橙子</Checkbox>\n  <Checkbox value="banana">香蕉</Checkbox>\n</Checkbox.Group>`,
      render: (
        <>
          <Checkbox.Group value={groupValue} onChange={setGroupValue}>
            <Checkbox value="apple">苹果</Checkbox>
            <Checkbox value="orange">橙子</Checkbox>
            <Checkbox value="banana">香蕉</Checkbox>
          </Checkbox.Group>
          <p style={{ marginTop: '12px', color: '#666', fontSize: '14px' }}>
            当前选中：{groupValue.join('、') || '无'}
          </p>
        </>
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
        <h3>Checkbox API</h3>
        <ApiTable dataSource={apiData} />
      </div>
      <div className="component-group">
        <h3>Checkbox.Group API</h3>
        <ApiTable dataSource={groupApiData} />
      </div>
    </>
  );
};

export default CheckboxDemo;
