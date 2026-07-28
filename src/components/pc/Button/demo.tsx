import React from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import Table from '../Table/Table';
import Button from './Button';

const ButtonDemo = () => {
  const apiColumns = [
    { title: '参数', dataIndex: 'prop' },
    { title: '说明', dataIndex: 'desc' },
    { title: '类型', dataIndex: 'type' },
    { title: '默认值', dataIndex: 'default' }
  ];

  const apiData = [
    { prop: 'type', desc: '按钮类型', type: 'ButtonType', default: 'default' },
    { prop: 'size', desc: '按钮尺寸', type: 'SizeType', default: 'medium' },
    { prop: 'shape', desc: '按钮形状', type: 'ButtonShape', default: 'default' },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' },
    { prop: 'loading', desc: '是否加载中', type: 'boolean', default: 'false' },
    { prop: 'onClick', desc: '点击事件回调', type: 'function', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' },
    { prop: 'children', desc: '按钮内容', type: 'ReactNode', default: '-' }
  ];

  return (
    <>
      <div className="component-group">
        <h3>基础示例</h3>
        <DemoBlock
          code={`
<Button type="primary">Primary</Button>
<Button type="default">Default</Button>
<Button type="text">Text</Button>
<Button type="link">Link</Button>
          `.trim()}
        >
          <div className="button-group">
            <Button type="primary">Primary</Button>
            <Button type="default">Default</Button>
            <Button type="text">Text</Button>
            <Button type="link">Link</Button>
          </div>
        </DemoBlock>
      </div>
      <div className="component-group">
        <h3>按钮尺寸</h3>
        <DemoBlock
          code={`
<Button type="primary" size="small">Small</Button>
<Button type="primary" size="medium">Medium</Button>
<Button type="primary" size="large">Large</Button>
<Button type="default" size="small">Small</Button>
<Button type="default" size="medium">Medium</Button>
<Button type="default" size="large">Large</Button>
          `.trim()}
        >
          <div className="button-group">
            <Button type="primary" size="small">Small</Button>
            <Button type="primary" size="medium">Medium</Button>
            <Button type="primary" size="large">Large</Button>
          </div>
          <div className="button-group">
            <Button type="default" size="small">Small</Button>
            <Button type="default" size="medium">Medium</Button>
            <Button type="default" size="large">Large</Button>
          </div>
        </DemoBlock>
      </div>
      <div className="component-group">
        <h3>按钮类型</h3>
        <DemoBlock
          code={`
<Button type="default">Default</Button>
<Button type="primary">Primary</Button>
<Button type="success">Success</Button>
<Button type="warning">Warning</Button>
<Button type="danger">Danger</Button>
          `.trim()}
        >
          <div className="button-group">
            <Button type="default">Default</Button>
            <Button type="primary">Primary</Button>
            <Button type="success">Success</Button>
            <Button type="warning">Warning</Button>
            <Button type="danger">Danger</Button>
          </div>
        </DemoBlock>
      </div>
      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>API</h3>
        <Table columns={apiColumns} dataSource={apiData} className="zdy-table-api" />
      </div>
    </>
  );
};

export default ButtonDemo;