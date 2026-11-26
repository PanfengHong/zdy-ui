import { Link, useParams, useSearchParams } from 'react-router-dom';
import { pcDemoConfigs } from '../../../components/pc/demos';
import { mobileDemoConfigs } from '../../../components/mobile/demos';
import { findMenuItemByComponent, mobileMenuItems } from '../../../routes/menuConfig';
import ApiTable from '../ApiTable/ApiTable';
import DemoBlock from '../DemoBlock/DemoBlock';
import DocsContent from '../DocsContent/DocsContent';
import IPhoneFrame from '../IPhoneFrame/IPhoneFrame';
import './Demo.css';

// 组件详情页：PC 与移动端的 demo 渲染统一在此实现，配置由各组件目录提供
const ComponentDemoPage = () => {
  const { componentName } = useParams<{ componentName: string }>();
  const [searchParams] = useSearchParams();
  const isMobile = searchParams.get('platform') === 'mobile';

  const item = isMobile
    ? mobileMenuItems.find(entry => entry.component === componentName)
    : componentName
      ? findMenuItemByComponent(componentName)
      : undefined;

  if (!item) {
    return (
      <DocsContent>
        <div className="docs-breadcrumb">
          <Link to={isMobile ? '/components/overview?platform=mobile' : '/components/overview'}>
            {isMobile ? '移动端组件库' : '组件库'}
          </Link>
          <span>/</span>
          <span>{isMobile ? '未找到组件' : '组件开发中'}</span>
        </div>
        <h1 className="docs-title">{isMobile ? '未找到该组件' : '组件开发中'}</h1>
        <section className="component-section">
          <p>该组件正在开发中，敬请期待...</p>
        </section>
      </DocsContent>
    );
  }

  const name = item.component || '';
  const [englishName, chineseName = ''] = item.label.split(' ');
  const config = isMobile ? mobileDemoConfigs[name] : pcDemoConfigs[name];
  const api = config?.api || [];
  const intro =
    config?.intro ||
    (isMobile
      ? `${chineseName}（${name}）组件面向触屏场景，提供移动端专用的尺寸、间距与交互反馈。`
      : `${chineseName || item.label}（${englishName}）组件面向中后台桌面场景，遵循 Zdy Design 设计语言，提供一致的交互方式与 API 命名。`);

  return (
    <DocsContent
      preview={
        isMobile ? (
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
                  <strong>{name}</strong>
                  <span>示例整理中</span>
                </div>
              )}
            </IPhoneFrame>
            <span className="docs-preview-caption">实时预览 · iPhone 17 Pro</span>
          </>
        ) : undefined
      }
    >
      <div className="docs-breadcrumb">
        <Link to={isMobile ? '/components/overview?platform=mobile' : '/components/overview'}>
          {isMobile ? '移动端组件库' : 'PC端组件库'}
        </Link>
        <span>/</span>
        <span>{isMobile ? chineseName || name : item.label}</span>
      </div>
      <h1 className="docs-title">
        {englishName}
        <em>{chineseName}</em>
      </h1>
      <p className="docs-intro">{intro}</p>

      {config ? (
        isMobile ? (
          config.demos.map(demo => (
            <section className="mobile-doc-example" key={demo.title}>
              <h3>{demo.title}</h3>
              {demo.desc && <p>{demo.desc}</p>}
              <pre className="mobile-doc-code"><code>{demo.code}</code></pre>
            </section>
          ))
        ) : (
          <section className="component-section">
            {config.demos.map(demo => (
              <div key={demo.title} className="component-group">
                <h3>{demo.title}</h3>
                <DemoBlock code={demo.code}>{demo.render}</DemoBlock>
              </div>
            ))}
          </section>
        )
      ) : (
        <div className="mobile-doc-empty">
          <h3>示例整理中</h3>
          <p>该组件的示例正在补充，可先查看组件本身的属性定义。</p>
        </div>
      )}

      {api.length > 0 && (
        <div className="component-group" style={{ marginTop: '32px' }}>
          <h3>API</h3>
          <ApiTable dataSource={api} />
        </div>
      )}
    </DocsContent>
  );
};

export default ComponentDemoPage;
