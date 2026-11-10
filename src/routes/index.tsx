import { useEffect, useState } from 'react';
import { Routes, Route, NavLink, Link, useLocation, Outlet, Navigate } from 'react-router-dom';

import Icon from '../components/pc/Icon/Icon';
import { menuGroups, designMenuGroups } from './menuConfig';
import type { MenuGroup } from './menuConfig';
import DesignIntroductionPage from '../pages/Design/Introduction';
import DesignColorPage from '../pages/Design/Color';
import DesignTypographyPage from '../pages/Design/Typography';
import DesignSpacingPage from '../pages/Design/Spacing';
import DesignBorderPage from '../pages/Design/Border';
import DesignShadowPage from '../pages/Design/Shadow';
import OverviewPage from '../pages/Components/Overview';
import ChangelogPage from '../pages/Components/Changelog';
import ComponentDemoPage from '../pages/Components/Demo';
import HomePage from '../pages/Home';

// ============== 顶部导航（两个布局共用） ==============
const TopHeader = () => {
  const location = useLocation();
  const isDesign = location.pathname.startsWith('/design');
  const isComponents = location.pathname.startsWith('/components');
  const isHome = location.pathname === '/';
  // 主页：初始与 Hero 融为一体，滚动后切换为玻璃拟态悬浮
  const [scrolled, setScrolled] = useState(false);

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

// ============== 通用侧边栏 ==============
const Sidebar = ({ groups }: { groups: MenuGroup[] }) => {
  return (
    <aside className="app-sidebar">
      <nav className="sidebar-nav">
        {groups.map((group) => (
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
const MainLayout = () => {
  return (
    <div className="app-container">
      <TopHeader />
      <Sidebar groups={menuGroups} />
      <div className="app-content">
        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// ============== 路由配置 ==============
const AppRoutes = () => {
  return (
    <Routes>
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

      {/* 组件页面 - 含侧边栏 */}
      <Route element={<MainLayout />}>
        <Route path="/components" element={<Navigate to="/components/overview" replace />} />
        <Route path="/components/overview" element={<OverviewPage />} />
        <Route path="/components/changelog" element={<ChangelogPage />} />
        <Route path="/components/:componentName" element={<ComponentDemoPage />} />
      </Route>

      {/* 默认跳转 */}
      <Route path="/home" element={<Navigate to="/" replace />} />

      {/* 兜底 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
