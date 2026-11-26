import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PC, Mobile } from '../../index';
import { demoComponents } from '../../components/pc/demos';
import { findMenuItemByComponent } from '../../routes/menuConfig';
import DocsContent from './DocsContent';

const ComponentDemoPage = () => {
  const { componentName } = useParams<{ componentName: string }>();
  const [activePlatform] = useState<'pc' | 'mobile'>('pc');

  const menuItem = componentName ? findMenuItemByComponent(componentName) : undefined;

  if (!menuItem) {
    return (
      <DocsContent>
        <div className="docs-breadcrumb">
          <Link to="/components/overview">组件库</Link>
          <span>/</span>
          <span>组件开发中</span>
        </div>
        <h1 className="docs-title">组件开发中</h1>
        <section className="component-section">
          <p>该组件正在开发中，敬请期待...</p>
        </section>
      </DocsContent>
    );
  }

  const componentTitle = menuItem.label;
  const [englishName, chineseName = ''] = componentTitle.split(' ');
  const componentNamePascal = menuItem.component || '';
  const sectionClass = activePlatform === 'pc' ? '' : 'mobile-section';
  const platformComponents = activePlatform === 'pc' ? PC : Mobile;
  const Component = (platformComponents as any)[componentNamePascal];
  const DemoComponent = demoComponents[componentNamePascal];
  const intro = `${chineseName || componentTitle}（${englishName}）组件面向中后台桌面场景，遵循 Zdy Design 设计语言，提供一致的交互方式与 API 命名。`;

  if (!Component || !DemoComponent) {
    return (
      <DocsContent>
        <div className="docs-breadcrumb">
          <Link to="/components/overview">PC端组件库</Link>
          <span>/</span>
          <span>{componentTitle}</span>
        </div>
        <h1 className="docs-title">
          {englishName}
          {chineseName && <em>{chineseName}</em>}
        </h1>
        <p className="docs-intro">{intro}</p>
        <section className={`component-section ${sectionClass}`}>
          <p>该组件正在开发中，敬请期待...</p>
        </section>
      </DocsContent>
    );
  }

  return (
    <DocsContent>
      <div className="docs-breadcrumb">
        <Link to="/components/overview">组件库</Link>
        <span>/</span>
        <span>{componentTitle}</span>
      </div>
      <h1 className="docs-title">
        {englishName}
        {chineseName && <em>{chineseName}</em>}
      </h1>
      <p className="docs-intro">{intro}</p>
      <section className={`component-section ${sectionClass}`}>
        <DemoComponent />
      </section>
    </DocsContent>
  );
};

export default ComponentDemoPage;
