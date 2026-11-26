import { useState } from 'react';
import type { DemoConfig } from '../../../pages/Components/Demo/types';
import Calendar from './Calendar';

const formatDate = (date: Date | null): string => {
  if (!date) return '未选择';
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const BasicCalendarDemo = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <span>选中日期：</span>
        <strong style={{ color: '#1890ff' }}>{formatDate(selectedDate)}</strong>
      </div>
      <Calendar onSelect={(date) => setSelectedDate(date)} />
    </>
  );
};

const ControlledCalendarDemo = () => {
  const [controlledDate, setControlledDate] = useState(new Date(2025, 0, 15));

  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <span>当前日期：</span>
        <strong style={{ color: '#1890ff' }}>{formatDate(controlledDate)}</strong>
      </div>
      <Calendar
        value={controlledDate}
        onChange={(d) => setControlledDate(d)}
      />
    </>
  );
};

const calendarDemo: DemoConfig = {
  demos: [
    {
      title: '基础用法',
      code: `<Calendar\n  onSelect={(date) => console.log(date)}\n/>`,
      render: <BasicCalendarDemo />,
    },
    {
      title: '卡片模式',
      code: `<Calendar fullscreen={false} />`,
      render: <Calendar fullscreen={false} />,
    },
    {
      title: '受控用法',
      code: `const [date, setDate] = useState(new Date(2025, 0, 15));\n\n<Calendar\n  value={date}\n  onChange={(d) => setDate(d)}\n/>`,
      render: <ControlledCalendarDemo />,
    },
    {
      title: '禁用日期',
      code: `<Calendar\n  disabledDate={(date) => {\n    const day = date.getDay();\n    return day === 0 || day === 6;\n  }}\n/>`,
      render: (
        <Calendar
          disabledDate={(date) => {
            const day = date.getDay();
            return day === 0 || day === 6;
          }}
        />
      ),
    },
    {
      title: '自定义日期单元格',
      code: `<Calendar\n  dateCellRender={(date) => {\n    const day = date.getDate();\n    if (day === 1) return <span style={{ color: '#1890ff' }}>💰</span>;\n    if (day === 15) return <span style={{ color: '#f5222d' }}>📌</span>;\n    if (day === 20) return <span style={{ color: '#52c41a' }}>✅</span>;\n    return null;\n  }}\n/>`,
      render: (
        <Calendar
          dateCellRender={(date) => {
            const day = date.getDate();
            if (day === 1) return <span style={{ color: '#1890ff' }}>💰 工资日</span>;
            if (day === 15) return <span style={{ color: '#f5222d' }}>📌 会议</span>;
            if (day === 20) return <span style={{ color: '#52c41a' }}>✅ 发布</span>;
            return null;
          }}
        />
      ),
    },
    {
      title: '年视图',
      code: `<Calendar mode="year" />`,
      render: <Calendar mode="year" />,
    },
  ],
  api: [
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
  ],
};

export default calendarDemo;
