import React from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import Table from '../Table/Table';
import Icon from './Icon';

const IconDemo = () => {
  const apiColumns = [
    { title: '参数', dataIndex: 'prop' },
    { title: '说明', dataIndex: 'desc' },
    { title: '类型', dataIndex: 'type' },
    { title: '默认值', dataIndex: 'default' }
  ];

  const apiData = [
    { prop: 'type', desc: '图标名称', type: 'string', default: '-' },
    { prop: 'size', desc: '图标大小', type: 'number | string', default: 'inherit' },
    { prop: 'color', desc: '图标颜色', type: 'string', default: 'inherit' },
    { prop: 'spin', desc: '是否旋转', type: 'boolean', default: 'false' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ];

  return (
    <>
      <div className="component-group">
        <h3>基础示例</h3>
        <DemoBlock
          code={`
<Icon type="home" />
<Icon type="user" />
<Icon type="search" />
<Icon type="bell" />
<Icon type="star" />
<Icon type="heart" />
<Icon type="settings" />
<Icon type="close" />
          `.trim()}
        >
          <div style={{ display: 'flex', gap: '24px', fontSize: '24px' }}>
            <Icon type="home" />
            <Icon type="user" />
            <Icon type="search" />
            <Icon type="bell" />
            <Icon type="star" />
            <Icon type="heart" />
            <Icon type="settings" />
            <Icon type="close" />
          </div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>不同尺寸</h3>
        <DemoBlock
          code={`
<Icon type="home" size={16} />
<Icon type="home" size={24} />
<Icon type="home" size={32} />
<Icon type="home" size={48} />
          `.trim()}
        >
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Icon type="home" size={16} />
            <Icon type="home" size={24} />
            <Icon type="home" size={32} />
            <Icon type="home" size={48} />
          </div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>不同颜色</h3>
        <DemoBlock
          code={`
<Icon type="star" color="#ff4d4f" size={32} />
<Icon type="star" color="#faad14" size={32} />
<Icon type="star" color="#52c41a" size={32} />
<Icon type="star" color="#1890ff" size={32} />
<Icon type="star" color="#722ed1" size={32} />
          `.trim()}
        >
          <div style={{ display: 'flex', gap: '24px' }}>
            <Icon type="star" color="#ff4d4f" size={32} />
            <Icon type="star" color="#faad14" size={32} />
            <Icon type="star" color="#52c41a" size={32} />
            <Icon type="star" color="#1890ff" size={32} />
            <Icon type="star" color="#722ed1" size={32} />
          </div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>旋转动画</h3>
        <DemoBlock
          code={`
<Icon type="spin" spin size={32} />
<Icon type="loading" spin size={32} />
          `.trim()}
        >
          <div style={{ display: 'flex', gap: '24px' }}>
            <Icon type="spin" spin size={32} />
            <Icon type="loading" spin size={32} />
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

export default IconDemo;