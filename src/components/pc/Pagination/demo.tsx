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

  const demos = [
    {
      title: '基础用法',
      code: `<Pagination total={50} defaultCurrent={1} />`,
      render: <Pagination total={50} defaultCurrent={1} />,
    },
    {
      title: '受控用法',
      code: `const [current, setCurrent] = useState(3);\n\n<Pagination\n  current={current}\n  total={50}\n  onChange={(page) => setCurrent(page)}\n/>`,
      render: (
        <>
          <div style={{ marginBottom: 12 }}>
            <span>当前页：</span>
            <strong style={{ color: '#1890ff' }}>{current1}</strong>
          </div>
          <Pagination
            current={current1}
            total={50}
            onChange={(page) => setCurrent1(page)}
          />
        </>
      ),
    },
    {
      title: '显示数据总量',
      code: `<Pagination\n  total={85}\n  showTotal={(total) => \`共 \${total} 条\`}\n/>\n\n<Pagination\n  total={85}\n  showTotal={(total, range) => \`\${range[0]}-\${range[1]} 共 \${total} 条\`}\n/>`,
      render: (
        <>
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
        </>
      ),
    },
    {
      title: '改变每页条数',
      code: `<Pagination\n  total={100}\n  showSizeChanger\n  showQuickJumper\n  current={current}\n  onChange={(page) => setCurrent(page)}\n  onShowSizeChange={(current, size) => console.log(current, size)}\n/>`,
      render: (
        <>
          <div style={{ marginBottom: 12 }}>
            <span>当前页：</span>
            <strong style={{ color: '#1890ff' }}>{current2}</strong>
          </div>
          <Pagination
            total={100}
            showSizeChanger
            showQuickJumper
            current={current2}
            onChange={(page) => setCurrent2(page)}
            onShowSizeChange={(c, s) => console.log('pageSize changed:', c, s)}
          />
        </>
      ),
    },
    {
      title: '大量数据（省略号）',
      code: `<Pagination\n  total={500}\n  current={5}\n  showQuickJumper\n  onChange={(page) => setCurrent(page)}\n/>`,
      render: (
        <>
          <div style={{ marginBottom: 12 }}>
            <span>当前页：</span>
            <strong style={{ color: '#1890ff' }}>{current3}</strong>
          </div>
          <Pagination
            total={500}
            current={current3}
            showQuickJumper
            onChange={(page) => setCurrent3(page)}
          />
        </>
      ),
    },
    {
      title: '小尺寸',
      code: `<Pagination total={50} size="small" defaultCurrent={1} />\n<Pagination total={100} size="small" showSizeChanger showQuickJumper defaultCurrent={3} />`,
      render: (
        <>
          <div style={{ marginBottom: 16 }}>
            <Pagination total={50} size="small" defaultCurrent={1} />
          </div>
          <Pagination total={100} size="small" showSizeChanger showQuickJumper defaultCurrent={3} />
        </>
      ),
    },
    {
      title: '简洁模式',
      code: `<Pagination\n  simple\n  total={50}\n  current={current}\n  onChange={(page) => setCurrent(page)}\n/>`,
      render: (
        <>
          <div style={{ marginBottom: 12 }}>
            <span>当前页：</span>
            <strong style={{ color: '#1890ff' }}>{current4}</strong>
          </div>
          <Pagination
            simple
            total={50}
            current={current4}
            onChange={(page) => setCurrent4(page)}
          />
        </>
      ),
    },
    {
      title: '禁用状态',
      code: `<Pagination total={50} disabled defaultCurrent={3} />`,
      render: <Pagination total={50} disabled defaultCurrent={3} />,
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

export default PaginationDemo;
