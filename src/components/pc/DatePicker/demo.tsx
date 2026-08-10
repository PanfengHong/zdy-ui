import { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import DatePicker from './DatePicker';

const DatePickerDemo = () => {
  const [value, setValue] = useState<Date | null>(null);
  const [controlled, setControlled] = useState<Date | null>(new Date(2025, 5, 15));

  const fmt = (d: Date | null) => {
    if (!d) return '未选择';
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const apiData = [
    { prop: 'value', desc: '当前日期（受控）', type: 'Date | null', default: '-' },
    { prop: 'defaultValue', desc: '默认日期', type: 'Date | null', default: 'null' },
    { prop: 'format', desc: '展示格式（支持 YYYY MM DD）', type: 'string', default: "'YYYY-MM-DD'" },
    { prop: 'placeholder', desc: '占位文本', type: 'string', default: "'请选择日期'" },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' },
    { prop: 'disabledDate', desc: '不可选择的日期', type: '(date: Date) => boolean', default: '-' },
    { prop: 'allowClear', desc: '是否允许清除', type: 'boolean', default: 'true' },
    { prop: 'size', desc: '尺寸', type: "'small' | 'medium' | 'large'", default: "'medium'" },
    { prop: 'onChange', desc: '日期变化回调', type: '(date: Date | null) => void', default: '-' },
    { prop: 'onOpenChange', desc: '面板展开状态变化回调', type: '(open: boolean) => void', default: '-' },
  ];

  const demos = [
    {
      title: '基础用法',
      description: (
        <div style={{ marginBottom: 12 }}>
          <span>选中日期：</span>
          <strong style={{ color: '#1890ff' }}>{fmt(value)}</strong>
        </div>
      ),
      code: `<DatePicker onChange={(d) => setValue(d)} />`,
      render: <DatePicker onChange={(d) => setValue(d)} />,
    },
    {
      title: '受控用法',
      description: (
        <div style={{ marginBottom: 12 }}>
          <span>当前日期：</span>
          <strong style={{ color: '#1890ff' }}>{fmt(controlled)}</strong>
        </div>
      ),
      code: `const [date, setDate] = useState(new Date(2025, 5, 15));\n\n<DatePicker value={date} onChange={(d) => setDate(d)} />`,
      render: <DatePicker value={controlled} onChange={(d) => setControlled(d)} />,
    },
    {
      title: '禁用日期',
      code: `<DatePicker\n  disabledDate={(date) => {\n    const day = date.getDay();\n    return day === 0 || day === 6;\n  }}\n/>`,
      render: (
        <DatePicker
          disabledDate={(date) => {
            const day = date.getDay();
            return day === 0 || day === 6;
          }}
        />
      ),
    },
    {
      title: '禁用与尺寸',
      code: `<DatePicker disabled /><DatePicker size="small" /><DatePicker size="large" />`,
      render: (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <DatePicker disabled />
          <DatePicker size="small" />
          <DatePicker size="large" />
        </div>
      ),
    },
    {
      title: '自定义格式',
      code: `<DatePicker format="YYYY/MM/DD" />`,
      render: <DatePicker format="YYYY/MM/DD" />,
    },
  ];

  return (
    <>
      {demos.map((demo) => (
        <div key={demo.title} className="component-group">
          <h3>{demo.title}</h3>
          {demo.description}
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

export default DatePickerDemo;
