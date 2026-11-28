/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';

import type { DemoConfig } from '../../../pages/Components/Demo/types';
import MButton from '../MButton/MButton';
import MSkeleton from './MSkeleton';

const cardStyle: CSSProperties = {
  padding: 16,
  borderRadius: 12,
  backgroundColor: '#fff'
};

const sectionLabelStyle: CSSProperties = {
  marginBottom: 12,
  fontSize: 12,
  color: '#8c8c8c'
};

const BasicDemo = () => (
  <div className="mdemo-stack">
    <div style={cardStyle}>
      <div style={sectionLabelStyle}>active 微光动画</div>
      <MSkeleton />
    </div>
    <div style={cardStyle}>
      <div style={sectionLabelStyle}>active=false 静态占位</div>
      <MSkeleton active={false} />
    </div>
  </div>
);

const ProfileDemo = () => (
  <div className="mdemo-stack">
    <div style={cardStyle}>
      <MSkeleton
        avatar={{ size: 56 }}
        title={{ width: '45%' }}
        paragraph={{ rows: 2, width: ['100%', '70%'] }}
      />
    </div>
    <div style={cardStyle}>
      <MSkeleton avatar={{ size: 48, shape: 'square' }} />
    </div>
  </div>
);

const ProductContent = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <div
      style={{
        flex: '0 0 auto',
        width: 56,
        height: 56,
        borderRadius: 14,
        background: 'linear-gradient(135deg, #60a5fa, #a78bfa)'
      }}
    />
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>无线降噪耳机 Pro</div>
      <div style={{ marginTop: 6, fontSize: 12, color: '#6b7280' }}>
        主动降噪 · 40 小时续航 · 蓝牙 5.3
      </div>
      <div style={{ marginTop: 8, fontSize: 16, fontWeight: 600, color: '#ef4444' }}>
        ¥ 1,299.00
      </div>
    </div>
  </div>
);

const WrapperDemo = () => {
  const [loading, setLoading] = useState(true);

  // 模拟接口请求：1.8 秒后渲染真实内容
  useEffect(() => {
    if (!loading) return;
    const timer = window.setTimeout(() => setLoading(false), 1800);
    return () => window.clearTimeout(timer);
  }, [loading]);

  return (
    <div className="mdemo-stack">
      <div style={cardStyle}>
        <MSkeleton loading={loading} avatar={{ size: 56 }}>
          <ProductContent />
        </MSkeleton>
      </div>
      <MButton type="primary" disabled={loading} onClick={() => setLoading(true)}>
        {loading ? '加载中...' : '重新加载'}
      </MButton>
      <p className="mdemo-tip">
        loading 为 true 显示骨架屏，数据就绪后渲染 children；不传 children 时仅显示占位结构。
      </p>
    </div>
  );
};

const listItems = [0, 1, 2];

const ListDemo = () => (
  <div className="mdemo-stack">
    <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: 22 }}>
      {listItems.map(item => (
        <MSkeleton
          key={item}
          avatar={{ size: 44 }}
          title={{ width: '32%' }}
          paragraph={{ rows: 2, width: ['88%', '56%'] }}
        />
      ))}
    </div>
    <p className="mdemo-tip">
      列表加载时复用同一套占位结构即可；只保留头像时传
      {' title={false} paragraph={false}'}。
    </p>
  </div>
);

const mSkeletonDemo: DemoConfig = {
  intro:
    '移动端骨架屏在数据加载期间占位，减少页面跳动。支持头像、标题、段落三类占位与微光动画，也可通过 loading 包裹真实内容，加载完成后自动切换。',
  demos: [
    {
      title: '基础用法',
      desc: '默认显示标题与三段段落占位，active 控制是否播放微光动画。',
      code: `<MSkeleton />

// 关闭动画
<MSkeleton active={false} />`,
      render: <BasicDemo />
    },
    {
      title: '头像与段落配置',
      desc: 'avatar 支持尺寸与形状，title / paragraph 分别配置宽度与行数。',
      code: `<MSkeleton
  avatar={{ size: 56 }}
  title={{ width: '45%' }}
  paragraph={{ rows: 2, width: ['100%', '70%'] }}
/>

// 方形头像
<MSkeleton avatar={{ size: 48, shape: 'square' }} />`,
      render: <ProfileDemo />
    },
    {
      title: '包裹内容',
      desc: 'loading 为 true 时显示骨架屏，加载结束后渲染 children，适合详情、商品等场景。',
      code: `const [loading, setLoading] = useState(true);

<MSkeleton loading={loading} avatar={{ size: 56 }}>
  <div style={{ display: 'flex', gap: 12 }}>
    <div style={{ width: 56, height: 56, borderRadius: 14 }} />
    <div>
      <div>无线降噪耳机 Pro</div>
      <div>主动降噪 · 40 小时续航 · 蓝牙 5.3</div>
      <div>¥ 1,299.00</div>
    </div>
  </div>
</MSkeleton>`,
      render: <WrapperDemo />
    },
    {
      title: '列表占位',
      desc: '重复渲染同一套占位结构模拟列表加载，头像配两行文字最贴近消息、订单列表。',
      code: `{list.map(item => (
  <MSkeleton
    key={item.id}
    avatar={{ size: 44 }}
    title={{ width: '32%' }}
    paragraph={{ rows: 2, width: ['88%', '56%'] }}
  />
))}`,
      render: <ListDemo />
    }
  ],
  api: [
    { prop: 'active', desc: '是否显示微光动画', type: 'boolean', default: 'true' },
    { prop: 'avatar', desc: '是否显示头像占位，可配置 size 与 shape', type: 'boolean | MSkeletonAvatarConfig', default: 'false' },
    { prop: 'title', desc: '是否显示标题占位，可配置 width', type: 'boolean | MSkeletonTitleConfig', default: 'true' },
    { prop: 'paragraph', desc: '是否显示段落占位，可配置 rows 与 width（数组按行指定）', type: 'boolean | MSkeletonParagraphConfig', default: 'true' },
    { prop: 'loading', desc: '是否处于加载中；为 false 时渲染 children', type: 'boolean', default: 'true' },
    { prop: 'children', desc: '加载完成后展示的真实内容', type: 'ReactNode', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' },
    { prop: 'avatar.size', desc: '头像占位尺寸', type: 'number', default: '44' },
    { prop: 'avatar.shape', desc: '头像占位形状', type: "'circle' | 'square'", default: "'circle'" },
    { prop: 'title.width', desc: '标题占位宽度', type: 'number | string', default: "'40%'" },
    { prop: 'paragraph.rows', desc: '段落行数', type: 'number', default: '3' },
    { prop: 'paragraph.width', desc: '段落每行宽度，数组按行取值，最后一行为 62%', type: 'number | string | Array', default: '-' }
  ]
};

export default mSkeletonDemo;
