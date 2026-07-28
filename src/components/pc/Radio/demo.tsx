import React, { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import Table from '../Table/Table';
import Radio from './Radio';

const RadioDemo = () => {
  const [radioValue, setRadioValue] = useState('a');

  const apiColumns = [
    { title: '参数', dataIndex: 'prop' },
    { title: '说明', dataIndex: 'desc' },
    { title: '类型', dataIndex: 'type' },
    { title: '默认值', dataIndex: 'default' }
  ];

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

  return (
    <>
      <div className="component-group">
        <h3>基础示例</h3>
        <DemoBlock
          code={`
<Radio>基础示例</Radio>
          `.trim()}
        >
          <div className="button-group">
            <Radio>基础示例</Radio>
          </div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>Radio Group</h3>
        <DemoBlock
          code={`
<Radio.Group value={value} onChange={setValue}>
  <Radio value="a">选项A</Radio>
  <Radio value="b">选项B</Radio>
  <Radio value="c">选项C</Radio>
</Radio.Group>
          `.trim()}
        >
          <Radio.Group value={radioValue} onChange={setRadioValue}>
            <Radio value="a">选项A</Radio>
            <Radio value="b">选项B</Radio>
            <Radio value="c">选项C</Radio>
          </Radio.Group>
          <p style={{ marginTop: '12px', color: '#666', fontSize: '14px' }}>
            当前选中：{radioValue}
          </p>
        </DemoBlock>
      </div>

      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>Radio API</h3>
        <Table columns={apiColumns} dataSource={apiData} className="zdy-table-api" />
      </div>

      <div className="component-group">
        <h3>Radio.Group API</h3>
        <Table columns={apiColumns} dataSource={groupApiData} className="zdy-table-api" />
      </div>
    </>
  );
};

export default RadioDemo;