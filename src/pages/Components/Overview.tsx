import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import Icon from '../../components/pc/Icon/Icon';
import { getNonInfoGroups, mobileMenuGroups, mobileTotalComponents } from '../../routes/menuConfig';
import DocsContent from './DocsContent';
import MobilePreview from '../Home/MobilePreview/MobilePreview';
import './mobile/Mobile.css';

const modules = import.meta.glob('../../assets/thumbnails/*.svg', { eager: true }) as Record<string, { default: string }>;

const thumbnails: Record<string, string> = Object.fromEntries(
  Object.entries(modules).map(([k, v]) => [k, v.default])
);

const getThumbnail = (name: string): string => {
  const key = Object.keys(thumbnails).find(k => k.includes(`/${name}.svg`));
  return key ? thumbnails[key] : '';
};

// 组件总览：PC 与移动端共用同一页面，通过 ?platform=mobile 切换内容与预览
const OverviewPage = () => {
  const [searchParams] = useSearchParams();
  const isMobile = searchParams.get('platform') === 'mobile';
  const [searchQuery, setSearchQuery] = useState('');
  const keyword = searchQuery.trim().toLowerCase();

  const pcGroups = useMemo(() => getNonInfoGroups(), []);
  const pcTotalComponents = useMemo(
    () => pcGroups.reduce((total, group) => total + group.items.length, 0),
    [pcGroups]
  );
  const filteredPcGroups = useMemo(
    () =>
      pcGroups
        .map(group => ({
          ...group,
          items: group.items.filter(
            item =>
              item.label.toLowerCase().includes(keyword) ||
              item.id.toLowerCase().includes(keyword)
          )
        }))
        .filter(group => group.items.length > 0),
    [pcGroups, keyword]
  );
  const filteredMobileGroups = useMemo(() => {
    if (!keyword) return mobileMenuGroups;
    return mobileMenuGroups
      .map(group => ({
        ...group,
        items: group.items.filter(item => item.label.toLowerCase().includes(keyword))
      }))
      .filter(group => group.items.length > 0);
  }, [keyword]);

  return (
    <DocsContent>
      <div className="docs-breadcrumb">
        <span>{isMobile ? '移动端组件库' : 'PC端组件库'}</span>
        <span>/</span>
        <span>总览</span>
      </div>
      <h1 className="docs-title">
        {isMobile ? '移动端组件总览' : 'PC端组件总览'}
        <em>{isMobile ? 'Mobile' : 'PC'}</em>
      </h1>
      <p className="docs-intro">
        {isMobile
          ? `共 ${mobileTotalComponents} 个移动端组件，覆盖通用、布局、反馈、展示、表单等场景，与桌面端共享设计语言与 TypeScript 类型。`
          : `共 ${pcTotalComponents} 个桌面端组件，覆盖通用、布局、反馈、展示等场景，支持按需引入、完整 TypeScript 类型与主题定制。`}
      </p>

      {isMobile ? (
        <>
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
          {filteredMobileGroups.map(group => (
            <div key={group.id} className="mobile-catalog-group">
              <h3>
                {group.label}
                <span>{group.items.length}</span>
              </h3>
              <div className="mobile-catalog-grid">
                {group.items.map(item => {
                  const name = item.component || '';
                  const label = item.label.replace(`${name} `, '');
                  return (
                    <Link
                      key={item.id}
                      className="mobile-component-card"
                      to={`/components/${name}?platform=mobile`}
                    >
                      <span className="mobile-component-name">{name}</span>
                      <span className="mobile-component-label">{label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
          {filteredMobileGroups.length === 0 && (
            <p className="mobile-catalog-empty">没有找到匹配的组件</p>
          )}
        </>
      ) : (
        <section className="component-section">
          <div className="component-group">
            <div className="search-container">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="搜索组件..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="component-cards">
              {filteredPcGroups.map(group => (
                <div key={group.id} className="component-category">
                  <h4>{group.label}</h4>
                  <div className="cards-container">
                    {group.items.map(item => {
                      const [englishName, chineseName] = item.label.split(' ');
                      const thumbnailUrl = item.thumbnail ? getThumbnail(item.thumbnail) : '';
                      return (
                        <Link key={item.id} className="component-card" to={item.path}>
                          <div className="card-header">
                            <span className="component-english">{englishName}</span>
                            <span className="component-chinese">{chineseName}</span>
                          </div>
                          <div className="card-content">
                            {thumbnailUrl ? (
                              <img src={thumbnailUrl} alt={item.label} className="component-thumbnail" />
                            ) : (
                              <div className="preview-placeholder">预览</div>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </DocsContent>
  );
};

export default OverviewPage;
