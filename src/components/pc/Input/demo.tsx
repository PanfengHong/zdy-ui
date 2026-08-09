import React from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Input from './Input';
import Icon from '../Icon/Icon';

const InputDemo: React.FC = () => {
  const apiData = [
    { prop: 'type', desc: '输入框类型', type: 'string', default: 'text' },
    { prop: 'value', desc: '当前值', type: 'string | number', default: '-' },
    { prop: 'onChange', desc: '值变化回调', type: 'function', default: '-' },
    { prop: 'placeholder', desc: '占位提示', type: 'string', default: '-' },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' },
    { prop: 'size', desc: '输入框尺寸', type: 'SizeType', default: 'medium' },
    { prop: 'prefix', desc: '前缀内容', type: 'ReactNode', default: '-' },
    { prop: 'suffix', desc: '后缀内容', type: 'ReactNode', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ];

  const demos = [
    {
      title: '基础示例',
      code: `<Input placeholder="请输入内容" />`,
      render: <Input placeholder="请输入内容" />,
    },
    {
      title: '输入框尺寸',
      code: `<Input placeholder="Small" size="small" />\n<Input placeholder="Medium" size="medium" />\n<Input placeholder="Large" size="large" />`,
      render: (
        <div className="input-group">
          <Input placeholder="Small" size="small" />
          <Input placeholder="Medium" size="medium" />
          <Input placeholder="Large" size="large" />
        </div>
      ),
    },
    {
      title: '前后缀',
      code: `<Input placeholder="Small" prefix={<Icon type="user" />} />\n<Input placeholder="Large" suffix={<Icon type="search" />} />\n<Input placeholder="Medium" prefix="¥" suffix="元" />`,
      render: (
        <div className="input-group">
          <Input placeholder="Small" prefix={<Icon type="user" />} />
          <Input placeholder="Large" suffix={<Icon type="search" />} />
          <Input placeholder="Medium" prefix="¥" suffix="元" />
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

export default InputDemo;
