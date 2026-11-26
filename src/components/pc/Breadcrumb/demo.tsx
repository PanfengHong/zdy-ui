import { useState } from 'react';
import type { DemoConfig } from '../../../pages/Components/Demo/types';
import Breadcrumb from './Breadcrumb';

const DropdownBreadcrumbDemo = () => {
  const [clickedPath, setClickedPath] = useState<string>('');

  return (
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
  );
};

const ClickBreadcrumbDemo = () => {
  const [clickedPath, setClickedPath] = useState<string>('');

  return (
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
  );
};

const breadcrumbDemo: DemoConfig = {
  demos: [
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
      render: <DropdownBreadcrumbDemo />,
    },
    {
      title: '点击事件',
      code: `<Breadcrumb>\n  <Breadcrumb.Item onClick={() => console.log('首页')}>首页</Breadcrumb.Item>\n  <Breadcrumb.Item onClick={() => console.log('商品管理')}>商品管理</Breadcrumb.Item>\n  <Breadcrumb.Item>商品列表</Breadcrumb.Item>\n</Breadcrumb>`,
      render: <ClickBreadcrumbDemo />,
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
  ],
  api: [
    { prop: 'separator', desc: '分隔符', type: 'ReactNode', default: '"/"' },
    { prop: 'items', desc: '数据驱动模式的面包屑数据', type: 'Array<{ title, href?, icon?, onClick? }>', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' },
    { prop: 'children', desc: '面包屑子项（声明式模式）', type: 'ReactNode', default: '-' },
    { prop: 'href', desc: '链接地址', type: 'string', default: '-' },
    { prop: 'onClick', desc: '点击回调', type: '(e: MouseEvent) => void', default: '-' },
    { prop: 'icon', desc: '图标', type: 'ReactNode', default: '-' },
    { prop: 'overlay', desc: '下拉浮层内容', type: 'ReactNode', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' },
    { prop: 'children', desc: '内容', type: 'ReactNode', default: '-' }
  ],
};

export default breadcrumbDemo;
