import { Link, useParams } from 'react-router-dom';

import DocsContent from '../Components/DocsContent';
import IPhoneFrame from './IPhoneFrame';
import { mobileItems } from './catalog';
import { getMobileIntro, mobileDemos } from './demos';
import './MobileDemo.css';

const MobileDemoPage = () => {
  const { componentName } = useParams<{ componentName: string }>();
  const item = mobileItems.find(entry => entry.name === componentName);

  if (!item) {
    return (
      <DocsContent>
        <div className="docs-breadcrumb">
          <Link to="/components/overview?platform=mobile">移动端组件库</Link>
          <span>/</span>
          <span>未找到组件</span>
        </div>
        <h1 className="docs-title">未找到该组件</h1>
        <div className="mobile-doc-empty">
          <h3>未找到该组件</h3>
          <p>请从移动端组件目录中选择需要查看的组件。</p>
          <Link to="/components/overview?platform=mobile">返回移动端组件库</Link>
        </div>
      </DocsContent>
    );
  }

  const config = mobileDemos[item.name];

  return (
    <DocsContent
      preview={
        <>
          <IPhoneFrame>
            {config ? (
              <div className="mobile-doc-preview-inner">
                {config.demos.map(demo => (
                  <div className="mdemo-block" key={demo.title}>
                    {config.demos.length > 1 && (
                      <span className="mdemo-block-title">{demo.title}</span>
                    )}
                    {demo.render}
                  </div>
                ))}
              </div>
            ) : (
              <div className="mdemo-placeholder">
                <strong>{item.name}</strong>
                <span>示例整理中</span>
              </div>
            )}
          </IPhoneFrame>
          <span className="docs-preview-caption">实时预览 · iPhone 17 Pro</span>
        </>
      }
    >
      <div className="docs-breadcrumb">
        <Link to="/components/overview?platform=mobile">移动端组件库</Link>
        <span>/</span>
        <span>{item.label}</span>
      </div>
      <h1 className="docs-title">
        {item.name}
        <em>{item.label}</em>
      </h1>
      <p className="docs-intro">{getMobileIntro(item.name, item.label)}</p>

      {config ? (
        config.demos.map(demo => (
          <section className="mobile-doc-example" key={demo.title}>
            <h3>{demo.title}</h3>
            {demo.desc && <p>{demo.desc}</p>}
            <pre className="mobile-doc-code"><code>{demo.code}</code></pre>
          </section>
        ))
      ) : (
        <div className="mobile-doc-empty">
          <h3>示例整理中</h3>
          <p>该组件的移动端示例正在补充，可先参考桌面端文档中的用法与 API。</p>
          <Link to="/components/overview">前往桌面端组件</Link>
        </div>
      )}
    </DocsContent>
  );
};

export default MobileDemoPage;
