import { useState } from 'react';
import type { DemoConfig } from '../../../pages/Components/Demo/types';
import Pagination from './Pagination';

const ControlledPaginationDemo = () => {
  const [current, setCurrent] = useState(3);

  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <span>当前页：</span>
        <strong style={{ color: '#1890ff' }}>{current}</strong>
      </div>
      <Pagination
        current={current}
        total={50}
        onChange={(page) => setCurrent(page)}
      />
    </>
  );
};

const SizeChangerPaginationDemo = () => {
  const [current, setCurrent] = useState(1);

  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <span>当前页：</span>
        <strong style={{ color: '#1890ff' }}>{current}</strong>
      </div>
      <Pagination
        total={100}
        showSizeChanger
        showQuickJumper
        current={current}
        onChange={(page) => setCurrent(page)}
        onShowSizeChange={(c, s) => console.log('pageSize changed:', c, s)}
      />
    </>
  );
};

const LargeDataPaginationDemo = () => {
  const [current, setCurrent] = useState(5);

  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <span>当前页：</span>
        <strong style={{ color: '#1890ff' }}>{current}</strong>
      </div>
      <Pagination
        total={500}
        current={current}
        showQuickJumper
        onChange={(page) => setCurrent(page)}
      />
    </>
  );
};

const SimplePaginationDemo = () => {
  const [current, setCurrent] = useState(1);

  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <span>当前页：</span>
        <strong style={{ color: '#1890ff' }}>{current}</strong>
      </div>
      <Pagination
        simple
        total={50}
        current={current}
        onChange={(page) => setCurrent(page)}
      />
    </>
  );
};

const paginationDemo: DemoConfig = {
  demos: [
    {
      title: '基础用法',
      code: `<Pagination total={50} defaultCurrent={1} />`,
      render: <Pagination total={50} defaultCurrent={1} />,
    },
    {
      title: '受控用法',
      code: `const [current, setCurrent] = useState(3);\n\n<Pagination\n  current={current}\n  total={50}\n  onChange={(page) => setCurrent(page)}\n/>`,
      render: <ControlledPaginationDemo />,
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
      render: <SizeChangerPaginationDemo />,
    },
    {
      title: '大量数据（省略号）',
      code: `<Pagination\n  total={500}\n  current={5}\n  showQuickJumper\n  onChange={(page) => setCurrent(page)}\n/>`,
      render: <LargeDataPaginationDemo />,
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
      render: <SimplePaginationDemo />,
    },
    {
      title: '禁用状态',
      code: `<Pagination total={50} disabled defaultCurrent={3} />`,
      render: <Pagination total={50} disabled defaultCurrent={3} />,
    },
  ],
  api: [
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
  ],
};

export default paginationDemo;
