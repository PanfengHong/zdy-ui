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

// ============== 顶部导航（两个布局共用） ==============
const TopHeader = () => {
  const location = useLocation();
  const isDesign = location.pathname.startsWith('/design');

  return (
    <header className="app-top-header">
      <div className="app-top-header-inner">
        <div className="app-top-header-left">
          <Link className="app-top-header-logo" to="/components/overview">Zdy Design</Link>
        </div>
        <div className="app-top-header-right">
          <nav className="app-top-header-nav">
            <NavLink
              className={`app-top-header-nav-item ${isDesign ? 'active' : ''}`}
              to="/design/introduction"
            >
              设计
            </NavLink>
            <NavLink
              className={`app-top-header-nav-item ${!isDesign ? 'active' : ''}`}
              to="/components/overview"
            >
              组件
            </NavLink>
          </nav>
          <a
            className="app-top-header-github"
            href="https://github.com"
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
      <Route path="/" element={<Navigate to="/components/overview" replace />} />

      {/* 兜底 */}
      <Route path="*" element={<Navigate to="/components/overview" replace />} />
    </Routes>
  );
};

export default AppRoutes;
