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

  return (
    <>
      <div className="component-group">
        <h3>基础用法</h3>
        <DemoBlock
          code={`<Breadcrumb>
  <Breadcrumb.Item>首页</Breadcrumb.Item>
  <Breadcrumb.Item>商品管理</Breadcrumb.Item>
  <Breadcrumb.Item>商品列表</Breadcrumb.Item>
</Breadcrumb>`}
        >
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>商品管理</Breadcrumb.Item>
            <Breadcrumb.Item>商品列表</Breadcrumb.Item>
          </Breadcrumb>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>带链接的面包屑</h3>
        <DemoBlock
          code={`<Breadcrumb>
  <Breadcrumb.Item href="/">首页</Breadcrumb.Item>
  <Breadcrumb.Item href="/products">商品管理</Breadcrumb.Item>
  <Breadcrumb.Item>商品列表</Breadcrumb.Item>
</Breadcrumb>`}
        >
          <Breadcrumb>
            <Breadcrumb.Item href="/">首页</Breadcrumb.Item>
            <Breadcrumb.Item href="/products">商品管理</Breadcrumb.Item>
            <Breadcrumb.Item>商品列表</Breadcrumb.Item>
          </Breadcrumb>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>自定义分隔符</h3>
        <DemoBlock
          code={`<Breadcrumb separator=">">
  <Breadcrumb.Item>首页</Breadcrumb.Item>
  <Breadcrumb.Item>商品管理</Breadcrumb.Item>
  <Breadcrumb.Item>商品列表</Breadcrumb.Item>
</Breadcrumb>

<Breadcrumb separator="-">
  <Breadcrumb.Item>首页</Breadcrumb.Item>
  <Breadcrumb.Item>商品管理</Breadcrumb.Item>
  <Breadcrumb.Item>商品列表</Breadcrumb.Item>
</Breadcrumb>`}
        >
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
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>带图标的面包屑</h3>
        <DemoBlock
          code={`<Breadcrumb>
  <Breadcrumb.Item icon={<span>🏠</span>}>首页</Breadcrumb.Item>
  <Breadcrumb.Item icon={<span>📦</span>}>商品管理</Breadcrumb.Item>
  <Breadcrumb.Item icon={<span>📋</span>}>商品列表</Breadcrumb.Item>
</Breadcrumb>`}
        >
          <Breadcrumb>
            <Breadcrumb.Item icon={<span>🏠</span>}>首页</Breadcrumb.Item>
            <Breadcrumb.Item icon={<span>📦</span>}>商品管理</Breadcrumb.Item>
            <Breadcrumb.Item icon={<span>📋</span>}>商品列表</Breadcrumb.Item>
          </Breadcrumb>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>带下拉菜单的面包屑</h3>
        <DemoBlock
          code={`<Breadcrumb>
  <Breadcrumb.Item>首页</Breadcrumb.Item>
  <Breadcrumb.Item
    overlay={
      <>
        <a>商品列表</a>
        <a>商品分类</a>
        <a>商品规格</a>
      </>
    }
  >
    商品管理
  </Breadcrumb.Item>
  <Breadcrumb.Item>商品详情</Breadcrumb.Item>
</Breadcrumb>`}
        >
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
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>点击事件</h3>
        <DemoBlock
          code={`<Breadcrumb>
  <Breadcrumb.Item onClick={() => console.log('首页')}>首页</Breadcrumb.Item>
  <Breadcrumb.Item onClick={() => console.log('商品管理')}>商品管理</Breadcrumb.Item>
  <Breadcrumb.Item>商品列表</Breadcrumb.Item>
</Breadcrumb>`}
        >
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
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>数据驱动模式（items）</h3>
        <DemoBlock
          code={`<Breadcrumb
  items={[
    { title: '首页', href: '/' },
    { title: '商品管理', href: '/products' },
    { title: '商品列表' }
  ]}
/>`}
        >
          <Breadcrumb
            items={[
              { title: '首页', href: '/' },
              { title: '商品管理', href: '/products' },
              { title: '商品列表' }
            ]}
          />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>数据驱动 + 图标 + 自定义分隔符</h3>
        <DemoBlock
          code={`<Breadcrumb
  separator="/"
  items={[
    { title: '首页', icon: <span>🏠</span>, href: '/' },
    { title: '用户中心', icon: <span>👤</span>, href: '/user' },
    { title: '订单管理', icon: <span>📋</span> }
  ]}
/>`}
        >
          <Breadcrumb
            separator="/"
            items={[
              { title: '首页', icon: <span>🏠</span>, href: '/' },
              { title: '用户中心', icon: <span>👤</span>, href: '/user' },
              { title: '订单管理', icon: <span>📋</span> }
            ]}
          />
        </DemoBlock>
      </div>

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
