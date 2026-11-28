/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';

import type { DemoConfig } from '../../../pages/Components/Demo/types';
import MButton from '../MButton/MButton';
import MMessage from './MMessage';
import type { MMessageType } from './types';

const gridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 10
};

// 演示用：将静态方法的横幅挂载到手机预览容器内，而不是整个页面
const usePhoneContainer = () => {
  useEffect(() => {
    MMessage.config({
      getContainer: () =>
        document.querySelector<HTMLElement>('.iphone-content') ?? document.body
    });
    return () => {
      MMessage.hide();
      MMessage.config({ getContainer: () => document.body });
    };
  }, []);
};

const BasicDemo = () => {
  const [message, setMessage] = useState<{ visible: boolean; type: MMessageType; content: string }>({
    visible: false,
    type: 'info',
    content: ''
  });

  const open = (type: MMessageType, content: string) => {
    setMessage({ visible: true, type, content });
  };

  const close = () => {
    setMessage(prev => ({ ...prev, visible: false }));
  };

  return (
    <div className="mdemo-stack">
      <div style={gridStyle}>
        <MButton onClick={() => open('info', '网络连接已恢复')}>普通</MButton>
        <MButton onClick={() => open('success', '订单提交成功')}>成功</MButton>
        <MButton onClick={() => open('warning', '优惠券即将过期')}>警告</MButton>
        <MButton onClick={() => open('error', '支付失败，请重试')}>错误</MButton>
      </div>
      <MMessage
        inline
        visible={message.visible}
        type={message.type}
        content={message.content}
        duration={2500}
        onClose={close}
      />
      <p className="mdemo-tip">
        type 决定左侧强调色与图标；默认 3 秒自动消失，右上角可手动关闭，多条消息自上而下排列。
      </p>
    </div>
  );
};

const PersistentDemo = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="mdemo-stack">
      <MButton type="primary" onClick={() => setVisible(true)}>
        显示常驻横幅
      </MButton>
      <MButton disabled={!visible} onClick={() => setVisible(false)}>
        通过代码关闭
      </MButton>
      <MMessage
        inline
        visible={visible}
        type="warning"
        content="当前网络不可用，已切换为离线模式"
        duration={0}
        onClose={() => setVisible(false)}
      />
      <p className="mdemo-tip">
        duration 传 0 时不自动关闭，由业务自行收起；closable 传 false 可隐藏右上角关闭按钮。
      </p>
    </div>
  );
};

const StackDemo = () => {
  usePhoneContainer();

  return (
    <div className="mdemo-stack">
      <MButton
        onClick={() => {
          MMessage.success('草稿已保存', 5000);
          MMessage.warning('有 2 条待审核评论', 5000);
          MMessage.info('新版本已发布', 5000);
        }}
      >
        同时显示三条
      </MButton>
      <MButton onClick={() => MMessage.hide()}>关闭全部横幅</MButton>
      <p className="mdemo-tip">
        静态调用按先后顺序从顶部堆叠，每条独立计时；示例通过 MMessage.config 把横幅限制在手机预览容器内。
      </p>
    </div>
  );
};

const StaticDemo = () => {
  usePhoneContainer();

  return (
    <div className="mdemo-stack">
      <MButton onClick={() => MMessage.info('已切换到夜间模式', 1500)}>MMessage.info</MButton>
      <MButton onClick={() => MMessage.error('上传失败，请检查网络', 2500)}>MMessage.error</MButton>
      <MButton onClick={() => MMessage.show({ content: '数据同步完成', type: 'success' })}>
        MMessage.show（自定义）
      </MButton>
      <MButton onClick={() => MMessage.hide()}>MMessage.hide</MButton>
      <p className="mdemo-tip">
        默认挂载到 document.body 并覆盖整个视口；示例通过 config
        方法把横幅限制在手机预览容器内，横幅位于其他弹层之上、轻提示之下。
      </p>
    </div>
  );
};

const mMessageDemo: DemoConfig = {
  intro:
    '移动端消息横幅固定在页面顶部，并自动避让 iPhone 刘海 / 灵动岛安全区（页面级用法需宿主页面设置 viewport-fit=cover）。用于网络状态、保存结果、待办提醒等需要稍作停留的反馈；支持四种类型、自动关闭、手动关闭、多条堆叠，并提供 MMessage.show / hide 等静态方法，可通过 MMessage.config 指定挂载容器。',
  demos: [
    {
      title: '基础用法',
      desc: 'type 决定强调色与图标，content 为提示文字；默认 3 秒自动消失。',
      code: `const [message, setMessage] = useState({ visible: false, type: 'info', content: '' });

<MButton onClick={() => setMessage({ visible: true, type: 'success', content: '订单提交成功' })}>
  成功
</MButton>

<MMessage
  visible={message.visible}
  type={message.type}
  content={message.content}
  onClose={() => setMessage(prev => ({ ...prev, visible: false }))}
/>`,
      render: <BasicDemo />
    },
    {
      title: '常驻与手动关闭',
      desc: 'duration 传 0 时横幅常驻，用户点右上角关闭按钮或通过业务代码收起。',
      code: `<MMessage
  visible={visible}
  type="warning"
  content="当前网络不可用，已切换为离线模式"
  duration={0}
  onClose={() => setVisible(false)}
/>`,
      render: <PersistentDemo />
    },
    {
      title: '多条堆叠',
      desc: '连续调用静态方法时，横幅按先后顺序从顶部堆叠，每条独立计时。',
      code: `// 可选：把页面级横幅挂到手机预览容器内
MMessage.config({ getContainer: () => phoneRef.current });

MMessage.success('草稿已保存', 5000);
MMessage.warning('有 2 条待审核评论', 5000);
MMessage.info('新版本已发布', 5000);

MMessage.hide(); // 一次关闭全部`,
      render: <StackDemo />
    },
    {
      title: '静态方法',
      desc: '页面级调用无需管理 visible：MMessage.show / hide 与 info / success / warning / error 快捷方法。',
      code: `// 指定挂载容器后，横幅会约束在该容器内
MMessage.config({ getContainer: () => phoneRef.current });

MMessage.info('已切换到夜间模式', 1500);
MMessage.error('上传失败，请检查网络', 2500);

MMessage.show({ content: '数据同步完成', type: 'success' });
MMessage.hide();`,
      render: <StaticDemo />
    }
  ],
  api: [
    { prop: 'visible', desc: '是否显示（声明式用法）', type: 'boolean', default: 'false' },
    { prop: 'type', desc: '提示类型，决定强调色与图标', type: "'info' | 'success' | 'warning' | 'error'", default: "'info'" },
    { prop: 'content', desc: '提示内容，也可用 children', type: 'ReactNode', default: '-' },
    { prop: 'duration', desc: '自动关闭时间（毫秒），0 表示不自动关闭', type: 'number', default: '3000' },
    { prop: 'showIcon', desc: '是否显示类型图标', type: 'boolean', default: 'true' },
    { prop: 'closable', desc: '是否显示右上角关闭按钮', type: 'boolean', default: 'true' },
    { prop: 'inline', desc: '在最近定位父级内显示（预览场景）', type: 'boolean', default: 'false' },
    { prop: 'onClose', desc: '关闭回调，声明式用法需要它来同步 visible', type: '() => void', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' },
    { prop: 'MMessage.show(config)', desc: '页面级显示横幅', type: '(config?: MMessageConfig) => void', default: '-' },
    { prop: 'MMessage.hide()', desc: '关闭全部页面级横幅', type: '() => void', default: '-' },
    { prop: 'MMessage.config(options)', desc: '配置静态方法的挂载容器，下一次 show 生效', type: '(options?: MMessageGlobalConfig) => void', default: 'document.body' },
    { prop: 'config.getContainer', desc: '返回横幅挂载容器', type: '() => HTMLElement', default: 'document.body' },
    { prop: 'MMessage.info / success / warning / error', desc: '快捷横幅', type: '(content?, duration?) => void', default: '-' }
  ]
};

export default mMessageDemo;
