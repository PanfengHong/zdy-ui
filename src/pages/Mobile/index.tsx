import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import Icon from '../../components/pc/Icon/Icon';
import DocsContent from '../Components/DocsContent';
import MobilePreview from './MobilePreview';
import { mobileGroups, totalComponents } from './catalog';
import './Mobile.css';

const MobilePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGroups = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();
    if (!keyword) return mobileGroups;
    return mobileGroups
      .map(group => ({
        ...group,
        items: group.items.filter(item =>
          item.name.toLowerCase().includes(keyword) || item.label.includes(keyword)
        )
      }))
      .filter(group => group.items.length > 0);
  }, [searchQuery]);

  return (
    <DocsContent
      preview={
        <>
          <MobilePreview />
          <span className="docs-preview-caption">实时预览 · iPhone 17 Pro</span>
        </>
      }
    >
      <div className="docs-breadcrumb">
        <span>移动端组件库</span>
        <span>/</span>
        <span>总览</span>
      </div>
      <h1 className="docs-title">
        移动端组件总览
        <em>Mobile</em>
      </h1>
      <p className="docs-intro">
        共 {totalComponents} 个移动端组件，覆盖通用、布局、反馈、展示、表单等场景，
        与桌面端共享设计语言与 TypeScript 类型。
      </p>

      <div className="mobile-overview-toolbar">
        <div className="mobile-search">
          <Icon type="search" size={16} color="#8c8c8c" />
          <input
            type="text"
            aria-label="搜索移动端组件"
            placeholder="搜索组件"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>
      </div>

      {filteredGroups.map(group => (
        <div key={group.label} className="mobile-catalog-group">
          <h3>
            {group.label}
            <span>{group.items.length}</span>
          </h3>
          <div className="mobile-catalog-grid">
            {group.items.map(item => (
              <Link
                key={item.name}
                className="mobile-component-card"
                to={`/components/${item.name}?platform=mobile`}
              >
                <span className="mobile-component-name">{item.name}</span>
                <span className="mobile-component-label">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
      {filteredGroups.length === 0 && (
        <p className="mobile-catalog-empty">没有找到匹配的组件</p>
      )}
    </DocsContent>
  );
};

export default MobilePage;
