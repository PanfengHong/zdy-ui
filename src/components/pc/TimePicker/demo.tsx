import { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import TimePicker from './TimePicker';

const TimePickerDemo = () => {
  const [value, setValue] = useState<Date | null>(null);
  const [controlled, setControlled] = useState<Date | null>(new Date(2025, 0, 1, 9, 30, 0));

  const fmt = (d: Date | null) => {
    if (!d) return '未选择';
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
  };

  const apiData = [
    { prop: 'value', desc: '当前时间（受控）', type: 'Date | null', default: '-' },
    { prop: 'defaultValue', desc: '默认时间', type: 'Date | null', default: 'null' },
    { prop: 'format', desc: '展示格式（支持 HH mm ss）', type: 'string', default: "'HH:mm:ss'" },
    { prop: 'placeholder', desc: '占位文本', type: 'string', default: "'请选择时间'" },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' },
    { prop: 'allowClear', desc: '是否允许清除', type: 'boolean', default: 'true' },
    { prop: 'size', desc: '尺寸', type: "'small' | 'medium' | 'large'", default: "'medium'" },
    { prop: 'hourStep', desc: '小时步长', type: 'number', default: '1' },
    { prop: 'minuteStep', desc: '分钟步长', type: 'number', default: '1' },
    { prop: 'secondStep', desc: '秒步长', type: 'number', default: '1' },
    { prop: 'use12Hours', desc: '是否使用 12 小时制', type: 'boolean', default: 'false' },
    { prop: 'disabledHours', desc: '禁用的小时', type: '() => number[]', default: '-' },
    { prop: 'disabledMinutes', desc: '禁用的分钟', type: '(hour) => number[]', default: '-' },
    { prop: 'disabledSeconds', desc: '禁用的秒', type: '(hour, minute) => number[]', default: '-' },
    { prop: 'hideDisabledOptions', desc: '是否隐藏禁用项', type: 'boolean', default: 'false' },
    { prop: 'onChange', desc: '时间变化回调', type: '(date: Date | null) => void', default: '-' },
    { prop: 'onOpenChange', desc: '面板展开状态变化回调', type: '(open: boolean) => void', default: '-' },
  ];

  const demos = [
    {
      title: '基础用法',
      code: `<TimePicker onChange={(t) => setValue(t)} />`,
      render: (
        <>
          <div style={{ marginBottom: 12 }}>
            <span>选中时间：</span>
            <strong style={{ color: '#1890ff' }}>{fmt(value)}</strong>
          </div>
          <TimePicker onChange={(t) => setValue(t)} />
        </>
      ),
    },
    {
      title: '受控用法',
      code: `const [time, setTime] = useState(new Date(2025, 0, 1, 9, 30, 0));\n\n<TimePicker value={time} onChange={(t) => setTime(t)} />`,
      render: (
        <>
          <div style={{ marginBottom: 12 }}>
            <span>当前时间：</span>
            <strong style={{ color: '#1890ff' }}>{fmt(controlled)}</strong>
          </div>
          <TimePicker value={controlled} onChange={(t) => setControlled(t)} />
        </>
      ),
    },
    {
      title: '步长',
      code: `<TimePicker hourStep={2} minuteStep={15} secondStep={10} />`,
      render: <TimePicker hourStep={2} minuteStep={15} secondStep={10} />,
    },
    {
      title: '禁用选项',
      code: `<TimePicker\n  disabledHours={() => [0, 1, 2, 3, 4, 5]}\n  disabledMinutes={(h) => (h === 9 ? [30, 31, 32] : [])}\n/>`,
      render: (
        <TimePicker
          disabledHours={() => [0, 1, 2, 3, 4, 5]}
          disabledMinutes={(h) => (h === 9 ? [30, 31, 32] : [])}
          hideDisabledOptions
        />
      ),
    },
    {
      title: '禁用与尺寸',
      code: `<TimePicker disabled /><TimePicker size="small" /><TimePicker size="large" />`,
      render: (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <TimePicker disabled />
          <TimePicker size="small" />
          <TimePicker size="large" />
        </div>
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

export default TimePickerDemo;
