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

  const demos = [
    {
      title: '基础用法',
      code: `<Icon type="user" />\n<Icon type="home" />\n<Icon type="add" />\n<Icon type="delete" />\n<Icon type="close" />\n<Icon type="edit" />\n<Icon type="search" />\n<Icon type="save" />`,
      render: (
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Icon type="user" />
            <span style={{ fontSize: '12px', color: '#999' }}>user</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Icon type="home" />
            <span style={{ fontSize: '12px', color: '#999' }}>home</span>
          </div>
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
      ),
    },
    {
      title: '导航图标',
      code: `<Icon type="back" />\n<Icon type="forward" />\n<Icon type="up" />\n<Icon type="down" />\n<Icon type="left" />\n<Icon type="right" />`,
      render: (
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
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
      ),
    },
    {
      title: '三角箭头',
      code: `<Icon type="caret-up" />\n<Icon type="caret-down" />\n<Icon type="caret-left" />\n<Icon type="caret-right" />`,
      render: (
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Icon type="caret-up" />
            <span style={{ fontSize: '12px', color: '#999' }}>caret-up</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Icon type="caret-down" />
            <span style={{ fontSize: '12px', color: '#999' }}>caret-down</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Icon type="caret-left" />
            <span style={{ fontSize: '12px', color: '#999' }}>caret-left</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Icon type="caret-right" />
            <span style={{ fontSize: '12px', color: '#999' }}>caret-right</span>
          </div>
        </div>
      ),
    },
    {
      title: '状态图标',
      code: `<Icon type="check" />\n<Icon type="error" />\n<Icon type="warning" />\n<Icon type="info" />\n<Icon type="confirm" />\n<Icon type="cancel" />`,
      render: (
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
      ),
    },
    {
      title: '图标尺寸',
      code: `<Icon type="add" size="small" />\n<Icon type="add" size="medium" />\n<Icon type="add" size="large" />\n<Icon type="add" size={32} />`,
      render: (
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Icon type="add" size="sm" />
            <span style={{ fontSize: '12px', color: '#999' }}>small</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Icon type="add" size="md" />
            <span style={{ fontSize: '12px', color: '#999' }}>medium</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Icon type="add" size="lg" />
            <span style={{ fontSize: '12px', color: '#999' }}>large</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Icon type="add" size={32} />
            <span style={{ fontSize: '12px', color: '#999' }}>32px</span>
          </div>
        </div>
      ),
    },
    {
      title: '图标颜色',
      code: `<Icon type="add" color="#2587ff" />\n<Icon type="add" color="#52c41a" />\n<Icon type="add" color="#faad14" />\n<Icon type="add" color="#ff4d4f" />`,
      render: (
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
        <h3>API</h3>
        <ApiTable dataSource={apiData} />
      </div>
    </>
  );
};

export default IconDemo;
