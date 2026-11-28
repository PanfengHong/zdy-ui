import { useState } from 'react';

import type { DemoConfig } from '../../../pages/Components/Demo/types';
import MSwipeAction from './MSwipeAction';

const BasicDemo = () => {
  const [message, setMessage] = useState('暂无操作');

  return (
    <div className="mdemo-stack">
      <div className="mdemo-list">
        <MSwipeAction
          actions={[
            { key: 'read', text: '标为已读', onClick: () => setMessage('标为已读：产品需求文档.pdf') },
            { key: 'delete', text: '删除', danger: true, onClick: () => setMessage('删除：产品需求文档.pdf') }
          ]}
        >
          <div className="mdemo-cell">
            <span className="mdemo-cell-title">产品需求文档.pdf</span>
            <span className="mdemo-cell-desc">向左滑动可显示操作按钮</span>
          </div>
        </MSwipeAction>

        <MSwipeAction
          actions={[
            { key: 'top', text: '置顶', onClick: () => setMessage('置顶：会议纪要.docx') },
            { key: 'delete', text: '删除', danger: true, onClick: () => setMessage('删除：会议纪要.docx') }
          ]}
        >
          <div className="mdemo-cell">
            <span className="mdemo-cell-title">会议纪要.docx</span>
            <span className="mdemo-cell-desc">同样支持向左手势展开</span>
          </div>
        </MSwipeAction>
      </div>
      <p className="mdemo-tip">最近操作：{message}</p>
    </div>
  );
};

const CustomDemo = () => (
  <div className="mdemo-stack">
    <MSwipeAction
      threshold={0.6}
      actions={[
        { key: 'archive', text: '归档' },
        { key: 'delete', text: '删除', danger: true }
      ]}
    >
      <div className="mdemo-cell">
        <span className="mdemo-cell-title">季度报表.xlsx</span>
        <span className="mdemo-cell-desc">threshold 为 0.6，滑过一半以上才展开</span>
      </div>
    </MSwipeAction>

    <MSwipeAction
      disabled
      actions={[{ key: 'delete', text: '删除', danger: true }]}
    >
      <div className="mdemo-cell">
        <span className="mdemo-cell-title">系统配置.json</span>
        <span className="mdemo-cell-desc">disabled 时不可滑动</span>
      </div>
    </MSwipeAction>
  </div>
);

const mSwipeActionDemo: DemoConfig = {
  intro:
    '滑动操作单元格用于列表项，手指向左滑动内容区即可露出右侧操作按钮，常用于删除、置顶、标为已读等快捷操作。支持危险操作、禁用项、展开阈值与展开回调。',
  demos: [
    {
      title: '基础用法',
      desc: '在列表项上向左滑动，露出操作按钮；点击操作项后自动收起。',
      code: `<MSwipeAction
  actions={[
    { key: 'read', text: '标为已读', onClick: () => handleRead() },
    { key: 'delete', text: '删除', danger: true, onClick: () => handleDelete() }
  ]}
>
  <div className="cell">
    <span>产品需求文档.pdf</span>
    <span className="cell-desc">向左滑动可显示操作按钮</span>
  </div>
</MSwipeAction>`,
      render: <BasicDemo />
    },
    {
      title: '自定义阈值与禁用',
      desc: 'threshold 控制展开所需的滑动比例，disabled 可整体禁用滑动。',
      code: `<MSwipeAction
  threshold={0.6}
  actions={[
    { key: 'archive', text: '归档' },
    { key: 'delete', text: '删除', danger: true }
  ]}
>
  <div className="cell">季度报表.xlsx</div>
</MSwipeAction>

<MSwipeAction disabled actions={[{ key: 'delete', text: '删除', danger: true }]}>
  <div className="cell">系统配置.json</div>
</MSwipeAction>`,
      render: <CustomDemo />
    }
  ],
  api: [
    { prop: 'actions', desc: '右侧操作项列表', type: 'MSwipeActionItem[]', default: '[]' },
    { prop: 'children', desc: '被滑动的内容', type: 'ReactNode', default: '-' },
    { prop: 'disabled', desc: '是否禁用滑动', type: 'boolean', default: 'false' },
    { prop: 'threshold', desc: '触发展开的位移比例（0 ~ 1）', type: 'number', default: '0.4' },
    { prop: 'closeOnAction', desc: '点击操作项后是否自动收起', type: 'boolean', default: 'true' },
    { prop: 'onOpen', desc: '展开回调', type: 'function', default: '-' },
    { prop: 'onClose', desc: '收起回调', type: 'function', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' },
    { prop: 'actions[].text', desc: '操作项文案', type: 'ReactNode', default: '-' },
    { prop: 'actions[].danger', desc: '是否为危险操作（红色）', type: 'boolean', default: 'false' },
    { prop: 'actions[].disabled', desc: '是否禁用该操作项', type: 'boolean', default: 'false' },
    { prop: 'actions[].onClick', desc: '点击操作项回调', type: 'function', default: '-' }
  ]
};

export default mSwipeActionDemo;
