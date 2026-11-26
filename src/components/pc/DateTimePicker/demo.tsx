import { useState } from 'react';
import type { DemoConfig } from '../../../pages/Components/Demo/types';
import DateTimePicker from './DateTimePicker';

const fmt = (d: Date | null) => {
  if (!d) return '未选择';
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
};

const BasicDemo = () => {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <span>选中值：</span>
        <strong style={{ color: '#1890ff' }}>{fmt(value)}</strong>
      </div>
      <DateTimePicker onChange={(v) => setValue(v)} />
    </>
  );
};

const ControlledDemo = () => {
  const [controlled, setControlled] = useState<Date | null>(new Date(2025, 5, 15, 9, 30, 0));
  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <span>当前值：</span>
        <strong style={{ color: '#1890ff' }}>{fmt(controlled)}</strong>
      </div>
      <DateTimePicker value={controlled} onChange={(v) => setControlled(v)} />
    </>
  );
};

const dateTimePickerDemo: DemoConfig = {
  demos: [
    {
      title: '基础用法',
      code: `<DateTimePicker onChange={(v) => setValue(v)} />`,
      render: <BasicDemo />,
    },
    {
      title: '受控用法',
      code: `const [val, setVal] = useState(new Date(2025, 5, 15, 9, 30, 0));\n\n<DateTimePicker value={val} onChange={(v) => setVal(v)} />`,
      render: <ControlledDemo />,
    },
    {
      title: '仅日期（showTime=false）',
      code: `<DateTimePicker showTime={false} />`,
      render: <DateTimePicker showTime={false} />,
    },
    {
      title: '禁用日期',
      code: `<DateTimePicker\n  disabledDate={(date) => {\n    const day = date.getDay();\n    return day === 0 || day === 6;\n  }}\n/>`,
      render: (
        <DateTimePicker
          disabledDate={(date) => {
            const day = date.getDay();
            return day === 0 || day === 6;
          }}
        />
      ),
    },
    {
      title: '禁用与尺寸',
      code: `<DateTimePicker disabled /><DateTimePicker size="small" /><DateTimePicker size="large" />`,
      render: (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <DateTimePicker disabled />
          <DateTimePicker size="small" />
          <DateTimePicker size="large" />
        </div>
      ),
    },
  ],
  api: [
    { prop: 'value', desc: '当前日期时间（受控）', type: 'Date | null', default: '-' },
    { prop: 'defaultValue', desc: '默认日期时间', type: 'Date | null', default: 'null' },
    { prop: 'format', desc: '展示格式（支持 YYYY MM DD HH mm ss）', type: 'string', default: "'YYYY-MM-DD HH:mm:ss'" },
    { prop: 'placeholder', desc: '占位文本', type: 'string', default: "'请选择日期时间'" },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' },
    { prop: 'disabledDate', desc: '不可选择的日期', type: '(date: Date) => boolean', default: '-' },
    { prop: 'allowClear', desc: '是否允许清除', type: 'boolean', default: 'true' },
    { prop: 'size', desc: '尺寸', type: "'small' | 'medium' | 'large'", default: "'medium'" },
    { prop: 'showTime', desc: '是否显示时间选择面板', type: 'boolean', default: 'true' },
    { prop: 'onChange', desc: '日期时间变化回调', type: '(date: Date | null) => void', default: '-' },
    { prop: 'onOpenChange', desc: '面板展开状态变化回调', type: '(open: boolean) => void', default: '-' },
  ],
};

export default dateTimePickerDemo;
