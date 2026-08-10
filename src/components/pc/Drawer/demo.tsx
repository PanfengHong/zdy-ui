import { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Drawer from './Drawer';
import Button from '../Button';

const DrawerDemo = () => {
  const [basicOpen, setBasicOpen] = useState(false);
  const [leftOpen, setLeftOpen] = useState(false);
  const [topOpen, setTopOpen] = useState(false);
  const [bottomOpen, setBottomOpen] = useState(false);
  const [noMaskOpen, setNoMaskOpen] = useState(false);
  const [noClosableMaskOpen, setNoClosableMaskOpen] = useState(false);
  const [footerOpen, setFooterOpen] = useState(false);
  const [customWidthOpen, setCustomWidthOpen] = useState(false);
  const [destroyOpen, setDestroyOpen] = useState(false);
  const [destroyContent, setDestroyContent] = useState('初始内容');

  const apiData = [
    { prop: 'visible', desc: '是否可见（受控）', type: 'boolean', default: 'false' },
    { prop: 'title', desc: '标题', type: 'ReactNode', default: '-' },
    { prop: 'placement', desc: '弹出方向', type: "'left' | 'right' | 'top' | 'bottom'", default: "'right'" },
    { prop: 'width', desc: '宽度（左右方向生效）', type: 'string | number', default: '378' },
    { prop: 'height', desc: '高度（上下方向生效）', type: 'string | number', default: '378' },
    { prop: 'closable', desc: '是否显示关闭按钮', type: 'boolean', default: 'true' },
    { prop: 'mask', desc: '是否显示遮罩', type: 'boolean', default: 'true' },
    { prop: 'maskClosable', desc: '点击遮罩是否关闭', type: 'boolean', default: 'true' },
    { prop: 'keyboard', desc: '按ESC是否关闭', type: 'boolean', default: 'true' },
    { prop: 'destroyOnClose', desc: '关闭时是否销毁子组件', type: 'boolean', default: 'false' },
    { prop: 'footer', desc: '底部内容', type: 'ReactNode', default: '-' },
    { prop: 'maskStyle', desc: '遮罩样式', type: 'CSSProperties', default: '-' },
    { prop: 'bodyStyle', desc: '内容区样式', type: 'CSSProperties', default: '-' },
    { prop: 'onClose', desc: '关闭回调', type: '() => void', default: '-' },
    { prop: 'afterOpenChange', desc: '打开/关闭动画结束回调', type: '(open: boolean) => void', default: '-' },
  ];

  const btnStyle: React.CSSProperties = {
    padding: '6px 16px',
    border: '1px solid #d9d9d9',
    borderRadius: 4,
    background: '#fff',
    cursor: 'pointer',
    fontSize: 14,
    marginRight: 8,
  };

  const demos = [
    {
      title: '基础用法',
      code: `const [open, setOpen] = useState(false);\n\n<Button onClick={() => setOpen(true)}>打开抽屉</Button>\n<Drawer title="基础抽屉" visible={open} onClose={() => setOpen(false)}>\n  <p>这是一个基础抽屉的内容区域。</p>\n</Drawer>`,
      render: (
        <>
          <button style={btnStyle} onClick={() => setBasicOpen(true)}>打开抽屉</button>
          <Drawer title="基础抽屉" visible={basicOpen} onClose={() => setBasicOpen(false)}>
            <p>这是一个基础抽屉的内容区域。</p>
            <p>可以从右侧滑出，点击遮罩或关闭按钮可以关闭。</p>
            <p>按 ESC 键也可以关闭抽屉。</p>
          </Drawer>
        </>
      ),
    },
    {
      title: '不同方向',
      code: `<Drawer placement="left" ... />\n<Drawer placement="top" ... />\n<Drawer placement="bottom" ... />`,
      render: (
        <>
          <button style={btnStyle} onClick={() => setLeftOpen(true)}>左侧</button>
          <button style={btnStyle} onClick={() => setTopOpen(true)}>顶部</button>
          <button style={btnStyle} onClick={() => setBottomOpen(true)}>底部</button>
          <Drawer title="左侧抽屉" placement="left" visible={leftOpen} onClose={() => setLeftOpen(false)}>
            <p>从左侧滑出的抽屉。</p>
          </Drawer>
          <Drawer title="顶部抽屉" placement="top" visible={topOpen} onClose={() => setTopOpen(false)}>
            <p>从顶部滑出的抽屉。</p>
          </Drawer>
          <Drawer title="底部抽屉" placement="bottom" visible={bottomOpen} onClose={() => setBottomOpen(false)}>
            <p>从底部滑出的抽屉。</p>
          </Drawer>
        </>
      ),
    },
    {
      title: '自定义宽高',
      code: `<Drawer width={600} ... />`,
      render: (
        <>
          <button style={btnStyle} onClick={() => setCustomWidthOpen(true)}>宽 600px 抽屉</button>
          <Drawer title="自定义宽度" width={600} visible={customWidthOpen} onClose={() => setCustomWidthOpen(false)}>
            <p>通过 width 属性可以自定义抽屉宽度（仅在左右方向生效）。</p>
            <p>当前宽度为 600px。</p>
          </Drawer>
        </>
      ),
    },
    {
      title: '带底部按钮',
      code: `<Drawer title="确认操作" footer={<><Button>取消</Button><Button type="primary">确认</Button></>} ...>`,
      render: (
        <>
          <button style={btnStyle} onClick={() => setFooterOpen(true)}>打开带底部的抽屉</button>
          <Drawer
            title="确认操作"
            visible={footerOpen}
            onClose={() => setFooterOpen(false)}
            footer={
              <>
                <Button onClick={() => setFooterOpen(false)}>取消</Button>
                <Button type="primary" onClick={() => { alert('已确认'); setFooterOpen(false); }}>确认</Button>
              </>
            }
          >
            <p>确定要执行此操作吗？此操作不可撤销。</p>
          </Drawer>
        </>
      ),
    },
    {
      title: '无遮罩',
      code: `<Drawer mask={false} ... />`,
      render: (
        <>
          <button style={btnStyle} onClick={() => setNoMaskOpen(true)}>打开无遮罩抽屉</button>
          <Drawer title="无遮罩抽屉" mask={false} visible={noMaskOpen} onClose={() => setNoMaskOpen(false)}>
            <p>没有遮罩层的抽屉，可以看到背景内容。</p>
            <p>注意：无遮罩时点击外部区域不会关闭。</p>
          </Drawer>
        </>
      ),
    },
    {
      title: '禁止遮罩关闭',
      code: `<Drawer maskClosable={false} ... />`,
      render: (
        <>
          <button style={btnStyle} onClick={() => setNoClosableMaskOpen(true)}>打开（遮罩不可关闭）</button>
          <Drawer title="禁止遮罩关闭" maskClosable={false} visible={noClosableMaskOpen} onClose={() => setNoClosableMaskOpen(false)}>
            <p>点击遮罩不会关闭抽屉，只能通过右上角关闭按钮或 ESC 键关闭。</p>
          </Drawer>
        </>
      ),
    },
    {
      title: '关闭时销毁子组件',
      code: `const [content, setContent] = useState('初始内容');\n\n<Drawer destroyOnClose ...>\n  <input value={content} onChange={(e) => setContent(e.target.value)} />\n</Drawer>`,
      render: (
        <>
          <button style={btnStyle} onClick={() => setDestroyOpen(true)}>打开抽屉（修改后关闭再打开）</button>
          <Drawer
            title="销毁子组件"
            destroyOnClose
            visible={destroyOpen}
            onClose={() => setDestroyOpen(false)}
          >
            <p>关闭抽屉后子组件会被销毁，再次打开时状态会重置。</p>
            <div style={{ marginBottom: 12 }}>
              <label style={{ marginRight: 8 }}>修改内容：</label>
              <input
                value={destroyContent}
                onChange={(e) => setDestroyContent(e.target.value)}
                style={{ padding: '4px 8px', border: '1px solid #d9d9d9', borderRadius: 4, width: 200 }}
              />
            </div>
            <p style={{ color: '#999' }}>当前内容：{destroyContent}</p>
            <p style={{ color: '#faad14' }}>关闭后重新打开，输入框内容会重置为初始值。</p>
          </Drawer>
        </>
      ),
    },
    {
      title: '自定义内容区样式',
      code: `<Drawer bodyStyle={{ padding: 0, background: '#f5f5f5' }} ... />`,
      render: (
        <>
          <button style={btnStyle} onClick={() => setBasicOpen(true)}>参考基础用法</button>
          <p style={{ color: '#999', fontSize: 13 }}>通过 bodyStyle 自定义内容区样式，如内边距、背景色等。</p>
        </>
      ),
    },
  ];

  return (
    <>
      {demos.map((demo) => (
        <div key={demo.title} className="component-group">
          <h3>{demo.title}</h3>
          <DemoBlock code={demo.code}>{demo.render}</DemoBlock>
        </div>
      ))}
      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>Drawer API</h3>
        <ApiTable dataSource={apiData} />
      </div>
    </>
  );
};

export default DrawerDemo;
