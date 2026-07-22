import React from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import Switch from './Switch';

const SwitchDemo = () => {
  return (
    <>
      <div className="component-group">
        <h3>基础用法</h3>
        <DemoBlock
          code={`
<Switch defaultChecked />
<Switch />
<Switch disabled />
<Switch disabled defaultChecked />
          `.trim()}
        >
          <div style={{ display: 'flex', gap: '16px' }}>
            <Switch defaultChecked />
            <Switch />
            <Switch disabled />
            <Switch disabled defaultChecked />
          </div>
        </DemoBlock>
      </div>
      <div className="component-group">
        <h3>开关尺寸</h3>
        <DemoBlock
          code={`
<Switch size="small" />
<Switch size="medium" />
<Switch size="large" />
          `.trim()}
        >
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Switch size="small" />
              <span style={{ fontSize: '12px', color: '#999' }}>Small</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Switch size="medium" />
              <span style={{ fontSize: '12px', color: '#999' }}>Medium</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Switch size="large" />
              <span style={{ fontSize: '12px', color: '#999' }}>Large</span>
            </div>
          </div>
        </DemoBlock>
      </div>
    </>
  );
};

export default SwitchDemo;
