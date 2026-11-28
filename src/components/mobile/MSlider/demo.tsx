/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import type { ReactNode } from 'react';

import type { DemoConfig } from '../../../pages/Components/Demo/types';
import MSlider from './MSlider';
import type { MSliderMark } from './types';

const Field = ({
  title,
  value,
  children
}: {
  title: string;
  value?: string;
  children: ReactNode;
}) => (
  <div style={{ padding: '16px 14px 8px', borderRadius: 12, backgroundColor: '#fff' }}>
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: 2
      }}
    >
      <span style={{ color: '#111827', fontSize: 13, fontWeight: 600 }}>{title}</span>
      {value && <strong style={{ color: '#1677ff', fontSize: 13 }}>{value}</strong>}
    </div>
    {children}
  </div>
);

const scoreMarks: MSliderMark[] = [0, 25, 50, 75, 100].map(value => ({
  value,
  label: String(value)
}));

const levelMarks: MSliderMark[] = [
  { value: 0, label: '低' },
  { value: 50, label: '中' },
  { value: 100, label: '高' }
];

const BasicDemo = () => {
  const [value, setValue] = useState(30);

  return (
    <div className="mdemo-stack">
      <Field title="音量" value={`${value}%`}>
        <MSlider
          value={value}
          onChange={next => setValue(next as number)}
          tooltip={{ formatter: next => `${next}%` }}
        />
      </Field>
      <p className="mdemo-tip">
        按住滑块拖动调整，拖动时显示值气泡；onChange 在拖动过程中持续触发。
      </p>
    </div>
  );
};

const RangeDemo = () => {
  const [value, setValue] = useState<[number, number]>([20, 70]);

  return (
    <div className="mdemo-stack">
      <Field title="价格区间" value={`¥${value[0]} - ¥${value[1]}`}>
        <MSlider
          range
          value={value}
          onChange={next => setValue(next as [number, number])}
          tooltip={{ formatter: next => `¥${next}` }}
        />
      </Field>
      <p className="mdemo-tip">
        开启 range 后有两个滑块，起点不能超过终点；点击轨道会移动较近的那个滑块。
      </p>
    </div>
  );
};

const MarksDemo = () => {
  const [value, setValue] = useState(40);

  return (
    <div className="mdemo-stack">
      <Field title="评分" value={`${value} 分`}>
        <MSlider
          min={0}
          max={100}
          step={5}
          value={value}
          onChange={next => setValue(next as number)}
          marks={scoreMarks}
          tooltip={{ formatter: next => `${next} 分` }}
        />
      </Field>
      <p className="mdemo-tip">
        marks 渲染轨道下方的刻度，step 控制每次拖动的最小变化量（此处为 5）。
      </p>
    </div>
  );
};

const VerticalDemo = () => (
  <div className="mdemo-stack">
    <Field title="垂直模式" value="40%">
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, paddingBottom: 8 }}>
        <MSlider
          vertical
          defaultValue={40}
          marks={levelMarks}
          style={{ height: 168 }}
          tooltip={{ formatter: next => `${next}%` }}
        />
        <span style={{ color: '#8c8c8c', fontSize: 12, lineHeight: 1.8 }}>
          vertical 时轨道自下而上，
          <br />
          底部为 min，顶部为 max。
        </span>
      </div>
    </Field>
    <p className="mdemo-tip">垂直模式适合音量、亮度等场景，同样支持刻度与值气泡。</p>
  </div>
);

const SizeDemo = () => (
  <div className="mdemo-stack">
    <Field title="常规尺寸" value="60">
      <MSlider defaultValue={60} />
    </Field>
    <Field title="小尺寸" value="45">
      <MSlider size="small" defaultValue={45} />
    </Field>
    <Field title="禁用状态">
      <MSlider disabled defaultValue={60} />
      <MSlider disabled range defaultValue={[30, 80]} />
    </Field>
    <p className="mdemo-tip">size="small" 使用更细的轨道与更小的滑块；disabled 时不可拖动。</p>
  </div>
);

const mMSliderDemo: DemoConfig = {
  intro:
    '移动端滑动输入条用于音量、亮度、价格区间等数值选择。支持单值与双滑块范围、垂直方向、自定义步长与刻度；滑块带有 44px 触摸热区，拖动时显示值气泡，并支持键盘方向键、Home/End 调整。',
  demos: [
    {
      title: '基础用法',
      desc: '受控用法，拖动过程中通过 onChange 同步当前值。',
      code: `const [value, setValue] = useState(30);

<MSlider
  value={value}
  onChange={next => setValue(next as number)}
  tooltip={{ formatter: next => \`\${next}%\` }}
/>`,
      render: <BasicDemo />
    },
    {
      title: '范围选择',
      desc: 'range 开启双滑块，返回 [起始值, 结束值]。',
      code: `const [value, setValue] = useState<[number, number]>([20, 70]);

<MSlider
  range
  value={value}
  onChange={next => setValue(next as [number, number])}
/>`,
      render: <RangeDemo />
    },
    {
      title: '刻度与步长',
      desc: 'marks 显示刻度标签，step 控制最小变化量。',
      code: `const [value, setValue] = useState(40);
const scoreMarks = [0, 25, 50, 75, 100].map(value => ({ value, label: String(value) }));

<MSlider
  min={0}
  max={100}
  step={5}
  value={value}
  marks={scoreMarks}
  onChange={next => setValue(next as number)}
/>`,
      render: <MarksDemo />
    },
    {
      title: '垂直方向',
      desc: 'vertical 将轨道旋转为纵向，底部为最小值。',
      code: `<MSlider
  vertical
  defaultValue={40}
  marks={levelMarks}
  style={{ height: 168 }}
/>`,
      render: <VerticalDemo />
    },
    {
      title: '尺寸与禁用',
      desc: 'size="small" 提供更紧凑的样式，disabled 禁止交互。',
      code: `<MSlider size="small" defaultValue={45} />
<MSlider disabled defaultValue={60} />`,
      render: <SizeDemo />
    }
  ],
  api: [
    { prop: 'value', desc: '当前值，传入即为受控；range 时为 [number, number]', type: 'number | [number, number]', default: '-' },
    { prop: 'defaultValue', desc: '默认值', type: 'number | [number, number]', default: '-' },
    { prop: 'min', desc: '最小值', type: 'number', default: '0' },
    { prop: 'max', desc: '最大值', type: 'number', default: '100' },
    { prop: 'step', desc: '步长，小于等于 0 时连续取值', type: 'number', default: '1' },
    { prop: 'range', desc: '是否为双滑块范围选择', type: 'boolean', default: 'false' },
    { prop: 'vertical', desc: '是否垂直方向', type: 'boolean', default: 'false' },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' },
    { prop: 'marks', desc: '刻度标记', type: 'MSliderMark[]', default: '-' },
    { prop: 'tooltip', desc: '拖动/聚焦时显示的值气泡，可自定义格式化', type: 'boolean | { visible?, formatter? }', default: 'true' },
    { prop: 'keyboard', desc: '是否支持键盘调整', type: 'boolean', default: 'true' },
    { prop: 'size', desc: '尺寸', type: "'default' | 'small'", default: "'default'" },
    { prop: 'ariaLabel', desc: '滑块的无障碍名称', type: 'string', default: '-' },
    { prop: 'onChange', desc: '拖动过程中值变化时触发', type: '(value) => void', default: '-' },
    { prop: 'onAfterChange', desc: '拖动结束、点击轨道或键盘调整后触发', type: '(value) => void', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ]
};

export default mMSliderDemo;
