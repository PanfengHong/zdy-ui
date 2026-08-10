import { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import List from './List';

const ListDemo = () => {
  const [loading, setLoading] = useState(false);

  const defaultData = [
    {
      key: '1',
      title: 'Ant Design Title 1',
      description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      avatar: <div className="zdy-list-avatar" style={{ width: 40, height: 40, borderRadius: '50%', background: '#1890ff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>A</div>,
      content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their own product designs easier and more efficiently.',
    },
    {
      key: '2',
      title: 'Ant Design Title 2',
      description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      avatar: <div className="zdy-list-avatar" style={{ width: 40, height: 40, borderRadius: '50%', background: '#52c41a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>B</div>,
      content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their own product designs easier and more efficiently.',
    },
    {
      key: '3',
      title: 'Ant Design Title 3',
      description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      avatar: <div className="zdy-list-avatar" style={{ width: 40, height: 40, borderRadius: '50%', background: '#faad14', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>C</div>,
      content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their own product designs easier and more efficiently.',
    },
    {
      key: '4',
      title: 'Ant Design Title 4',
      description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      avatar: <div className="zdy-list-avatar" style={{ width: 40, height: 40, borderRadius: '50%', background: '#f5222d', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>D</div>,
      content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their own product designs easier and more efficiently.',
    },
  ];

  const gridData = [
    {
      key: 'g1',
      title: '卡片标题 1',
      description: '这是一段描述信息，展示卡片内容的简短概要。',
      content: '卡片正文内容',
      extra: '2024-01-01',
      actions: ['编辑', '删除'],
    },
    {
      key: 'g2',
      title: '卡片标题 2',
      description: '这是一段描述信息，展示卡片内容的简短概要。',
      content: '卡片正文内容',
      extra: '2024-01-02',
      actions: ['编辑', '删除'],
    },
    {
      key: 'g3',
      title: '卡片标题 3',
      description: '这是一段描述信息，展示卡片内容的简短概要。',
      content: '卡片正文内容',
      extra: '2024-01-03',
      actions: ['编辑', '删除'],
    },
    {
      key: 'g4',
      title: '卡片标题 4',
      description: '这是一段描述信息，展示卡片内容的简短概要。',
      content: '卡片正文内容',
      extra: '2024-01-04',
      actions: ['编辑', '删除'],
    },
    {
      key: 'g5',
      title: '卡片标题 5',
      description: '这是一段描述信息，展示卡片内容的简短概要。',
      content: '卡片正文内容',
      extra: '2024-01-05',
      actions: ['编辑', '删除'],
    },
    {
      key: 'g6',
      title: '卡片标题 6',
      description: '这是一段描述信息，展示卡片内容的简短概要。',
      content: '卡片正文内容',
      extra: '2024-01-06',
      actions: ['编辑', '删除'],
    },
  ];

  const paginationData = Array.from({ length: 23 }).map((_, i) => ({
    key: `p${i}`,
    title: `列表项标题 ${i + 1}`,
    description: `这是第 ${i + 1} 项的描述信息`,
    avatar: <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1890ff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 500 }}>{i + 1}</div>,
    content: `这是第 ${i + 1} 项的详细内容，展示列表的分页功能。`,
  }));

  const apiData = [
    { prop: 'header', desc: '列表头部', type: 'ReactNode', default: '-' },
    { prop: 'footer', desc: '列表底部', type: 'ReactNode', default: '-' },
    { prop: 'loading', desc: '是否加载中', type: 'boolean', default: 'false' },
    { prop: 'itemLayout', desc: '列表项布局', type: "'horizontal' | 'vertical'", default: "'horizontal'" },
    { prop: 'grid', desc: '栅格配置', type: '{ column, gutter, ... }', default: '-' },
    { prop: 'dataSource', desc: '数据源', type: 'ListItemProps[]', default: '-' },
    { prop: 'renderItem', desc: '自定义渲染', type: '(item, index) => ReactNode', default: '-' },
    { prop: 'pagination', desc: '分页配置', type: 'false | PaginationConfig', default: 'false' },
    { prop: 'locale', desc: '国际化配置', type: '{ emptyText }', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' },
  ];

  const demos = [
    {
      title: '基础用法',
      code: `<List\n  header={<div>头部内容</div>}\n  dataSource={data}\n  renderItem={item => <List.Item ... />}\n/>`,
      render: (
        <div style={{ maxWidth: 640 }}>
          <List
            header={<div>用户列表</div>}
            dataSource={defaultData}
            renderItem={(item) => (
              <div className="zdy-list-item zdy-list-item--horizontal" style={{ display: 'flex', padding: '16px 24px', borderBottom: '1px solid #f0f0f0' }}>
                <div style={{ marginRight: 16, flexShrink: 0 }}>{item.avatar}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 4 }}>
                    <span style={{ fontSize: 16, fontWeight: 500, color: 'rgba(0,0,0,0.85)', marginRight: 8 }}>{item.title}</span>
                    <span style={{ fontSize: 14, color: 'rgba(0,0,0,0.45)' }}>{item.description}</span>
                  </div>
                  <div style={{ fontSize: 14, color: 'rgba(0,0,0,0.65)', marginTop: 8, lineHeight: 1.6 }}>{item.content}</div>
                </div>
                <div style={{ flexShrink: 0, marginLeft: 16, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <span style={{ fontSize: 14, color: 'rgba(0,0,0,0.45)' }}>2024-01-01</span>
                </div>
              </div>
            )}
          />
        </div>
      ),
    },
    {
      title: '使用 dataSource 和 renderItem',
      code: `<List\n  dataSource={data}\n  renderItem={item => (\n    <List.Item\n      title={item.title}\n      description={item.description}\n      avatar={item.avatar}\n      content={item.content}\n    />\n  )}\n/>`,
      render: (
        <div style={{ maxWidth: 640 }}>
          <List
            dataSource={defaultData}
          />
        </div>
      ),
    },
    {
      title: '垂直布局',
      code: `<List\n  itemLayout="vertical"\n  dataSource={data}\n/>`,
      render: (
        <div style={{ maxWidth: 640 }}>
          <List
            itemLayout="vertical"
            dataSource={defaultData}
          />
        </div>
      ),
    },
    {
      title: '栅格列表',
      code: `<List\n  grid={{ column: 3, gutter: 16 }}\n  dataSource={data}\n/>`,
      render: (
        <div style={{ maxWidth: 800 }}>
          <List
            grid={{ column: 3, gutter: 16 }}
            dataSource={gridData}
          />
        </div>
      ),
    },
    {
      title: '带分页',
      code: `<List\n  pagination={{ pageSize: 5 }}\n  dataSource={data}\n/>`,
      render: (
        <div style={{ maxWidth: 640 }}>
          <List
            pagination={{ pageSize: 5 }}
            dataSource={paginationData}
          />
        </div>
      ),
    },
    {
      title: '加载中',
      code: `<List loading={true} dataSource={[]} />`,
      render: (
        <div style={{ maxWidth: 640 }}>
          <List loading={true} dataSource={[]} />
        </div>
      ),
    },
    {
      title: '空状态',
      code: `<List dataSource={[]} />`,
      render: (
        <div style={{ maxWidth: 640 }}>
          <List dataSource={[]} />
        </div>
      ),
    },
    {
      title: '带头部和底部',
      code: `<List\n  header={<div>通知列表</div>}\n  footer={<a>查看更多</a>}\n  dataSource={data}\n/>`,
      render: (
        <div style={{ maxWidth: 640 }}>
          <List
            header={<div>通知列表</div>}
            footer={<a style={{ color: '#1890ff', cursor: 'pointer' }}>查看更多</a>}
            dataSource={defaultData.slice(0, 2)}
          />
        </div>
      ),
    },
    {
      title: '回调函数',
      code: `<List\n  pagination={{\n    pageSize: 3,\n    onChange: (page) => console.log('当前页', page)\n  }}\n  dataSource={data}\n/>`,
      render: (
        <>
          <div style={{ maxWidth: 640 }}>
            <List
              pagination={{
                pageSize: 3,
                onChange: (page) => console.log('当前页', page),
              }}
              dataSource={paginationData.slice(0, 7)}
            />
          </div>
          <p style={{ color: '#999', marginTop: 8 }}>打开浏览器控制台查看翻页回调日志</p>
        </>
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

export default ListDemo;
