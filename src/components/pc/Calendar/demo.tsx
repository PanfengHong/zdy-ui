import { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Calendar from './Calendar';

const CalendarDemo = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [controlledDate, setControlledDate] = useState(new Date(2025, 0, 15));

  const formatDate = (date: Date | null): string => {
    if (!date) return '未选择';
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const apiData = [
    { prop: 'value', desc: '当前选中的日期（受控）', type: 'Date', default: '-' },
    { prop: 'defaultValue', desc: '默认选中的日期', type: 'Date', default: 'new Date()' },
    { prop: 'mode', desc: '面板模式', type: "'month' | 'year'", default: "'month'" },
    { prop: 'fullscreen', desc: '是否全屏显示', type: 'boolean', default: 'true' },
    { prop: 'disabledDate', desc: '不可选择的日期', type: '(date: Date) => boolean', default: '-' },
    { prop: 'dateCellRender', desc: '自定义日期单元格渲染', type: '(date: Date) => ReactNode', default: '-' },
    { prop: 'monthCellRender', desc: '自定义月份单元格渲染', type: '(date: Date) => ReactNode', default: '-' },
    { prop: 'headerRender', desc: '自定义头部渲染', type: '(date, mode) => ReactNode', default: '-' },
    { prop: 'onChange', desc: '日期变化回调', type: '(date: Date, mode) => void', default: '-' },
    { prop: 'onPanelChange', desc: '面板变化回调', type: '(date: Date, mode) => void', default: '-' },
    { prop: 'onSelect', desc: '选择日期回调', type: '(date: Date) => void', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ];

  return (
    <>
      <div className="component-group">
        <h3>基础用法</h3>
        <div style={{ marginBottom: 12 }}>
          <span>选中日期：</span>
          <strong style={{ color: '#1890ff' }}>{formatDate(selectedDate)}</strong>
        </div>
        <DemoBlock
          code={`<Calendar
  onSelect={(date) => console.log(date)}
/>`}
        >
          <Calendar onSelect={(date) => setSelectedDate(date)} />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>卡片模式</h3>
        <DemoBlock
          code={`<Calendar fullscreen={false} />`}
        >
          <Calendar fullscreen={false} />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>受控用法</h3>
        <div style={{ marginBottom: 12 }}>
          <span>当前日期：</span>
          <strong style={{ color: '#1890ff' }}>{formatDate(controlledDate)}</strong>
        </div>
        <DemoBlock
          code={`const [date, setDate] = useState(new Date(2025, 0, 15));

<Calendar
  value={date}
  onChange={(d) => setDate(d)}
/>`}
        >
          <Calendar
            value={controlledDate}
            onChange={(d) => setControlledDate(d)}
          />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>禁用日期</h3>
        <DemoBlock
          code={`<Calendar
  disabledDate={(date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  }}
/>`}
        >
          <Calendar
            disabledDate={(date) => {
              const day = date.getDay();
              return day === 0 || day === 6;
            }}
          />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>自定义日期单元格</h3>
        <DemoBlock
          code={`<Calendar
  dateCellRender={(date) => {
    const day = date.getDate();
    if (day === 1) return <span style={{ color: '#1890ff' }}>💰</span>;
    if (day === 15) return <span style={{ color: '#f5222d' }}>📌</span>;
    if (day === 20) return <span style={{ color: '#52c41a' }}>✅</span>;
    return null;
  }}
/>`}
        >
          <Calendar
            dateCellRender={(date) => {
              const day = date.getDate();
              if (day === 1) return <span style={{ color: '#1890ff' }}>💰 工资日</span>;
              if (day === 15) return <span style={{ color: '#f5222d' }}>📌 会议</span>;
              if (day === 20) return <span style={{ color: '#52c41a' }}>✅ 发布</span>;
              return null;
            }}
          />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>年视图</h3>
        <DemoBlock
          code={`<Calendar mode="year" />`}
        >
          <Calendar mode="year" />
        </DemoBlock>
      </div>

      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>API</h3>
        <ApiTable dataSource={apiData} />
      </div>
    </>
  );
};

export default CalendarDemo;
