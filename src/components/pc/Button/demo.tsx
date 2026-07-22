import React from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import Button from './Button';

const ButtonDemo = () => {
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
    </>
  );
};

export default ButtonDemo;
