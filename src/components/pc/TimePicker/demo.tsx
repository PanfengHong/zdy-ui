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

  return (
    <>
      <div className="component-group">
        <h3>基础用法</h3>
        <div style={{ marginBottom: 12 }}>
          <span>选中时间：</span>
          <strong style={{ color: '#1890ff' }}>{fmt(value)}</strong>
        </div>
        <DemoBlock code={`<TimePicker onChange={(t) => setValue(t)} />`}>
          <TimePicker onChange={(t) => setValue(t)} />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>受控用法</h3>
        <div style={{ marginBottom: 12 }}>
          <span>当前时间：</span>
          <strong style={{ color: '#1890ff' }}>{fmt(controlled)}</strong>
        </div>
        <DemoBlock
          code={`const [time, setTime] = useState(new Date(2025, 0, 1, 9, 30, 0));

<TimePicker value={time} onChange={(t) => setTime(t)} />`}
        >
          <TimePicker value={controlled} onChange={(t) => setControlled(t)} />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>步长</h3>
        <DemoBlock code={`<TimePicker hourStep={2} minuteStep={15} secondStep={10} />`}>
          <TimePicker hourStep={2} minuteStep={15} secondStep={10} />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>禁用选项</h3>
        <DemoBlock
          code={`<TimePicker
  disabledHours={() => [0, 1, 2, 3, 4, 5]}
  disabledMinutes={(h) => (h === 9 ? [30, 31, 32] : [])}
/>`}
        >
          <TimePicker
            disabledHours={() => [0, 1, 2, 3, 4, 5]}
            disabledMinutes={(h) => (h === 9 ? [30, 31, 32] : [])}
            hideDisabledOptions
          />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>禁用与尺寸</h3>
        <DemoBlock code={`<TimePicker disabled /><TimePicker size="small" /><TimePicker size="large" />`}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <TimePicker disabled />
            <TimePicker size="small" />
            <TimePicker size="large" />
          </div>
        </DemoBlock>
      </div>

      <div className="component-group" style={{ marginTop: 32 }}>
        <h3>API</h3>
        <ApiTable dataSource={apiData} />
      </div>
    </>
  );
};

export default TimePickerDemo;
