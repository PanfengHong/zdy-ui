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

  return (
    <>
      <div className="component-group">
        <h3>基础用法</h3>
        <div style={{ marginBottom: 12 }}>
          <span>选中日期：</span>
          <strong style={{ color: '#1890ff' }}>{fmt(value)}</strong>
        </div>
        <DemoBlock code={`<DatePicker onChange={(d) => setValue(d)} />`}>
          <DatePicker onChange={(d) => setValue(d)} />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>受控用法</h3>
        <div style={{ marginBottom: 12 }}>
          <span>当前日期：</span>
          <strong style={{ color: '#1890ff' }}>{fmt(controlled)}</strong>
        </div>
        <DemoBlock
          code={`const [date, setDate] = useState(new Date(2025, 5, 15));

<DatePicker value={date} onChange={(d) => setDate(d)} />`}
        >
          <DatePicker value={controlled} onChange={(d) => setControlled(d)} />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>禁用日期</h3>
        <DemoBlock
          code={`<DatePicker
  disabledDate={(date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  }}
/>`}
        >
          <DatePicker
            disabledDate={(date) => {
              const day = date.getDay();
              return day === 0 || day === 6;
            }}
          />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>禁用与尺寸</h3>
        <DemoBlock code={`<DatePicker disabled /><DatePicker size="small" /><DatePicker size="large" />`}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <DatePicker disabled />
            <DatePicker size="small" />
            <DatePicker size="large" />
          </div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>自定义格式</h3>
        <DemoBlock code={`<DatePicker format="YYYY/MM/DD" />`}>
          <DatePicker format="YYYY/MM/DD" />
        </DemoBlock>
      </div>

      <div className="component-group" style={{ marginTop: 32 }}>
        <h3>API</h3>
        <ApiTable dataSource={apiData} />
      </div>
    </>
  );
};

export default DatePickerDemo;
