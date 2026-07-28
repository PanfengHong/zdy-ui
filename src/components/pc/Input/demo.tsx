import React from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import Table from '../Table/Table';
import Input from './Input';

const InputDemo = () => {
  const apiColumns = [
    { title: '参数', dataIndex: 'prop' },
    { title: '说明', dataIndex: 'desc' },
    { title: '类型', dataIndex: 'type' },
    { title: '默认值', dataIndex: 'default' }
  ];

  const apiData = [
    { prop: 'type', desc: '输入框类型', type: 'string', default: 'text' },
    { prop: 'value', desc: '当前值', type: 'string | number', default: '-' },
    { prop: 'onChange', desc: '值变化回调', type: 'function', default: '-' },
    { prop: 'placeholder', desc: '占位提示', type: 'string', default: '-' },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' },
    { prop: 'size', desc: '输入框尺寸', type: 'SizeType', default: 'medium' },
    { prop: 'prefix', desc: '前缀内容', type: 'ReactNode', default: '-' },
    { prop: 'suffix', desc: '后缀内容', type: 'ReactNode', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ];

  return (
    <>
      <div className="component-group">
        <h3>基础示例</h3>
        <DemoBlock
          code={`
<Input placeholder="请输入内容" />
          `.trim()}
        >
          <Input placeholder="请输入内容" />
        </DemoBlock>
      </div>
      <div className="component-group">
        <h3>输入框尺寸</h3>
        <DemoBlock
          code={`
<Input placeholder="Small" size="small" />
<Input placeholder="Medium" size="medium" />
<Input placeholder="Large" size="large" />
          `.trim()}
        >
          <Input placeholder="Small" size="small" />
          <Input placeholder="Medium" size="medium" />
          <Input placeholder="Large" size="large" />
        </DemoBlock>
      </div>
      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>API</h3>
        <Table columns={apiColumns} dataSource={apiData} className="zdy-table-api" />
      </div>
    </>
  );
};

export default InputDemo;