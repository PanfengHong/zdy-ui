import { Link } from 'react-router-dom';
import { Button, Icon } from '../../components/pc';
import type { IconType } from '../../components/pc/Icon/types';
import { menuGroups, designMenuGroups } from '../../routes/menuConfig';
import './Home.css';

interface Feature {
  icon: IconType;
  title: string;
  desc: string;
}

const features: Feature[] = [
  {
    icon: 'monitor',
    title: '双端支持',
    desc: '同时提供 PC 端与移动端组件，一套设计语言覆盖全场景业务。',
  },
  {
    icon: 'component',
    title: '丰富的组件',
    desc: '涵盖通用、布局、表单、反馈、展示等类别的完整组件体系。',
  },
  {
    icon: 'shield-check',
    title: 'TypeScript',
    desc: '使用 TypeScript 开发，提供完整的类型定义与智能提示。',
  },
  {
    icon: 'palette',
    title: '设计规范',
    desc: '内置色彩、字体、间距、边框、阴影等设计规范，保持视觉一致。',
  },
];

const usageCode = `import { Button, Dialog, Form } from 'zdy-design';

// 样式已在构建时自动注入，无需手动引入 CSS
export default function App() {
  return (
    <Button type="primary" onClick={() => console.log('ok')}>
      开始使用
    </Button>
  );
}`;

const installCode = `# npm
npm install zdy-design

# pnpm
pnpm add zdy-design`;

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

      {/* 数据统计 */}
      <section className="home-band">
        <div className="home-section">
          <h2 className="home-section-title">项目数据一览</h2>
          <p className="home-section-subtitle">
            开箱即用的组件体系与设计规范，经过持续迭代，为业务开发保驾护航
          </p>
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
                <span className="home-feature-icon">
                  <Icon type={f.icon} size={24} />
                </span>
                <h3 className="home-feature-title">{f.title}</h3>
                <p className="home-feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 接入指南 */}
      <section className="home-band">
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
              </div>
              <pre className="home-code-block"><code>{usageCode}</code></pre>
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
