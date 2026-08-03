import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PC, Mobile } from '../../index';
import { demoComponents } from '../../components/pc/demos';
import { findMenuItemByComponent } from '../../routes/menuConfig';

const ComponentDemoPage = () => {
  const { componentName } = useParams<{ componentName: string }>();
  const [activePlatform] = useState<'pc' | 'mobile'>('pc');

  const menuItem = componentName ? findMenuItemByComponent(componentName) : undefined;

  if (!menuItem) {
    return (
      <section className="component-section">
        <h2>组件开发中</h2>
        <p>该组件正在开发中，敬请期待...</p>
      </section>
    );
  }

  const componentTitle = menuItem.label;
  const componentNamePascal = menuItem.component || '';
  const sectionClass = activePlatform === 'pc' ? '' : 'mobile-section';
  const platformComponents = activePlatform === 'pc' ? PC : Mobile;
  const Component = (platformComponents as any)[componentNamePascal];
  const DemoComponent = demoComponents[componentNamePascal];

  if (!Component || !DemoComponent) {
    return (
      <section className={`component-section ${sectionClass}`}>
        <h2>{componentTitle}</h2>
        <p>该组件正在开发中，敬请期待...</p>
      </section>
    );
  }

  return (
    <section className={`component-section ${sectionClass}`}>
      <h2>{componentTitle}</h2>
      <DemoComponent />
    </section>
  );
};

export default ComponentDemoPage;
