import React from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Icon from './Icon';

const IconDemo = () => {

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
        <h3>基础用法</h3>
        <DemoBlock
          code={`
<Icon type="add" />
<Icon type="delete" />
<Icon type="close" />
<Icon type="edit" />
<Icon type="search" />
<Icon type="save" />
          `.trim()}
        >
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon type="add" />
              <span style={{ fontSize: '12px', color: '#999' }}>add</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon type="delete" />
              <span style={{ fontSize: '12px', color: '#999' }}>delete</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon type="close" />
              <span style={{ fontSize: '12px', color: '#999' }}>close</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon type="edit" />
              <span style={{ fontSize: '12px', color: '#999' }}>edit</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon type="search" />
              <span style={{ fontSize: '12px', color: '#999' }}>search</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon type="save" />
              <span style={{ fontSize: '12px', color: '#999' }}>save</span>
            </div>
          </div>
        </DemoBlock>
      </div>
      <div className="component-group">
        <h3>导航图标</h3>
        <DemoBlock
          code={`
<Icon type="back" />
<Icon type="forward" />
<Icon type="up" />
<Icon type="down" />
<Icon type="left" />
<Icon type="right" />
          `.trim()}
        >
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon type="back" />
              <span style={{ fontSize: '12px', color: '#999' }}>back</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon type="forward" />
              <span style={{ fontSize: '12px', color: '#999' }}>forward</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon type="up" />
              <span style={{ fontSize: '12px', color: '#999' }}>up</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon type="down" />
              <span style={{ fontSize: '12px', color: '#999' }}>down</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon type="left" />
              <span style={{ fontSize: '12px', color: '#999' }}>left</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon type="right" />
              <span style={{ fontSize: '12px', color: '#999' }}>right</span>
            </div>
          </div>
        </DemoBlock>
      </div>
      <div className="component-group">
        <h3>状态图标</h3>
        <DemoBlock
          code={`
<Icon type="check" />
<Icon type="error" />
<Icon type="warning" />
<Icon type="info" />
<Icon type="confirm" />
<Icon type="cancel" />
          `.trim()}
        >
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon type="check" />
              <span style={{ fontSize: '12px', color: '#999' }}>check</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon type="error" />
              <span style={{ fontSize: '12px', color: '#999' }}>error</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon type="warning" />
              <span style={{ fontSize: '12px', color: '#999' }}>warning</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon type="info" />
              <span style={{ fontSize: '12px', color: '#999' }}>info</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon type="confirm" />
              <span style={{ fontSize: '12px', color: '#999' }}>confirm</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon type="cancel" />
              <span style={{ fontSize: '12px', color: '#999' }}>cancel</span>
            </div>
          </div>
        </DemoBlock>
      </div>
      <div className="component-group">
        <h3>图标尺寸</h3>
        <DemoBlock
          code={`
<Icon type="add" size="small" />
<Icon type="add" size="medium" />
<Icon type="add" size="large" />
<Icon type="add" size={32} />
          `.trim()}
        >
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon type="add" size="small" />
              <span style={{ fontSize: '12px', color: '#999' }}>small</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon type="add" size="medium" />
              <span style={{ fontSize: '12px', color: '#999' }}>medium</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon type="add" size="large" />
              <span style={{ fontSize: '12px', color: '#999' }}>large</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon type="add" size={32} />
              <span style={{ fontSize: '12px', color: '#999' }}>32px</span>
            </div>
          </div>
        </DemoBlock>
      </div>
      <div className="component-group">
        <h3>图标颜色</h3>
        <DemoBlock
          code={`
<Icon type="add" color="#2587ff" />
<Icon type="add" color="#52c41a" />
<Icon type="add" color="#faad14" />
<Icon type="add" color="#ff4d4f" />
          `.trim()}
        >
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon type="add" color="#2587ff" />
              <span style={{ fontSize: '12px', color: '#999' }}>blue</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon type="add" color="#52c41a" />
              <span style={{ fontSize: '12px', color: '#999' }}>green</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon type="add" color="#faad14" />
              <span style={{ fontSize: '12px', color: '#999' }}>orange</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Icon type="add" color="#ff4d4f" />
              <span style={{ fontSize: '12px', color: '#999' }}>red</span>
            </div>
          </div>
        </DemoBlock>
      </div>

      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>API</h3>
        <ApiTable dataSource={apiData} />
      </div>
    </>
  );
};

export default IconDemo;