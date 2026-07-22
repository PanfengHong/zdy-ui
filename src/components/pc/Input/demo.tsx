import React from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import Input from './Input';

const InputDemo = () => {
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
    </>
  );
};

export default InputDemo;
