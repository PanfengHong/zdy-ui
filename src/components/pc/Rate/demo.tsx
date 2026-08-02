import { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Rate from './Rate';

const RateDemo = () => {
  const [value1, setValue1] = useState(3);
  const [value2, setValue2] = useState(2.5);
  const [value3, setValue3] = useState(0);

  const apiData = [
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
  ];

  return (
    <>
      <div className="component-group">
        <h3>基础用法</h3>
        <div style={{ marginBottom: 12 }}>
          <span>当前评分：</span>
          <strong style={{ color: '#1890ff' }}>{value1}</strong>
        </div>
        <DemoBlock
          code={`<Rate defaultValue={3} onChange={(v) => console.log(v)} />`}
        >
          <Rate defaultValue={3} onChange={(v) => setValue1(v)} />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>半星</h3>
        <div style={{ marginBottom: 12 }}>
          <span>当前评分：</span>
          <strong style={{ color: '#1890ff' }}>{value2}</strong>
        </div>
        <DemoBlock
          code={`<Rate allowHalf defaultValue={2.5} onChange={(v) => console.log(v)} />`}
        >
          <Rate allowHalf defaultValue={2.5} onChange={(v) => setValue2(v)} />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>受控用法</h3>
        <div style={{ marginBottom: 12 }}>
          <span>当前评分：</span>
          <strong style={{ color: '#1890ff' }}>{value3}</strong>
          <button
            onClick={() => setValue3(0)}
            style={{ marginLeft: 12, padding: '2px 8px', fontSize: 12, cursor: 'pointer' }}
          >
            重置
          </button>
        </div>
        <DemoBlock
          code={`const [value, setValue] = useState(0);

<Rate value={value} onChange={(v) => setValue(v)} />`}
        >
          <Rate value={value3} onChange={(v) => setValue3(v)} />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>禁用状态</h3>
        <DemoBlock
          code={`<Rate disabled defaultValue={3} />
<Rate disabled allowHalf defaultValue={2.5} />`}
        >
          <div style={{ marginBottom: 12 }}>
            <Rate disabled defaultValue={3} />
          </div>
          <Rate disabled allowHalf defaultValue={2.5} />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>不同尺寸</h3>
        <DemoBlock
          code={`<Rate size="small" defaultValue={3} />
<Rate size="default" defaultValue={3} />
<Rate size="large" defaultValue={3} />`}
        >
          <div style={{ marginBottom: 12 }}>
            <Rate size="small" defaultValue={3} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <Rate size="default" defaultValue={3} />
          </div>
          <Rate size="large" defaultValue={3} />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>自定义总数</h3>
        <DemoBlock
          code={`<Rate count={10} defaultValue={6} />`}
        >
          <Rate count={10} defaultValue={6} />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>自定义字符</h3>
        <DemoBlock
          code={`<Rate character="👍" defaultValue={3} />
<Rate character="❤" defaultValue={4} />`}
        >
          <div style={{ marginBottom: 12 }}>
            <Rate character="👍" defaultValue={3} />
          </div>
          <Rate character="❤" defaultValue={4} />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>提示信息</h3>
        <DemoBlock
          code={`<Rate
  defaultValue={3}
  tooltips={['很差', '差', '一般', '好', '很好']}
/>`}
        >
          <Rate
            defaultValue={3}
            tooltips={['很差', '差', '一般', '好', '很好']}
          />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>不可清除</h3>
        <DemoBlock
          code={`<Rate allowClear={false} defaultValue={3} />`}
        >
          <Rate allowClear={false} defaultValue={3} />
        </DemoBlock>
      </div>

      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>API</h3>
        <ApiTable dataSource={apiData} />
      </div>
    </>
  );
};

export default RateDemo;
