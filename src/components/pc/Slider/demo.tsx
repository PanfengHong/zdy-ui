import React, { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Slider from './Slider';
import Input from '../Input/Input';
import InputNumber from '../InputNumber/InputNumber';

const SliderDemo = () => {
  const [basicValue, setBasicValue] = useState(30);
  const [stepValue, setStepValue] = useState(3);
  const [rangeValue, setRangeValue] = useState<[number, number]>([20, 50]);
  const [marksValue, setMarksValue] = useState(30);
  const [reverseValue, setReverseValue] = useState(30);
  const [tooltipValue, setTooltipValue] = useState(30);

  const apiData = [
    { prop: 'value', desc: '当前值（受控）', type: 'number | [number, number]', default: '-' },
    { prop: 'defaultValue', desc: '默认值（非受控）', type: 'number | [number, number]', default: '0' },
    { prop: 'min', desc: '最小值', type: 'number', default: '0' },
    { prop: 'max', desc: '最大值', type: 'number', default: '100' },
    { prop: 'step', desc: '步长', type: 'number', default: '1' },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' },
    { prop: 'vertical', desc: '是否垂直模式', type: 'boolean', default: 'false' },
    { prop: 'range', desc: '是否为范围选择', type: 'boolean', default: 'false' },
    { prop: 'marks', desc: '刻度标记', type: 'SliderMark[]', default: '-' },
    { prop: 'tooltip', desc: 'Tooltip配置', type: 'boolean | SliderTooltipConfig', default: 'true' },
    { prop: 'onChange', desc: '值变化回调', type: 'function(value)', default: '-' },
    { prop: 'onAfterChange', desc: '拖拽结束回调', type: 'function(value)', default: '-' },
    { prop: 'size', desc: '尺寸', type: "'default' | 'small'", default: "'default'" },
    { prop: 'reverse', desc: '是否反向', type: 'boolean', default: 'false' },
    { prop: 'keyboard', desc: '是否支持键盘操作', type: 'boolean', default: 'true' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ];

  const markApiData = [
    { prop: 'value', desc: '标记值', type: 'number', default: '-' },
    { prop: 'label', desc: '标记文案', type: 'ReactNode', default: '-' },
    { prop: 'style', desc: '标记自定义样式', type: 'CSSProperties', default: '-' },
    { prop: 'labelStyle', desc: '标记文案自定义样式', type: 'CSSProperties', default: '-' }
  ];

  return (
    <>
      <div className="component-group">
        <h3>基础用法</h3>
        <DemoBlock
          code={`
const [value, setValue] = useState(30);

<Slider value={value} onChange={setValue} />
          `.trim()}
        >
          <Slider value={basicValue} onChange={setBasicValue} style={{ width: 400 }} />
          <div style={{ marginTop: 8 }}>当前值: {basicValue}</div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>非受控用法</h3>
        <DemoBlock
          code={`
<Slider defaultValue={30} />
          `.trim()}
        >
          <Slider defaultValue={30} style={{ width: 400 }} />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>自定义范围</h3>
        <DemoBlock
          code={`
<Slider min={0} max={10} defaultValue={5} />
<Slider min={-50} max={50} defaultValue={0} />
<Slider min={0} max={1000} defaultValue={300} />
          `.trim()}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Slider min={0} max={10} defaultValue={5} style={{ width: 400 }} />
            <Slider min={-50} max={50} defaultValue={0} style={{ width: 400 }} />
            <Slider min={0} max={1000} defaultValue={300} style={{ width: 400 }} />
          </div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>步长</h3>
        <DemoBlock
          code={`
<Slider min={0} max={10} step={1} value={stepValue} onChange={setStepValue} />
<Slider min={0} max={100} step={5} defaultValue={30} />
<Slider min={0} max={1} step={0.1} defaultValue={0.3} />
          `.trim()}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Slider min={0} max={10} step={1} value={stepValue} onChange={setStepValue} style={{ width: 400 }} />
            <Slider min={0} max={100} step={5} defaultValue={30} style={{ width: 400 }} />
            <Slider min={0} max={1} step={0.1} defaultValue={0.3} style={{ width: 400 }} />
          </div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>禁用状态</h3>
        <DemoBlock
          code={`
<Slider disabled defaultValue={30} />
<Slider disabled range defaultValue={[20, 50]} />
          `.trim()}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Slider disabled defaultValue={30} style={{ width: 400 }} />
            <Slider disabled range defaultValue={[20, 50]} style={{ width: 400 }} />
          </div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>小型尺寸</h3>
        <DemoBlock
          code={`
<Slider size="small" defaultValue={30} />
<Slider size="small" range defaultValue={[20, 50]} />
          `.trim()}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Slider size="small" defaultValue={30} style={{ width: 400 }} />
            <Slider size="small" range defaultValue={[20, 50]} style={{ width: 400 }} />
          </div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>范围选择</h3>
        <DemoBlock
          code={`
const [value, setValue] = useState([20, 50]);

<Slider range value={value} onChange={setValue} />
          `.trim()}
        >
          <Slider range value={rangeValue} onChange={setRangeValue} style={{ width: 400 }} />
          <div style={{ marginTop: 8 }}>
            当前值: [{rangeValue[0]}, {rangeValue[1]}]
          </div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>刻度标记</h3>
        <DemoBlock
          code={`
const marks = [
  { value: 0, label: '0°C' },
  { value: 25, label: '25°C' },
  { value: 50, label: '50°C' },
  { value: 75, label: '75°C' },
  { value: 100, label: '100°C' }
];

<Slider marks={marks} value={marksValue} onChange={setMarksValue} />
          `.trim()}
        >
          <Slider
            marks={[
              { value: 0, label: '0°C' },
              { value: 25, label: '25°C' },
              { value: 50, label: '50°C' },
              { value: 75, label: '75°C' },
              { value: 100, label: '100°C' }
            ]}
            value={marksValue}
            onChange={setMarksValue}
            style={{ width: 400 }}
          />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>带刻度的范围选择</h3>
        <DemoBlock
          code={`
const marks = [
  { value: 0, label: '0' },
  { value: 20, label: '20' },
  { value: 40, label: '40' },
  { value: 60, label: '60' },
  { value: 80, label: '80' },
  { value: 100, label: '100' }
];

<Slider range marks={marks} defaultValue={[20, 60]} />
          `.trim()}
        >
          <Slider
            range
            marks={[
              { value: 0, label: '0' },
              { value: 20, label: '20' },
              { value: 40, label: '40' },
              { value: 60, label: '60' },
              { value: 80, label: '80' },
              { value: 100, label: '100' }
            ]}
            defaultValue={[20, 60]}
            style={{ width: 400 }}
          />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>自定义Tooltip</h3>
        <DemoBlock
          code={`
<Slider
  tooltip={{ formatter: (v) => \`\${v}%\` }}
  defaultValue={30}
/>
<Slider
  tooltip={{ visible: false }}
  defaultValue={30}
/>
          `.trim()}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Slider
              tooltip={{ formatter: (v) => `${v}%` }}
              value={tooltipValue}
              onChange={setTooltipValue}
              style={{ width: 400 }}
            />
            <Slider
              tooltip={{ visible: false }}
              defaultValue={30}
              style={{ width: 400 }}
            />
          </div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>反向模式</h3>
        <DemoBlock
          code={`
<Slider reverse defaultValue={30} />
          `.trim()}
        >
          <Slider reverse value={reverseValue} onChange={setReverseValue} style={{ width: 400 }} />
          <div style={{ marginTop: 8 }}>当前值: {reverseValue}</div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>垂直模式</h3>
        <DemoBlock
          code={`
<div style={{ height: 200 }}>
  <Slider vertical defaultValue={30} />
  <Slider vertical range defaultValue={[20, 60]} />
  <Slider vertical disabled defaultValue={30} />
</div>
          `.trim()}
        >
          <div style={{ display: 'flex', gap: 32, height: 220, alignItems: 'flex-start' }}>
            <Slider vertical defaultValue={30} />
            <Slider vertical range defaultValue={[20, 60]} />
            <Slider vertical disabled defaultValue={30} />
            <Slider vertical size="small" defaultValue={45} />
          </div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>键盘操作</h3>
        <DemoBlock
          code={`
// 聚焦后可用键盘操作:
// ← / → : 移动step
// ↑ / ↓ : 移动step
// Shift + 方向: 移动10倍step
// Home / End: 跳到最小/最大值
// PageUp / PageDown: 移动10倍step

<Slider defaultValue={30} />
          `.trim()}
        >
          <Slider defaultValue={30} style={{ width: 400 }} />
          <div style={{ marginTop: 8, fontSize: 12, color: '#999' }}>
            点击滑块聚焦后使用键盘方向键操作
          </div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>与输入框联动</h3>
        <DemoBlock
          code={`
const [value, setValue] = useState(30);

<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
  <Slider value={value} onChange={setValue} style={{ flex: 1 }} />
  <InputNumber value={value} onChange={setValue} min={0} max={100} />
</div>
          `.trim()}
        >
          <Slider
            value={basicValue}
            onChange={setBasicValue}
            style={{ width: 320, display: 'inline-block', verticalAlign: 'middle' }}
          />
          <Input
            type="number"
            value={basicValue}
            onChange={(e: any) => setBasicValue(Math.min(100, Math.max(0, Number(e.target.value) || 0)))}
            style={{ width: 80, marginLeft: 16, verticalAlign: 'middle' }}
          />
        </DemoBlock>
      </div>

      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>API</h3>
        <ApiTable dataSource={apiData} />
      </div>

      <div className="component-group">
        <h3>SliderMark API</h3>
        <ApiTable dataSource={markApiData} />
      </div>
    </>
  );
};

export default SliderDemo;