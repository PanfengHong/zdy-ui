import React, { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Radio from './Radio';

const RadioDemo = () => {
  const [radioValue, setRadioValue] = useState('a');

  const apiData = [
    { prop: 'value', desc: '当前选中值', type: 'string', default: '-' },
    { prop: 'checked', desc: '是否选中', type: 'boolean', default: '-' },
    { prop: 'defaultChecked', desc: '默认是否选中', type: 'boolean', default: 'false' },
    { prop: 'onChange', desc: '值变化回调', type: 'function', default: '-' },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' },
    { prop: 'label', desc: '标签内容', type: 'ReactNode', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ];

  const groupApiData = [
    { prop: 'value', desc: '当前选中值', type: 'string', default: '-' },
    { prop: 'defaultValue', desc: '默认选中值', type: 'string', default: '-' },
    { prop: 'onChange', desc: '值变化回调', type: 'function(value)', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ];

  const demos = [
    {
      title: '基础示例',
      code: `<Radio>基础示例</Radio>`,
      render: (
        <div className="button-group">
          <Radio>基础示例</Radio>
        </div>
      ),
    },
    {
      title: 'Radio Group',
      code: `<Radio.Group value={value} onChange={setValue}>\n  <Radio value="a">选项A</Radio>\n  <Radio value="b">选项B</Radio>\n  <Radio value="c">选项C</Radio>\n</Radio.Group>`,
      render: (
        <>
          <Radio.Group value={radioValue} onChange={setRadioValue}>
            <Radio value="a">选项A</Radio>
            <Radio value="b">选项B</Radio>
            <Radio value="c">选项C</Radio>
          </Radio.Group>
          <p style={{ marginTop: '12px', color: '#666', fontSize: '14px' }}>
            当前选中：{radioValue}
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
        <h3>Radio API</h3>
        <ApiTable dataSource={apiData} />
      </div>
      <div className="component-group">
        <h3>Radio.Group API</h3>
        <ApiTable dataSource={groupApiData} />
      </div>
    </>
  );
};

export default RadioDemo;
