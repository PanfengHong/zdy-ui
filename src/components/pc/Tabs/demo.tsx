import type { DemoConfig } from '../../../pages/Components/Demo/types';
import Tabs from './Tabs';

const tabsDemo: DemoConfig = {
  demos: [
    {
      title: '基础示例',
      code: `
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
          `.trim(),
      render: (
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
      )
    },
    {
      title: '胶囊型页签',
      code: `
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
          `.trim(),
      render: (
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
      )
    },
    {
      title: '药丸型页签',
      code: `
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
          `.trim(),
      render: (
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
      )
    }
  ],
  api: [
    { prop: 'type', desc: '标签页类型', type: "'default' | 'capsule' | 'pill'", default: 'default' },
    { prop: 'activeKey', desc: '当前激活标签的 key', type: 'string', default: '-' },
    { prop: 'defaultActiveKey', desc: '默认激活标签的 key', type: 'string', default: '-' },
    { prop: 'onChange', desc: '切换标签回调', type: 'function(key)', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' },
    { prop: 'tabKey', desc: '标签唯一标识', type: 'string', default: '-' },
    { prop: 'title', desc: '标签标题', type: 'ReactNode', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ],
};

export default tabsDemo;
