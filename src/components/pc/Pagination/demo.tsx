import { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Pagination from './Pagination';

const PaginationDemo = () => {
  const [current1, setCurrent1] = useState(3);
  const [current2, setCurrent2] = useState(1);
  const [current3, setCurrent3] = useState(5);
  const [current4, setCurrent4] = useState(1);

  const apiData = [
    { prop: 'current', desc: '当前页数（受控）', type: 'number', default: '-' },
    { prop: 'defaultCurrent', desc: '默认当前页数', type: 'number', default: '1' },
    { prop: 'pageSize', desc: '每页条数（受控）', type: 'number', default: '-' },
    { prop: 'defaultPageSize', desc: '默认每页条数', type: 'number', default: '10' },
    { prop: 'total', desc: '数据总数', type: 'number', default: '0' },
    { prop: 'showSizeChanger', desc: '是否展示 pageSize 切换器', type: 'boolean', default: 'false' },
    { prop: 'showQuickJumper', desc: '是否可以快速跳转至某页', type: 'boolean', default: 'false' },
    { prop: 'showTotal', desc: '用于显示数据总量和当前数据范围', type: 'function(total, range)', default: '-' },
    { prop: 'pageSizeOptions', desc: '指定每页可以显示多少条', type: 'number[]', default: '[10, 20, 50, 100]' },
    { prop: 'size', desc: '尺寸', type: "'default' | 'small'", default: "'default'" },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' },
    { prop: 'simple', desc: '简洁模式', type: 'boolean', default: 'false' },
    { prop: 'onChange', desc: '页码改变的回调', type: '(page, pageSize) => void', default: '-' },
    { prop: 'onShowSizeChange', desc: 'pageSize 变化的回调', type: '(current, size) => void', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ];

  return (
    <>
      <div className="component-group">
        <h3>基础用法</h3>
        <DemoBlock
          code={`<Pagination total={50} defaultCurrent={1} />`}
        >
          <Pagination total={50} defaultCurrent={1} />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>受控用法</h3>
        <div style={{ marginBottom: 12 }}>
          <span>当前页：</span>
          <strong style={{ color: '#1890ff' }}>{current1}</strong>
        </div>
        <DemoBlock
          code={`const [current, setCurrent] = useState(3);

<Pagination
  current={current}
  total={50}
  onChange={(page) => setCurrent(page)}
/>`}
        >
          <Pagination
            current={current1}
            total={50}
            onChange={(page) => setCurrent1(page)}
          />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>显示数据总量</h3>
        <DemoBlock
          code={`<Pagination
  total={85}
  showTotal={(total) => \`共 \${total} 条\`}
/>

<Pagination
  total={85}
  showTotal={(total, range) => \`\${range[0]}-\${range[1]} 共 \${total} 条\`}
/>`}
        >
          <div style={{ marginBottom: 16 }}>
            <Pagination
              total={85}
              showTotal={(total) => `共 ${total} 条`}
            />
          </div>
          <Pagination
            total={85}
            showTotal={(total, range) => `${range[0]}-${range[1]} 共 ${total} 条`}
          />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>改变每页条数</h3>
        <div style={{ marginBottom: 12 }}>
          <span>当前页：</span>
          <strong style={{ color: '#1890ff' }}>{current2}</strong>
        </div>
        <DemoBlock
          code={`<Pagination
  total={100}
  showSizeChanger
  showQuickJumper
  current={current}
  onChange={(page) => setCurrent(page)}
  onShowSizeChange={(current, size) => console.log(current, size)}
/>`}
        >
          <Pagination
            total={100}
            showSizeChanger
            showQuickJumper
            current={current2}
            onChange={(page) => setCurrent2(page)}
            onShowSizeChange={(c, s) => console.log('pageSize changed:', c, s)}
          />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>大量数据（省略号）</h3>
        <div style={{ marginBottom: 12 }}>
          <span>当前页：</span>
          <strong style={{ color: '#1890ff' }}>{current3}</strong>
        </div>
        <DemoBlock
          code={`<Pagination
  total={500}
  current={5}
  showQuickJumper
  onChange={(page) => setCurrent(page)}
/>`}
        >
          <Pagination
            total={500}
            current={current3}
            showQuickJumper
            onChange={(page) => setCurrent3(page)}
          />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>小尺寸</h3>
        <DemoBlock
          code={`<Pagination total={50} size="small" defaultCurrent={1} />
<Pagination total={100} size="small" showSizeChanger showQuickJumper defaultCurrent={3} />`}
        >
          <div style={{ marginBottom: 16 }}>
            <Pagination total={50} size="small" defaultCurrent={1} />
          </div>
          <Pagination total={100} size="small" showSizeChanger showQuickJumper defaultCurrent={3} />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>简洁模式</h3>
        <div style={{ marginBottom: 12 }}>
          <span>当前页：</span>
          <strong style={{ color: '#1890ff' }}>{current4}</strong>
        </div>
        <DemoBlock
          code={`<Pagination
  simple
  total={50}
  current={current}
  onChange={(page) => setCurrent(page)}
/>`}
        >
          <Pagination
            simple
            total={50}
            current={current4}
            onChange={(page) => setCurrent4(page)}
          />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>禁用状态</h3>
        <DemoBlock
          code={`<Pagination total={50} disabled defaultCurrent={3} />`}
        >
          <Pagination total={50} disabled defaultCurrent={3} />
        </DemoBlock>
      </div>

      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>API</h3>
        <ApiTable dataSource={apiData} />
      </div>
    </>
  );
};

export default PaginationDemo;
