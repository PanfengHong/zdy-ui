import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from '../../components/pc';
import { designMenuGroups, getNonInfoGroups } from '../../routes/menuConfig';
import MobilePreview from '../Mobile/MobilePreview';
import { mobileGroups, totalComponents } from '../Mobile/catalog';
import './Home.css';

const installCode = `# npm
npm install zdy-design

# pnpm
pnpm add zdy-design`;

const pcUsageCode = `import {
  Button,
  Dialog,
  Form
} from 'zdy-design';

// 样式已在构建时自动注入，无需手动引入 CSS
export default function App() {
  return (
    <Button type="primary" onClick={() => console.log('ok')}>
      开始使用
    </Button>
  );
}`;

const mobileUsageCode = `import {
  Alert,
  Button,
  Input
} from 'zdy-design/mobile';

// 移动端样式独立注入，与 PC 端互不影响
export default function App() {
  return (
    <>
      <Alert type="info" message="移动端组件已接入" />
      <Button type="primary">开始使用</Button>
    </>
  );
}`;

const pcGroups = getNonInfoGroups();
const componentCount = pcGroups.reduce((sum, group) => sum + group.items.length, 0);

// PC 端浏览器窗口示意
const PcPreview = () => (
  <div className="home-pc-preview">
    <div className="home-browser">
      <div className="home-browser-bar">
        <span className="home-browser-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="home-browser-address">zdy-design / overview</span>
      </div>
      <div className="home-browser-body">
        <div className="home-browser-side">
          <span className="home-browser-logo" />
          <span className="home-browser-side-item active" />
          <span className="home-browser-side-item" />
          <span className="home-browser-side-item" />
          <span className="home-browser-side-item" />
          <span className="home-browser-side-item" />
        </div>
        <div className="home-browser-main">
          <div className="home-browser-head">
            <span className="home-browser-title">组件总览</span>
            <span className="home-browser-toolbar">
              <span className="home-browser-search">
                <Icon type="search" size={10} />
                搜索组件
              </span>
              <span className="home-browser-pill">v1.0.3</span>
              <span className="home-browser-avatar" />
            </span>
          </div>
          <div className="home-browser-stats">
            <div className="home-browser-stat">
              <strong>{componentCount}</strong>
              <span>PC 组件</span>
            </div>
            <div className="home-browser-stat">
              <strong>{totalComponents}</strong>
              <span>移动组件</span>
            </div>
            <div className="home-browser-stat">
              <strong>{designMenuGroups[0].items.length}</strong>
              <span>设计规范</span>
            </div>
          </div>
          <div className="home-browser-panel home-browser-panel--chart">
            <div className="home-browser-panel-head">
              <span>组件调用趋势</span>
              <em>近 7 天</em>
            </div>
            <div className="home-browser-chart">
              {[36, 58, 44, 72, 52, 88, 66].map((height, index) => (
                <span key={index} style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>
          <div className="home-browser-panel">
            <div className="home-browser-panel-head">
              <span>最近更新</span>
              <em>查看全部</em>
            </div>
            <div className="home-browser-rows">
              <div className="home-browser-row">
                <span>Button 按钮</span>
                <em className="is-success">已完成</em>
              </div>
              <div className="home-browser-row">
                <span>Table 表格</span>
                <em className="is-primary">进行中</em>
              </div>
              <div className="home-browser-row">
                <span>Form 表单</span>
                <em className="is-success">已完成</em>
              </div>
              <div className="home-browser-row">
                <span>Dialog 弹框</span>
                <em className="is-success">已完成</em>
              </div>
              <div className="home-browser-row">
                <span>Upload 上传</span>
                <em className="is-primary">进行中</em>
              </div>
            </div>
          </div>
          <div className="home-pc-dock">
            <div className="home-pc-dock-card">
              <span className="home-pc-dock-art home-pc-dock-art--button">
                <i />
                <i />
              </span>
              <span className="home-pc-dock-name">Button</span>
              <span className="home-pc-dock-desc">按钮 / 交互</span>
            </div>
            <div className="home-pc-dock-card">
              <span className="home-pc-dock-art home-pc-dock-art--table">
                <i />
                <i />
                <i />
              </span>
              <span className="home-pc-dock-name">Table</span>
              <span className="home-pc-dock-desc">表格 / 数据</span>
            </div>
            <div className="home-pc-dock-card">
              <span className="home-pc-dock-art home-pc-dock-art--form">
                <i />
                <i />
              </span>
              <span className="home-pc-dock-name">Form</span>
              <span className="home-pc-dock-desc">表单 / 校验</span>
            </div>
          </div>
          <div className="home-browser-foot">
            <span>共 {componentCount} 个组件</span>
            <span className="home-browser-pager">
              <i className="active" />
              <i />
              <i />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const HomePage = () => {
  const [guideTab, setGuideTab] = useState<'pc' | 'mobile'>('pc');

  const openMobileGuide = () => {
    setGuideTab('mobile');
    document.getElementById('home-guide')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero-deco home-hero-deco-1" />
        <div className="home-hero-deco home-hero-deco-2" />
        <div className="home-hero-grid" />
        <div className="home-hero-inner">
          <span className="home-hero-badge">
            <Icon type="confirm" size={14} />
            v1.0 正式发布
          </span>
          <h1 className="home-hero-title">
            Zdy <span className="highlight">Design</span>
          </h1>
          <p className="home-hero-desc">
            一款支持 PC 与移动端的 React 组件库，开箱即用、类型完备，
            帮助开发者快速构建一致、优雅的企业级应用界面。
          </p>
          <div className="home-hero-actions">
            <Link to="/components/overview">
              <Button type="primary" size="large" shape="round">开始使用</Button>
            </Link>
            <Link to="/design/introduction">
              <Button size="large" shape="round">设计规范</Button>
            </Link>
          </div>
          <div className="home-hero-meta">
            <span>{componentCount}+ 组件</span>
            <i />
            <span>PC / Mobile 双端</span>
            <i />
            <span>TypeScript</span>
          </div>
        </div>
      </section>

      {/* PC 端组件库 */}
      <section className="home-band home-band--pc">
        <div className="home-section home-section--wide">
          <div className="home-platform home-platform--pc">
            <div className="home-platform-visual">
              <PcPreview />
            </div>
            <div className="home-platform-info">
              <span className="home-platform-badge">
                <Icon type="monitor" size={14} color="currentColor" />
                PC Library
              </span>
              <h2>PC 端组件库</h2>
              <p className="home-platform-desc">
                面向中后台与管理平台的桌面端组件集合，覆盖表格、表单、弹窗、导航等复杂交互场景，
                适配大屏布局与高密度信息展示。
              </p>
              <div className="home-platform-actions">
                <Link className="home-platform-primary" to="/components/overview">浏览 PC 组件</Link>
                <Link className="home-platform-secondary" to="/design/introduction">设计规范</Link>
              </div>
              <div className="home-platform-meta">
                <div className="home-platform-meta-item">
                  <strong>{componentCount}+</strong>
                  <span>PC 组件</span>
                </div>
                <div className="home-platform-meta-item">
                  <strong>{pcGroups.length}</strong>
                  <span>组件分类</span>
                </div>
                <div className="home-platform-meta-item">
                  <strong>100%</strong>
                  <span>TypeScript</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 移动端组件库 */}
      <section className="home-band home-band--mobile">
        <div className="home-section home-section--wide">
          <div className="home-platform home-platform--mobile">
            <div className="home-platform-info">
              <span className="home-platform-badge">
                <Icon type="smartphone" size={14} color="currentColor" />
                Mobile Library
              </span>
              <h2>移动端组件库</h2>
              <p className="home-platform-desc">
                面向触屏场景独立实现的组件集合，与桌面端共享设计语言和 TypeScript 类型，
                覆盖按钮、表单、反馈、展示等高频场景。
              </p>
              <div className="home-platform-actions">
                <Link className="home-platform-primary" to="/components/overview?platform=mobile">浏览移动端组件</Link>
                <button type="button" className="home-platform-secondary" onClick={openMobileGuide}>
                  移动端接入
                </button>
              </div>
              <div className="home-platform-meta">
                <div className="home-platform-meta-item">
                  <strong>{totalComponents}</strong>
                  <span>移动组件</span>
                </div>
                <div className="home-platform-meta-item">
                  <strong>{mobileGroups.length}</strong>
                  <span>场景分类</span>
                </div>
                <div className="home-platform-meta-item">
                  <strong>100%</strong>
                  <span>TypeScript</span>
                </div>
              </div>
            </div>
            <div className="home-platform-visual">
              <MobilePreview />
            </div>
          </div>
        </div>
      </section>

      {/* 接入指南 */}
      <section className="home-band home-band--gray" id="home-guide">
        <div className="home-section">
          <h2 className="home-section-title">接入指南</h2>
          <p className="home-section-subtitle">两步完成接入，即刻在你的项目中使用 Zdy Design</p>
          <div className="home-guide">
            <div className="home-guide-card">
              <div className="home-guide-card-header">
                <Icon type="package" size={16} className="home-guide-icon" />
                <span>第一步 · 安装依赖</span>
              </div>
              <pre className="home-code-block"><code>{installCode}</code></pre>
            </div>
            <div className="home-guide-card">
              <div className="home-guide-card-header">
                <Icon type="component" size={16} className="home-guide-icon" />
                <span>第二步 · 引入使用</span>
                <div className="home-guide-tabs" role="tablist" aria-label="切换 PC 端与移动端接入示例">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={guideTab === 'pc'}
                    className={`home-guide-tab ${guideTab === 'pc' ? 'active' : ''}`}
                    onClick={() => setGuideTab('pc')}
                  >
                    PC 端
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={guideTab === 'mobile'}
                    className={`home-guide-tab ${guideTab === 'mobile' ? 'active' : ''}`}
                    onClick={() => setGuideTab('mobile')}
                  >
                    移动端
                  </button>
                </div>
              </div>
              <pre className="home-code-block">
                <code>{guideTab === 'pc' ? pcUsageCode : mobileUsageCode}</code>
              </pre>
            </div>
          </div>
          <div className="home-guide-footer">
            <Link to="/components/overview">
              <Button type="primary" shape="round">
                浏览全部组件
                <Icon type="right" size={14} className="home-guide-btn-icon" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="home-footer">
        Made with <Icon type="heart" size={13} color="#ff5c5c" className="home-footer-heart" /> by Zdy Design Team
      </footer>
    </div>
  );
};

export default HomePage;
