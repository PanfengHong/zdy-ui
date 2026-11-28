/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import type { CSSProperties } from 'react';

import type { DemoConfig } from '../../../pages/Components/Demo/types';
import MButton from '../MButton/MButton';
import MGrid from './MGrid';

const tipStyle: CSSProperties = {
  padding: 12,
  borderRadius: 10,
  backgroundColor: '#fff',
  color: '#4b5563',
  fontSize: 13,
  lineHeight: 1.6
};

const shortcuts = [
  { icon: '💳', label: '付款码' },
  { icon: '📷', label: '扫一扫' },
  { icon: '🚌', label: '乘车码' },
  { icon: '🏦', label: '银行卡' }
];

const BasicDemo = () => (
  <div className="mdemo-stack">
    <MGrid>
      {shortcuts.map(item => (
        <MGrid.Item key={item.label} icon={item.icon} label={item.label} />
      ))}
    </MGrid>
    <p className="mdemo-tip">默认 4 列并带边框，Item 的 icon 支持 emoji、文字或 SVG。</p>
  </div>
);

const columnOptions = [2, 3, 5, 6];
const columnItems = Array.from({ length: 6 }).map((_, index) => ({
  icon: ['📱', '💡', '🎫', '📮', '🎁', '⚙️'][index],
  label: `功能 ${index + 1}`
}));

const ColumnDemo = () => {
  const [columnNum, setColumnNum] = useState(4);

  return (
    <div className="mdemo-stack">
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {columnOptions.map(value => (
          <MButton
            key={value}
            size="small"
            type={columnNum === value ? 'primary' : 'default'}
            onClick={() => setColumnNum(value)}
          >
            {value} 列
          </MButton>
        ))}
      </div>
      <MGrid columnNum={columnNum}>
        {columnItems.map(item => (
          <MGrid.Item key={item.label} icon={item.icon} label={item.label} />
        ))}
      </MGrid>
      <p className="mdemo-tip">
        columnNum 支持任意正整数，列宽通过 CSS 变量均分，不受旧版 2/3/4/5 列写死规则限制。
      </p>
    </div>
  );
};

const plainItems = [
  { icon: '📦', label: '查快递' },
  { icon: '💬', label: '联系客服' },
  { icon: '📝', label: '意见反馈' }
];

const ClickDemo = () => {
  const [selected, setSelected] = useState('尚未选择');

  return (
    <div className="mdemo-stack">
      <MGrid columnNum={3} border={false}>
        {plainItems.map(item => (
          <MGrid.Item
            key={item.label}
            icon={item.icon}
            label={item.label}
            onClick={() => setSelected(item.label)}
          />
        ))}
      </MGrid>
      <div style={tipStyle}>当前点击：{selected}</div>
    </div>
  );
};

const mGridDemo: DemoConfig = {
  intro:
    '移动端宫格用于首页快捷入口、功能矩阵等场景。与 PC 端 24 栏 Row/Col 栅格不同，MGrid 按固定列数均分格子，支持任意列数、边框开关与点击态，单个格子的点击区大于 44px。',
  demos: [
    {
      title: '基础宫格',
      desc: '默认 4 列并显示边框，用 MGrid.Item 的 icon 与 label 描述入口。',
      code: `<MGrid>
  <MGrid.Item icon="💳" label="付款码" />
  <MGrid.Item icon="📷" label="扫一扫" />
  <MGrid.Item icon="🚌" label="乘车码" />
  <MGrid.Item icon="🏦" label="银行卡" />
</MGrid>`,
      render: <BasicDemo />
    },
    {
      title: '任意列数',
      desc: 'columnNum 支持 2、3、5、6 等任意正整数，切换后格子宽度自动均分。',
      code: `const [columnNum, setColumnNum] = useState(4);

<MGrid columnNum={columnNum}>
  {items.map(item => (
    <MGrid.Item key={item.label} icon={item.icon} label={item.label} />
  ))}
</MGrid>`,
      render: <ColumnDemo />
    },
    {
      title: '无边框与点击',
      desc: 'border 关闭后去掉网格线；传 onClick 时 Item 渲染为按钮，带按压态与 44px 以上点击区。',
      code: `<MGrid columnNum={3} border={false}>
  <MGrid.Item icon="📦" label="查快递" onClick={() => select('查快递')} />
  <MGrid.Item icon="💬" label="联系客服" onClick={() => select('联系客服')} />
  <MGrid.Item icon="📝" label="意见反馈" onClick={() => select('意见反馈')} />
</MGrid>`,
      render: <ClickDemo />
    }
  ],
  api: [
    { prop: 'columnNum', desc: '每行列数，支持任意正整数', type: 'number', default: '4' },
    { prop: 'border', desc: '是否显示格子边框', type: 'boolean', default: 'true' },
    { prop: 'children', desc: 'MGrid.Item 列表', type: 'ReactNode', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' },
    { prop: 'Item.icon', desc: '图标', type: 'ReactNode', default: '-' },
    { prop: 'Item.label', desc: '文案', type: 'ReactNode', default: '-' },
    { prop: 'Item.onClick', desc: '点击回调，传入后渲染为按钮', type: '() => void', default: '-' },
    { prop: 'Item.children', desc: '自定义格子内容', type: 'ReactNode', default: '-' }
  ]
};

export default mGridDemo;
