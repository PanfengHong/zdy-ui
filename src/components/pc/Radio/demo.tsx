import React from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import Radio from './Radio';

const RadioDemo = () => {
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
    </>
  );
};

export default RadioDemo;
