/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';

import type { DemoConfig } from '../../../pages/Components/Demo/types';
import MPagination from './MPagination';

const BasicDemo = () => {
  const [current, setCurrent] = useState(4);

  return (
    <div className="mdemo-stack">
      <div className="mdemo-list">
        <div className="mdemo-cell">
          <span className="mdemo-cell-title">当前第 {current} 页</span>
          <span className="mdemo-cell-desc">左右滑动分页区域，或点击中间页码跳转</span>
        </div>
      </div>
      <MPagination
        inline
        current={current}
        total={120}
        showTotal={(total, range) => `${range[0]}-${range[1]} / 共 ${total} 条`}
        onChange={page => setCurrent(page)}
      />
    </div>
  );
};

const NumberDemo = () => {
  const [current, setCurrent] = useState(6);

  return (
    <div className="mdemo-stack">
      <p className="mdemo-tip">当前第 {current} 页 · 页码条可横向滚动，当前页自动居中</p>
      <MPagination
        mode="number"
        current={current}
        total={240}
        onChange={page => setCurrent(page)}
      />
    </div>
  );
};

const SizeDemo = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  return (
    <div className="mdemo-stack">
      <p className="mdemo-tip">每页 {pageSize} 条 · 当前第 {current} 页</p>
      <MPagination
        inline
        current={current}
        pageSize={pageSize}
        total={186}
        showSizeChanger
        pageSizeOptions={[10, 20, 50]}
        onChange={page => setCurrent(page)}
        onShowSizeChange={(page, size) => {
          setCurrent(page);
          setPageSize(size);
        }}
      />
    </div>
  );
};

const mPaginationDemo: DemoConfig = {
  intro:
    '移动端分页针对触屏交互重新设计：默认使用大尺寸上一页 / 下一页按钮与「当前页 / 总页数」入口，点击页码从底部弹出跳转面板（与 MSelect 一致的遮罩、滑入滑出和关闭方式），支持左右滑动翻页（纵向滑动仍可正常滚动页面）。数字模式提供可横向滚动的页码条，当前页自动居中。',
  demos: [
    {
      title: '紧凑模式与手势翻页',
      desc: '左右滑动分页区域切换上一页 / 下一页；点击中间页码从底部弹出面板，可输入页码或用快捷按钮跳转。',
      code: `const [current, setCurrent] = useState(4);

<MPagination
  inline
  current={current}
  total={120}
  showTotal={(total, range) => \`\${range[0]}-\${range[1]} / 共 \${total} 条\`}
  onChange={page => setCurrent(page)}
/>`,
      render: <BasicDemo />
    },
    {
      title: '数字模式',
      desc: '页码条可横向滚动，当前页自动滚动到可视区域中间，适合需要直接选页的场景。',
      code: `const [current, setCurrent] = useState(6);

<MPagination
  mode="number"
  current={current}
  total={240}
  onChange={page => setCurrent(page)}
/>`,
      render: <NumberDemo />
    },
    {
      title: '切换每页条数',
      desc: '点击「每页条数」入口，从底部选项面板中选择合适的条数；点遮罩、关闭按钮、取消或按 ESC 均可关闭。',
      code: `<MPagination
  inline
  current={current}
  pageSize={pageSize}
  total={186}
  showSizeChanger
  pageSizeOptions={[10, 20, 50]}
  onChange={page => setCurrent(page)}
  onShowSizeChange={(page, size) => {
    setCurrent(page);
    setPageSize(size);
  }}
/>`,
      render: <SizeDemo />
    },
    {
      title: '禁用与关闭手势',
      desc: 'disabled 时按钮与手势均不可用；swipeable={false} 可只保留点击交互。',
      code: `<MPagination total={50} defaultCurrent={3} disabled />
<MPagination total={50} swipeable={false} />`,
      render: (
        <div className="mdemo-stack">
          <MPagination total={50} defaultCurrent={3} disabled />
          <MPagination total={50} swipeable={false} />
        </div>
      )
    }
  ],
  api: [
    { prop: 'current', desc: '当前页数（受控）', type: 'number', default: '-' },
    { prop: 'defaultCurrent', desc: '默认当前页数', type: 'number', default: '1' },
    { prop: 'pageSize', desc: '每页条数（受控）', type: 'number', default: '-' },
    { prop: 'defaultPageSize', desc: '默认每页条数', type: 'number', default: '10' },
    { prop: 'total', desc: '数据总数', type: 'number', default: '0' },
    { prop: 'mode', desc: '展示形态', type: "'compact' | 'number'", default: "'compact'" },
    { prop: 'swipeable', desc: '是否允许左右滑动翻页', type: 'boolean', default: 'true' },
    { prop: 'showSizeChanger', desc: '是否展示每页条数切换入口', type: 'boolean', default: 'false' },
    { prop: 'pageSizeOptions', desc: '每页条数选项', type: 'number[]', default: '[10, 20, 50, 100]' },
    { prop: 'showTotal', desc: '展示数据总量和当前范围', type: 'function(total, range)', default: '-' },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' },
    { prop: 'inline', desc: '弹层内联渲染在最近的定位父级中（用于手机预览）', type: 'boolean', default: 'false' },
    { prop: 'closeOnMaskClick', desc: '点击遮罩是否关闭弹层', type: 'boolean', default: 'true' },
    { prop: 'onChange', desc: '页码改变回调', type: '(page, pageSize) => void', default: '-' },
    { prop: 'onShowSizeChange', desc: '每页条数改变回调', type: '(current, size) => void', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ]
};

export default mPaginationDemo;
