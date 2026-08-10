import { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Menu from './Menu';

const MenuDemo = () => {
  const [selectedKey, setSelectedKey] = useState<string>('1');
  const [openKeys, setOpenKeys] = useState<string[]>(['sub1']);
  const [collapsed, setCollapsed] = useState(false);

  const apiData = [
    { prop: 'mode', desc: '菜单类型', type: "'vertical' | 'horizontal' | 'inline'", default: "'vertical'" },
    { prop: 'theme', desc: '主题', type: "'light' | 'dark'", default: "'light'" },
    { prop: 'selectedKeys', desc: '当前选中项的 key 数组（受控）', type: 'string[]', default: '-' },
    { prop: 'defaultSelectedKeys', desc: '初始选中项的 key 数组', type: 'string[]', default: '[]' },
    { prop: 'openKeys', desc: '当前展开的 SubMenu key 数组（受控）', type: 'string[]', default: '-' },
    { prop: 'defaultOpenKeys', desc: '初始展开的 SubMenu key 数组', type: 'string[]', default: '[]' },
    { prop: 'inlineCollapsed', desc: 'inline 模式下是否折叠', type: 'boolean', default: 'false' },
    { prop: 'onSelect', desc: '选中项的回调', type: '(key: string) => void', default: '-' },
    { prop: 'onOpenChange', desc: '展开/收起 SubMenu 的回调', type: '(keys: string[]) => void', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ];

  const itemApiData = [
    { prop: 'itemKey', desc: '菜单项的唯一标识', type: 'string', default: '-' },
    { prop: 'icon', desc: '菜单图标', type: 'ReactNode', default: '-' },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' },
    { prop: 'danger', desc: '是否为危险操作', type: 'boolean', default: 'false' },
    { prop: 'onClick', desc: '点击回调', type: 'function', default: '-' },
    { prop: 'children', desc: '菜单项内容', type: 'ReactNode', default: '-' }
  ];

  const subMenuApiData = [
    { prop: 'itemKey', desc: '子菜单的唯一标识', type: 'string', default: '-' },
    { prop: 'icon', desc: '子菜单图标', type: 'ReactNode', default: '-' },
    { prop: 'title', desc: '子菜单标题', type: 'ReactNode', default: '-' },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' },
    { prop: 'children', desc: '子菜单内容', type: 'ReactNode', default: '-' }
  ];

  const demos = [
    {
      title: '纵向菜单（vertical）',
      code: `<Menu mode="vertical" defaultSelectedKeys={['1']}>\n  <Menu.Item itemKey="1" icon={<HomeIcon />}>首页</Menu.Item>\n  <Menu.Item itemKey="2" icon={<UserIcon />}>个人中心</Menu.Item>\n  <Menu.Item itemKey="3" icon={<SettingIcon />}>设置</Menu.Item>\n</Menu>`,
      render: (
        <Menu mode="vertical" defaultSelectedKeys={['1']} style={{ width: 200 }}>
          <Menu.Item itemKey="1" icon={<span>🏠</span>}>首页</Menu.Item>
          <Menu.Item itemKey="2" icon={<span>👤</span>}>个人中心</Menu.Item>
          <Menu.Item itemKey="3" icon={<span>⚙️</span>}>设置</Menu.Item>
        </Menu>
      ),
    },
    {
      title: '横向菜单（horizontal）',
      code: `<Menu mode="horizontal" defaultSelectedKeys={['mail']}>\n  <Menu.Item itemKey="mail">邮箱</Menu.Item>\n  <Menu.Item itemKey="app">应用</Menu.Item>\n  <Menu.SubMenu itemKey="sub1" title="更多">\n    <Menu.Item itemKey="sub1-1">子项1</Menu.Item>\n    <Menu.Item itemKey="sub1-2">子项2</Menu.Item>\n  </Menu.SubMenu>\n</Menu>`,
      render: (
        <Menu mode="horizontal" defaultSelectedKeys={['mail']}>
          <Menu.Item itemKey="mail">邮箱</Menu.Item>
          <Menu.Item itemKey="app">应用</Menu.Item>
          <Menu.SubMenu itemKey="sub1" title="更多">
            <Menu.Item itemKey="sub1-1">子项1</Menu.Item>
            <Menu.Item itemKey="sub1-2">子项2</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      ),
    },
    {
      title: '内联折叠菜单（inline）',
      code: `<Menu\n  mode="inline"\n  defaultSelectedKeys={['1']}\n  defaultOpenKeys={['sub1']}\n>\n  <Menu.Item itemKey="1" icon={<HomeIcon />}>首页</Menu.Item>\n  <Menu.SubMenu itemKey="sub1" icon={<BoxIcon />} title="商品管理">\n    <Menu.Item itemKey="1-1">商品列表</Menu.Item>\n    <Menu.Item itemKey="1-2">商品分类</Menu.Item>\n    <Menu.Item itemKey="1-3">商品规格</Menu.Item>\n  </Menu.SubMenu>\n  <Menu.SubMenu itemKey="sub2" icon={<OrderIcon />} title="订单管理">\n    <Menu.Item itemKey="2-1">订单列表</Menu.Item>\n    <Menu.Item itemKey="2-2">退款管理</Menu.Item>\n  </Menu.SubMenu>\n</Menu>`,
      render: (
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ width: 220 }}
        >
          <Menu.Item itemKey="1" icon={<span>🏠</span>}>首页</Menu.Item>
          <Menu.SubMenu itemKey="sub1" icon={<span>📦</span>} title="商品管理">
            <Menu.Item itemKey="1-1">商品列表</Menu.Item>
            <Menu.Item itemKey="1-2">商品分类</Menu.Item>
            <Menu.Item itemKey="1-3">商品规格</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu itemKey="sub2" icon={<span>📋</span>} title="订单管理">
            <Menu.Item itemKey="2-1">订单列表</Menu.Item>
            <Menu.Item itemKey="2-2">退款管理</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu itemKey="sub3" icon={<span>👥</span>} title="用户管理">
            <Menu.Item itemKey="3-1">用户列表</Menu.Item>
            <Menu.Item itemKey="3-2">角色管理</Menu.Item>
            <Menu.SubMenu itemKey="sub3-1" title="权限设置">
              <Menu.Item itemKey="3-1-1">权限列表</Menu.Item>
              <Menu.Item itemKey="3-1-2">权限分配</Menu.Item>
            </Menu.SubMenu>
          </Menu.SubMenu>
        </Menu>
      ),
    },
    {
      title: '深色主题（dark）',
      code: `<Menu\n  mode="inline"\n  theme="dark"\n  defaultSelectedKeys={['1']}\n  defaultOpenKeys={['darkSub1']}\n>\n  <Menu.Item itemKey="1" icon={<HomeIcon />}>首页</Menu.Item>\n  <Menu.SubMenu itemKey="darkSub1" icon={<BoxIcon />} title="商品管理">\n    <Menu.Item itemKey="1-1">商品列表</Menu.Item>\n    <Menu.Item itemKey="1-2">商品分类</Menu.Item>\n  </Menu.SubMenu>\n  <Menu.SubMenu itemKey="darkSub2" icon={<OrderIcon />} title="订单管理">\n    <Menu.Item itemKey="2-1">订单列表</Menu.Item>\n    <Menu.Item itemKey="2-2">退款管理</Menu.Item>\n  </Menu.SubMenu>\n  <Menu.Item itemKey="3" icon={<SettingIcon />}>系统设置</Menu.Item>\n</Menu>`,
      render: (
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['darkSub1']}
          style={{ width: 220 }}
        >
          <Menu.Item itemKey="1" icon={<span>🏠</span>}>首页</Menu.Item>
          <Menu.SubMenu itemKey="darkSub1" icon={<span>📦</span>} title="商品管理">
            <Menu.Item itemKey="1-1">商品列表</Menu.Item>
            <Menu.Item itemKey="1-2">商品分类</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu itemKey="darkSub2" icon={<span>📋</span>} title="订单管理">
            <Menu.Item itemKey="2-1">订单列表</Menu.Item>
            <Menu.Item itemKey="2-2">退款管理</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item itemKey="3" icon={<span>⚙️</span>}>系统设置</Menu.Item>
        </Menu>
      ),
    },
    {
      title: '选中与禁用状态',
      code: `<Menu mode="vertical" defaultSelectedKeys={['1']}>\n  <Menu.Item itemKey="1">已选中</Menu.Item>\n  <Menu.Item itemKey="2" disabled>禁用项</Menu.Item>\n  <Menu.Item itemKey="3" danger>危险操作</Menu.Item>\n  <Menu.Item itemKey="4">普通项</Menu.Item>\n</Menu>`,
      render: (
        <Menu mode="vertical" defaultSelectedKeys={['1']} style={{ width: 200 }}>
          <Menu.Item itemKey="1">已选中</Menu.Item>
          <Menu.Item itemKey="2" disabled>禁用项</Menu.Item>
          <Menu.Item itemKey="3" danger>危险操作</Menu.Item>
          <Menu.Item itemKey="4">普通项</Menu.Item>
        </Menu>
      ),
    },
  ];

  return (
    <>
      {demos.slice(0, 3).map((demo) => (
        <div key={demo.title} className="component-group">
          <h3>{demo.title}</h3>
          <DemoBlock code={demo.code}>{demo.render}</DemoBlock>
        </div>
      ))}

      <div className="component-group">
        <h3>折叠内联菜单（inlineCollapsed）</h3>
        <div style={{ marginBottom: 12 }}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              padding: '6px 16px',
              border: '1px solid #d9d9d9',
              borderRadius: 4,
              background: '#fff',
              cursor: 'pointer'
            }}
          >
            {collapsed ? '展开菜单' : '折叠菜单'}
          </button>
        </div>
        <DemoBlock
          code={`<Menu\n  mode="inline"\n  inlineCollapsed={collapsed}\n  defaultSelectedKeys={['1']}\n>\n  <Menu.Item itemKey="1" icon={<HomeIcon />}>首页</Menu.Item>\n  <Menu.SubMenu itemKey="sub1" icon={<BoxIcon />} title="商品管理">\n    <Menu.Item itemKey="1-1">商品列表</Menu.Item>\n    <Menu.Item itemKey="1-2">商品分类</Menu.Item>\n  </Menu.SubMenu>\n  <Menu.Item itemKey="2" icon={<span>📊</span>}>数据统计</Menu.Item>\n  <Menu.Item itemKey="3" icon={<span>⚙️</span>}>系统设置</Menu.Item>\n</Menu>`}
        >
          <Menu
            mode="inline"
            inlineCollapsed={collapsed}
            defaultSelectedKeys={['1']}
          >
            <Menu.Item itemKey="1" icon={<span>🏠</span>}>首页</Menu.Item>
            <Menu.SubMenu itemKey="sub1" icon={<span>📦</span>} title="商品管理">
              <Menu.Item itemKey="1-1">商品列表</Menu.Item>
              <Menu.Item itemKey="1-2">商品分类</Menu.Item>
            </Menu.SubMenu>
            <Menu.Item itemKey="2" icon={<span>📊</span>}>数据统计</Menu.Item>
            <Menu.Item itemKey="3" icon={<span>⚙️</span>}>系统设置</Menu.Item>
          </Menu>
        </DemoBlock>
      </div>

      {demos.slice(3).map((demo) => (
        <div key={demo.title} className="component-group">
          <h3>{demo.title}</h3>
          <DemoBlock code={demo.code}>{demo.render}</DemoBlock>
        </div>
      ))}

      <div className="component-group">
        <h3>受控菜单</h3>
        <div style={{ marginBottom: 12 }}>
          <span>当前选中项：</span>
          <strong style={{ color: '#2587ff' }}>{selectedKey}</strong>
          <span style={{ marginLeft: 16 }}>展开项：</span>
          <strong style={{ color: '#2587ff' }}>{openKeys.join(', ') || '无'}</strong>
        </div>
        <DemoBlock
          code={`const [selectedKey, setSelectedKey] = useState('1');\nconst [openKeys, setOpenKeys] = useState(['sub1']);\n\n<Menu\n  mode="inline"\n  selectedKeys={[selectedKey]}\n  openKeys={openKeys}\n  onSelect={(key) => setSelectedKey(key)}\n  onOpenChange={(keys) => setOpenKeys(keys)}\n>\n  <Menu.Item itemKey="1">菜单项 1</Menu.Item>\n  <Menu.SubMenu itemKey="sub1" title="子菜单">\n    <Menu.Item itemKey="1-1">子项 1</Menu.Item>\n    <Menu.Item itemKey="1-2">子项 2</Menu.Item>\n  </Menu.SubMenu>\n</Menu>`}
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            openKeys={openKeys}
            onSelect={(key) => setSelectedKey(key)}
            onOpenChange={(keys) => setOpenKeys(keys)}
            style={{ width: 220 }}
          >
            <Menu.Item itemKey="1" icon={<span>🏠</span>}>菜单项 1</Menu.Item>
            <Menu.Item itemKey="2" icon={<span>📊</span>}>菜单项 2</Menu.Item>
            <Menu.SubMenu itemKey="sub1" icon={<span>📁</span>} title="子菜单">
              <Menu.Item itemKey="1-1">子项 1</Menu.Item>
              <Menu.Item itemKey="1-2">子项 2</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </DemoBlock>
      </div>

      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>Menu API</h3>
        <ApiTable dataSource={apiData} />
      </div>

      <div className="component-group">
        <h3>Menu.Item API</h3>
        <ApiTable dataSource={itemApiData} />
      </div>

      <div className="component-group">
        <h3>Menu.SubMenu API</h3>
        <ApiTable dataSource={subMenuApiData} />
      </div>
    </>
  );
};

export default MenuDemo;
