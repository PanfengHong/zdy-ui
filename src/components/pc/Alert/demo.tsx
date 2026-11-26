import type { DemoConfig } from '../../../pages/Components/Demo/types';
import Alert from './Alert';

const alertDemo: DemoConfig = {
  demos: [
    {
      title: '基础示例',
      code: `<Alert>基础示例</Alert>\n<Alert type="success" message="操作成功" />\n<Alert type="warning" message="此操作将无法撤销" />\n<Alert type="error">\n  网络连接失败，请检查网络设置\n</Alert>`,
      render: (
        <div className="alert-group">
          <Alert>基础示例</Alert>

          <Alert type="success" message="操作成功" />

          <Alert type="warning" message="此操作将无法撤销" />

          <Alert type="error">
              网络连接失败，请检查网络设置
          </Alert>
        </div>
      ),
    },
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

export default alertDemo;
