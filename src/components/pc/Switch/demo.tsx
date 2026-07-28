import React from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import Table from '../Table/Table';
import Switch from './Switch';

const SwitchDemo = () => {
  const apiColumns = [
    { title: '参数', dataIndex: 'prop' },
    { title: '说明', dataIndex: 'desc' },
    { title: '类型', dataIndex: 'type' },
    { title: '默认值', dataIndex: 'default' }
  ];

  const apiData = [
    { prop: 'checked', desc: '是否选中', type: 'boolean', default: '-' },
    { prop: 'defaultChecked', desc: '默认是否选中', type: 'boolean', default: 'false' },
    { prop: 'onChange', desc: '值变化回调', type: 'function(checked)', default: '-' },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' },
    { prop: 'size', desc: '尺寸', type: 'SizeType', default: 'medium' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ];

  return (
    <>
      <div className="component-group">
        <h3>基础用法</h3>
        <DemoBlock
          code={`
<Switch defaultChecked />
<Switch />
<Switch disabled />
<Switch disabled defaultChecked />
          `.trim()}
        >
          <div style={{ display: 'flex', gap: '16px' }}>
            <Switch defaultChecked />
            <Switch />
            <Switch disabled />
            <Switch disabled defaultChecked />
          </div>
        </DemoBlock>
      </div>
      <div className="component-group">
        <h3>开关尺寸</h3>
        <DemoBlock
          code={`
<Switch size="small" />
<Switch size="medium" />
<Switch size="large" />
          `.trim()}
        >
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Switch size="small" />
              <span style={{ fontSize: '12px', color: '#999' }}>Small</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Switch size="medium" />
              <span style={{ fontSize: '12px', color: '#999' }}>Medium</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Switch size="large" />
              <span style={{ fontSize: '12px', color: '#999' }}>Large</span>
            </div>
          </div>
        </DemoBlock>
      </div>
      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>API</h3>
        <Table columns={apiColumns} dataSource={apiData} className="zdy-table-api" />
      </div>
    </>
  );
};

export default SwitchDemo;