/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';

import type { DemoConfig } from '../../../pages/Components/Demo/types';
import MButton from '../MButton/MButton';
import MDrawer from './MDrawer';
import type { MDrawerPlacement } from './types';

const filterRows = [
  { label: '排序方式', value: '综合排序' },
  { label: '配送时间', value: '30 分钟内' },
  { label: '优惠活动', value: '满减优惠' }
];

const BasicDemo = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="mdemo-stack">
      <MButton type="primary" onClick={() => setVisible(true)}>
        打开底部抽屉
      </MButton>
      <MDrawer
        inline
        visible={visible}
        title="筛选条件"
        height="52%"
        onClose={() => setVisible(false)}
        footer={
          <div style={{ display: 'flex', gap: 10 }}>
            <MButton style={{ flex: 1 }} onClick={() => setVisible(false)}>
              重置
            </MButton>
            <MButton type="primary" style={{ flex: 1 }} onClick={() => setVisible(false)}>
              确定
            </MButton>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filterRows.map(row => (
            <div
              key={row.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: 12,
                backgroundColor: '#f5f7fa'
              }}
            >
              <span style={{ color: '#4b5563', fontSize: 13 }}>{row.label}</span>
              <span style={{ color: '#111827', fontSize: 13, fontWeight: 500 }}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </MDrawer>
    </div>
  );
};

const placementOptions: { placement: MDrawerPlacement; label: string }[] = [
  { placement: 'right', label: '右侧 72%' },
  { placement: 'left', label: '左侧 64%' },
  { placement: 'top', label: '顶部 180px' },
  { placement: 'bottom', label: '底部 50%' }
];

const placementLabels: Record<MDrawerPlacement, string> = {
  top: '顶部',
  right: '右侧',
  bottom: '底部',
  left: '左侧'
};

const PlacementDemo = () => {
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState<MDrawerPlacement>('right');

  const horizontal = placement === 'left' || placement === 'right';
  const width = placement === 'left' ? '64%' : '72%';
  const height = placement === 'top' ? 180 : '50%';
  const sizeText = horizontal
    ? `宽 ${width}`
    : `高 ${typeof height === 'number' ? `${height}px` : height}`;

  return (
    <div className="mdemo-stack">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {placementOptions.map(item => (
          <MButton
            key={item.placement}
            onClick={() => {
              setPlacement(item.placement);
              setVisible(true);
            }}
          >
            {item.label}
          </MButton>
        ))}
      </div>
      <MDrawer
        inline
        visible={visible}
        placement={placement}
        width={width}
        height={height}
        title={`${placementLabels[placement]}滑出`}
        onClose={() => setVisible(false)}
        footer={
          <MButton type="primary" onClick={() => setVisible(false)}>
            关闭
          </MButton>
        }
      >
        <p style={{ margin: 0 }}>
          当前方向：{placementLabels[placement]}；尺寸：{sizeText}。
        </p>
        <p style={{ margin: '8px 0 0', fontSize: 13, color: '#6b7280' }}>
          width 作用于左右方向，height 作用于上下方向，数字按 px 处理。
        </p>
      </MDrawer>
    </div>
  );
};

const detailLines = [
  '订单编号：ZD20261128001',
  '下单时间：2026-11-28 15:42',
  '订单状态：待发货',
  '收货人：张先生 138****0000',
  '收货地址：北京市朝阳区望京街道阜通东大街 6 号院 3 号楼 1201',
  '配送方式：同城闪送',
  '预计送达：30 分钟内',
  '支付方式：微信支付',
  '支付时间：2026-11-28 15:43',
  '商品：无线降噪耳机 × 1',
  '商品：手机保护壳 × 2',
  '商品：快充数据线 × 1',
  '商品：桌面支架 × 1',
  '商品：屏幕清洁套装 × 1',
  '商品小计：¥ 1,299.00',
  '运费：¥ 0.00',
  '优惠券：-¥ 50.00',
  '实付金额：¥ 1,249.00',
  '发票信息：个人电子普通发票',
  '发票抬头：张先生',
  '备注：请放在门口快递柜',
  '售后说明：7 天无理由退换',
  '退换要求：商品及包装需保持完好',
  '客服电话：400-000-0000',
  '服务时间：每日 9:00 - 21:00',
  '温馨提示：如遇配送延误，可在订单页发起催单',
  '配送员：李师傅 139****8888',
  '取件码：A-1024',
  '签收提醒：请当面检查商品外观',
  '感谢使用本服务'
];

const ScrollDemo = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="mdemo-stack">
      <MButton onClick={() => setVisible(true)}>打开订单详情</MButton>
      <MDrawer
        inline
        visible={visible}
        placement="right"
        width="78%"
        title="订单详情"
        onClose={() => setVisible(false)}
        footer={
          <MButton type="primary" onClick={() => setVisible(false)}>
            我知道了
          </MButton>
        }
      >
        {detailLines.map((line, index) => (
          <p key={line} style={{ margin: index === 0 ? 0 : '12px 0 0' }}>
            {line}
          </p>
        ))}
      </MDrawer>
    </div>
  );
};

const mDrawerDemo: DemoConfig = {
  intro:
    '移动端抽屉可从 top、right、bottom、left 四个方向滑出，左右方向通过 width 控制宽度、上下方向通过 height 控制高度。过渡基于 transform，进出场平滑，支持遮罩、ESC 关闭、底部操作区与内容滚动。',
  demos: [
    {
      title: '基础用法',
      desc: '默认从底部滑出，通过 visible 控制显示；footer 放置操作按钮，height 调整抽屉高度。',
      code: `<MButton onClick={() => setVisible(true)}>打开底部抽屉</MButton>

<MDrawer
  visible={visible}
  title="筛选条件"
  height="52%"
  onClose={() => setVisible(false)}
  footer={
    <div style={{ display: 'flex', gap: 10 }}>
      <MButton style={{ flex: 1 }} onClick={() => setVisible(false)}>重置</MButton>
      <MButton type="primary" style={{ flex: 1 }} onClick={() => setVisible(false)}>确定</MButton>
    </div>
  }
>
  <div>筛选内容</div>
</MDrawer>`,
      render: <BasicDemo />
    },
    {
      title: '四个方向与尺寸',
      desc: 'placement 切换滑出方向，width 控制左右方向宽度，height 控制上下方向高度。',
      code: `<MDrawer
  visible={visible}
  placement="right"
  width="72%"
  title="右侧滑出"
  onClose={() => setVisible(false)}
>
  内容
</MDrawer>

// 顶部 / 底部使用 height
<MDrawer visible={visible} placement="top" height={180} title="顶部滑出">
  内容
</MDrawer>`,
      render: <PlacementDemo />
    },
    {
      title: '长内容滚动',
      desc: '内容超出抽屉高度时，正文区域独立滚动，标题与底部操作始终可见。',
      code: `<MDrawer
  visible={visible}
  placement="right"
  width="78%"
  title="订单详情"
  onClose={() => setVisible(false)}
  footer={<MButton type="primary" onClick={() => setVisible(false)}>我知道了</MButton>}
>
  {detailLines.map(line => <p key={line}>{line}</p>)}
</MDrawer>`,
      render: <ScrollDemo />
    }
  ],
  api: [
    { prop: 'visible', desc: '是否显示（受控）', type: 'boolean', default: '-' },
    { prop: 'defaultVisible', desc: '初始是否显示（非受控）', type: 'boolean', default: 'false' },
    { prop: 'placement', desc: '滑出方向', type: "'top' | 'right' | 'bottom' | 'left'", default: "'bottom'" },
    { prop: 'width', desc: '宽度，left / right 方向生效，数字按 px 处理', type: 'string | number', default: "'80%'" },
    { prop: 'height', desc: '高度，top / bottom 方向生效，数字按 px 处理', type: 'string | number', default: "'50%'" },
    { prop: 'title', desc: '标题', type: 'ReactNode', default: '-' },
    { prop: 'closable', desc: '是否显示右上角关闭按钮', type: 'boolean', default: 'true' },
    { prop: 'maskClosable', desc: '点击遮罩是否关闭', type: 'boolean', default: 'true' },
    { prop: 'keyboard', desc: '是否支持 ESC 关闭', type: 'boolean', default: 'true' },
    { prop: 'footer', desc: '底部操作区，传 null 隐藏', type: 'ReactNode | null', default: '-' },
    { prop: 'inline', desc: '内联渲染，铺满最近定位父级（预览场景）', type: 'boolean', default: 'false' },
    { prop: 'onClose', desc: '关闭回调', type: 'function', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'bodyClassName', desc: '内容区域自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式（作用于抽屉面板）', type: 'CSSProperties', default: '-' }
  ]
};

export default mDrawerDemo;
