import { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import ColorPicker from './ColorPicker';

const ColorPickerDemo = () => {
  const [color1, setColor1] = useState('#1677ff');
  const [color3, setColor3] = useState('rgba(245, 34, 45, 0.6)');
  const [color4, setColor4] = useState('#722ed1');
  const [open, setOpen] = useState(false);

  const apiData = [
    { prop: 'value', desc: '当前颜色值（受控）', type: 'string', default: '-' },
    { prop: 'defaultValue', desc: '默认颜色值', type: 'string', default: "'#1677ff'" },
    { prop: 'format', desc: '颜色输出格式', type: "'hex' | 'rgb' | 'hsb'", default: "'hex'" },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' },
    { prop: 'disabledAlpha', desc: '是否禁用透明度', type: 'boolean', default: 'false' },
    { prop: 'showText', desc: '是否在触发器显示颜色文本', type: 'boolean', default: 'false' },
    { prop: 'presets', desc: '预设色板', type: '{ label, colors }[]', default: '默认色板' },
    { prop: 'size', desc: '尺寸', type: "'small' | 'medium' | 'large'", default: "'medium'" },
    { prop: 'allowClear', desc: '是否允许清除', type: 'boolean', default: 'false' },
    { prop: 'defaultOpen', desc: '默认是否打开', type: 'boolean', default: 'false' },
    { prop: 'open', desc: '是否打开（受控）', type: 'boolean', default: '-' },
    { prop: 'onChange', desc: '颜色变化回调', type: 'function(value, color)', default: '-' },
    { prop: 'onOpenChange', desc: '打开状态变化回调', type: 'function(open)', default: '-' },
    { prop: 'onClear', desc: '清除回调', type: 'function()', default: '-' }
  ];

  const demos = [
    {
      title: '基础用法',
      code: `const [color, setColor] = useState('#1677ff');\n<ColorPicker value={color} onChange={setColor} />`,
      render: (
        <>
          <ColorPicker value={color1} onChange={setColor1} />
          <span style={{ marginLeft: 12, color: '#666' }}>当前值: {color1}</span>
        </>
      ),
    },
    {
      title: '非受控用法',
      code: `<ColorPicker defaultValue="#52c41a" />`,
      render: <ColorPicker defaultValue="#52c41a" />,
    },
    {
      title: '显示文本',
      code: `<ColorPicker defaultValue="#1677ff" showText />`,
      render: <ColorPicker defaultValue="#1677ff" showText />,
    },
    {
      title: '不同格式',
      code: `<ColorPicker defaultValue="#1677ff" format="hex" showText />\n<ColorPicker defaultValue="#1677ff" format="rgb" showText />\n<ColorPicker defaultValue="#1677ff" format="hsb" showText />`,
      render: (
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <ColorPicker defaultValue="#1677ff" format="hex" showText />
          <ColorPicker defaultValue="#1677ff" format="rgb" showText />
          <ColorPicker defaultValue="#1677ff" format="hsb" showText />
        </div>
      ),
    },
    {
      title: '不同尺寸',
      code: `<ColorPicker defaultValue="#1677ff" size="small" />\n<ColorPicker defaultValue="#1677ff" size="medium" />\n<ColorPicker defaultValue="#1677ff" size="large" />`,
      render: (
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <ColorPicker defaultValue="#1677ff" size="small" />
          <ColorPicker defaultValue="#1677ff" size="medium" />
          <ColorPicker defaultValue="#1677ff" size="large" />
        </div>
      ),
    },
    {
      title: '透明度',
      code: `const [color, setColor] = useState('rgba(245, 34, 45, 0.6)');\n<ColorPicker value={color} onChange={setColor} showText />`,
      render: (
        <>
          <ColorPicker value={color3} onChange={setColor3} showText />
          <div style={{ marginTop: 8, color: '#666' }}>当前值: {color3}</div>
        </>
      ),
    },
    {
      title: '禁用透明度',
      code: `<ColorPicker defaultValue="#1677ff" disabledAlpha showText />`,
      render: <ColorPicker defaultValue="#1677ff" disabledAlpha showText />,
    },
    {
      title: '禁用',
      code: `<ColorPicker defaultValue="#1677ff" disabled />`,
      render: <ColorPicker defaultValue="#1677ff" disabled />,
    },
    {
      title: '允许清除',
      code: `const [color, setColor] = useState('#722ed1');\n<ColorPicker\n  value={color}\n  onChange={setColor}\n  allowClear\n  showText\n  onClear={() => setColor('')}\n/>`,
      render: (
        <>
          <ColorPicker
            value={color4}
            onChange={setColor4}
            allowClear
            showText
            onClear={() => setColor4('')}
          />
          <div style={{ marginTop: 8, color: '#666' }}>当前值: {color4 || '(已清除)'}</div>
        </>
      ),
    },
    {
      title: '受控打开',
      code: `const [open, setOpen] = useState(false);\n<ColorPicker open={open} onOpenChange={setOpen} defaultValue="#1677ff" />`,
      render: (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <ColorPicker open={open} onOpenChange={setOpen} defaultValue="#1677ff" />
          <button
            onClick={() => setOpen(!open)}
            style={{
              padding: '4px 12px',
              border: '1px solid #d9d9d9',
              borderRadius: 4,
              background: '#fff',
              cursor: 'pointer',
            }}
          >
            {open ? '关闭面板' : '打开面板'}
          </button>
        </div>
      ),
    },
    {
      title: '自定义预设色',
      code: `const presets = [\n  { label: '品牌色', colors: ['#1677ff', '#52c41a', '#722ed1', '#eb2f96'] },\n  { label: '主题色', colors: ['#fa541c', '#faad14', '#13c2c2', '#2f54eb'] }\n];\n<ColorPicker defaultValue="#1677ff" presets={presets} />`,
      render: (
        <ColorPicker
          defaultValue="#1677ff"
          presets={[
            { label: '品牌色', colors: ['#1677ff', '#52c41a', '#722ed1', '#eb2f96'] },
            { label: '主题色', colors: ['#fa541c', '#faad14', '#13c2c2', '#2f54eb'] },
          ]}
        />
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

export default ColorPickerDemo;
