/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';

import type { DemoConfig } from '../../../pages/Components/Demo/types';
import MButton from '../MButton/MButton';
import MLoading from './MLoading';
import type { MLoadingSize } from './types';

const cardStyle: CSSProperties = {
  padding: 18,
  borderRadius: 12,
  backgroundColor: '#fff'
};

const labelStyle: CSSProperties = {
  fontSize: 12,
  color: '#8c8c8c'
};

const sizes: { size: MLoadingSize; label: string }[] = [
  { size: 'small', label: 'small' },
  { size: 'medium', label: 'medium' },
  { size: 'large', label: 'large' }
];

const BasicDemo = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="mdemo-stack">
      <MLoading loading={loading} tip="加载中..." style={{ borderRadius: 12 }}>
        <div style={cardStyle}>
          <div style={{ fontSize: 13, color: '#6b7280' }}>今日成交额</div>
          <div style={{ marginTop: 6, fontSize: 26, fontWeight: 600, color: '#111827' }}>
            ¥ 12,860
          </div>
          <div style={{ marginTop: 6, fontSize: 12, color: '#16a34a' }}>较昨日 +18.6%</div>
        </div>
      </MLoading>
      <MButton onClick={() => setLoading(value => !value)}>
        {loading ? '结束加载' : '开始加载'}
      </MButton>
    </div>
  );
};

const SizeDemo = () => (
  <div className="mdemo-stack">
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '20px 12px',
        borderRadius: 12,
        backgroundColor: '#fff'
      }}
    >
      {sizes.map(item => (
        <div
          key={item.size}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}
        >
          <MLoading loading size={item.size} />
          <span style={labelStyle}>{item.label}</span>
        </div>
      ))}
    </div>
  </div>
);

const DotRingIndicator = ({ size = 32, count = 10 }: { size?: number; count?: number }) => (
  <svg width={size} height={size} viewBox="0 0 50 50">
    {Array.from({ length: count }).map((_, index) => {
      const angle = (index / count) * Math.PI * 2;
      return (
        <circle
          key={index}
          cx={25 + Math.cos(angle) * 19}
          cy={25 + Math.sin(angle) * 19}
          r={3}
          fill="currentColor"
          style={{
            animation: 'zdy-mobile-loading-dot 1.2s linear infinite',
            animationDelay: `${((index / count) * 1.2).toFixed(2)}s`
          }}
        />
      );
    })}
  </svg>
);

const CustomDemo = () => (
  <div className="mdemo-stack">
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 12px',
        borderRadius: 12,
        backgroundColor: '#fff'
      }}
    >
      <MLoading
        loading
        indicator={<DotRingIndicator size={36} />}
        tip="正在同步数据..."
      />
    </div>
  </div>
);

const FullscreenDemo = () => {
  const [visible, setVisible] = useState(false);

  // 预览内全屏加载 1.5 秒后自动关闭
  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => setVisible(false), 1500);
    return () => window.clearTimeout(timer);
  }, [visible]);

  // 离开页面时清理页面级加载
  useEffect(() => () => MLoading.hide(), []);

  return (
    <div className="mdemo-stack">
      <MButton type="primary" onClick={() => setVisible(true)}>
        预览内全屏加载
      </MButton>
      <MButton
        onClick={() => {
          MLoading.show({ tip: '正在提交订单...', size: 'large' });
          window.setTimeout(() => MLoading.hide(), 1500);
        }}
      >
        页面级全屏（1.5 秒后关闭）
      </MButton>
      <p className="mdemo-tip">
        预览内模式通过 inline 约束在手机容器中；页面级模式使用 MLoading.show / MLoading.hide
        控制，会覆盖整个文档页面。
      </p>
      {visible && <MLoading fullscreen inline size="large" tip="正在提交订单..." />}
    </div>
  );
};

const mLoadingDemo: DemoConfig = {
  intro:
    '移动端加载用于请求、提交等等待场景：包裹内容时提供局部遮罩，也可独立展示指示器；全屏模式覆盖整个视口（inline 时限制在手机预览容器内），并支持 MLoading.show / MLoading.hide 页面级调用。',
  demos: [
    {
      title: '基础用法',
      desc: 'loading 为 true 时在内容上覆盖遮罩，不传 children 则只渲染独立的加载指示器。',
      code: `const [loading, setLoading] = useState(true);

<MLoading loading={loading} tip="加载中..." style={{ borderRadius: 12 }}>
  <div style={{ padding: 18, borderRadius: 12, backgroundColor: '#fff' }}>
    <div>今日成交额</div>
    <div>¥ 12,860</div>
  </div>
</MLoading>

<MButton onClick={() => setLoading(!loading)}>
  {loading ? '结束加载' : '开始加载'}
</MButton>`,
      render: <BasicDemo />
    },
    {
      title: '尺寸',
      desc: 'size 控制指示器大小，small / medium / large 分别适配紧凑列表、常规页面与全屏场景。',
      code: `<MLoading loading size="small" />
<MLoading loading size="medium" />
<MLoading loading size="large" />`,
      render: <SizeDemo />
    },
    {
      title: '自定义指示器',
      desc: 'indicator 替换默认圆环；示例为圆点沿圆周排布、依次渐隐形成拖尾。',
      code: `const DotRingIndicator = ({ size = 32, count = 10 }) => (
  <svg width={size} height={size} viewBox="0 0 50 50">
    {Array.from({ length: count }).map((_, index) => {
      const angle = (index / count) * Math.PI * 2;
      return (
        <circle
          key={index}
          cx={25 + Math.cos(angle) * 19}
          cy={25 + Math.sin(angle) * 19}
          r={3}
          fill="currentColor"
          style={{
            animation: 'zdy-mobile-loading-dot 1.2s linear infinite',
            animationDelay: \`\${((index / count) * 1.2).toFixed(2)}s\`
          }}
        />
      );
    })}
  </svg>
);

<MLoading loading indicator={<DotRingIndicator size={36} />} tip="正在同步数据..." />`,
      render: <CustomDemo />
    },
    {
      title: '全屏加载',
      desc: 'fullscreen 覆盖视口，配合 inline 可限制在预览容器内；页面级加载用静态方法调用。',
      code: `// 预览内全屏：约束在最近的定位父级
{visible && <MLoading fullscreen inline size="large" tip="正在提交订单..." />}

// 页面级全屏
MLoading.show({ tip: '正在提交订单...', size: 'large' });
setTimeout(() => MLoading.hide(), 1500);`,
      render: <FullscreenDemo />
    }
  ],
  api: [
    { prop: 'loading', desc: '是否处于加载状态；fullscreen 下不传时默认显示', type: 'boolean', default: 'false' },
    { prop: 'size', desc: '指示器尺寸', type: "'small' | 'medium' | 'large'", default: 'medium' },
    { prop: 'tip', desc: '加载提示文字', type: 'ReactNode', default: '-' },
    { prop: 'indicator', desc: '自定义指示器', type: 'ReactNode', default: '-' },
    { prop: 'fullscreen', desc: '是否全屏加载', type: 'boolean', default: 'false' },
    { prop: 'inline', desc: '全屏加载相对最近定位父级铺满（预览场景）', type: 'boolean', default: 'false' },
    { prop: 'children', desc: '被遮罩包裹的内容；不传时只渲染指示器', type: 'ReactNode', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' },
    { prop: 'MLoading.show(config)', desc: '显示页面级全屏加载', type: '(config?: MLoadingConfig) => void', default: '-' },
    { prop: 'MLoading.hide()', desc: '隐藏页面级全屏加载', type: '() => void', default: '-' },
    { prop: 'config.tip', desc: '全屏加载提示文字', type: 'ReactNode', default: '-' },
    { prop: 'config.size', desc: '全屏加载指示器尺寸', type: "'small' | 'medium' | 'large'", default: 'medium' },
    { prop: 'config.indicator', desc: '全屏加载自定义指示器', type: 'ReactNode', default: '-' }
  ]
};

export default mLoadingDemo;
