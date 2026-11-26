import type { DemoConfig } from '../../../pages/Components/Demo/types';
import Layout from './Layout';

const layoutDemo: DemoConfig = {
  demos: [
    {
      title: '基础布局',
      code: `<Layout style={{ minHeight: '200px' }}>\n  <Layout.Header>Header</Layout.Header>\n  <Layout.Content>Content</Layout.Content>\n  <Layout.Footer>Footer</Layout.Footer>\n</Layout>`,
      render: (
        <Layout style={{ minHeight: '200px' }}>
          <Layout.Header>Header</Layout.Header>
          <Layout.Content>Content</Layout.Content>
          <Layout.Footer>Footer</Layout.Footer>
        </Layout>
      ),
    },
    {
      title: '侧边栏布局',
      code: `<Layout style={{ minHeight: '240px' }}>\n  <Layout.Sider width={160}>Sider</Layout.Sider>\n  <Layout>\n    <Layout.Header>Header</Layout.Header>\n    <Layout.Content>Content</Layout.Content>\n    <Layout.Footer>Footer</Layout.Footer>\n  </Layout>\n</Layout>`,
      render: (
        <Layout style={{ minHeight: '240px' }}>
          <Layout.Sider width={160}>Sider</Layout.Sider>
          <Layout>
            <Layout.Header>Header</Layout.Header>
            <Layout.Content>Content</Layout.Content>
            <Layout.Footer>Footer</Layout.Footer>
          </Layout>
        </Layout>
      ),
    },
    {
      title: '可折叠侧边栏',
      code: `<Layout style={{ minHeight: '240px' }}>\n  <Layout.Sider\n    collapsible\n    defaultCollapsed={false}\n    width={160}\n  >\n    Sider\n  </Layout.Sider>\n  <Layout>\n    <Layout.Header>Header</Layout.Header>\n    <Layout.Content>Content</Layout.Content>\n  </Layout>\n</Layout>`,
      render: (
        <Layout style={{ minHeight: '240px' }}>
          <Layout.Sider
            collapsible
            defaultCollapsed={false}
            width={160}
          >
            Sider
          </Layout.Sider>
          <Layout>
            <Layout.Header>Header</Layout.Header>
            <Layout.Content>Content</Layout.Content>
          </Layout>
        </Layout>
      ),
    },
  ],
  api: [
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' },
    { prop: 'height', desc: '顶部高度', type: 'string | number', default: '64px' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' },
    { prop: 'width', desc: '侧边栏宽度', type: 'string | number', default: '200px' },
    { prop: 'collapsedWidth', desc: '折叠时宽度', type: 'string | number', default: '64px' },
    { prop: 'collapsible', desc: '是否可折叠', type: 'boolean', default: 'false' },
    { prop: 'collapsed', desc: '当前是否折叠（受控）', type: 'boolean', default: 'false' },
    { prop: 'defaultCollapsed', desc: '默认是否折叠', type: 'boolean', default: 'false' },
    { prop: 'onCollapse', desc: '折叠状态变化回调', type: 'function(collapsed)', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ],
};

export default layoutDemo;
