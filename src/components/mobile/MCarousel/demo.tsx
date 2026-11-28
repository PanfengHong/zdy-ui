/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';

import type { DemoConfig } from '../../../pages/Components/Demo/types';
import MCarousel from './MCarousel';

const slides = [
  { from: '#38bdf8', to: '#1d4ed8', title: '限时秒杀', desc: '全场低至 5 折' },
  { from: '#fb7185', to: '#be185d', title: '新品上市', desc: '抢先体验春季新品' },
  { from: '#34d399', to: '#047857', title: '会员日', desc: '积分翻倍，专属好礼' },
  { from: '#a78bfa', to: '#6d28d9', title: '免费配送', desc: '满 99 元包邮到家' }
];

const renderSlide = (index: number) => {
  const item = slides[index % slides.length];

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        background: `linear-gradient(135deg, ${item.from}, ${item.to})`,
        color: '#fff'
      }}
    >
      <strong style={{ fontSize: 22, letterSpacing: 0.5 }}>{item.title}</strong>
      <span style={{ fontSize: 13, opacity: 0.86 }}>{item.desc}</span>
    </div>
  );
};

const BasicDemo = () => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="mdemo-stack">
      <MCarousel afterChange={setCurrent}>
        {slides.map((_, index) => renderSlide(index))}
      </MCarousel>
      <p className="mdemo-tip">
        当前第 {current + 1} 张 / 共 {slides.length} 张；左右滑动、点击圆点或按方向键切换。
      </p>
    </div>
  );
};

const FadeDemo = () => (
  <div className="mdemo-stack">
    <MCarousel effect="fade" interval={2500}>
      {slides.map((_, index) => renderSlide(index))}
    </MCarousel>
    <p className="mdemo-tip">effect="fade" 时以淡入淡出切换，同样支持自动播放与指示点。</p>
  </div>
);

const ManualDemo = () => (
  <div className="mdemo-stack">
    <MCarousel autoplay={false} loop={false}>
      {slides.map((_, index) => renderSlide(index))}
    </MCarousel>
    <p className="mdemo-tip">
      关闭自动播放与循环：首尾拖动会回弹，适合固定数量的卡片。
    </p>
  </div>
);

const HeightDemo = () => (
  <div className="mdemo-stack">
    <MCarousel height={220} interval={2200} dots={false}>
      {slides.map((_, index) => renderSlide(index))}
    </MCarousel>
    <p className="mdemo-tip">height 自定义容器高度，dots=false 隐藏底部指示点。</p>
  </div>
);

const mCarouselDemo: DemoConfig = {
  intro:
    '移动端走马灯用于轮播运营位、活动 Banner 与卡片推荐。支持左右拖拽跟手滑动、松手吸附，循环时首尾无缝衔接；可配置自动播放、淡入淡出效果、指示点与容器高度，触摸时自动暂停。',
  demos: [
    {
      title: '基础用法',
      desc: '默认自动播放、循环、显示指示点；afterChange 返回当前下标。',
      code: `const [current, setCurrent] = useState(0);

<MCarousel afterChange={setCurrent}>
  {slides.map((_, index) => renderSlide(index))}
</MCarousel>`,
      render: <BasicDemo />
    },
    {
      title: '淡入淡出',
      desc: 'effect="fade" 以透明度过渡切换，适合文案类 Banner。',
      code: `<MCarousel effect="fade" interval={2500}>
  {slides.map((_, index) => renderSlide(index))}
</MCarousel>`,
      render: <FadeDemo />
    },
    {
      title: '手动切换',
      desc: 'autoplay={false} 关闭自动播放，loop={false} 关闭循环，首尾拖动带阻尼回弹。',
      code: `<MCarousel autoplay={false} loop={false}>
  {slides.map((_, index) => renderSlide(index))}
</MCarousel>`,
      render: <ManualDemo />
    },
    {
      title: '自定义高度',
      desc: 'height 支持数字（px）或字符串，dots={false} 隐藏指示点。',
      code: `<MCarousel height={220} dots={false} interval={2200}>
  {slides.map((_, index) => renderSlide(index))}
</MCarousel>`,
      render: <HeightDemo />
    }
  ],
  api: [
    { prop: 'autoplay', desc: '是否自动播放', type: 'boolean', default: 'true' },
    { prop: 'interval', desc: '自动播放间隔（毫秒）', type: 'number', default: '3000' },
    { prop: 'effect', desc: '切换效果', type: "'slide' | 'fade'", default: "'slide'" },
    { prop: 'dots', desc: '是否显示指示点', type: 'boolean', default: 'true' },
    { prop: 'loop', desc: '是否循环播放', type: 'boolean', default: 'true' },
    { prop: 'pauseOnTouch', desc: '触摸/拖动时暂停自动播放', type: 'boolean', default: 'true' },
    { prop: 'height', desc: '容器高度，数字按 px 处理', type: 'number | string', default: '180' },
    { prop: 'defaultActiveIndex', desc: '初始索引', type: 'number', default: '0' },
    { prop: 'beforeChange', desc: '切换前回调', type: '(from, to) => void', default: '-' },
    { prop: 'afterChange', desc: '切换完成回调', type: '(current) => void', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ]
};

export default mCarouselDemo;
