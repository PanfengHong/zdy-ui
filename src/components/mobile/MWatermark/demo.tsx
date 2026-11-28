/* eslint-disable react-refresh/only-export-components */
import type { CSSProperties } from 'react';

import type { DemoConfig } from '../../../pages/Components/Demo/types';
import MWatermark from './MWatermark';

const cardStyle: CSSProperties = {
  boxSizing: 'border-box',
  minHeight: 180,
  padding: 16,
  borderRadius: 12,
  backgroundColor: '#fff'
};

const paragraphStyle: CSSProperties = {
  margin: '10px 0 0',
  color: '#4b5563',
  fontSize: 13,
  lineHeight: 1.7
};

const logoImage = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><circle cx="32" cy="32" r="27" fill="none" stroke="#1890ff" stroke-width="4" opacity="0.65"/><path d="M20 33l8 8 17-18" fill="none" stroke="#1890ff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity="0.65"/></svg>'
)}`;

const multiLines = ['内部资料', '禁止外传'];
const denseFont = { color: 'rgba(245, 34, 45, 0.16)', fontSize: 13, fontWeight: 'bold' as const };

const BasicDemo = () => (
  <div className="mdemo-stack">
    <MWatermark content="ZDY UI">
      <div style={cardStyle}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>订单详情</div>
        <p style={paragraphStyle}>
          订单编号：ZD20261128001。商品：无线降噪耳机 × 1。支付金额：¥ 1,299.00。
          水印会跟随内容区域平铺，不影响下方文字的点击与选择。
        </p>
      </div>
    </MWatermark>
    <p className="mdemo-tip">
      默认以 12px 半透明文字平铺，旋转 -22°；遮罩层 pointer-events 为 none，不拦截操作。
    </p>
  </div>
);

const MultiLineDemo = () => (
  <div className="mdemo-stack">
    <MWatermark content={multiLines} font={denseFont} rotate={-30} gap={[40, 50]}>
      <div style={cardStyle}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>合同预览</div>
        <p style={paragraphStyle}>
          本文件包含敏感信息，请仅在授权范围内查看。多行水印按数组顺序自上而下绘制，
          font 可配置颜色、字号、字重与字体族。
        </p>
      </div>
    </MWatermark>
  </div>
);

const ImageDemo = () => (
  <div className="mdemo-stack">
    <MWatermark image={logoImage} width={48} height={48} gap={[44, 44]} rotate={0}>
      <div style={cardStyle}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>图片水印</div>
        <p style={paragraphStyle}>
          传入 image 时优先于 content；示例使用内联 SVG 图标，无需额外图片资源。
        </p>
      </div>
    </MWatermark>
  </div>
);

const listRows = [
  '账户余额：¥ 12,860.00',
  '今日成交额：¥ 3,420.00',
  '待结算订单：8 笔',
  '退款中订单：1 笔',
  '积分余额：2,380 分',
  '会员等级：金卡会员'
];

const OffsetDemo = () => (
  <div className="mdemo-stack">
    <MWatermark content="仅作演示" gap={[36, 44]} offset={[12, 6]} rotate={-12} zIndex={5}>
      <div style={{ ...cardStyle, minHeight: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>账户概览</div>
        {listRows.map(row => (
          <p key={row} style={paragraphStyle}>
            {row}
          </p>
        ))}
      </div>
    </MWatermark>
    <p className="mdemo-tip">
      gap 控制水印之间的水平/垂直间距，offset 控制单格内的偏移，zIndex 控制遮罩层级。
    </p>
  </div>
);

const mWatermarkDemo: DemoConfig = {
  intro:
    '移动端水印通过 canvas 生成可平铺的背景图，覆盖在内容之上，适合预览图、合同与敏感信息页面。支持文字多行、图片水印、旋转角度、间距偏移与字体样式，遮罩层不拦截点击。',
  demos: [
    {
      title: '文字水印',
      desc: 'content 为单个字符串时按默认字体平铺，children 为被覆盖的内容。',
      code: `<MWatermark content="ZDY UI">
  <div style={{ padding: 16, borderRadius: 12, backgroundColor: '#fff' }}>
    订单详情内容
  </div>
</MWatermark>`,
      render: <BasicDemo />
    },
    {
      title: '多行文字',
      desc: 'content 传数组时按行绘制；font 配置文字样式，rotate 与 gap 调整角度和疏密。',
      code: `<MWatermark
  content={['内部资料', '禁止外传']}
  font={{ color: 'rgba(245, 34, 45, 0.16)', fontSize: 13, fontWeight: 'bold' }}
  rotate={-30}
  gap={[40, 50]}
>
  内容
</MWatermark>`,
      render: <MultiLineDemo />
    },
    {
      title: '图片水印',
      desc: 'image 优先于 content；示例使用内联 SVG data URI，也可以传远端图片地址。',
      code: `<MWatermark
  image={logoImage}
  width={48}
  height={48}
  gap={[44, 44]}
  rotate={0}
>
  内容
</MWatermark>`,
      render: <ImageDemo />
    },
    {
      title: '间距与偏移',
      desc: 'gap 控制平铺间隔，offset 控制水印在单格中的位置，zIndex 控制遮罩层级。',
      code: `<MWatermark
  content="仅作演示"
  gap={[36, 44]}
  offset={[12, 6]}
  rotate={-12}
  zIndex={5}
>
  内容
</MWatermark>`,
      render: <OffsetDemo />
    }
  ],
  api: [
    { prop: 'content', desc: '水印文字，数组时按行绘制；image 优先', type: 'string | string[]', default: "'ZDY UI'" },
    { prop: 'image', desc: '水印图片地址', type: 'string', default: '-' },
    { prop: 'width', desc: '单个水印宽度', type: 'number', default: '100' },
    { prop: 'height', desc: '单个水印高度', type: 'number', default: '60' },
    { prop: 'rotate', desc: '旋转角度', type: 'number', default: '-22' },
    { prop: 'gap', desc: '水印之间的水平 / 垂直间距', type: '[number, number]', default: '[50, 60]' },
    { prop: 'offset', desc: '单格内偏移', type: '[number, number]', default: '[0, 0]' },
    { prop: 'font', desc: '文字样式', type: 'MWatermarkFontConfig', default: '-' },
    { prop: 'font.color', desc: '文字颜色', type: 'string', default: 'rgba(0, 0, 0, 0.12)' },
    { prop: 'font.fontSize', desc: '字号', type: 'number', default: '12' },
    { prop: 'font.fontFamily', desc: '字体族', type: 'string', default: 'sans-serif' },
    { prop: 'font.fontWeight', desc: '字重', type: "'normal' | 'light' | 'bold' | number", default: '400' },
    { prop: 'zIndex', desc: '遮罩层级', type: 'number', default: '9' },
    { prop: 'children', desc: '被水印覆盖的内容', type: 'ReactNode', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ]
};

export default mWatermarkDemo;
