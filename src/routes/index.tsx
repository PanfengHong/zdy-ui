import { useEffect, useRef, useState } from 'react';
import { Routes, Route, NavLink, Link, useLocation, useParams, useSearchParams, Outlet, Navigate } from 'react-router-dom';

import Icon from '../components/pc/Icon/Icon';
import { menuGroups, designMenuGroups, mobileMenuGroups } from './menuConfig';
import type { MenuGroup } from './menuConfig';
import DesignIntroductionPage from '../pages/Design/Introduction';
import DesignColorPage from '../pages/Design/Color';
import DesignTypographyPage from '../pages/Design/Typography';
import DesignSpacingPage from '../pages/Design/Spacing';
import DesignBorderPage from '../pages/Design/Border';
import DesignShadowPage from '../pages/Design/Shadow';
import OverviewPage from '../pages/Components/Overview';
import PlatformSwitch from '../pages/Components/PlatformSwitch';
import ChangelogPage from '../pages/Changelog';
import ComponentDemoPage from '../pages/Components/Demo';
import HomePage from '../pages/Home';
import MobileDemoPage from '../pages/Components/mobile/MobileDemo';
import AdminLayout from '../pages/Admin/AdminLayout';
import AdminLoginPage from '../pages/Admin/Login';
import AdminDashboardPage from '../pages/Admin/Dashboard';
import AdminUserListPage from '../pages/Admin/UserList';
import AdminFormPage from '../pages/Admin/FormPage';
import AdminSettingsPage from '../pages/Admin/Settings';
import { getAdminUser } from '../pages/Admin/auth';

// ============== 顶部导航（两个布局共用） ==============
const TopHeader = () => {
  const location = useLocation();
  const isDesign = location.pathname.startsWith('/design');
  const isChangelog = location.pathname.startsWith('/changelog');
  const isComponents = location.pathname.startsWith('/components');
  const isHome = location.pathname === '/';
  // 主页：初始与 Hero 融为一体，滚动后切换为玻璃拟态悬浮
  const [scrolled, setScrolled] = useState(false);
  // 管理后台入口浮层
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const adminEntryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adminPanelOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (adminEntryRef.current && !adminEntryRef.current.contains(event.target as Node)) {
        setAdminPanelOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [adminPanelOpen]);

  useEffect(() => {
    setAdminPanelOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isHome) {
      setScrolled(false);
      return;
    }
    // 主页滚动发生在 .app-content 容器内，使用捕获阶段监听
    const onScroll = (e: Event) => {
      const target = e.target as HTMLElement | Document;
      const top = target instanceof HTMLElement ? target.scrollTop : window.scrollY;
      setScrolled(top > 8);
    };
    window.addEventListener('scroll', onScroll, true);
    onScroll({ target: document.querySelector('.home-content') } as unknown as Event);
    return () => window.removeEventListener('scroll', onScroll, true);
  }, [isHome]);

  const headerClass = [
    'app-top-header',
    isHome ? 'app-top-header--home' : '',
    scrolled ? 'app-top-header--scrolled' : '',
  ].filter(Boolean).join(' ');

  return (
    <header className={headerClass}>
      <div className="app-top-header-inner">
        <div className="app-top-header-left">
          <Link className="app-top-header-logo" to="/">Zdy Design</Link>
        </div>
        <div className="app-top-header-right">
          <nav className="app-top-header-nav">
            <NavLink
              className={`app-top-header-nav-item ${isHome ? 'active' : ''}`}
              to="/"
              end
            >
              首页
            </NavLink>
            <NavLink
              className={`app-top-header-nav-item ${isDesign ? 'active' : ''}`}
              to="/design/introduction"
            >
              设计
            </NavLink>
            <NavLink
              className={`app-top-header-nav-item ${isComponents ? 'active' : ''}`}
              to="/components/overview"
            >
              组件
            </NavLink>
            <NavLink
              className={`app-top-header-nav-item ${isChangelog ? 'active' : ''}`}
              to="/changelog"
            >
              日志
            </NavLink>
            <div className="app-admin-entry" ref={adminEntryRef}>
              <button
                type="button"
                className={`app-top-header-nav-item ${adminPanelOpen ? 'active' : ''}`}
                aria-expanded={adminPanelOpen}
                onClick={() => setAdminPanelOpen((open) => !open)}
              >
                应用
              </button>
              {adminPanelOpen && (
                <div className="app-admin-panel">
                  <Link className="app-admin-card" to="/admin">
                    <span className="app-admin-card-icon">
                      <Icon type="monitor" size={22} />
                    </span>
                    <span className="app-admin-card-label">中后台管理系统</span>
                  </Link>
                </div>
              )}
            </div>
          </nav>
          <a
            className="app-top-header-github"
            href="https://github.com/PanfengHong/zdy-ui"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            <Icon type="github" size={20} color="currentColor" />
          </a>
        </div>
      </div>
    </header>
  );
};

// ============== 通用侧边栏（PC / 移动端共用） ==============
const Sidebar = ({
  groups,
  platform,
}: {
  groups: MenuGroup[];
  platform?: 'pc' | 'mobile';
}) => {
  const { pathname } = useLocation();
  const showOverview = platform === 'pc' || platform === 'mobile';
  const visibleGroups =
    platform === 'pc' ? groups.filter(group => group.label !== '信息') : groups;
  const overviewTo =
    platform === 'mobile' ? '/components/overview?platform=mobile' : '/components/overview';

  return (
    <aside className="app-sidebar">
      <nav className="sidebar-nav">
        {showOverview && (
          <Link
            to={overviewTo}
            className={`nav-item nav-item--overview ${
              pathname === '/components/overview' ? 'active' : ''
            }`}
          >
            <span className="nav-label">总览</span>
          </Link>
        )}
        {visibleGroups.map((group) => (
          <div key={group.id} className="menu-group">
            <div className="group-header">
              <span className="group-label">{group.label}</span>
            </div>
            <div className="group-items">
              {group.items.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-item ${isActive ? 'active' : ''}`
                  }
                >
                  <span className="nav-label">{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

// ============== 设计页面布局（含侧边栏） ==============
const DesignLayout = () => {
  return (
    <div className="app-container">
      <TopHeader />
      <Sidebar groups={designMenuGroups} />
      <div className="app-content">
        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// ============== 主页布局（仅顶部导航，无侧边栏） ==============
const HomeLayout = () => {
  return (
    <div className="app-container">
      <TopHeader />
      <div className="app-content home-content">
        <Outlet />
      </div>
    </div>
  );
};

// ============== 组件页面布局（含侧边栏） ==============
// ============== 更新日志布局（独立页面，无侧边栏） ==============
const ChangelogLayout = () => {
  return (
    <div className="app-container">
      <TopHeader />
      <div className="docs-page">
        <div className="docs-container">
          <main className="app-main app-main--docs">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

// ============== 组件页面布局（含侧边栏） ==============
const MainLayout = () => {
  const [searchParams] = useSearchParams();
  const isMobile = searchParams.get('platform') === 'mobile';

  return (
    <div className="app-container">
      <TopHeader />
      <div className="docs-page">
        <div className="docs-container">
          <div className="docs-topbar">
            <PlatformSwitch />
          </div>
          <div className="docs-layout">
            <Sidebar
              groups={isMobile ? mobileMenuGroups : menuGroups}
              platform={isMobile ? 'mobile' : 'pc'}
            />
            <main className="app-main app-main--docs">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

// 平台通过 ?platform=mobile 区分，PC / 移动端共用同一路由
const ComponentRoute = () => {
  const [searchParams] = useSearchParams();
  return searchParams.get('platform') === 'mobile' ? <MobileDemoPage /> : <ComponentDemoPage />;
};

// 兼容旧的移动端地址
const MobileLegacyRedirect = () => {
  const { componentName } = useParams();
  return (
    <Navigate
      replace
      to={
        componentName
          ? `/components/${componentName}?platform=mobile`
          : '/components/overview?platform=mobile'
      }
    />
  );
};

// ============== 后台鉴权 ==============
const RequireAdmin = () => {
  if (!getAdminUser()) {
    return <Navigate to="/admin/login" replace />;
  }
  return <AdminLayout />;
};

// ============== 路由配置 ==============
const AppRoutes = () => {
  return (
    <Routes>
      {/* 管理后台 - 独立全屏布局 */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route element={<RequireAdmin />}>
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/users" element={<AdminUserListPage />} />
        <Route path="/admin/form" element={<AdminFormPage />} />
        <Route path="/admin/settings" element={<AdminSettingsPage />} />
      </Route>

      {/* 主页 - 无侧边栏 */}
      <Route element={<HomeLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      {/* 设计页面 - 含侧边栏 */}
      <Route element={<DesignLayout />}>
        <Route path="/design" element={<Navigate to="/design/introduction" replace />} />
        <Route path="/design/introduction" element={<DesignIntroductionPage />} />
        <Route path="/design/color" element={<DesignColorPage />} />
        <Route path="/design/typography" element={<DesignTypographyPage />} />
        <Route path="/design/spacing" element={<DesignSpacingPage />} />
        <Route path="/design/border" element={<DesignBorderPage />} />
        <Route path="/design/shadow" element={<DesignShadowPage />} />
      </Route>

      {/* 更新日志 - 独立页面 */}
      <Route element={<ChangelogLayout />}>
        <Route path="/changelog" element={<ChangelogPage />} />
      </Route>
      {/* 兼容旧的更新日志地址 */}
      <Route path="/components/changelog" element={<Navigate to="/changelog" replace />} />

      {/* 组件页面 - 含侧边栏 */}
      <Route element={<MainLayout />}>
        <Route path="/components" element={<Navigate to="/components/overview" replace />} />
        <Route path="/components/overview" element={<OverviewPage />} />
        <Route path="/components/:componentName" element={<ComponentRoute />} />
      </Route>

      {/* 兼容旧的移动端地址 */}
      <Route path="/mobile" element={<Navigate to="/components/overview?platform=mobile" replace />} />
      <Route path="/mobile/:componentName" element={<MobileLegacyRedirect />} />

      {/* 默认跳转 */}
      <Route path="/home" element={<Navigate to="/" replace />} />

      {/* 兜底 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
