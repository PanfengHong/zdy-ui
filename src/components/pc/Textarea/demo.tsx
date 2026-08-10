import React, { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Textarea from './Textarea';

const TextareaDemo = () => {
  const [value, setValue] = useState('');

  const apiData = [
    { prop: 'value', desc: '当前值', type: 'string', default: '-' },
    { prop: 'onChange', desc: '值变化回调', type: 'function', default: '-' },
    { prop: 'placeholder', desc: '占位提示', type: 'string', default: '-' },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' },
    { prop: 'size', desc: '尺寸', type: 'SizeType', default: 'medium' },
    { prop: 'rows', desc: '行数', type: 'number', default: '4' },
    { prop: 'cols', desc: '列数', type: 'number', default: '50' },
    { prop: 'maxLength', desc: '最大字符数', type: 'number', default: '-' },
    { prop: 'showCount', desc: '是否显示字数', type: 'boolean', default: 'false' },
    { prop: 'autoSize', desc: '是否自适应高度', type: 'boolean', default: 'false' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ];

  const demos = [
    {
      title: '基础示例',
      code: `<Textarea placeholder="请输入内容" />`,
      render: <Textarea placeholder="请输入内容" />,
    },
    {
      title: '不同尺寸',
      code: `<Textarea size="small" placeholder="小号" />\n<Textarea size="medium" placeholder="中号" />\n<Textarea size="large" placeholder="大号" />`,
      render: (
        <div className="input-group">
          <Textarea size="small" placeholder="小号" />
          <Textarea size="medium" placeholder="中号" />
          <Textarea size="large" placeholder="大号" />
        </div>
      ),
    },
    {
      title: '自定义行数',
      code: `<Textarea rows={6} cols={50} placeholder="6行文本域" />`,
      render: <Textarea rows={6} cols={50} placeholder="6行文本域" />,
    },
    {
      title: '限制字数',
      code: `<Textarea maxLength={100} showCount placeholder="最多输入100个字" />`,
      render: <Textarea maxLength={100} showCount placeholder="最多输入100个字" />,
    },
    {
      title: '受控模式',
      code: `
const [value, setValue] = useState('');

<Textarea value={value} onChange={(e) => setValue(e.target.value)} placeholder="受控模式" />
<p>当前输入：{value.length} 个字符</p>
          `.trim(),
      render: (
        <>
           <Textarea 
            value={value} 
            onChange={(e) => setValue(e.target.value)} 
            placeholder="受控模式" 
          />
          <p style={{ marginTop: '12px', color: '#666', fontSize: '14px' }}>
            当前输入：{value.length} 个字符
          </p>
        </>
      ),
    },
    {
      title: '禁用状态',
      code: `<Textarea disabled placeholder="禁用状态" />`,
      render: <Textarea disabled placeholder="禁用状态" />,
    },
    {
      title: '自适应高度',
      code: `<Textarea autoSize placeholder="自适应高度" />`,
      render: <Textarea autoSize placeholder="自适应高度" />,
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

export default TextareaDemo;