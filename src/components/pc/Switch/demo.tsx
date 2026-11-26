import type { DemoConfig } from '../../../pages/Components/Demo/types';
import Switch from './Switch';

const switchDemo: DemoConfig = {
  demos: [
    {
      title: '基础用法',
      code: `
<Switch defaultChecked />
<Switch />
<Switch disabled />
<Switch disabled defaultChecked />
          `.trim(),
      render: (
        <div style={{ display: 'flex', gap: '16px' }}>
          <Switch defaultChecked />
          <Switch />
          <Switch disabled />
          <Switch disabled defaultChecked />
        </div>
      )
    },
    {
      title: '开关尺寸',
      code: `
<Switch size="small" />
<Switch size="medium" />
<Switch size="large" />
          `.trim(),
      render: (
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Switch size="small" />
            <span style={{ fontSize: '12px', color: '#999' }}>Small</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Switch size="medium" />
            <span style={{ fontSize: '12px', color: '#999' }}>Medium</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Switch size="large" />
            <span style={{ fontSize: '12px', color: '#999' }}>Large</span>
          </div>
        </div>
      )
    }
  ],
  api: [
    { prop: 'checked', desc: '是否选中', type: 'boolean', default: '-' },
    { prop: 'defaultChecked', desc: '默认是否选中', type: 'boolean', default: 'false' },
    { prop: 'onChange', desc: '值变化回调', type: 'function(checked)', default: '-' },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' },
    { prop: 'size', desc: '尺寸', type: 'SizeType', default: 'medium' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ],
};

export default switchDemo;
