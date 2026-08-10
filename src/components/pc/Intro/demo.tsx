import { useState, useRef } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Intro from './Intro';
import type { IntroStep } from './types';

const sharedBtnStyle: React.CSSProperties = {
  padding: '4px 14px',
  background: '#fff',
  border: '1px solid #d9d9d9',
  borderRadius: 4,
  cursor: 'pointer',
  fontSize: 14,
};

const primaryBtnStyle: React.CSSProperties = {
  ...sharedBtnStyle,
  color: '#1890ff',
  borderColor: '#1890ff',
};

const apiData = [
  { prop: 'steps', desc: '引导步骤数组', type: 'IntroStep[]', default: '[]' },
  { prop: 'defaultOpen', desc: '默认是否打开', type: 'boolean', default: 'false' },
  { prop: 'open', desc: '是否打开（受控）', type: 'boolean', default: '-' },
  { prop: 'current', desc: '当前步骤索引（受控）', type: 'number', default: '-' },
  { prop: 'defaultCurrent', desc: '默认步骤索引', type: 'number', default: '0' },
  { prop: 'mask', desc: '是否显示遮罩', type: 'boolean', default: 'true' },
  { prop: 'maskClosable', desc: '点击遮罩关闭', type: 'boolean', default: 'false' },
  { prop: 'showSteps', desc: '显示步骤计数', type: 'boolean', default: 'true' },
  { prop: 'showSkip', desc: '显示跳过按钮', type: 'boolean', default: 'true' },
  { prop: 'allowKeyboard', desc: '键盘控制（Esc/方向键）', type: 'boolean', default: 'true' },
  { prop: 'padding', desc: '高亮区域内边距', type: 'number', default: '4' },
  { prop: 'borderRadius', desc: '高亮圆角', type: 'number', default: '4' },
  { prop: 'scrollIntoView', desc: '自动滚动到目标', type: 'boolean', default: 'true' },
  { prop: 'highlightColor', desc: '高亮边框色', type: 'string', default: "'#1890ff'" },
  { prop: 'zIndex', desc: '层级', type: 'number', default: '1100' },
  { prop: 'onOpenChange', desc: '打开状态变化回调', type: 'function(open)', default: '-' },
  { prop: 'onCurrentChange', desc: '步骤变化回调', type: 'function(current)', default: '-' },
  { prop: 'onChange', desc: '步骤变化回调（兼容）', type: 'function(current)', default: '-' },
  { prop: 'onClose', desc: '关闭回调', type: 'function()', default: '-' },
  { prop: 'onDone', desc: '完成所有步骤回调', type: 'function()', default: '-' },
  { prop: 'onSkip', desc: '跳过回调', type: 'function()', default: '-' },
  { prop: 'onNext', desc: '下一步回调', type: 'function(current)', default: '-' },
  { prop: 'onPrev', desc: '上一步回调', type: 'function(current)', default: '-' },
  { prop: 'renderButtons', desc: '自定义按钮渲染', type: 'function(ctx)', default: '-' },
];

const stepApiData = [
  { prop: 'target', desc: '目标元素（选择器/元素/函数）', type: 'string | HTMLElement | function', default: '-' },
  { prop: 'title', desc: '标题', type: 'ReactNode', default: '-' },
  { prop: 'content', desc: '内容', type: 'ReactNode', default: '-' },
  { prop: 'placement', desc: '气泡位置', type: 'IntroPlacement', default: "'bottom'" },
  { prop: 'nextBtnText', desc: '下一步按钮文本', type: 'string', default: "'下一步'" },
  { prop: 'prevBtnText', desc: '上一步按钮文本', type: 'string', default: "'上一步'" },
  { prop: 'doneBtnText', desc: '完成按钮文本', type: 'string', default: "'完成'" },
  { prop: 'hidePrev', desc: '隐藏上一步', type: 'boolean', default: 'false' },
  { prop: 'hideNext', desc: '隐藏下一步', type: 'boolean', default: 'false' },
];

const IntroDemo = () => {
  const demos = [
    {
      title: '非受控用法',
      code: `<Intro steps={steps} defaultOpen />`,
      render: <NonControlledDemo />,
    },
    {
      title: '自定义按钮文本',
      code: `const steps = [\n  { target, title, content, nextBtnText: '前进', prevBtnText: '后退', doneBtnText: '结束' }\n];\n<Intro steps={steps} open={open} onOpenChange={setOpen} />`,
      render: <CustomTextDemo />,
    },
    {
      title: '不同位置',
      code: `const steps = [\n  { target, placement: 'right' },\n  { target, placement: 'top' },\n  { target, placement: 'left' },\n];\n<Intro steps={steps} open={open} onOpenChange={setOpen} />`,
      render: <PlacementDemo />,
    },
    {
      title: '事件回调',
      code: `<Intro\n  steps={steps}\n  open={open}\n  onOpenChange={setOpen}\n  onNext={(c) => console.log('next', c)}\n  onPrev={(c) => console.log('prev', c)}\n  onDone={() => console.log('done')}\n  onSkip={() => console.log('skip')}\n/>`,
      render: <EventDemo />,
    },
    {
      title: '无遮罩 & 自定义高亮色',
      code: `<Intro steps={steps} mask={false} highlightColor="#722ed1" />`,
      render: <NoMaskDemo />,
    },
  ];

  return (
    <>
      <div className="component-group">
        <h3>基础用法</h3>
        <p style={{ color: '#666', margin: '8px 0' }}>
          通过 ref 或选择器指定目标元素，点击按钮启动引导。
        </p>
        <DemoBlock
          code={`const [open, setOpen] = useState(false);\nconst btn1 = useRef(null);\nconst btn2 = useRef(null);\nconst btn3 = useRef(null);\n\nconst steps = [\n  { target: () => btn1.current, title: '第一步', content: '...', placement: 'bottom' },\n  { target: () => btn2.current, title: '第二步', content: '...', placement: 'bottom' },\n  { target: () => btn3.current, title: '最后一步', content: '...', placement: 'top' },\n];\n\n<Intro steps={steps} open={open} onOpenChange={setOpen} />\n<button onClick={() => setOpen(true)}>开始引导</button>`}
        >
          <BasicDemo />
        </DemoBlock>
      </div>

      {demos.map((demo) => (
        <div key={demo.title} className="component-group">
          <h3>{demo.title}</h3>
          <DemoBlock code={demo.code}>{demo.render}</DemoBlock>
        </div>
      ))}

      <div className="component-group">
        <h3>键盘控制</h3>
        <p style={{ color: '#666', margin: '8px 0' }}>
          引导打开时：按 <kbd>→</kbd> 下一步，<kbd>←</kbd> 上一步，<kbd>Esc</kbd> 关闭。
        </p>
        <DemoBlock
          code={`<Intro steps={steps} allowKeyboard open={open} onOpenChange={setOpen} />`}
        >
          <KeyboardDemo />
        </DemoBlock>
      </div>

      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>API - Intro</h3>
        <ApiTable dataSource={apiData} />
      </div>

      <div className="component-group">
        <h3>API - IntroStep</h3>
        <ApiTable dataSource={stepApiData} />
      </div>
    </>
  );
};

// ============ 各 demo 独立组件（独立 ref，避免冲突） ============

// 基础用法
const BasicDemo = () => {
  const [open, setOpen] = useState(false);
  const btn1Ref = useRef<HTMLButtonElement>(null);
  const btn2Ref = useRef<HTMLButtonElement>(null);
  const btn3Ref = useRef<HTMLButtonElement>(null);

  const steps: IntroStep[] = [
    { target: () => btn1Ref.current, title: '第一步', content: '这是第一个引导步骤，介绍了按钮 1 的功能。', placement: 'bottom' },
    { target: () => btn2Ref.current, title: '第二步', content: '这是第二个引导步骤，介绍了按钮 2 的功能。', placement: 'bottom' },
    { target: () => btn3Ref.current, title: '最后一步', content: '这是最后一个引导步骤，点击完成结束引导。', placement: 'top' },
  ];

  return (
    <>
      <div style={{ display: 'flex', gap: 16, marginBottom: 12, alignItems: 'center' }}>
        <button ref={btn1Ref} style={sharedBtnStyle}>按钮 1</button>
        <button ref={btn2Ref} style={sharedBtnStyle}>按钮 2</button>
        <button ref={btn3Ref} style={sharedBtnStyle}>按钮 3</button>
        <button style={primaryBtnStyle} onClick={() => setOpen(true)}>开始引导</button>
      </div>
      <Intro steps={steps} open={open} onOpenChange={setOpen} />
    </>
  );
};

// 非受控
const NonControlledDemo = () => {
  const [open, setOpen] = useState(false);
  const btn1Ref = useRef<HTMLButtonElement>(null);
  const btn2Ref = useRef<HTMLButtonElement>(null);
  const btn3Ref = useRef<HTMLButtonElement>(null);

  const steps: IntroStep[] = [
    { target: () => btn1Ref.current, title: '非受控模式', content: '通过 defaultOpen 启动。', placement: 'bottom' },
    { target: () => btn2Ref.current, title: '第二步', content: '内部状态自动管理。', placement: 'bottom' },
    { target: () => btn3Ref.current, title: '完成', content: '点击完成结束。', placement: 'top' },
  ];

  return (
    <>
      <div style={{ display: 'flex', gap: 16, marginBottom: 12, alignItems: 'center' }}>
        <button ref={btn1Ref} style={sharedBtnStyle}>按钮 1</button>
        <button ref={btn2Ref} style={sharedBtnStyle}>按钮 2</button>
        <button ref={btn3Ref} style={sharedBtnStyle}>按钮 3</button>
        <button style={primaryBtnStyle} onClick={() => setOpen(true)}>启动（非受控）</button>
      </div>
      <Intro steps={steps} open={open} onOpenChange={setOpen} />
    </>
  );
};

// 自定义按钮文本
const CustomTextDemo = () => {
  const [open, setOpen] = useState(false);
  const btn1Ref = useRef<HTMLButtonElement>(null);
  const btn2Ref = useRef<HTMLButtonElement>(null);

  const steps: IntroStep[] = [
    {
      target: () => btn1Ref.current,
      title: '自定义按钮',
      content: '可以通过 nextBtnText、prevBtnText、doneBtnText 自定义按钮文本。',
      placement: 'bottom',
      nextBtnText: '前进',
      prevBtnText: '后退',
      doneBtnText: '结束',
    },
    {
      target: () => btn2Ref.current,
      title: '即将完成',
      content: '这是最后一步。',
      placement: 'bottom',
      nextBtnText: '前进',
      prevBtnText: '后退',
      doneBtnText: '结束',
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', gap: 16, marginBottom: 12, alignItems: 'center' }}>
        <button ref={btn1Ref} style={sharedBtnStyle}>按钮 1</button>
        <button ref={btn2Ref} style={sharedBtnStyle}>按钮 2</button>
        <button style={primaryBtnStyle} onClick={() => setOpen(true)}>开始引导</button>
      </div>
      <Intro steps={steps} open={open} onOpenChange={setOpen} />
    </>
  );
};

// 不同位置
const PlacementDemo = () => {
  const [open, setOpen] = useState(false);
  const btn1Ref = useRef<HTMLButtonElement>(null);
  const btn2Ref = useRef<HTMLButtonElement>(null);
  const btn3Ref = useRef<HTMLButtonElement>(null);

  const steps: IntroStep[] = [
    { target: () => btn1Ref.current, title: 'right', content: '展示在右侧', placement: 'right' },
    { target: () => btn2Ref.current, title: 'top', content: '展示在上方', placement: 'top' },
    { target: () => btn3Ref.current, title: 'left', content: '展示在左侧', placement: 'left' },
  ];

  return (
    <>
      <div style={{ display: 'flex', gap: 16, marginBottom: 12, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <button ref={btn1Ref} style={sharedBtnStyle}>按钮 1</button>
        <button ref={btn2Ref} style={sharedBtnStyle}>按钮 2</button>
        <button ref={btn3Ref} style={sharedBtnStyle}>按钮 3</button>
        <button style={primaryBtnStyle} onClick={() => setOpen(true)}>开始引导</button>
      </div>
      <Intro steps={steps} open={open} onOpenChange={setOpen} />
    </>
  );
};

// 事件回调
const EventDemo = () => {
  const [open, setOpen] = useState(false);
  const [log, setLog] = useState<string>('未触发');
  const btn1Ref = useRef<HTMLButtonElement>(null);
  const btn2Ref = useRef<HTMLButtonElement>(null);
  const btn3Ref = useRef<HTMLButtonElement>(null);

  const steps: IntroStep[] = [
    { target: () => btn1Ref.current, title: '第一步', content: '这是第一个引导步骤。', placement: 'bottom' },
    { target: () => btn2Ref.current, title: '第二步', content: '这是第二个引导步骤。', placement: 'bottom' },
    { target: () => btn3Ref.current, title: '最后一步', content: '点击完成结束引导。', placement: 'top' },
  ];

  return (
    <>
      <div style={{ display: 'flex', gap: 16, marginBottom: 12, alignItems: 'center' }}>
        <button ref={btn1Ref} style={sharedBtnStyle}>按钮 1</button>
        <button ref={btn2Ref} style={sharedBtnStyle}>按钮 2</button>
        <button ref={btn3Ref} style={sharedBtnStyle}>按钮 3</button>
        <button style={primaryBtnStyle} onClick={() => setOpen(true)}>开始引导</button>
      </div>
      <span style={{ fontSize: 12, color: '#666' }}>最近事件：{log}</span>
      <Intro
        steps={steps}
        open={open}
        onOpenChange={setOpen}
        onNext={(c) => setLog(`onNext(${c})`)}
        onPrev={(c) => setLog(`onPrev(${c})`)}
        onDone={() => setLog('onDone()')}
        onSkip={() => setLog('onSkip()')}
        onClose={() => setLog('onClose()')}
      />
    </>
  );
};

// 无遮罩
const NoMaskDemo = () => {
  const [open, setOpen] = useState(false);
  const btn1Ref = useRef<HTMLButtonElement>(null);
  const btn2Ref = useRef<HTMLButtonElement>(null);
  const btn3Ref = useRef<HTMLButtonElement>(null);

  const steps: IntroStep[] = [
    { target: () => btn1Ref.current, title: '无遮罩', content: 'mask={false} 关闭遮罩。', placement: 'bottom' },
    { target: () => btn2Ref.current, title: '紫色高亮', content: 'highlightColor="#722ed1"', placement: 'bottom' },
    { target: () => btn3Ref.current, title: '完成', content: '引导结束。', placement: 'top' },
  ];

  return (
    <>
      <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
        <button ref={btn1Ref} style={sharedBtnStyle}>按钮 1</button>
        <button ref={btn2Ref} style={sharedBtnStyle}>按钮 2</button>
        <button ref={btn3Ref} style={sharedBtnStyle}>按钮 3</button>
        <button
          style={{ ...sharedBtnStyle, color: '#722ed1', borderColor: '#722ed1' }}
          onClick={() => setOpen(true)}
        >
          开始引导
        </button>
      </div>
      <Intro steps={steps} open={open} onOpenChange={setOpen} mask={false} highlightColor="#722ed1" />
    </>
  );
};

// 键盘控制
const KeyboardDemo = () => {
  const [open, setOpen] = useState(false);
  const btn1Ref = useRef<HTMLButtonElement>(null);
  const btn2Ref = useRef<HTMLButtonElement>(null);
  const btn3Ref = useRef<HTMLButtonElement>(null);

  const steps: IntroStep[] = [
    { target: () => btn1Ref.current, title: '键盘控制', content: '按 → 下一步，← 上一步，Esc 关闭。', placement: 'bottom' },
    { target: () => btn2Ref.current, title: '第二步', content: '继续按 →。', placement: 'bottom' },
    { target: () => btn3Ref.current, title: '完成', content: '按 Esc 可随时关闭。', placement: 'top' },
  ];

  return (
    <>
      <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
        <button ref={btn1Ref} style={sharedBtnStyle}>按钮 1</button>
        <button ref={btn2Ref} style={sharedBtnStyle}>按钮 2</button>
        <button ref={btn3Ref} style={sharedBtnStyle}>按钮 3</button>
        <button style={primaryBtnStyle} onClick={() => setOpen(true)}>开始引导</button>
      </div>
      <Intro steps={steps} open={open} onOpenChange={setOpen} allowKeyboard />
    </>
  );
};

export default IntroDemo;
