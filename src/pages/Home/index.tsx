import { Link } from 'react-router-dom';
import { Button } from '../../components/pc';
import { menuGroups, designMenuGroups } from '../../routes/menuConfig';
import './Home.css';

const features = [
  {
    icon: '🖥️',
    title: '双端支持',
    desc: '同时提供 PC 端与移动端组件，一套设计语言覆盖全场景业务。',
  },
  {
    icon: '🧩',
    title: '丰富的组件',
    desc: '涵盖通用、布局、表单、反馈、展示等类别的完整组件体系。',
  },
  {
    icon: '🛡️',
    title: 'TypeScript',
    desc: '使用 TypeScript 开发，提供完整的类型定义与智能提示。',
  },
  {
    icon: '🎨',
    title: '设计规范',
    desc: '内置色彩、字体、间距、边框、阴影等设计规范，保持视觉一致。',
  },
];

const quickLinks = [
  { label: 'Button 按钮', path: '/components/Button' },
  { label: 'Form 表单', path: '/components/Form' },
  { label: 'Table 表格', path: '/components/Table' },
  { label: 'Dialog 弹框', path: '/components/Dialog' },
];

const designLinks = [
  { label: '设计介绍', path: '/design/introduction' },
  { label: '色彩规范', path: '/design/color' },
  { label: '字体规范', path: '/design/typography' },
  { label: '间距规范', path: '/design/spacing' },
];

const componentCount = menuGroups.reduce((sum, g) => sum + g.items.length, 0);

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero-deco home-hero-deco-1" />
        <div className="home-hero-deco home-hero-deco-2" />
        <div className="home-hero-grid" />
        <div className="home-hero-inner">
          <span className="home-hero-badge">🎉 v1.0 正式发布</span>
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

      {/* 数据统计 */}
      <section className="home-band">
        <div className="home-section home-section--tight">
          <div className="home-stats">
            <div className="home-stat-card">
              <div className="home-stat-value">{componentCount}+</div>
              <div className="home-stat-label">高质量组件</div>
            </div>
            <div className="home-stat-card">
              <div className="home-stat-value">2</div>
              <div className="home-stat-label">平台（PC / Mobile）</div>
            </div>
            <div className="home-stat-card">
              <div className="home-stat-value">{designMenuGroups[0].items.length}</div>
              <div className="home-stat-label">设计规范</div>
            </div>
            <div className="home-stat-card">
              <div className="home-stat-value">100%</div>
              <div className="home-stat-label">TypeScript 覆盖</div>
            </div>
          </div>
        </div>
      </section>

      {/* 特性 */}
      <section className="home-band home-band--gray">
        <div className="home-section">
          <h2 className="home-section-title">为什么选择 Zdy Design</h2>
          <p className="home-section-subtitle">简单易用、功能完备、风格统一</p>
          <div className="home-features">
            {features.map((f) => (
              <div key={f.title} className="home-feature-card">
                <span className="home-feature-icon">{f.icon}</span>
                <h3 className="home-feature-title">{f.title}</h3>
                <p className="home-feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 快速开始 */}
      <section className="home-band">
        <div className="home-section">
          <h2 className="home-section-title">快速开始</h2>
          <p className="home-section-subtitle">从常用组件与设计规范开始探索</p>
          <div className="home-quick">
            <div className="home-quick-card">
              <h3>🧩 热门组件</h3>
              <div className="home-quick-links">
                {quickLinks.map((l) => (
                  <Link key={l.path} className="home-quick-link" to={l.path}>
                    {l.label}
                    <span className="arrow">→</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="home-quick-card">
              <h3>🎨 设计规范</h3>
              <div className="home-quick-links">
                {designLinks.map((l) => (
                  <Link key={l.path} className="home-quick-link" to={l.path}>
                    {l.label}
                    <span className="arrow">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="home-footer">
        Made with ❤️ by Zdy Design Team
      </footer>
    </div>
  );
};

export default HomePage;
