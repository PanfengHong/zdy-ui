import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Breadcrumb, Icon, Menu, Message, Popover, Tag } from '../../components/pc';
import type { IconType } from '../../components/pc/Icon/types';
import { adminLogout, getAdminUser } from './auth';
import './Admin.css';

interface AdminNavItem {
  key: string;
  label: string;
  icon: IconType;
  desc: string;
}

const navItems: AdminNavItem[] = [
  { key: 'dashboard', label: '工作台', icon: 'home', desc: '数据概览与待办' },
  { key: 'users', label: '用户管理', icon: 'people', desc: '用户列表与编辑' },
  { key: 'form', label: '表单页', icon: 'edit', desc: '表单控件与校验' },
  { key: 'settings', label: '系统设置', icon: 'setting', desc: '参数与安全配置' },
];

const notices = [
  { title: '系统将于本周日 02:00 进行例行维护', time: '10 分钟前' },
  { title: '新增 3 条待审批流程，请及时处理', time: '1 小时前' },
  { title: '用户「林晚晴」提交了权限申请', time: '昨天 18:20' },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const user = getAdminUser();

  const activeKey =
    navItems.find((item) => location.pathname.startsWith(`/admin/${item.key}`))?.key ?? 'dashboard';
  const current = navItems.find((item) => item.key === activeKey) ?? navItems[0];

  const handleSelect = (key: string) => {
    navigate(`/admin/${key}`);
  };

  const handleLogout = () => {
    adminLogout();
    Message.success('已退出登录');
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="admin-shell">
      <aside className={`admin-sider${collapsed ? ' admin-sider--collapsed' : ''}`}>
        <div className="admin-brand">
          <span className="admin-brand-logo">
            <Icon type="component" size={18} color="#fff" />
          </span>
          <span className="admin-brand-text">
            <strong>Zdy Admin</strong>
            <small>中后台管理系统</small>
          </span>
        </div>

        <nav className="admin-nav">
          <Menu
            mode="inline"
            theme="light"
            selectedKeys={[activeKey]}
            inlineCollapsed={collapsed}
            onSelect={handleSelect}
          >
            {navItems.map((item) => (
              <Menu.Item
                key={item.key}
                itemKey={item.key}
                icon={<Icon type={item.icon} size={16} />}
              >
                {item.label}
              </Menu.Item>
            ))}
          </Menu>
        </nav>

        <div className="admin-sider-footer">
          <Link className="admin-back-link" to="/" title="返回组件库官网">
            <Icon type="back" size={16} />
            {!collapsed && <span>返回组件库</span>}
          </Link>
        </div>
      </aside>

      <div className="admin-body">
        <header className="admin-header">
          <div className="admin-header-left">
            <button
              type="button"
              className="admin-collapse-btn"
              title={collapsed ? '展开菜单' : '收起菜单'}
              onClick={() => setCollapsed((value) => !value)}
            >
              <Icon type={collapsed ? 'right' : 'left'} size={16} />
            </button>
            <div className="admin-crumb">
              <Breadcrumb
                items={[
                  { title: '管理后台', onClick: () => navigate('/admin/dashboard') },
                  { title: current.label },
                ]}
              />
            </div>
            <span className="admin-page-tagline">{current.desc}</span>
          </div>

          <div className="admin-header-right">
            <Popover
              trigger="click"
              placement="bottomRight"
              content={
                <div className="admin-notice-pop">
                  <div className="admin-notice-head">通知</div>
                  {notices.map((notice) => (
                    <div className="admin-notice-item" key={notice.title}>
                      <span className="admin-notice-title">{notice.title}</span>
                      <span className="admin-notice-time">{notice.time}</span>
                    </div>
                  ))}
                </div>
              }
            >
              <button type="button" className="admin-icon-btn" title="通知">
                <Icon type="bell" size={18} />
                <i className="admin-notice-dot" />
              </button>
            </Popover>

            <Popover
              trigger="click"
              placement="bottomRight"
              content={
                <div className="admin-user-pop">
                  <div className="admin-user-pop-head">
                    <strong>{user?.displayName ?? '管理员'}</strong>
                    <Tag color="blue" size="small">
                      {user?.role ?? '管理员'}
                    </Tag>
                  </div>
                  <button
                    type="button"
                    className="admin-pop-item"
                    onClick={() => Message.info('个人资料页面演示中')}
                  >
                    <Icon type="user" size={14} />
                    个人资料
                  </button>
                  <button
                    type="button"
                    className="admin-pop-item"
                    onClick={() => Message.info('账号设置页面演示中')}
                  >
                    <Icon type="setting" size={14} />
                    账号设置
                  </button>
                  <div className="admin-pop-divider" />
                  <button
                    type="button"
                    className="admin-pop-item admin-pop-item--danger"
                    onClick={handleLogout}
                  >
                    <Icon type="back" size={14} />
                    退出登录
                  </button>
                </div>
              }
            >
              <button type="button" className="admin-user-trigger">
                <Avatar size={32} text={(user?.displayName ?? 'A').slice(0, 1)} style={{ background: '#1890ff' }} />
                <span className="admin-user-meta">
                  <span className="admin-user-name">{user?.displayName ?? '管理员'}</span>
                  <span className="admin-user-role">{user?.role ?? '管理员'}</span>
                </span>
                <Icon type="down" size={12} color="#9ca3af" />
              </button>
            </Popover>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
