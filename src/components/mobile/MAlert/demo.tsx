import type { DemoConfig } from '../../../pages/Components/Demo/types';
import MAlert from './MAlert';

const mAlertDemo: DemoConfig = {
  intro:
    '移动端提醒用于页面内展示重要信息，支持四种状态与图标，可通过 closable 手动关闭。',
  demos: [
    {
      title: '基础用法',
      desc: '通过 type 与 message 设置提示类型与内容。',
      code: `<MAlert type="info" message="这是一条普通提示" />
<MAlert type="success" title="提交成功" message="信息已保存" />`,
      render: (
        <div className="mdemo-stack">
          <MAlert type="info" message="这是一条普通提示" />
          <MAlert type="success" title="提交成功" message="信息已保存" />
        </div>
      )
    },
    {
      title: '警告与错误',
      desc: '使用 warning、error 表达不同严重程度。',
      code: `<MAlert type="warning" message="当前网络不稳定" />
<MAlert type="error" message="操作失败，请重试" />`,
      render: (
        <div className="mdemo-stack">
          <MAlert type="warning" message="当前网络不稳定" />
          <MAlert type="error" message="操作失败，请重试" />
        </div>
      )
    }
  ],
  api: [
    { prop: 'type', desc: '警告类型', type: "'success' | 'info' | 'warning' | 'error'", default: 'info' },
    { prop: 'title', desc: '标题', type: 'ReactNode', default: '-' },
    { prop: 'message', desc: '内容', type: 'ReactNode', default: '-' },
    { prop: 'closable', desc: '是否可关闭', type: 'boolean', default: 'false' },
    { prop: 'showIcon', desc: '是否显示图标', type: 'boolean', default: 'true' },
    { prop: 'onClose', desc: '关闭回调', type: 'function', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ],
};

export default mAlertDemo;
