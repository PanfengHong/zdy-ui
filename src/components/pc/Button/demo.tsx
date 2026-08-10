import React from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Button from './Button';

const ButtonDemo = () => {
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

  const demos = [
    {
      title: '基础示例',
      code: `<Button type="primary">Primary</Button>\n<Button type="default">Default</Button>\n<Button type="text">Text</Button>\n<Button type="link">Link</Button>`,
      render: (
        <div className="button-group">
          <Button type="primary">Primary</Button>
          <Button type="default">Default</Button>
          <Button type="text">Text</Button>
          <Button type="link">Link</Button>
        </div>
      ),
    },
    {
      title: '按钮尺寸',
      code: `<Button type="primary" size="small">Small</Button>\n<Button type="primary" size="medium">Medium</Button>\n<Button type="primary" size="large">Large</Button>\n<Button type="default" size="small">Small</Button>\n<Button type="default" size="medium">Medium</Button>\n<Button type="default" size="large">Large</Button>`,
      render: (
        <>
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
        </>
      ),
    },
    {
      title: '按钮类型',
      code: `<Button type="default">Default</Button>\n<Button type="primary">Primary</Button>\n<Button type="success">Success</Button>\n<Button type="warning">Warning</Button>\n<Button type="danger">Danger</Button>`,
      render: (
        <div className="button-group">
          <Button type="default">Default</Button>
          <Button type="primary">Primary</Button>
          <Button type="success">Success</Button>
          <Button type="warning">Warning</Button>
          <Button type="danger">Danger</Button>
        </div>
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

export default ButtonDemo;
