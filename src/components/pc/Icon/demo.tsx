import React from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Icon from './Icon';
import type { IconSizeType, IconType } from './types'

const IconDemo = () => {
  const apiData = [
    { prop: 'type', desc: '图标名称', type: 'string', default: '-' },
    { prop: 'size', desc: '图标大小', type: 'number | string', default: 'inherit' },
    { prop: 'color', desc: '图标颜色', type: 'string', default: 'inherit' },
    { prop: 'spin', desc: '是否旋转', type: 'boolean', default: 'false' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ];

  const sizeArr: (IconSizeType | number)[] = ['xs', 'sm', 'md', 'lg', 'xl', 64];

  const colorArr: string[] = ['#2587ff', '#52c41a', '#faad14', '#ff4d4f'];

  const baseIcons: IconType[] = ['user', 'home', 'add', 'delete', 'close', 'edit', 'search', 'save', 'setting'];

  const navIcons: IconType[] = ['up', 'down', 'left', 'right'];

  const triangleIcons: IconType[] = ['caret-up', 'caret-down', 'caret-left', 'caret-right'];

  const statusIcons: IconType[] = ['check', 'error', 'warning', 'info', 'confirm', 'cancel'];

  const demos = [
    {
      title: '基础图标',
      code: `<Icon type="user" />\n<Icon type="home" />\n<Icon type="add" />\n<Icon type="delete" />\n<Icon type="close" />\n<Icon type="edit" />\n<Icon type="search" />\n<Icon type="save" />`,
      render: (
        <>
          <div className="icon-group">
            <div className="icon-group-content">
              {baseIcons.map((icon: IconType) => (
                <div key={icon} className="icon-group-item">
                  <Icon type={icon} />
                  <span style={{ fontSize: '12px', color: '#999' }}>{icon}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      ),
    },
    {
      title: '导航图标',
      code: `<Icon type="back" />\n<Icon type="forward" />\n<Icon type="up" />\n<Icon type="down" />\n<Icon type="left" />\n<Icon type="right" />`,
      render: (
        <>
          <div className="icon-group">
            <div className="icon-group-content">
              {navIcons.map((icon: IconType) => (
                <div key={icon} className="icon-group-item">
                  <Icon type={icon} />
                  <span style={{ fontSize: '12px', color: '#999' }}>{icon}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      ),
    },
    {
      title: '三角箭头',
      code: `<Icon type="caret-up" />\n<Icon type="caret-down" />\n<Icon type="caret-left" />\n<Icon type="caret-right" />`,
      render: (
        <>
          <div className="icon-group">
            <div className="icon-group-content">
              {triangleIcons.map((icon: IconType) => (
                <div key={icon} className="icon-group-item">
                  <Icon type={icon} />
                  <span style={{ fontSize: '12px', color: '#999' }}>{icon}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      ),
    },
    {
      title: '状态图标',
      code: `<Icon type="check" />\n<Icon type="error" />\n<Icon type="warning" />\n<Icon type="info" />\n<Icon type="confirm" />\n<Icon type="cancel" />`,
      render: (
        <>
          <div className="icon-group">
            <div className="icon-group-content">
              {statusIcons.map((icon: IconType) => (
                <div key={icon} className="icon-group-item">
                  <Icon type={icon} />
                  <span style={{ fontSize: '12px', color: '#999' }}>{icon}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      ),
    },
    {
      title: '图标尺寸',
      code: `<Icon type="add" size="small" />\n<Icon type="add" size="medium" />\n<Icon type="add" size="large" />\n<Icon type="add" size={32} />`,
      render: (
        <>
          <div className="icon-group">
            <div className="icon-group-content">
              {sizeArr.map((size?: IconSizeType | number) => (
                <div key={size} className="icon-group-item">
                  <Icon type={'add'} size={size} />
                  <span style={{ fontSize: '12px', color: '#999' }}>{typeof size === 'number' ? `${size}px` : size}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      ),
    },
    {
      title: '图标颜色',
      code: `<Icon type="add" color="#2587ff" />\n<Icon type="add" color="#52c41a" />\n<Icon type="add" color="#faad14" />\n<Icon type="add" color="#ff4d4f" />`,
      render: (
        <>
          <div className="icon-group">
            <div className="icon-group-content">
              {colorArr.map((color: string) => (
                <div key={color} className="icon-group-item">
                  <Icon type={'add'} color={color} />
                  <span style={{ fontSize: '12px', color: '#999' }}>{color}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )
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
