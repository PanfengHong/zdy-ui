import { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Breadcrumb from './Breadcrumb';

const BreadcrumbDemo = () => {
  const [clickedPath, setClickedPath] = useState<string>('');

  const apiData = [
    { prop: 'separator', desc: '分隔符', type: 'ReactNode', default: '"/"' },
    { prop: 'items', desc: '数据驱动模式的面包屑数据', type: 'Array<{ title, href?, icon?, onClick? }>', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' },
    { prop: 'children', desc: '面包屑子项（声明式模式）', type: 'ReactNode', default: '-' }
  ];

  const itemApiData = [
    { prop: 'href', desc: '链接地址', type: 'string', default: '-' },
    { prop: 'onClick', desc: '点击回调', type: '(e: MouseEvent) => void', default: '-' },
    { prop: 'icon', desc: '图标', type: 'ReactNode', default: '-' },
    { prop: 'overlay', desc: '下拉浮层内容', type: 'ReactNode', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' },
    { prop: 'children', desc: '内容', type: 'ReactNode', default: '-' }
  ];

  const demos = [
    {
      title: '基础用法',
      code: `<Breadcrumb>\n  <Breadcrumb.Item>首页</Breadcrumb.Item>\n  <Breadcrumb.Item>商品管理</Breadcrumb.Item>\n  <Breadcrumb.Item>商品列表</Breadcrumb.Item>\n</Breadcrumb>`,
      render: (
        <Breadcrumb>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item>商品管理</Breadcrumb.Item>
          <Breadcrumb.Item>商品列表</Breadcrumb.Item>
        </Breadcrumb>
      ),
    },
    {
      title: '带链接的面包屑',
      code: `<Breadcrumb>\n  <Breadcrumb.Item href="/">首页</Breadcrumb.Item>\n  <Breadcrumb.Item href="/products">商品管理</Breadcrumb.Item>\n  <Breadcrumb.Item>商品列表</Breadcrumb.Item>\n</Breadcrumb>`,
      render: (
        <Breadcrumb>
          <Breadcrumb.Item href="/">首页</Breadcrumb.Item>
          <Breadcrumb.Item href="/products">商品管理</Breadcrumb.Item>
          <Breadcrumb.Item>商品列表</Breadcrumb.Item>
        </Breadcrumb>
      ),
    },
    {
      title: '自定义分隔符',
      code: `<Breadcrumb separator=">">\n  <Breadcrumb.Item>首页</Breadcrumb.Item>\n  <Breadcrumb.Item>商品管理</Breadcrumb.Item>\n  <Breadcrumb.Item>商品列表</Breadcrumb.Item>\n</Breadcrumb>\n\n<Breadcrumb separator="-">\n  <Breadcrumb.Item>首页</Breadcrumb.Item>\n  <Breadcrumb.Item>商品管理</Breadcrumb.Item>\n  <Breadcrumb.Item>商品列表</Breadcrumb.Item>\n</Breadcrumb>`,
      render: (
        <>
          <div style={{ marginBottom: 16 }}>
            <Breadcrumb separator=">">
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>商品管理</Breadcrumb.Item>
              <Breadcrumb.Item>商品列表</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div style={{ marginBottom: 16 }}>
            <Breadcrumb separator="-">
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>商品管理</Breadcrumb.Item>
              <Breadcrumb.Item>商品列表</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <Breadcrumb separator="→">
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>商品管理</Breadcrumb.Item>
            <Breadcrumb.Item>商品列表</Breadcrumb.Item>
          </Breadcrumb>
        </>
      ),
    },
    {
      title: '带图标的面包屑',
      code: `<Breadcrumb>\n  <Breadcrumb.Item icon={<span>🏠</span>}>首页</Breadcrumb.Item>\n  <Breadcrumb.Item icon={<span>📦</span>}>商品管理</Breadcrumb.Item>\n  <Breadcrumb.Item icon={<span>📋</span>}>商品列表</Breadcrumb.Item>\n</Breadcrumb>`,
      render: (
        <Breadcrumb>
          <Breadcrumb.Item icon={<span>🏠</span>}>首页</Breadcrumb.Item>
          <Breadcrumb.Item icon={<span>📦</span>}>商品管理</Breadcrumb.Item>
          <Breadcrumb.Item icon={<span>📋</span>}>商品列表</Breadcrumb.Item>
        </Breadcrumb>
      ),
    },
    {
      title: '带下拉菜单的面包屑',
      code: `<Breadcrumb>\n  <Breadcrumb.Item>首页</Breadcrumb.Item>\n  <Breadcrumb.Item\n    overlay={\n      <>\n        <a>商品列表</a>\n        <a>商品分类</a>\n        <a>商品规格</a>\n      </>\n    }\n  >\n    商品管理\n  </Breadcrumb.Item>\n  <Breadcrumb.Item>商品详情</Breadcrumb.Item>\n</Breadcrumb>`,
      render: (
        <>
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item
              overlay={
                <>
                  <a onClick={() => setClickedPath('商品列表')}>商品列表</a>
                  <a onClick={() => setClickedPath('商品分类')}>商品分类</a>
                  <a onClick={() => setClickedPath('商品规格')}>商品规格</a>
                </>
              }
            >
              商品管理
            </Breadcrumb.Item>
            <Breadcrumb.Item>商品详情</Breadcrumb.Item>
          </Breadcrumb>
          {clickedPath && (
            <div style={{ marginTop: 8, fontSize: 12, color: '#999' }}>
              点击了：{clickedPath}
            </div>
          )}
        </>
      ),
    },
    {
      title: '点击事件',
      code: `<Breadcrumb>\n  <Breadcrumb.Item onClick={() => console.log('首页')}>首页</Breadcrumb.Item>\n  <Breadcrumb.Item onClick={() => console.log('商品管理')}>商品管理</Breadcrumb.Item>\n  <Breadcrumb.Item>商品列表</Breadcrumb.Item>\n</Breadcrumb>`,
      render: (
        <>
          <Breadcrumb>
            <Breadcrumb.Item onClick={() => setClickedPath('首页')}>首页</Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => setClickedPath('商品管理')}>商品管理</Breadcrumb.Item>
            <Breadcrumb.Item>商品列表</Breadcrumb.Item>
          </Breadcrumb>
          {clickedPath && (
            <div style={{ marginTop: 8, fontSize: 12, color: '#999' }}>
              点击了：{clickedPath}
            </div>
          )}
        </>
      ),
    },
    {
      title: '数据驱动模式（items）',
      code: `<Breadcrumb\n  items={[\n    { title: '首页', href: '/' },\n    { title: '商品管理', href: '/products' },\n    { title: '商品列表' }\n  ]}\n/>`,
      render: (
        <Breadcrumb
          items={[
            { title: '首页', href: '/' },
            { title: '商品管理', href: '/products' },
            { title: '商品列表' }
          ]}
        />
      ),
    },
    {
      title: '数据驱动 + 图标 + 自定义分隔符',
      code: `<Breadcrumb\n  separator="/"\n  items={[\n    { title: '首页', icon: <span>🏠</span>, href: '/' },\n    { title: '用户中心', icon: <span>👤</span>, href: '/user' },\n    { title: '订单管理', icon: <span>📋</span> }\n  ]}\n/>`,
      render: (
        <Breadcrumb
          separator="/"
          items={[
            { title: '首页', icon: <span>🏠</span>, href: '/' },
            { title: '用户中心', icon: <span>👤</span>, href: '/user' },
            { title: '订单管理', icon: <span>📋</span> }
          ]}
        />
      ),
    },
  ];

  return (
    <>
      {demos.map((demo) => (
        <div key={demo.title} className="component-group">
          <h3>{demo.title}</h3>
          <DemoBlock code={demo.code}>{demo.render}</DemoBlock>
        </div>
      ))}
      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>Breadcrumb API</h3>
        <ApiTable dataSource={apiData} />
      </div>
      <div className="component-group">
        <h3>Breadcrumb.Item API</h3>
        <ApiTable dataSource={itemApiData} />
      </div>
    </>
  );
};

export default BreadcrumbDemo;
