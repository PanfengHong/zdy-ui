import React from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import Layout from './Layout';

const LayoutDemo = () => {
  return (
    <>
      <div className="component-group">
        <h3>上中下布局（Header + Content + Footer）</h3>
        <DemoBlock
          code={`
<Layout style={{ height: '300px' }}>
  <Layout.Header style={{ backgroundColor: '#001529', color: '#fff' }}>Header</Layout.Header>
  <Layout.Content style={{ backgroundColor: '#f0f2f5' }}>Content</Layout.Content>
  <Layout.Footer>Footer</Layout.Footer>
</Layout>
          `.trim()}
        >
          <Layout style={{ minHeight: 'auto', height: '300px' }}>
            <Layout.Header style={{ backgroundColor: '#001529', color: '#fff' }}>Header</Layout.Header>
            <Layout.Content style={{ backgroundColor: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Content</Layout.Content>
            <Layout.Footer>Footer</Layout.Footer>
          </Layout>
        </DemoBlock>
      </div>
      <div className="component-group">
        <h3>左右布局（Sider + Content）</h3>
        <DemoBlock
          code={`
<Layout style={{ height: '300px' }}>
  <Layout.Sider width={200} style={{ backgroundColor: '#001529', color: '#fff' }}>Sider</Layout.Sider>
  <Layout.Content style={{ backgroundColor: '#f0f2f5' }}>Content</Layout.Content>
</Layout>
          `.trim()}
        >
          <Layout style={{ minHeight: 'auto', height: '300px' }}>
            <Layout.Sider width={200} style={{ backgroundColor: '#001529', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Sider</Layout.Sider>
            <Layout.Content style={{ backgroundColor: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Content</Layout.Content>
          </Layout>
        </DemoBlock>
      </div>
      <div className="component-group">
        <h3>上左右布局（Header + Sider + Content）</h3>
        <DemoBlock
          code={`
<Layout style={{ height: '300px' }}>
  <Layout.Header style={{ backgroundColor: '#001529', color: '#fff' }}>Header</Layout.Header>
  <Layout>
    <Layout.Sider width={200} style={{ backgroundColor: '#001529', color: '#fff' }}>Sider</Layout.Sider>
    <Layout.Content style={{ backgroundColor: '#f0f2f5' }}>Content</Layout.Content>
  </Layout>
</Layout>
          `.trim()}
        >
          <Layout style={{ minHeight: 'auto', height: '300px' }}>
            <Layout.Header style={{ backgroundColor: '#001529', color: '#fff' }}>Header</Layout.Header>
            <Layout>
              <Layout.Sider width={200} style={{ backgroundColor: '#001529', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Sider</Layout.Sider>
              <Layout.Content style={{ backgroundColor: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Content</Layout.Content>
            </Layout>
          </Layout>
        </DemoBlock>
      </div>
      <div className="component-group">
        <h3>上左右下布局（Header + Sider + Content + Footer）</h3>
        <DemoBlock
          code={`
<Layout style={{ height: '300px' }}>
  <Layout.Header style={{ backgroundColor: '#001529', color: '#fff' }}>Header</Layout.Header>
  <Layout>
    <Layout>
      <Layout.Sider width={200} style={{ backgroundColor: '#001529', color: '#fff' }}>Sider</Layout.Sider>
      <Layout.Content style={{ backgroundColor: '#f0f2f5' }}>Content</Layout.Content>
    </Layout>
    <Layout.Footer>Footer</Layout.Footer>
  </Layout>
</Layout>
          `.trim()}
        >
          <Layout style={{ minHeight: 'auto', height: '300px' }}>
            <Layout.Header style={{ backgroundColor: '#001529', color: '#fff' }}>Header</Layout.Header>
            <Layout>
              <Layout>
                <Layout.Sider width={200} style={{ backgroundColor: '#001529', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Sider</Layout.Sider>
                <Layout.Content style={{ backgroundColor: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Content</Layout.Content>
              </Layout>
              <Layout.Footer>Footer</Layout.Footer>
            </Layout>
          </Layout>
        </DemoBlock>
      </div>
      <div className="component-group">
        <h3>可折叠侧边栏</h3>
        <DemoBlock
          code={`
<Layout style={{ height: '300px' }}>
  <Layout.Sider 
    width={200} 
    collapsible 
    style={{ backgroundColor: '#001529', color: '#fff' }}
  >
    Sider
  </Layout.Sider>
  <Layout.Content style={{ backgroundColor: '#f0f2f5' }}>Content</Layout.Content>
</Layout>
          `.trim()}
        >
          <Layout style={{ minHeight: 'auto', height: '300px' }}>
            <Layout.Sider width={200} collapsible style={{ backgroundColor: '#001529', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Sider
            </Layout.Sider>
            <Layout.Content style={{ backgroundColor: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Content</Layout.Content>
          </Layout>
        </DemoBlock>
      </div>
    </>
  );
};

export default LayoutDemo;
