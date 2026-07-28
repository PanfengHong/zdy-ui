import React from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Layout from './Layout';

const LayoutDemo = () => {

  const layoutApiData = [
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ];

  const headerApiData = [
    { prop: 'height', desc: '顶部高度', type: 'string | number', default: '64px' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ];

  const siderApiData = [
    { prop: 'width', desc: '侧边栏宽度', type: 'string | number', default: '200px' },
    { prop: 'collapsedWidth', desc: '折叠时宽度', type: 'string | number', default: '64px' },
    { prop: 'collapsible', desc: '是否可折叠', type: 'boolean', default: 'false' },
    { prop: 'collapsed', desc: '当前是否折叠（受控）', type: 'boolean', default: 'false' },
    { prop: 'defaultCollapsed', desc: '默认是否折叠', type: 'boolean', default: 'false' },
    { prop: 'onCollapse', desc: '折叠状态变化回调', type: 'function(collapsed)', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ];

  const footerApiData = [
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ];

  const contentApiData = [
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ];

  return (
    <>
      <div className="component-group">
        <h3>基础布局</h3>
        <DemoBlock
          code={`
<Layout style={{ minHeight: '200px' }}>
  <Layout.Header>Header</Layout.Header>
  <Layout.Content>Content</Layout.Content>
  <Layout.Footer>Footer</Layout.Footer>
</Layout>
          `.trim()}
        >
          <Layout style={{ minHeight: '200px' }}>
            <Layout.Header>Header</Layout.Header>
            <Layout.Content>Content</Layout.Content>
            <Layout.Footer>Footer</Layout.Footer>
          </Layout>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>侧边栏布局</h3>
        <DemoBlock
          code={`
<Layout style={{ minHeight: '240px' }}>
  <Layout.Sider width={160}>Sider</Layout.Sider>
  <Layout>
    <Layout.Header>Header</Layout.Header>
    <Layout.Content>Content</Layout.Content>
    <Layout.Footer>Footer</Layout.Footer>
  </Layout>
</Layout>
          `.trim()}
        >
          <Layout style={{ minHeight: '240px' }}>
            <Layout.Sider width={160}>Sider</Layout.Sider>
            <Layout>
              <Layout.Header>Header</Layout.Header>
              <Layout.Content>Content</Layout.Content>
              <Layout.Footer>Footer</Layout.Footer>
            </Layout>
          </Layout>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>可折叠侧边栏</h3>
        <DemoBlock
          code={`
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
          `.trim()}
        >
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
        </DemoBlock>
      </div>

      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>Layout API</h3>
        <ApiTable dataSource={layoutApiData} />
      </div>
      <div className="component-group">
        <h3>Layout.Header API</h3>
        <ApiTable dataSource={headerApiData} />
      </div>
      <div className="component-group">
        <h3>Layout.Sider API</h3>
        <ApiTable dataSource={siderApiData} />
      </div>
      <div className="component-group">
        <h3>Layout.Content API</h3>
        <ApiTable dataSource={contentApiData} />
      </div>
      <div className="component-group">
        <h3>Layout.Footer API</h3>
        <ApiTable dataSource={footerApiData} />
      </div>
    </>
  );
};

export default LayoutDemo;