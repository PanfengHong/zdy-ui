import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Empty from './Empty';
import Button from '../Button/Button';

// 自定义 SVG 插画示例
const CustomSvg = (
  <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="52" fill="#FFF7E6" stroke="#FFD591" strokeWidth="2" />
    <path d="M60 36 L60 66" stroke="#FA8C16" strokeWidth="4" strokeLinecap="round" />
    <circle cx="60" cy="82" r="3" fill="#FA8C16" />
  </svg>
);

// 自定义 emoji 图片
const EmojiImg = <div style={{ fontSize: 64, lineHeight: 1 }}>📭</div>;

const EmptyDemo = () => {
  const apiData = [
    { prop: 'image', desc: '图片地址或自定义图片节点，false 时不渲染', type: 'string | ReactNode | false', default: '默认插画' },
    { prop: 'description', desc: '描述文字，null 时不渲染', type: 'ReactNode', default: "'暂无数据'" },
    { prop: 'imageStyle', desc: '图片样式', type: 'CSSProperties', default: '-' },
    { prop: 'children', desc: '底部内容（如操作按钮）', type: 'ReactNode', default: '-' }
  ];

  const demos = [
    {
      title: '基础用法',
      code: `<Empty />`,
      render: <Empty />,
    },
    {
      title: '自定义描述',
      code: `<Empty description="暂无搜索结果" />`,
      render: <Empty description="暂无搜索结果，请尝试其他关键词" />,
    },
    {
      title: '无描述',
      code: `<Empty description={null} />`,
      render: <Empty description={null} />,
    },
    {
      title: '自定义图片（SVG 节点）',
      code: `<Empty image={<CustomSvg />} description="出错了" />`,
      render: <Empty image={CustomSvg} description="请求失败，请稍后重试" />,
    },
    {
      title: '自定义图片（emoji）',
      code: `<Empty image={<div>📭</div>} />`,
      render: <Empty image={EmojiImg} description="没有找到任何内容" />,
    },
    {
      title: '自定义图片（图片地址）',
      code: `<Empty image="https://via.placeholder.com/120" />`,
      render: (
        <Empty
          image="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect x='20' y='20' width='80' height='80' rx='8' fill='%23F0F0F0' stroke='%23D9D9D9' stroke-width='2'/%3E%3Cpath d='M40 60 L60 80 L80 50' stroke='%231890FF' stroke-width='4' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"
          description="内联 SVG 数据图"
        />
      ),
    },
    {
      title: '无图片',
      code: `<Empty image={false} description="纯文字空状态" />`,
      render: <Empty image={false} description="纯文字空状态" />,
    },
    {
      title: '带操作按钮',
      code: `<Empty>\n  <Button type="primary">立即创建</Button>\n</Empty>`,
      render: (
        <Empty description="还没有任何项目">
          <Button type="primary">立即创建</Button>
          <Button>查看文档</Button>
        </Empty>
      ),
    },
    {
      title: '自定义图片样式',
      code: `<Empty imageStyle={{ width: 80, height: 80 }} />`,
      render: <Empty imageStyle={{ width: 100, height: 88, opacity: 0.6 }} description="缩小并半透明的默认插画" />,
    },
    {
      title: '在容器中',
      code: `<div style={{ height: 200, border: '1px solid #f0f0f0' }}>\n  <Empty />\n</div>`,
      render: (
        <div
          style={{
            height: 220,
            border: '1px solid #f0f0f0',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Empty description="容器内的空状态" />
        </div>
      ),
    },
    {
      title: '嵌套使用（列表空状态）',
      code: `<ul><li>...</li></ul>\n<Empty />`,
      render: (
        <div style={{ border: '1px solid #f0f0f0', borderRadius: 4 }}>
          <div style={{ padding: '8px 16px', borderBottom: '1px solid #f0f0f0', fontWeight: 500 }}>
            项目列表
          </div>
          <Empty description="暂无项目" />
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

export default EmptyDemo;
