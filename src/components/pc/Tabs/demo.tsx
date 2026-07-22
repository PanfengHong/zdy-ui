import React from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import Tabs from './Tabs';

const TabsDemo = () => {
  return (
    <>
      <div className="component-group">
        <h3>基础示例</h3>
        <DemoBlock
          code={`
<Tabs defaultActiveKey="1">
  <Tabs.TabPane tabKey="1" title="Tab 1">
    Tab 1 content
  </Tabs.TabPane>
  <Tabs.TabPane tabKey="2" title="Tab 2">
    Tab 2 content
  </Tabs.TabPane>
  <Tabs.TabPane tabKey="3" title="Tab 3">
    Tab 3 content
  </Tabs.TabPane>
</Tabs>
          `.trim()}
        >
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tabKey="1" title="Tab 1">
              Tab 1 content
            </Tabs.TabPane>
            <Tabs.TabPane tabKey="2" title="Tab 2">
              Tab 2 content
            </Tabs.TabPane>
            <Tabs.TabPane tabKey="3" title="Tab 3">
              Tab 3 content
            </Tabs.TabPane>
          </Tabs>
        </DemoBlock>
      </div>
      <div className="component-group">
        <h3>胶囊型页签</h3>
        <DemoBlock
          code={`
<Tabs type="capsule" defaultActiveKey="1">
  <Tabs.TabPane tabKey="1" title="Tab 1">
    Tab 1 content
  </Tabs.TabPane>
  <Tabs.TabPane tabKey="2" title="Tab 2">
    Tab 2 content
  </Tabs.TabPane>
  <Tabs.TabPane tabKey="3" title="Tab 3">
    Tab 3 content
  </Tabs.TabPane>
</Tabs>
          `.trim()}
        >
          <Tabs type="capsule" defaultActiveKey="1">
            <Tabs.TabPane tabKey="1" title="Tab 1">
              Tab 1 content
            </Tabs.TabPane>
            <Tabs.TabPane tabKey="2" title="Tab 2">
              Tab 2 content
            </Tabs.TabPane>
            <Tabs.TabPane tabKey="3" title="Tab 3">
              Tab 3 content
            </Tabs.TabPane>
          </Tabs>
        </DemoBlock>
      </div>
      <div className="component-group">
        <h3>药丸型页签</h3>
        <DemoBlock
          code={`
<Tabs type="pill" defaultActiveKey="1">
  <Tabs.TabPane tabKey="1" title="Tab 1">
    Tab 1 content
  </Tabs.TabPane>
  <Tabs.TabPane tabKey="2" title="Tab 2">
    Tab 2 content
  </Tabs.TabPane>
  <Tabs.TabPane tabKey="3" title="Tab 3">
    Tab 3 content
  </Tabs.TabPane>
</Tabs>
          `.trim()}
        >
          <Tabs type="pill" defaultActiveKey="1">
            <Tabs.TabPane tabKey="1" title="Tab 1">
              Tab 1 content
            </Tabs.TabPane>
            <Tabs.TabPane tabKey="2" title="Tab 2">
              Tab 2 content
            </Tabs.TabPane>
            <Tabs.TabPane tabKey="3" title="Tab 3">
              Tab 3 content
            </Tabs.TabPane>
          </Tabs>
        </DemoBlock>
      </div>
    </>
  );
};

export default TabsDemo;
