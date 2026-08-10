import { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Anchor from './Anchor';

const { AnchorLink } = Anchor;

// 生成一段占位内容
const lorem = (prefix: string) => (
  <p style={{ lineHeight: 1.8, color: '#666', margin: '8px 0' }}>
    {prefix}：这里是该区块的示例内容，用于演示锚点跳转效果。可滚动右侧内容区域，左侧锚点会自动高亮当前所在区块。也可以点击左侧锚点，内容区会平滑滚动到对应位置。
  </p>
);

const AnchorDemo = () => {
  const [currentLink, setCurrentLink] = useState<string>('');

  const apiData = [
    { prop: 'items', desc: '链接数据（与 children 二选一）', type: 'AnchorLinkBaseProps[]', default: '-' },
    { prop: 'bounds', desc: '锚点区域边界阈值（px）', type: 'number', default: '5' },
    { prop: 'affix', desc: '是否固定模式', type: 'boolean', default: 'false' },
    { prop: 'showInkInFixed', desc: '固定模式下是否显示 ink', type: 'boolean', default: 'false' },
    { prop: 'getContainer', desc: '滚动容器', type: '() => HTMLElement | Window', default: 'window' },
    { prop: 'offsetTop', desc: '距离顶部偏移量', type: 'number', default: '0' },
    { prop: 'offsetBottom', desc: '距离底部偏移量', type: 'number', default: '-' },
    { prop: 'direction', desc: '方向', type: "'vertical' | 'horizontal'", default: "'vertical'" },
    { prop: 'onChange', desc: '激活链接变化回调', type: '(currentLink) => void', default: '-' },
    { prop: 'onClick', desc: '点击链接回调', type: '(e, link) => void', default: '-' }
  ];

  const linkApiData = [
    { prop: 'href', desc: '锚点目标（CSS 选择器）', type: 'string', default: '-' },
    { prop: 'title', desc: '链接文字', type: 'ReactNode', default: '-' },
    { prop: 'target', desc: '打开方式', type: 'string', default: '-' },
    { prop: 'children', desc: '嵌套子链接', type: 'ReactNode', default: '-' }
  ];

  const demos = [
    {
      title: '基础用法（children 方式）',
      code: `<Anchor>\n  <Anchor.Link href="#section-1" title="第一部分" />\n  <Anchor.Link href="#section-2" title="第二部分" />\n</Anchor>`,
      render: (
        <div style={{ display: 'flex', gap: 24, height: 260 }}>
          <div style={{ width: 160, flexShrink: 0 }}>
            <Anchor getContainer={() => document.getElementById('anchor-demo-container')}>
              <AnchorLink href="#anchor-demo-1" title="第一部分" />
              <AnchorLink href="#anchor-demo-2" title="第二部分" />
              <AnchorLink href="#anchor-demo-3" title="第三部分" />
              <AnchorLink href="#anchor-demo-4" title="第四部分" />
            </Anchor>
          </div>
          <div
            id="anchor-demo-container"
            style={{
              flex: 1,
              overflow: 'auto',
              border: '1px solid #f0f0f0',
              borderRadius: 4,
              padding: '0 16px',
              height: 260
            }}
          >
            <section id="anchor-demo-1" style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
              <h4>第一部分</h4>
              {lorem('第一部分')}
              {lorem('第一部分')}
            </section>
            <section id="anchor-demo-2" style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
              <h4>第二部分</h4>
              {lorem('第二部分')}
              {lorem('第二部分')}
            </section>
            <section id="anchor-demo-3" style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
              <h4>第三部分</h4>
              {lorem('第三部分')}
              {lorem('第三部分')}
            </section>
            <section id="anchor-demo-4" style={{ padding: '16px 0' }}>
              <h4>第四部分</h4>
              {lorem('第四部分')}
              {lorem('第四部分')}
            </section>
          </div>
        </div>
      ),
    },
    {
      title: '自定义滚动容器（getContainer）',
      code: `<Anchor getContainer={() => scrollRef.current}>`,
      render: (
        <div style={{ display: 'flex', gap: 24, height: 260 }}>
          <div style={{ width: 160, flexShrink: 0 }}>
            <Anchor getContainer={() => document.getElementById('anchor-scroll-container')}>
              <AnchorLink href="#custom-section-1" title="自定义容器 1" />
              <AnchorLink href="#custom-section-2" title="自定义容器 2" />
              <AnchorLink href="#custom-section-3" title="自定义容器 3" />
            </Anchor>
          </div>
          <div
            id="anchor-scroll-container"
            style={{
              flex: 1,
              overflow: 'auto',
              border: '1px solid #f0f0f0',
              borderRadius: 4,
              padding: '0 16px',
              height: 260
            }}
          >
            <section id="custom-section-1" style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
              <h4>自定义容器 1</h4>
              {lorem('自定义容器 1')}
              {lorem('自定义容器 1')}
            </section>
            <section id="custom-section-2" style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
              <h4>自定义容器 2</h4>
              {lorem('自定义容器 2')}
              {lorem('自定义容器 2')}
            </section>
            <section id="custom-section-3" style={{ padding: '16px 0' }}>
              <h4>自定义容器 3</h4>
              {lorem('自定义容器 3')}
              {lorem('自定义容器 3')}
            </section>
          </div>
        </div>
      ),
    },
    {
      title: '嵌套链接',
      code: `<AnchorLink href="#parent" title="父级">\n  <AnchorLink href="#child" title="子级" />\n</AnchorLink>`,
      render: (
        <div style={{ display: 'flex', gap: 24, height: 260 }}>
          <div style={{ width: 180, flexShrink: 0 }}>
            <Anchor getContainer={() => document.getElementById('nested-scroll-container')}>
              <AnchorLink href="#nested-1" title="第一章">
                <AnchorLink href="#nested-1-1" title="1.1 小节" />
                <AnchorLink href="#nested-1-2" title="1.2 小节" />
              </AnchorLink>
              <AnchorLink href="#nested-2" title="第二章">
                <AnchorLink href="#nested-2-1" title="2.1 小节" />
              </AnchorLink>
              <AnchorLink href="#nested-3" title="第三章" />
            </Anchor>
          </div>
          <div
            id="nested-scroll-container"
            style={{
              flex: 1,
              overflow: 'auto',
              border: '1px solid #f0f0f0',
              borderRadius: 4,
              padding: '0 16px',
              height: 260
            }}
          >
            <section id="nested-1" style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
              <h4>第一章</h4>
              {lorem('第一章')}
            </section>
            <section id="nested-1-1" style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
              <h4>1.1 小节</h4>
              {lorem('1.1 小节')}
            </section>
            <section id="nested-1-2" style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
              <h4>1.2 小节</h4>
              {lorem('1.2 小节')}
            </section>
            <section id="nested-2" style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
              <h4>第二章</h4>
              {lorem('第二章')}
            </section>
            <section id="nested-2-1" style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
              <h4>2.1 小节</h4>
              {lorem('2.1 小节')}
            </section>
            <section id="nested-3" style={{ padding: '16px 0' }}>
              <h4>第三章</h4>
              {lorem('第三章')}
            </section>
          </div>
        </div>
      ),
    },
    {
      title: '水平方向',
      code: `<Anchor direction="horizontal">`,
      render: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Anchor direction="horizontal" getContainer={() => document.getElementById('horizontal-scroll-container')}>
            <AnchorLink href="#horizontal-1" title="概览" />
            <AnchorLink href="#horizontal-2" title="使用" />
            <AnchorLink href="#horizontal-3" title="API" />
            <AnchorLink href="#horizontal-4" title="常见问题" />
          </Anchor>
          <div
            id="horizontal-scroll-container"
            style={{
              overflow: 'auto',
              border: '1px solid #f0f0f0',
              borderRadius: 4,
              padding: '0 16px',
              height: 200
            }}
          >
            <section id="horizontal-1" style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
              <h4>概览</h4>
              {lorem('概览')}
            </section>
            <section id="horizontal-2" style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
              <h4>使用</h4>
              {lorem('使用')}
            </section>
            <section id="horizontal-3" style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
              <h4>API</h4>
              {lorem('API')}
            </section>
            <section id="horizontal-4" style={{ padding: '16px 0' }}>
              <h4>常见问题</h4>
              {lorem('常见问题')}
            </section>
          </div>
        </div>
      ),
    },
    {
      title: '使用 items 数据',
      code: `<Anchor items={[{ href: '#x', title: 'X' }]} />`,
      render: (
        <div style={{ display: 'flex', gap: 24, height: 220 }}>
          <div style={{ width: 160, flexShrink: 0 }}>
            <Anchor
              getContainer={() => document.getElementById('items-scroll-container')}
              items={[
                { href: '#items-1', title: '数据驱动 1' },
                { href: '#items-2', title: '数据驱动 2' },
                { href: '#items-3', title: '数据驱动 3' },
              ]}
            />
          </div>
          <div
            id="items-scroll-container"
            style={{
              flex: 1,
              overflow: 'auto',
              border: '1px solid #f0f0f0',
              borderRadius: 4,
              padding: '0 16px',
              height: 220
            }}
          >
            <section id="items-1" style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
              <h4>数据驱动 1</h4>
              {lorem('数据驱动 1')}
            </section>
            <section id="items-2" style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
              <h4>数据驱动 2</h4>
              {lorem('数据驱动 2')}
            </section>
            <section id="items-3" style={{ padding: '16px 0' }}>
              <h4>数据驱动 3</h4>
              {lorem('数据驱动 3')}
            </section>
          </div>
        </div>
      ),
    },
    {
      title: '监听变化（onChange + onClick）',
      description: (
        <div style={{ marginBottom: 12 }}>
          <span>当前激活：</span>
          <strong style={{ color: '#1890ff' }}>{currentLink || '无'}</strong>
        </div>
      ),
      code: `<Anchor onChange={setCurrentLink} onClick={(e, link) => console.log(link)}>`,
      render: (
        <div style={{ display: 'flex', gap: 24, height: 200 }}>
          <div style={{ width: 160, flexShrink: 0 }}>
            <Anchor
              getContainer={() => document.getElementById('callback-scroll-container')}
              onChange={setCurrentLink}
              onClick={(_e, link) => console.log('点击了', link)}
            >
              <AnchorLink href="#callback-1" title="回调示例 1" />
              <AnchorLink href="#callback-2" title="回调示例 2" />
              <AnchorLink href="#callback-3" title="回调示例 3" />
            </Anchor>
          </div>
          <div
            id="callback-scroll-container"
            style={{
              flex: 1,
              overflow: 'auto',
              border: '1px solid #f0f0f0',
              borderRadius: 4,
              padding: '0 16px',
              height: 200
            }}
          >
            <section id="callback-1" style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
              <h4>回调示例 1</h4>
              {lorem('回调示例 1')}
            </section>
            <section id="callback-2" style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
              <h4>回调示例 2</h4>
              {lorem('回调示例 2')}
            </section>
            <section id="callback-3" style={{ padding: '16px 0' }}>
              <h4>回调示例 3</h4>
              {lorem('回调示例 3')}
            </section>
          </div>
        </div>
      ),
    },
    {
      title: '带 offsetTop 偏移',
      code: `<Anchor offsetTop={20}>`,
      render: (
        <div style={{ display: 'flex', gap: 24, height: 200 }}>
          <div style={{ width: 160, flexShrink: 0 }}>
            <Anchor
              offsetTop={20}
              getContainer={() => document.getElementById('offset-scroll-container')}
            >
              <AnchorLink href="#offset-1" title="偏移 1" />
              <AnchorLink href="#offset-2" title="偏移 2" />
              <AnchorLink href="#offset-3" title="偏移 3" />
            </Anchor>
          </div>
          <div
            id="offset-scroll-container"
            style={{
              flex: 1,
              overflow: 'auto',
              border: '1px solid #f0f0f0',
              borderRadius: 4,
              padding: '0 16px',
              height: 200
            }}
          >
            <section id="offset-1" style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
              <h4>偏移 1</h4>
              {lorem('偏移 1')}
            </section>
            <section id="offset-2" style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
              <h4>偏移 2</h4>
              {lorem('偏移 2')}
            </section>
            <section id="offset-3" style={{ padding: '16px 0' }}>
              <h4>偏移 3</h4>
              {lorem('偏移 3')}
            </section>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      {demos.map((demo) => (
        <div key={demo.title} className="component-group">
          <h3>{demo.title}</h3>
          {'description' in demo && demo.description}
          <DemoBlock code={demo.code}>{demo.render}</DemoBlock>
        </div>
      ))}
      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>Anchor API</h3>
        <ApiTable dataSource={apiData} />
      </div>
      <div className="component-group">
        <h3>Anchor.Link API</h3>
        <ApiTable dataSource={linkApiData} />
      </div>
    </>
  );
};

export default AnchorDemo;
