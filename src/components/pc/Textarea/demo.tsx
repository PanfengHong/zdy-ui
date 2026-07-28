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

  return (
    <>
      <div className="component-group">
        <h3>基础示例</h3>
        <DemoBlock
          code={`
<Textarea placeholder="请输入内容" />
          `.trim()}
        >
          <Textarea placeholder="请输入内容" />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>不同尺寸</h3>
        <DemoBlock
          code={`
<Textarea size="small" placeholder="小号" />
<Textarea size="medium" placeholder="中号" />
<Textarea size="large" placeholder="大号" />
          `.trim()}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Textarea size="small" placeholder="小号" />
            <Textarea size="medium" placeholder="中号" />
            <Textarea size="large" placeholder="大号" />
          </div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>自定义行数</h3>
        <DemoBlock
          code={`
<Textarea rows={6} cols={50} placeholder="6行文本域" />
          `.trim()}
        >
          <Textarea rows={6} cols={50} placeholder="6行文本域" />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>限制字数</h3>
        <DemoBlock
          code={`
<Textarea maxLength={100} showCount placeholder="最多输入100个字" />
          `.trim()}
        >
          <Textarea maxLength={100} showCount placeholder="最多输入100个字" />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>受控模式</h3>
        <DemoBlock
          code={`
const [value, setValue] = useState('');

<Textarea value={value} onChange={(e) => setValue(e.target.value)} placeholder="受控模式" />
<p>当前输入：{value.length} 个字符</p>
          `.trim()}
        >
          <Textarea 
            value={value} 
            onChange={(e) => setValue(e.target.value)} 
            placeholder="受控模式" 
          />
          <p style={{ marginTop: '12px', color: '#666', fontSize: '14px' }}>
            当前输入：{value.length} 个字符
          </p>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>禁用状态</h3>
        <DemoBlock
          code={`
<Textarea disabled placeholder="禁用状态" />
          `.trim()}
        >
          <Textarea disabled placeholder="禁用状态" />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>自适应高度</h3>
        <DemoBlock
          code={`
<Textarea autoSize placeholder="输入内容会自动增高" />
          `.trim()}
        >
          <Textarea autoSize placeholder="输入内容会自动增高" />
        </DemoBlock>
      </div>

      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>API</h3>
        <ApiTable dataSource={apiData} />
      </div>
    </>
  );
};

export default TextareaDemo;