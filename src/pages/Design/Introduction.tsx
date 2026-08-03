const DesignIntroductionPage = () => {
  return (
    <section className="component-section">
      <h2>介绍</h2>
      <div className="design-content">
        <p>
          欢迎使用 <strong>Zdy Design</strong> 设计体系。本设计体系致力于为开发者和设计师提供
          一套完整的设计规范和组件库，帮助快速构建高质量的用户界面。
        </p>

        <h3>设计理念</h3>
        <ul>
          <li><strong>一致性</strong>：统一的视觉语言和交互模式</li>
          <li><strong>可扩展性</strong>：模块化的组件设计，支持灵活组合</li>
          <li><strong>易用性</strong>：清晰的 API 设计和完善的文档</li>
          <li><strong>可访问性</strong>：遵循 WAI-ARIA 标准，支持键盘导航</li>
        </ul>

        <h3>快速开始</h3>
        <pre className="design-code">
{`npm install zdy-ui

import { Button, Input } from 'zdy-ui';`}
        </pre>
      </div>
    </section>
  );
};

export default DesignIntroductionPage;
