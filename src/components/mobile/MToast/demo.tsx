/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';

import type { DemoConfig } from '../../../pages/Components/Demo/types';
import MButton from '../MButton/MButton';
import MToast from './MToast';
import type { MToastPosition, MToastType } from './types';

const gridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 10
};

const BasicDemo = () => {
  const [toast, setToast] = useState<{ visible: boolean; type: MToastType; content: string }>({
    visible: false,
    type: 'info',
    content: ''
  });

  const open = (type: MToastType, content: string) => {
    setToast({ visible: true, type, content });
  };

  const close = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };

  return (
    <div className="mdemo-stack">
      <div style={gridStyle}>
        <MButton onClick={() => open('info', '已复制到剪贴板')}>纯文字提示</MButton>
        <MButton onClick={() => open('success', '保存成功')}>成功</MButton>
        <MButton onClick={() => open('error', '网络异常，请稍后重试')}>失败</MButton>
        <MButton onClick={() => open('warning', '电量不足 20%')}>警告</MButton>
      </div>
      <MToast
        inline
        visible={toast.visible}
        type={toast.type}
        content={toast.content}
        duration={1800}
        onClose={close}
      />
      <p className="mdemo-tip">
        info 为纯文字提示，success / error / warning 会显示对应图标；默认 2 秒后自动消失。
      </p>
    </div>
  );
};

const positions: { value: MToastPosition; label: string }[] = [
  { value: 'top', label: '顶部' },
  { value: 'center', label: '居中' },
  { value: 'bottom', label: '底部' }
];

const PositionDemo = () => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<MToastPosition>('center');

  const open = (value: MToastPosition) => {
    setPosition(value);
    setVisible(true);
  };

  return (
    <div className="mdemo-stack">
      <div style={{ display: 'flex', gap: 10 }}>
        {positions.map(item => (
          <MButton key={item.value} style={{ flex: 1 }} onClick={() => open(item.value)}>
            {item.label}
          </MButton>
        ))}
      </div>
      <MToast
        inline
        visible={visible}
        position={position}
        content="定位到当前方向的提示"
        duration={1600}
        onClose={() => setVisible(false)}
      />
      <p className="mdemo-tip">
        position 支持 top、center、bottom，默认居中；顶部与底部会自动避让安全区。
      </p>
    </div>
  );
};

const MaskDemo = () => {
  const [visible, setVisible] = useState(false);

  // 模拟提交请求：遮罩期间不允许操作，1.6 秒后自动关闭
  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => setVisible(false), 1600);
    return () => window.clearTimeout(timer);
  }, [visible]);

  return (
    <div className="mdemo-stack">
      <MButton type="primary" onClick={() => setVisible(true)}>
        提交订单
      </MButton>
      <MButton onClick={() => setVisible(true)}>遮罩会拦截这个按钮</MButton>
      <MToast
        inline
        visible={visible}
        type="loading"
        content="正在提交订单..."
        duration={0}
        mask
        onClose={() => setVisible(false)}
      />
      <p className="mdemo-tip">
        duration 传 0 时不自动关闭，由业务自行收起；mask 会拦截触摸，避免重复提交。
      </p>
    </div>
  );
};

const StaticDemo = () => {
  // 离开页面时清理残留的页面级提示
  useEffect(() => () => MToast.hide(), []);

  return (
    <div className="mdemo-stack">
      <MButton onClick={() => MToast.success('已加入购物车')}>MToast.success</MButton>
      <MButton onClick={() => MToast.info('已切换到夜间模式', 1500)}>MToast.info（1.5 秒）</MButton>
      <MButton onClick={() => MToast.show({ content: '已切换到底部提示', position: 'bottom' })}>
        MToast.show（底部）
      </MButton>
      <MButton
        onClick={() => {
          MToast.loading('正在上传...');
          window.setTimeout(() => MToast.hide(), 1600);
        }}
      >
        MToast.loading（1.6 秒后关闭）
      </MButton>
      <MButton onClick={() => MToast.hide()}>MToast.hide</MButton>
      <p className="mdemo-tip">
        静态方法渲染在页面级、覆盖整个视口，不受滚动位置影响；loading 默认不自动关闭，需要调用
        MToast.hide。
      </p>
    </div>
  );
};

const mToastDemo: DemoConfig = {
  intro:
    '移动端轻提示用于操作反馈，默认 2 秒自动消失且不打断当前操作。支持 info / success / error / warning / loading 五种类型、top / center / bottom 三个位置、透明遮罩与自定义图标，同时提供 MToast.show / hide 等静态方法。',
  demos: [
    {
      title: '基础用法',
      desc: 'type 决定图标与语义，content 为提示文字；duration 控制停留时间，0 表示不自动关闭。',
      code: `const [toast, setToast] = useState({ visible: false, type: 'info', content: '' });

<MButton onClick={() => setToast({ visible: true, type: 'success', content: '保存成功' })}>
  成功
</MButton>

<MToast
  visible={toast.visible}
  type={toast.type}
  content={toast.content}
  duration={1800}
  onClose={() => setToast(prev => ({ ...prev, visible: false }))}
/>`,
      render: <BasicDemo />
    },
    {
      title: '显示位置',
      desc: 'position 切换 top / center / bottom，顶部与底部自动避让安全区。',
      code: `<MToast visible={visible} position="top" content="顶部提示" />
<MToast visible={visible} position="center" content="居中提示" />
<MToast visible={visible} position="bottom" content="底部提示" />`,
      render: <PositionDemo />
    },
    {
      title: '加载与遮罩',
      desc: 'type 为 loading 时默认不自动关闭；mask 拦截触摸，适合提交、支付等不可重复操作的场景。',
      code: `<MToast
  visible={visible}
  type="loading"
  content="正在提交订单..."
  duration={0}
  mask
  onClose={() => setVisible(false)}
/>`,
      render: <MaskDemo />
    },
    {
      title: '静态方法',
      desc: '页面级调用无需管理 visible：MToast.success / error / warning / info / loading 与 MToast.show / hide。',
      code: `MToast.success('已加入购物车');
MToast.info('已切换到夜间模式', 1500);

MToast.loading('正在上传...');
setTimeout(() => MToast.hide(), 1600);

// 自定义配置
MToast.show({ content: '已切换到底部提示', position: 'bottom' });`,
      render: <StaticDemo />
    }
  ],
  api: [
    { prop: 'visible', desc: '是否显示（声明式用法）', type: 'boolean', default: 'false' },
    { prop: 'type', desc: '提示类型，info 为纯文字', type: "'info' | 'success' | 'error' | 'warning' | 'loading'", default: "'info'" },
    { prop: 'content', desc: '提示内容，也可用 children', type: 'ReactNode', default: '-' },
    { prop: 'position', desc: '显示位置', type: "'top' | 'center' | 'bottom'", default: "'center'" },
    { prop: 'duration', desc: '自动关闭时间（毫秒），0 不自动关闭；loading 默认 0', type: 'number', default: '2000' },
    { prop: 'mask', desc: '是否显示透明遮罩拦截触摸', type: 'boolean', default: 'false' },
    { prop: 'icon', desc: '自定义图标，传 null 可隐藏默认图标', type: 'ReactNode', default: '-' },
    { prop: 'inline', desc: '在最近定位父级内显示（预览场景）', type: 'boolean', default: 'false' },
    { prop: 'onClose', desc: '关闭回调，声明式用法需要它来同步 visible', type: '() => void', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' },
    { prop: 'MToast.show(config)', desc: '页面级显示提示', type: '(config?: MToastConfig) => void', default: '-' },
    { prop: 'MToast.hide()', desc: '关闭全部页面级提示', type: '() => void', default: '-' },
    { prop: 'MToast.success / error / warning / info', desc: '快捷提示', type: '(content?, duration?) => void', default: '-' },
    { prop: 'MToast.loading', desc: '加载提示，默认不自动关闭', type: '(content?, duration?) => void', default: '-' }
  ]
};

export default mToastDemo;
