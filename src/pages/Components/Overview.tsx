import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getNonInfoGroups } from '../../routes/menuConfig';
import DocsContent from './DocsContent';

const modules = import.meta.glob('../../assets/thumbnails/*.svg', { eager: true }) as Record<string, { default: string }>;

const thumbnails: Record<string, string> = Object.fromEntries(
  Object.entries(modules).map(([k, v]) => [k, v.default])
);

const getThumbnail = (name: string): string => {
  const key = Object.keys(thumbnails).find(k => k.includes(`/${name}.svg`));
  return key ? thumbnails[key] : '';
};

const OverviewPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const groups = getNonInfoGroups();
  const totalComponents = groups.reduce((total, group) => total + group.items.length, 0);

  const filteredGroups = groups
    .map(group => ({
      ...group,
      items: group.items.filter(item =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter(group => group.items.length > 0);

  return (
    <DocsContent>
      <div className="docs-breadcrumb">
        <span>组件库</span>
        <span>/</span>
        <span>总览</span>
      </div>
      <h1 className="docs-title">
        组件总览
        <em>PC</em>
      </h1>
      <p className="docs-intro">
        共 {totalComponents} 个桌面端组件，覆盖通用、布局、反馈、展示等场景，
        支持按需引入、完整 TypeScript 类型与主题定制。
      </p>
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
          {filteredGroups.map(group => (
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
    </DocsContent>
  );
};

export default OverviewPage;