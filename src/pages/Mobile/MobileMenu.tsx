import { Link, useLocation } from 'react-router-dom';

import { mobileGroups } from './catalog';

// 移动端组件文档左侧菜单（与 PC 菜单共用同一套外壳样式）
const MobileMenu = () => {
  const { pathname } = useLocation();
  const isOverview = pathname === '/components/overview';
  const activeName = isOverview ? '' : pathname.replace('/components/', '');

  return (
    <aside className="app-sidebar">
      <nav className="sidebar-nav">
        <Link
          to="/components/overview?platform=mobile"
          className={`nav-item nav-item--overview ${isOverview ? 'active' : ''}`}
        >
          <span className="nav-label">总览</span>
        </Link>
        {mobileGroups.map(group => (
          <div className="menu-group" key={group.label}>
            <div className="group-header">
              <span className="group-label">{group.label}</span>
            </div>
            <div className="group-items">
              {group.items.map(item => (
                <Link
                  key={item.name}
                  to={`/components/${item.name}?platform=mobile`}
                  title={item.name}
                  className={`nav-item ${activeName === item.name ? 'active' : ''}`}
                >
                  <span className="nav-label">
                    {item.name} {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default MobileMenu;
