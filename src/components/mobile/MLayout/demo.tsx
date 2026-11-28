/* eslint-disable react-refresh/only-export-components */
import type { CSSProperties } from 'react';

import type { DemoConfig } from '../../../pages/Components/Demo/types';
import MButton from '../MButton/MButton';
import MLayout from './MLayout';

const frameStyle: CSSProperties = {
  boxSizing: 'border-box',
  height: 340,
  overflow: 'hidden',
  background: '#fff',
  border: '1px solid #e5e7eb',
  borderRadius: 12
};

const titleStyle: CSSProperties = {
  fontSize: 15,
  fontWeight: 600,
  color: '#111827'
};

const rowStyle: CSSProperties = {
  margin: '0 0 12px',
  padding: '12px 14px',
  borderRadius: 10,
  backgroundColor: '#f6f8fc',
  color: '#4b5563',
  fontSize: 13,
  lineHeight: 1.5
};

const rows = [
  '订单编号：ZD20261128001 · 待发货',
  '订单编号：ZD20261127018 · 运输中',
  '订单编号：ZD20261126042 · 已签收',
  '订单编号：ZD20261125009 · 已完成',
  '订单编号：ZD20261124017 · 已完成',
  '订单编号：ZD20261123031 · 已取消',
  '订单编号：ZD20261122006 · 已完成',
  '订单编号：ZD20261121014 · 已完成'
];

const BasicDemo = () => (
  <div className="mdemo-stack">
    <div style={frameStyle}>
      <MLayout>
        <MLayout.Header>
          <span style={titleStyle}>订单中心</span>
          <span style={{ color: '#1890ff', fontSize: 13 }}>筛选</span>
        </MLayout.Header>
        <MLayout.Content>
          {rows.map(row => (
            <p key={row} style={rowStyle}>
              {row}
            </p>
          ))}
        </MLayout.Content>
        <MLayout.Footer>共 8 条记录</MLayout.Footer>
      </MLayout>
    </div>
    <p className="mdemo-tip">
      头部与底部固定在两端，只有 Content 区域滚动；文档预览用固定高度容器模拟页面。
    </p>
  </div>
);

const ActionDemo = () => (
  <div className="mdemo-stack">
    <div style={frameStyle}>
      <MLayout>
        <MLayout.Header>
          <span style={titleStyle}>确认订单</span>
        </MLayout.Header>
        <MLayout.Content>
          <p style={rowStyle}>商品：无线降噪耳机 Pro × 1</p>
          <p style={rowStyle}>收货地址：北京市朝阳区望京街道 6 号院</p>
          <p style={rowStyle}>支付方式：微信支付</p>
        </MLayout.Content>
        <MLayout.Footer>
          <div style={{ display: 'flex', gap: 10, width: '100%' }}>
            <MButton style={{ flex: 1 }}>返回修改</MButton>
            <MButton type="primary" style={{ flex: 1 }}>
              提交订单
            </MButton>
          </div>
        </MLayout.Footer>
      </MLayout>
    </div>
    <p className="mdemo-tip">
      Footer 可放底部操作栏，内部用 flex 均分按钮；安全区开启时会自动避让 Home Indicator。
    </p>
  </div>
);

const SafeAreaDemo = () => (
  <div className="mdemo-stack">
    <div style={frameStyle}>
      <MLayout safeArea>
        <MLayout.Header>
          <span style={titleStyle}>安全区示例</span>
        </MLayout.Header>
        <MLayout.Content>
          <p style={rowStyle}>
            真机上有刘海 / 灵动岛时，Header 顶部会自动增加 env(safe-area-inset-top) 留白；
            Footer 底部会增加 env(safe-area-inset-bottom) 留白。
          </p>
          <p style={rowStyle}>桌面浏览器中这两个值通常为 0，因此预览看不到额外间距。</p>
        </MLayout.Content>
        <MLayout.Footer>底部操作区</MLayout.Footer>
      </MLayout>
    </div>
    <p className="mdemo-tip">
      页面级用法传 fullscreen，布局高度取 100dvh；不需要安全区时传 safeArea={'{false}'}。
    </p>
  </div>
);

const mLayoutDemo: DemoConfig = {
  intro:
    '移动端布局提供「固定头部 + 独立滚动内容 + 底部操作区」的页面骨架，去掉了 PC 端不适用的侧边栏。支持整页高度、安全区避让，头部与底部固定在两端，内容区域独立滚动。',
  demos: [
    {
      title: '基础布局',
      desc: 'Header / Content / Footer 三个 slot，内容超出时只在 Content 内滚动。',
      code: `<MLayout>
  <MLayout.Header>订单中心</MLayout.Header>
  <MLayout.Content>{rows.map(row => <p key={row}>{row}</p>)}</MLayout.Content>
  <MLayout.Footer>共 8 条记录</MLayout.Footer>
</MLayout>`,
      render: <BasicDemo />
    },
    {
      title: '底部操作栏',
      desc: '把主操作按钮放进 Footer，内容多时操作栏始终可见。',
      code: `<MLayout>
  <MLayout.Header>确认订单</MLayout.Header>
  <MLayout.Content>{detail}</MLayout.Content>
  <MLayout.Footer>
    <div style={{ display: 'flex', gap: 10, width: '100%' }}>
      <MButton style={{ flex: 1 }}>返回修改</MButton>
      <MButton type="primary" style={{ flex: 1 }}>提交订单</MButton>
    </div>
  </MLayout.Footer>
</MLayout>`,
      render: <ActionDemo />
    },
    {
      title: '安全区与整页',
      desc: 'safeArea 默认开启，自动避让刘海与 Home Indicator；fullscreen 让布局占满视口。',
      code: `<MLayout fullscreen safeArea>
  <MLayout.Header>标题</MLayout.Header>
  <MLayout.Content>内容</MLayout.Content>
  <MLayout.Footer>底部操作区</MLayout.Footer>
</MLayout>`,
      render: <SafeAreaDemo />
    }
  ],
  api: [
    { prop: 'fullscreen', desc: '占满视口高度（100dvh），默认由父容器决定高度', type: 'boolean', default: 'false' },
    { prop: 'safeArea', desc: 'Header / Footer 是否避让安全区', type: 'boolean', default: 'true' },
    { prop: 'children', desc: 'Header / Content / Footer 等子节点', type: 'ReactNode', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' },
    { prop: 'MLayout.Header', desc: '固定头部，带安全区顶部留白', type: 'ReactNode', default: '-' },
    { prop: 'MLayout.Content', desc: '独立滚动的内容区', type: 'ReactNode', default: '-' },
    { prop: 'MLayout.Footer', desc: '底部操作区，带安全区底部留白', type: 'ReactNode', default: '-' }
  ]
};

export default mLayoutDemo;
