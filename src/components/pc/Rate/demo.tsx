import { useState } from 'react';
import type { DemoConfig } from '../../../pages/Components/Demo/types';
import Rate from './Rate';

const BasicRateDemo = () => {
  const [value, setValue] = useState(3);

  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <span>当前评分：</span>
        <strong style={{ color: '#1890ff' }}>{value}</strong>
      </div>
      <Rate defaultValue={3} onChange={(v) => setValue(v)} />
    </>
  );
};

const HalfRateDemo = () => {
  const [value, setValue] = useState(2.5);

  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <span>当前评分：</span>
        <strong style={{ color: '#1890ff' }}>{value}</strong>
      </div>
      <Rate allowHalf defaultValue={2.5} onChange={(v) => setValue(v)} />
    </>
  );
};

const ControlledRateDemo = () => {
  const [value, setValue] = useState(0);

  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <span>当前评分：</span>
        <strong style={{ color: '#1890ff' }}>{value}</strong>
        <button
          onClick={() => setValue(0)}
          style={{ marginLeft: 12, padding: '2px 8px', fontSize: 12, cursor: 'pointer' }}
        >
          重置
        </button>
      </div>
      <Rate value={value} onChange={(v) => setValue(v)} />
    </>
  );
};

const rateDemo: DemoConfig = {
  demos: [
    {
      title: '基础用法',
      code: `<Rate defaultValue={3} onChange={(v) => console.log(v)} />`,
      render: <BasicRateDemo />,
    },
    {
      title: '半星',
      code: `<Rate allowHalf defaultValue={2.5} onChange={(v) => console.log(v)} />`,
      render: <HalfRateDemo />,
    },
    {
      title: '受控用法',
      code: `const [value, setValue] = useState(0);\n\n<Rate value={value} onChange={(v) => setValue(v)} />`,
      render: <ControlledRateDemo />,
    },
    {
      title: '禁用状态',
      code: `<Rate disabled defaultValue={3} />\n<Rate disabled allowHalf defaultValue={2.5} />`,
      render: (
        <>
          <div style={{ marginBottom: 12 }}>
            <Rate disabled defaultValue={3} />
          </div>
          <Rate disabled allowHalf defaultValue={2.5} />
        </>
      ),
    },
    {
      title: '不同尺寸',
      code: `<Rate size="small" defaultValue={3} />\n<Rate size="default" defaultValue={3} />\n<Rate size="large" defaultValue={3} />`,
      render: (
        <>
          <div style={{ marginBottom: 12 }}>
            <Rate size="small" defaultValue={3} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <Rate size="default" defaultValue={3} />
          </div>
          <Rate size="large" defaultValue={3} />
        </>
      ),
    },
    {
      title: '自定义总数',
      code: `<Rate count={10} defaultValue={6} />`,
      render: <Rate count={10} defaultValue={6} />,
    },
    {
      title: '自定义字符',
      code: `<Rate character="👍" defaultValue={3} />\n<Rate character="❤" defaultValue={4} />`,
      render: (
        <>
          <div style={{ marginBottom: 12 }}>
            <Rate character="👍" defaultValue={3} />
          </div>
          <Rate character="❤" defaultValue={4} />
        </>
      ),
    },
    {
      title: '提示信息',
      code: `<Rate\n  defaultValue={3}\n  tooltips={['很差', '差', '一般', '好', '很好']}\n/>`,
      render: (
        <Rate
          defaultValue={3}
          tooltips={['很差', '差', '一般', '好', '很好']}
        />
      ),
    },
    {
      title: '不可清除',
      code: `<Rate allowClear={false} defaultValue={3} />`,
      render: <Rate allowClear={false} defaultValue={3} />,
    },
  ],
  api: [
    { prop: 'count', desc: '星星总数', type: 'number', default: '5' },
    { prop: 'value', desc: '当前值（受控）', type: 'number', default: '-' },
    { prop: 'defaultValue', desc: '默认值', type: 'number', default: '0' },
    { prop: 'allowHalf', desc: '是否允许半选', type: 'boolean', default: 'false' },
    { prop: 'allowClear', desc: '是否允许清除', type: 'boolean', default: 'true' },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' },
    { prop: 'character', desc: '自定义字符', type: 'ReactNode', default: '★' },
    { prop: 'size', desc: '尺寸', type: "'small' | 'default' | 'large'", default: "'default'" },
    { prop: 'tooltips', desc: '自定义提示信息', type: 'string[]', default: '-' },
    { prop: 'onChange', desc: '值变化回调', type: '(value: number) => void', default: '-' },
    { prop: 'onHoverChange', desc: 'hover 回调', type: '(value: number) => void', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ],
};

export default rateDemo;
