import React from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Tabs from './Tabs';

const TabsDemo = () => {

  const apiData = [
    { prop: 'type', desc: '标签页类型', type: "'default' | 'capsule' | 'pill'", default: 'default' },
    { prop: 'activeKey', desc: '当前激活标签的 key', type: 'string', default: '-' },
    { prop: 'defaultActiveKey', desc: '默认激活标签的 key', type: 'string', default: '-' },
    { prop: 'onChange', desc: '切换标签回调', type: 'function(key)', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ];

  const tabPaneApiData = [
    { prop: 'tabKey', desc: '标签唯一标识', type: 'string', default: '-' },
    { prop: 'title', desc: '标签标题', type: 'ReactNode', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ];

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
      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>Tabs API</h3>
        <ApiTable dataSource={apiData} />
      </div>
      <div className="component-group">
        <h3>TabPane API</h3>
        <ApiTable dataSource={tabPaneApiData} />
      </div>
    </>
  );
};

export default TabsDemo;