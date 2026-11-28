/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';

import type { DemoConfig } from '../../../pages/Components/Demo/types';
import MButton from '../MButton/MButton';
import MDialog from './MDialog';

const BasicDemo = () => {
  const [visible, setVisible] = useState(false);
  const [result, setResult] = useState('');

  const confirm = () => {
    setVisible(false);
    setResult('已提交申请');
  };

  return (
    <div className="mdemo-stack">
      <MButton type="primary" onClick={() => setVisible(true)}>
        打开弹框
      </MButton>
      <p className="mdemo-tip">{result || '尚未操作'}</p>
      <MDialog
        inline
        visible={visible}
        title="提交申请"
        description="提交后可在「我的申请」中查看进度"
        onClose={() => setVisible(false)}
        footer={
          <>
            <MButton onClick={() => setVisible(false)}>取消</MButton>
            <MButton type="primary" onClick={confirm}>
              确定提交
            </MButton>
          </>
        }
      >
        确认提交本次申请吗？提交后将进入审核流程，审核结果会通过消息通知你。
      </MDialog>
    </div>
  );
};

const CustomFooterDemo = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="mdemo-stack">
      <MButton onClick={() => setVisible(true)}>开启消息通知</MButton>
      <MDialog
        inline
        visible={visible}
        title="开启消息通知"
        description="及时获取订单状态与配送信息"
        maskClosable={false}
        onClose={() => setVisible(false)}
        footer={
          <div style={{ display: 'flex', gap: 10 }}>
            <MButton style={{ flex: 1 }} onClick={() => setVisible(false)}>
              暂不开启
            </MButton>
            <MButton type="primary" style={{ flex: 1 }} onClick={() => setVisible(false)}>
              立即开启
            </MButton>
          </div>
        }
      >
        <div
          style={{
            padding: '12px 14px',
            borderRadius: 12,
            backgroundColor: '#f5f7fa',
            fontSize: 13,
            lineHeight: 1.6,
            color: '#4b5563'
          }}
        >
          你将在订单支付、发货、签收等节点收到推送，可随时在系统设置中关闭。
        </div>
      </MDialog>
    </div>
  );
};

const ScrollDemo = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="mdemo-stack">
      <MButton onClick={() => setVisible(true)}>查看服务协议</MButton>
      <MDialog
        inline
        visible={visible}
        title="服务协议"
        onClose={() => setVisible(false)}
        footer={
          <MButton type="primary" onClick={() => setVisible(false)}>
            我知道了
          </MButton>
        }
      >
        {Array.from({ length: 10 }, (_, index) => (
          <p key={index} style={{ margin: index === 0 ? 0 : '12px 0 0' }}>
            {index + 1}. 本协议是你与本平台就使用服务所订立的约定，请在确认前仔细阅读并充分理解各条款内容，特别是免除或限制责任的条款。
          </p>
        ))}
      </MDialog>
    </div>
  );
};

const mDialogDemo: DemoConfig = {
  intro:
    '移动端弹框居中显示，宽度随屏幕自适应并在两侧留出安全边距。正文超出最大高度时内部滚动，底部按钮铺满宽度便于单手操作，可通过遮罩、关闭按钮或 ESC 关闭。',
  demos: [
    {
      title: '基础用法',
      desc: '通过 visible 控制显示，title 与 description 说明弹框主题，footer 放置确认与取消操作。',
      code: `<MButton onClick={() => setVisible(true)}>打开弹框</MButton>

<MDialog
  visible={visible}
  title="提交申请"
  description="提交后可在「我的申请」中查看进度"
  onClose={() => setVisible(false)}
  footer={
    <>
      <MButton onClick={() => setVisible(false)}>取消</MButton>
      <MButton type="primary" onClick={handleConfirm}>确定提交</MButton>
    </>
  }
>
  确认提交本次申请吗？提交后将进入审核流程，审核结果会通过消息通知你。
</MDialog>`,
      render: <BasicDemo />
    },
    {
      title: '自定义底部操作',
      desc: 'footer 可完全自定义，按钮可横向排列；maskClosable={false} 时点击遮罩不会关闭。',
      code: `<MDialog
  visible={visible}
  title="开启消息通知"
  description="及时获取订单状态与配送信息"
  maskClosable={false}
  onClose={() => setVisible(false)}
  footer={
    <div style={{ display: 'flex', gap: 10 }}>
      <MButton style={{ flex: 1 }} onClick={() => setVisible(false)}>暂不开启</MButton>
      <MButton type="primary" style={{ flex: 1 }} onClick={() => setVisible(false)}>立即开启</MButton>
    </div>
  }
>
  ...
</MDialog>`,
      render: <CustomFooterDemo />
    },
    {
      title: '长内容滚动',
      desc: '内容超出弹框高度时，正文区域独立滚动，标题与底部操作始终可见。',
      code: `<MDialog
  visible={visible}
  title="服务协议"
  onClose={() => setVisible(false)}
  footer={<MButton type="primary" onClick={() => setVisible(false)}>我知道了</MButton>}
>
  {paragraphs.map((text, index) => (
    <p key={index}>{text}</p>
  ))}
</MDialog>`,
      render: <ScrollDemo />
    }
  ],
  api: [
    { prop: 'visible', desc: '是否显示（受控）', type: 'boolean', default: '-' },
    { prop: 'defaultVisible', desc: '初始是否显示（非受控）', type: 'boolean', default: 'false' },
    { prop: 'title', desc: '标题', type: 'ReactNode', default: '-' },
    { prop: 'description', desc: '标题下方的辅助描述', type: 'ReactNode', default: '-' },
    { prop: 'children', desc: '正文内容，超出高度时内部滚动', type: 'ReactNode', default: '-' },
    { prop: 'footer', desc: '底部操作区，传 null 隐藏', type: 'ReactNode | null', default: '-' },
    { prop: 'closable', desc: '是否显示右上角关闭按钮', type: 'boolean', default: 'true' },
    { prop: 'maskClosable', desc: '点击遮罩是否关闭', type: 'boolean', default: 'true' },
    { prop: 'keyboard', desc: '是否支持 ESC 关闭', type: 'boolean', default: 'true' },
    { prop: 'inline', desc: '内联渲染，铺满最近定位父级（预览场景）', type: 'boolean', default: 'false' },
    { prop: 'onClose', desc: '关闭回调', type: 'function', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'bodyClassName', desc: '正文区域自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ]
};

export default mDialogDemo;
