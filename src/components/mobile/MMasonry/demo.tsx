/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import type { CSSProperties } from 'react';

import type { DemoConfig } from '../../../pages/Components/Demo/types';
import MButton from '../MButton';
import MMasonry from './MMasonry';

const cover = (from: string, to: string, height: number) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="${height}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="360" height="${height}" fill="url(#g)"/><circle cx="292" cy="62" r="76" fill="#fff" fill-opacity="0.16"/><circle cx="58" cy="${height - 46}" r="54" fill="#fff" fill-opacity="0.12"/></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

interface PhotoItem {
  id: string;
  title: string;
  desc: string;
  tag: string;
  cover: string;
}

const photoSources = [
  { id: 'p1', title: '山野晨雾', desc: '海拔 2100 米的高山草甸，日出前云雾漫过山脊。', tag: '旅行', from: '#34d399', to: '#047857', height: 300 },
  { id: 'p2', title: '城市夜色', desc: '霓虹与车流。', tag: '城市', from: '#818cf8', to: '#3730a3', height: 200 },
  { id: 'p3', title: '海边日落', desc: '退潮后的沙滩像一面镜子，把晚霞铺满整片海岸。', tag: '风景', from: '#fb923c', to: '#b91c1c', height: 260 },
  { id: 'p4', title: '清晨咖啡', desc: '一杯手冲的时间。', tag: '生活', from: '#a16207', to: '#78350f', height: 180 },
  { id: 'p5', title: '森林小径', desc: '被苔藓覆盖的石阶一直延伸到林间空地。', tag: '徒步', from: '#4ade80', to: '#166534', height: 280 },
  { id: 'p6', title: '雪山倒影', desc: '湖面无风，山与云一起沉进水里。', tag: '风光', from: '#38bdf8', to: '#1d4ed8', height: 240 },
  { id: 'p7', title: '旧书店', desc: '纸页与木头的味道。', tag: '人文', from: '#f472b6', to: '#9d174d', height: 200 },
  { id: 'p8', title: '露营星空', desc: '远离城市光害的银河。', tag: '户外', from: '#64748b', to: '#0f172a', height: 320 },
  { id: 'p9', title: '巷口花店', desc: '老板把刚到的花摆在门口，颜色正好。', tag: '日常', from: '#fbbf24', to: '#b45309', height: 220 }
];

const photos: PhotoItem[] = photoSources.map(({ from, to, height, ...rest }) => ({
  ...rest,
  cover: cover(from, to, height)
}));

const cardStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#fff',
  boxShadow: '0 1px 4px rgba(15, 23, 42, 0.08)'
};

const renderPhoto = (item: PhotoItem) => (
  <div style={cardStyle}>
    <img
      src={item.cover}
      alt={item.title}
      style={{ display: 'block', width: '100%' }}
    />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '8px 10px 10px' }}>
      <strong style={{ color: '#111827', fontSize: 13, fontWeight: 600 }}>{item.title}</strong>
      <span style={{ color: '#8c8c8c', fontSize: 11, lineHeight: 1.5 }}>{item.desc}</span>
      <em
        style={{
          width: 'fit-content',
          marginTop: 2,
          padding: '1px 7px',
          borderRadius: 999,
          background: '#e6f7ff',
          color: '#1677ff',
          fontSize: 10,
          fontStyle: 'normal'
        }}
      >
        {item.tag}
      </em>
    </div>
  </div>
);

const BasicDemo = () => (
  <div className="mdemo-stack">
    <MMasonry data={photos} renderItem={renderPhoto} />
    <p className="mdemo-tip">
      默认两列，卡片高度由内容决定，下一张自动填补最短的一列。
    </p>
  </div>
);

const ColumnsDemo = () => (
  <div className="mdemo-stack">
    <MMasonry data={photos} renderItem={renderPhoto} columns={3} gap={6} />
    <p className="mdemo-tip">columns 控制列数，gap 控制列间距与行间距（px）。</p>
  </div>
);

const ChildrenDemo = () => (
  <div className="mdemo-stack">
    <MMasonry columns={2} gap={10}>
      {['今日推荐', '附近好去处', '限时活动', '为你精选'].map((title, index) => (
        <div
          key={title}
          style={{
            padding: 12,
            borderRadius: 10,
            backgroundColor: '#fff',
            boxShadow: '0 1px 4px rgba(15, 23, 42, 0.08)'
          }}
        >
          <strong style={{ display: 'block', color: '#111827', fontSize: 13 }}>{title}</strong>
          <p style={{ margin: '6px 0 0', color: '#8c8c8c', fontSize: 11, lineHeight: 1.6 }}>
            {index % 2 === 0
              ? '直接以 children 传入卡片，适合高度由文案决定的场景。'
              : '内容较短的卡片会与下一张错落排列。'}
          </p>
          <p style={{ margin: '6px 0 0', color: '#8c8c8c', fontSize: 11, lineHeight: 1.6 }}>
            {index % 2 === 0 ? '组件通过测量高度计算位置，图片加载完成后也会重新排布。' : ''}
          </p>
        </div>
      ))}
    </MMasonry>
    <p className="mdemo-tip">children 方式无需 data 与 renderItem，每个子元素需要唯一 key。</p>
  </div>
);

const DynamicDemo = () => {
  const [count, setCount] = useState(4);
  const visible = photos.slice(0, count);
  const finished = visible.length >= photos.length;

  return (
    <div className="mdemo-stack">
      <MMasonry data={visible} renderItem={renderPhoto} />
      <MButton
        type="primary"
        disabled={finished}
        onClick={() => setCount(current => Math.min(current + 3, photos.length))}
      >
        {finished ? '已全部加载' : `加载更多（${visible.length}/${photos.length}）`}
      </MButton>
      <MButton onClick={() => setCount(4)}>重置</MButton>
      <p className="mdemo-tip">数据变化后重新计算列高，已有卡片带定位过渡。</p>
    </div>
  );
};

const mMMasonryDemo: DemoConfig = {
  intro:
    '移动端瀑布流用于图文列表、发现页与商品流。按列高动态计算位置，卡片高度由内容决定；容器宽度或卡片高度（如图片加载完成）变化时自动重新排布，支持 data + renderItem 与 children 两种写法。',
  demos: [
    {
      title: '基础用法',
      desc: '默认两列、间距 10px，传入 data 与 renderItem 即可。',
      code: `<MMasonry data={photos} renderItem={renderPhoto} />`,
      render: <BasicDemo />
    },
    {
      title: '多列布局',
      desc: 'columns 设置列数，gap 同时作为列间距与行间距。',
      code: `<MMasonry data={photos} renderItem={renderPhoto} columns={3} gap={6} />`,
      render: <ColumnsDemo />
    },
    {
      title: '子元素方式',
      desc: '不使用数据源时，可直接把卡片作为 children 传入。',
      code: `<MMasonry columns={2} gap={10}>
  {titles.map(title => (
    <div key={title}>...</div>
  ))}
</MMasonry>`,
      render: <ChildrenDemo />
    },
    {
      title: '动态数据',
      desc: '追加或重置数据后自动重排，已渲染卡片平滑过渡到新位置。',
      code: `const [count, setCount] = useState(4);

<MMasonry data={photos.slice(0, count)} renderItem={renderPhoto} />
<MButton onClick={() => setCount(c => c + 3)}>加载更多</MButton>`,
      render: <DynamicDemo />
    }
  ],
  api: [
    { prop: 'columns', desc: '列数', type: 'number', default: '2' },
    { prop: 'gap', desc: '卡片间距（px）', type: 'number', default: '10' },
    { prop: 'data', desc: '数据源，配合 renderItem 使用', type: 'T[]', default: '-' },
    { prop: 'renderItem', desc: '自定义渲染每一项', type: '(item, index) => ReactNode', default: '-' },
    { prop: 'keyField', desc: '数据项唯一标识字段', type: 'string', default: "'id'" },
    { prop: 'children', desc: '子元素方式，与 data 二选一', type: 'ReactNode', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ]
};

export default mMMasonryDemo;
