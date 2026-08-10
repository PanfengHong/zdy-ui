import { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Collapse from './Collapse';
import Icon from '../Icon/Icon';

const text = `
  A dog is a type of domesticated animal. Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const CollapseDemo = () => {
  const [controlledKeys, setControlledKeys] = useState<string[]>(['1']);

  const collapseApiData = [
    { prop: 'activeKey', desc: '当前激活面板的 key（受控）', type: 'string[] | string', default: '-' },
    { prop: 'defaultActiveKey', desc: '默认激活面板的 key', type: 'string[] | string', default: '[]' },
    { prop: 'accordion', desc: '手风琴模式，每次只展开一个面板', type: 'boolean', default: 'false' },
    { prop: 'bordered', desc: '是否显示边框', type: 'boolean', default: 'true' },
    { prop: 'ghost', desc: '幽灵模式（透明背景无边框）', type: 'boolean', default: 'false' },
    { prop: 'expandIcon', desc: '自定义展开图标', type: 'ReactNode', default: '右箭头' },
    { prop: 'expandIconPosition', desc: '展开图标位置', type: "'start' | 'end'", default: "'start'" },
    { prop: 'destroyInactivePanel', desc: '销毁未激活的面板内容', type: 'boolean', default: 'false' },
    { prop: 'onChange', desc: '切换面板回调', type: 'function(keys)', default: '-' }
  ];

  const panelApiData = [
    { prop: 'panelKey', desc: '面板唯一标识', type: 'string', default: '-' },
    { prop: 'header', desc: '面板头部内容', type: 'ReactNode', default: '-' },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' },
    { prop: 'extra', desc: '头部右侧额外内容', type: 'ReactNode', default: '-' },
    { prop: 'forceRender', desc: '隐藏时是否强制渲染', type: 'boolean', default: 'false' },
    { prop: 'showArrow', desc: '是否显示展开箭头', type: 'boolean', default: 'true' },
    { prop: 'collapsible', desc: '可折叠区域', type: "'header' | 'disabled' | false", default: "'header'" }
  ];

  const demos = [
    {
      title: '基础用法',
      code: `<Collapse defaultActiveKey={['1']}>\n  <Collapse.Panel panelKey="1" header="面板一">\n    内容一\n  </Collapse.Panel>\n  <Collapse.Panel panelKey="2" header="面板二">\n    内容二\n  </Collapse.Panel>\n  <Collapse.Panel panelKey="3" header="面板三">\n    内容三\n  </Collapse.Panel>\n</Collapse>`,
      render: (
        <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel panelKey="1" header="This is panel header 1">
            {text}
          </Collapse.Panel>
          <Collapse.Panel panelKey="2" header="This is panel header 2">
            {text}
          </Collapse.Panel>
          <Collapse.Panel panelKey="3" header="This is panel header 3">
            {text}
          </Collapse.Panel>
        </Collapse>
      ),
    },
    {
      title: '手风琴模式',
      description: <p style={{ color: '#999', marginBottom: 8 }}>同一时间只允许展开一个面板。</p>,
      code: `<Collapse accordion>\n  <Collapse.Panel panelKey="1" header="面板一">内容一</Collapse.Panel>\n  <Collapse.Panel panelKey="2" header="面板二">内容二</Collapse.Panel>\n  <Collapse.Panel panelKey="3" header="面板三">内容三</Collapse.Panel>\n</Collapse>`,
      render: (
        <Collapse accordion>
          <Collapse.Panel panelKey="1" header="This is panel header 1">
            {text}
          </Collapse.Panel>
          <Collapse.Panel panelKey="2" header="This is panel header 2">
            {text}
          </Collapse.Panel>
          <Collapse.Panel panelKey="3" header="This is panel header 3">
            {text}
          </Collapse.Panel>
        </Collapse>
      ),
    },
    {
      title: '无边框 / 幽灵模式',
      code: `<Collapse bordered={false} defaultActiveKey={['1']}>\n  <Collapse.Panel panelKey="1" header="面板一">内容一</Collapse.Panel>\n  <Collapse.Panel panelKey="2" header="面板二">内容二</Collapse.Panel>\n</Collapse>\n\n<Collapse ghost defaultActiveKey={['1']}>\n  <Collapse.Panel panelKey="1" header="面板一">内容一</Collapse.Panel>\n  <Collapse.Panel panelKey="2" header="面板二">内容二</Collapse.Panel>\n</Collapse>`,
      render: (
        <>
          <Collapse bordered={false} defaultActiveKey={['1']}>
            <Collapse.Panel panelKey="1" header="This is panel header 1">
              {text}
            </Collapse.Panel>
            <Collapse.Panel panelKey="2" header="This is panel header 2">
              {text}
            </Collapse.Panel>
          </Collapse>
          <div style={{ height: 16 }} />
          <div style={{ background: '#f5f7fa', padding: 16, borderRadius: 4 }}>
            <Collapse ghost defaultActiveKey={['1']}>
              <Collapse.Panel panelKey="1" header="This is panel header 1">
                {text}
              </Collapse.Panel>
              <Collapse.Panel panelKey="2" header="This is panel header 2">
                {text}
              </Collapse.Panel>
            </Collapse>
          </div>
        </>
      ),
    },
    {
      title: '受控用法',
      description: (
        <p style={{ color: '#999', marginBottom: 8 }}>
          通过 activeKey 控制激活面板，当前激活：<code>{JSON.stringify(controlledKeys)}</code>
        </p>
      ),
      code: `const [keys, setKeys] = useState(['1']);\n<Collapse activeKey={keys} onChange={setKeys}>\n  <Collapse.Panel panelKey="1" header="面板一">内容一</Collapse.Panel>\n  <Collapse.Panel panelKey="2" header="面板二">内容二</Collapse.Panel>\n</Collapse>`,
      render: (
        <Collapse activeKey={controlledKeys} onChange={setControlledKeys}>
          <Collapse.Panel panelKey="1" header="This is panel header 1">
            {text}
          </Collapse.Panel>
          <Collapse.Panel panelKey="2" header="This is panel header 2">
            {text}
          </Collapse.Panel>
          <Collapse.Panel panelKey="3" header="This is panel header 3">
            {text}
          </Collapse.Panel>
        </Collapse>
      ),
    },
    {
      title: '展开图标位置',
      code: `<Collapse expandIconPosition="end" defaultActiveKey={['1']}>\n  <Collapse.Panel panelKey="1" header="面板一">内容一</Collapse.Panel>\n  <Collapse.Panel panelKey="2" header="面板二">内容二</Collapse.Panel>\n</Collapse>`,
      render: (
        <Collapse expandIconPosition="end" defaultActiveKey={['1']}>
          <Collapse.Panel panelKey="1" header="This is panel header 1">
            {text}
          </Collapse.Panel>
          <Collapse.Panel panelKey="2" header="This is panel header 2">
            {text}
          </Collapse.Panel>
        </Collapse>
      ),
    },
    {
      title: '自定义展开图标',
      code: `<Collapse expandIcon={<Icon type="down" size={14} />} defaultActiveKey={['1']}>\n  <Collapse.Panel panelKey="1" header="面板一">内容一</Collapse.Panel>\n  <Collapse.Panel panelKey="2" header="面板二">内容二</Collapse.Panel>\n</Collapse>`,
      render: (
        <Collapse
          expandIcon={<Icon type="down" size={14} color="currentColor" />}
          defaultActiveKey={['1']}
        >
          <Collapse.Panel panelKey="1" header="This is panel header 1">
            {text}
          </Collapse.Panel>
          <Collapse.Panel panelKey="2" header="This is panel header 2">
            {text}
          </Collapse.Panel>
        </Collapse>
      ),
    },
    {
      title: '禁用 / 不可折叠',
      code: `<Collapse defaultActiveKey={['1']}>\n  <Collapse.Panel panelKey="1" header="可折叠">内容</Collapse.Panel>\n  <Collapse.Panel panelKey="2" header="禁用" disabled>禁用内容</Collapse.Panel>\n  <Collapse.Panel panelKey="3" header="不可折叠" collapsible={false}>内容</Collapse.Panel>\n</Collapse>`,
      render: (
        <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel panelKey="1" header="This is panel header 1">
            {text}
          </Collapse.Panel>
          <Collapse.Panel panelKey="2" header="This is panel header 2" disabled>
            {text}
          </Collapse.Panel>
          <Collapse.Panel panelKey="3" header="This is panel header 3 (non-collapsible)" collapsible={false}>
            <p style={{ margin: 0, color: '#999' }}>该面板不可折叠，仅作为信息展示。</p>
          </Collapse.Panel>
        </Collapse>
      ),
    },
    {
      title: '带额外内容',
      code: `<Collapse>\n  <Collapse.Panel panelKey="1" header="面板一" extra="Tag">内容一</Collapse.Panel>\n  <Collapse.Panel panelKey="2" header="面板二" extra={<a>更多</a>}>内容二</Collapse.Panel>\n</Collapse>`,
      render: (
        <Collapse>
          <Collapse.Panel
            panelKey="1"
            header="This is panel header 1"
            extra={<span style={{ color: '#2587ff' }}>Tag</span>}
          >
            {text}
          </Collapse.Panel>
          <Collapse.Panel
            panelKey="2"
            header="This is panel header 2"
            extra={<a href="#" onClick={(e) => e.preventDefault()}>More</a>}
          >
            {text}
          </Collapse.Panel>
        </Collapse>
      ),
    },
    {
      title: '隐藏箭头',
      code: `<Collapse defaultActiveKey={['1']}>\n  <Collapse.Panel panelKey="1" header="面板一" showArrow={false}>内容一</Collapse.Panel>\n  <Collapse.Panel panelKey="2" header="面板二">内容二</Collapse.Panel>\n</Collapse>`,
      render: (
        <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel panelKey="1" header="This is panel header 1 (no arrow)" showArrow={false}>
            {text}
          </Collapse.Panel>
          <Collapse.Panel panelKey="2" header="This is panel header 2">
            {text}
          </Collapse.Panel>
        </Collapse>
      ),
    },
    {
      title: '嵌套使用',
      code: `<Collapse defaultActiveKey={['1']}>\n  <Collapse.Panel panelKey="1" header="外层面板">\n    <Collapse defaultActiveKey={['1-1']}>\n      <Collapse.Panel panelKey="1-1" header="内层面板一">内容一</Collapse.Panel>\n      <Collapse.Panel panelKey="1-2" header="内层面板二">内容二</Collapse.Panel>\n    </Collapse>\n  </Collapse.Panel>\n  <Collapse.Panel panelKey="2" header="外层面板二">内容二</Collapse.Panel>\n</Collapse>`,
      render: (
        <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel panelKey="1" header="Outer panel 1">
            <Collapse defaultActiveKey={['1-1']}>
              <Collapse.Panel panelKey="1-1" header="Inner panel 1">
                {text}
              </Collapse.Panel>
              <Collapse.Panel panelKey="1-2" header="Inner panel 2">
                {text}
              </Collapse.Panel>
            </Collapse>
          </Collapse.Panel>
          <Collapse.Panel panelKey="2" header="Outer panel 2">
            {text}
          </Collapse.Panel>
        </Collapse>
      ),
    },
  ];

  return (
    <>
      {demos.map((demo) => (
        <div key={demo.title} className="component-group">
          <h3>{demo.title}</h3>
          {demo.description}
          <DemoBlock code={demo.code}>{demo.render}</DemoBlock>
        </div>
      ))}
      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>Collapse API</h3>
        <ApiTable dataSource={collapseApiData} />
      </div>
      <div className="component-group">
        <h3>Collapse.Panel API</h3>
        <ApiTable dataSource={panelApiData} />
      </div>
    </>
  );
};

export default CollapseDemo;
