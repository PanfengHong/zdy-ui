/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';

import type { DemoConfig } from '../../../pages/Components/Demo/types';
import MButton from '../MButton/MButton';
import MProgress from './MProgress';

const cardStyle: CSSProperties = {
  padding: '16px 16px',
  borderRadius: 12,
  backgroundColor: '#fff'
};

const rowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '14px 16px',
  borderRadius: 12,
  backgroundColor: '#fff'
};

const labelStyle: CSSProperties = {
  flex: '0 0 auto',
  width: 56,
  fontSize: 12,
  color: '#8c8c8c'
};

const centerLabelStyle: CSSProperties = {
  marginTop: 10,
  fontSize: 12,
  color: '#8c8c8c'
};

const BasicDemo = () => {
  const [percent, setPercent] = useState(24);

  // 自动推进进度，到达 100% 后停止
  useEffect(() => {
    if (percent >= 100) return;
    const timer = window.setTimeout(() => {
      setPercent(value => Math.min(100, value + 6));
    }, 700);
    return () => window.clearTimeout(timer);
  }, [percent]);

  return (
    <div className="mdemo-stack">
      <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <MProgress percent={percent} />
        <MProgress percent={percent} strokeWidth={10} showInfo={false} />
      </div>
      <MButton onClick={() => setPercent(0)}>重新开始</MButton>
      <p className="mdemo-tip">
        第一条显示百分比文字，第二条加粗且隐藏文字；percent 变化时宽度平滑过渡，达到 100%
        自动切换为成功状态。
      </p>
    </div>
  );
};

const circleSizes = [
  { width: 72, strokeWidth: 5, percent: 25, label: '72px' },
  { width: 96, strokeWidth: 6, percent: 62, label: '96px' },
  { width: 120, strokeWidth: 8, percent: 88, label: '120px' }
];

const CircleDemo = () => (
  <div className="mdemo-stack">
    <div
      style={{
        ...cardStyle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
      }}
    >
      {circleSizes.map(item => (
        <div
          key={item.width}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <MProgress
            type="circle"
            percent={item.percent}
            width={item.width}
            strokeWidth={item.strokeWidth}
          />
          <span style={centerLabelStyle}>{item.label}</span>
        </div>
      ))}
    </div>
    <p className="mdemo-tip">
      width 控制圆环直径，strokeWidth 控制线宽，中间文字会跟随直径自动缩放。
    </p>
  </div>
);

const statusRows = [
  { label: '正常', percent: 30 },
  { label: '进行中', percent: 45, status: 'active' as const },
  { label: '成功', percent: 100, status: 'success' as const },
  { label: '失败', percent: 55, status: 'exception' as const }
];

const StatusDemo = () => (
  <div className="mdemo-stack">
    {statusRows.map(row => (
      <div key={row.label} style={rowStyle}>
        <span style={labelStyle}>{row.label}</span>
        <MProgress percent={row.percent} status={row.status} />
      </div>
    ))}
    <div
      style={{
        ...cardStyle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
      }}
    >
      <MProgress type="circle" percent={100} status="success" />
      <MProgress type="circle" percent={60} status="exception" />
      <MProgress type="circle" percent={40} status="active" />
    </div>
    <div style={{ ...rowStyle, flexDirection: 'column', alignItems: 'stretch', gap: 16 }}>
      <MProgress
        percent={72}
        strokeColor="#722ed1"
        trailColor="#f3e8ff"
        format={value => `${value} / 100`}
      />
      <MProgress
        percent={36}
        strokeColor="linear-gradient(90deg, #fa8c16, #f5222d)"
        format={() => '下载中'}
      />
    </div>
    <p className="mdemo-tip">
      status 为 active 时显示流光动画；strokeColor 支持任意颜色，线形还可传渐变；format
      自定义右侧文字。
    </p>
  </div>
);

const GapDemo = () => (
  <div className="mdemo-stack">
    <div
      style={{
        ...cardStyle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <MProgress type="circle" percent={68} width={104} gapDegree={90} />
        <span style={centerLabelStyle}>gapDegree 90</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <MProgress
          type="circle"
          percent={36}
          width={104}
          gapDegree={180}
          strokeColor="#fa8c16"
          status="active"
        />
        <span style={centerLabelStyle}>gapDegree 180</span>
      </div>
    </div>
    <p className="mdemo-tip">缺口默认居中在顶部，最大 340 度，剩余角度按百分比分配。</p>
  </div>
);

const mProgressDemo: DemoConfig = {
  intro:
    '移动端进度条用于展示任务完成度，支持线形与环形两种形态。percent 取 0-100，达到 100% 自动切换成功状态；可通过 status 表示进行中、成功或失败，并支持自定义颜色、线宽、尺寸与环形缺口。',
  demos: [
    {
      title: '线形进度',
      desc: 'percent 控制宽度并平滑过渡，showInfo 控制是否显示百分比文字。',
      code: `const [percent, setPercent] = useState(24);

<MProgress percent={percent} />
<MProgress percent={percent} strokeWidth={10} showInfo={false} />`,
      render: <BasicDemo />
    },
    {
      title: '环形与尺寸',
      desc: 'type 为 circle 时用 width 控制直径、strokeWidth 控制线宽，文字随尺寸缩放。',
      code: `<MProgress type="circle" percent={25} width={72} strokeWidth={5} />
<MProgress type="circle" percent={62} width={96} />
<MProgress type="circle" percent={88} width={120} strokeWidth={8} />`,
      render: <CircleDemo />
    },
    {
      title: '状态与自定义样式',
      desc: 'status 切换正常、进行中、成功、失败；strokeColor、trailColor 与 format 自定义颜色和文字。',
      code: `<MProgress percent={45} status="active" />
<MProgress percent={100} status="success" />
<MProgress percent={55} status="exception" />

// 环形状态下，成功与失败显示对应图标
<MProgress type="circle" percent={100} status="success" />
<MProgress type="circle" percent={60} status="exception" />

<MProgress
  percent={72}
  strokeColor="#722ed1"
  trailColor="#f3e8ff"
  format={value => \`\${value} / 100\`}
/>`,
      render: <StatusDemo />
    },
    {
      title: '环形缺口',
      desc: 'gapDegree 设置环形缺口角度，缺口默认居中在顶部，适合仪表盘类场景。',
      code: `<MProgress type="circle" percent={68} width={104} gapDegree={90} />
<MProgress type="circle" percent={36} width={104} gapDegree={180} />`,
      render: <GapDemo />
    }
  ],
  api: [
    { prop: 'percent', desc: '进度百分比，超出范围会被限制在 0-100', type: 'number', default: '0' },
    { prop: 'type', desc: '进度条类型', type: "'line' | 'circle'", default: "'line'" },
    { prop: 'status', desc: '状态，不传时 100% 自动视为 success', type: "'normal' | 'success' | 'exception' | 'active'", default: '-' },
    { prop: 'strokeColor', desc: '进度条颜色，线形支持渐变字符串', type: 'string', default: '-' },
    { prop: 'strokeWidth', desc: '进度条线宽', type: 'number', default: '6' },
    { prop: 'showInfo', desc: '是否显示进度文字', type: 'boolean', default: 'true' },
    { prop: 'format', desc: '自定义进度文字', type: '(percent: number) => ReactNode', default: '-' },
    { prop: 'trailColor', desc: '轨道背景色', type: 'string', default: '-' },
    { prop: 'width', desc: '环形进度条直径', type: 'number', default: '96' },
    { prop: 'gapDegree', desc: '环形缺口角度，范围 0-340', type: 'number', default: '0' },
    { prop: 'ariaLabel', desc: '无障碍名称', type: 'string', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ]
};

export default mProgressDemo;
