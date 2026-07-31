import React, { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Masonry from './Masonry';

const MasonryDemo = () => {
  const [colCount, setColCount] = useState(4);
  const [gap, setGap] = useState(16);

  const imageItems = [
    { id: 1, title: '山脉风景', tag: '自然', height: 200 },
    { id: 2, title: '城市夜景', tag: '城市', height: 150 },
    { id: 3, title: '海洋日落', tag: '风景', height: 240 },
    { id: 4, title: '森林小径', tag: '自然', height: 180 },
    { id: 5, title: '星空银河', tag: '天文', height: 300 },
    { id: 6, title: '雪山湖泊', tag: '自然', height: 160 },
    { id: 7, title: '沙漠风光', tag: '风景', height: 220 },
    { id: 8, title: '樱花盛开', tag: '花卉', height: 190 },
    { id: 9, title: '极光之夜', tag: '天文', height: 260 },
    { id: 10, title: '田园风光', tag: '乡村', height: 170 },
    { id: 11, title: '海边日出', tag: '风景', height: 210 },
    { id: 12, title: '古镇小巷', tag: '人文', height: 140 },
  ];

  const textItems = [
    {
      id: 't1',
      title: '瀑布流布局',
      text: '瀑布流布局（Masonry Layout）是一种流行的网页布局方式，特点是每列宽度相同但高度不同，类似瀑布。这种布局常用于图片展示、卡片列表等场景。',
      tag: '布局'
    },
    {
      id: 't2',
      title: '响应式设计',
      text: '支持响应式断点配置，自动根据容器宽度调整列数。',
      tag: '响应式'
    },
    {
      id: 't3',
      title: '高性能渲染',
      text: '使用绝对定位进行布局计算，配合 CSS transform 实现平滑过渡动画。',
      tag: '性能'
    },
    {
      id: 't4',
      title: '自适应高度',
      text: '通过 ResizeObserver 监听容器和子元素尺寸变化，自动重新计算布局。',
      tag: '自适应'
    },
    {
      id: 't5',
      title: '丰富的API',
      text: '提供 columns、gap、breakpoints、data、renderItem 等多种属性，灵活支持各种使用场景。',
      tag: 'API'
    },
    {
      id: 't6',
      title: '易于使用',
      text: '支持 children 插槽和 data + renderItem 两种使用方式，满足不同开发习惯。',
      tag: '易用'
    },
    {
      id: 't7',
      title: '键盘支持',
      text: '完整的键盘操作支持，包括方向键导航、Enter 确认等，提升无障碍访问体验。',
      tag: '无障碍'
    },
    {
      id: 't8',
      title: '主题定制',
      text: '通过 CSS 变量和 className 可以轻松定制组件外观，无缝融入各种设计体系。',
      tag: '定制'
    },
  ];

  const imgColors = ['#1890ff', '#52c41a', '#faad14', '#eb2f96', '#722ed1', '#13c2c2', '#fa8c16', '#f5222d', '#2f54eb', '#a0d911', '#73d13d', '#ffadd2'];

  const apiData = [
    { prop: 'columns', desc: '列数，设置后忽略breakpoints', type: 'number', default: '-' },
    { prop: 'gap', desc: '项目间距（像素）', type: 'number', default: '16' },
    { prop: 'breakpoints', desc: '响应式断点配置，如 {1200: 4, 992: 3, 768: 2, 0: 1}', type: 'Record<number, number>', default: '见源码' },
    { prop: 'data', desc: '数据源数组', type: 'any[]', default: '-' },
    { prop: 'renderItem', desc: '渲染每项的回调函数', type: '(item, index) => ReactNode', default: '-' },
    { prop: 'keyField', desc: '数据主键字段名', type: 'string', default: "'id'" },
    { prop: 'children', desc: '子元素（与data互斥）', type: 'ReactNode', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' },
  ];

  return (
    <>
      <div className="component-group">
        <h3>基础用法 - children</h3>
        <DemoBlock
          code={`<Masonry columns={4} gap={16}>
  <div style={{ background: '#f0f5ff', height: 120 }}>卡片1</div>
  <div style={{ background: '#f6ffed', height: 180 }}>卡片2</div>
  <div style={{ background: '#fff7e6', height: 150 }}>卡片3</div>
  <div style={{ background: '#fff1f0', height: 200 }}>卡片4</div>
  <div style={{ background: '#f9f0ff', height: 140 }}>卡片5</div>
  <div style={{ background: '#e6fffb', height: 160 }}>卡片6</div>
  <div style={{ background: '#fcffe6', height: 130 }}>卡片7</div>
  <div style={{ background: '#fff0f6', height: 190 }}>卡片8</div>
</Masonry>`}
        >
          <Masonry columns={4} gap={16}>
            {[
              { h: 120, bg: '#f0f5ff', label: '卡片1' },
              { h: 180, bg: '#f6ffed', label: '卡片2' },
              { h: 150, bg: '#fff7e6', label: '卡片3' },
              { h: 200, bg: '#fff1f0', label: '卡片4' },
              { h: 140, bg: '#f9f0ff', label: '卡片5' },
              { h: 160, bg: '#e6fffb', label: '卡片6' },
              { h: 130, bg: '#fcffe6', label: '卡片7' },
              { h: 190, bg: '#fff0f6', label: '卡片8' },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: item.bg,
                  height: item.h,
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#333',
                }}
              >
                {item.label}
              </div>
            ))}
          </Masonry>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>使用 data + renderItem</h3>
        <DemoBlock
          code={`<Masonry
  columns={4}
  gap={16}
  data={imageItems}
  renderItem={(item) => (
    <div>
      <div style={{ background: imgColors[item.id - 1], height: item.height }} />
      <div style={{ padding: 12 }}>
        <h4>{item.title}</h4>
        <span>{item.tag}</span>
      </div>
    </div>
  )}
/>`}
        >
          <Masonry
            columns={4}
            gap={16}
            data={imageItems}
            renderItem={(item: any) => (
              <div>
                <div
                  style={{
                    background: imgColors[(item.id - 1) % imgColors.length],
                    height: item.height,
                    borderRadius: '8px 8px 0 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 24,
                    fontWeight: 600,
                  }}
                >
                  {item.id}
                </div>
                <div style={{ padding: 12 }}>
                  <h4 style={{ margin: '0 0 4px', fontSize: 14, color: '#333' }}>
                    {item.title}
                  </h4>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      borderRadius: 4,
                      fontSize: 12,
                      background: '#e6f7ff',
                      color: '#1890ff',
                    }}
                  >
                    {item.tag}
                  </span>
                </div>
              </div>
            )}
          />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>文字卡片</h3>
        <DemoBlock
          code={`<Masonry
  columns={3}
  gap={16}
  data={textItems}
  renderItem={(item) => (
    <div>
      <div style={{ padding: 16 }}>
        <span>{item.tag}</span>
        <h4>{item.title}</h4>
        <p>{item.text}</p>
      </div>
    </div>
  )}
/>`}
        >
          <Masonry
            columns={3}
            gap={16}
            data={textItems}
            renderItem={(item: any) => (
              <div>
                <div style={{ padding: 16 }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      borderRadius: 4,
                      fontSize: 12,
                      background: '#e6f7ff',
                      color: '#1890ff',
                      marginBottom: 8,
                    }}
                  >
                    {item.tag}
                  </span>
                  <h4
                    style={{
                      margin: '0 0 8px',
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#333',
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 13,
                      color: '#666',
                      lineHeight: 1.6,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              </div>
            )}
          />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>自定义列数和间距</h3>
        <DemoBlock
          code={`<Masonry columns={colCount} gap={gap} data={imageItems} renderItem={...} />`}
        >
          <div style={{ marginBottom: 16, display: 'flex', gap: 24, alignItems: 'center' }}>
            <span>列数: {colCount}</span>
            <input
              type="range"
              min={1}
              max={6}
              value={colCount}
              onChange={(e) => setColCount(Number(e.target.value))}
            />
            <span>间距: {gap}px</span>
            <input
              type="range"
              min={0}
              max={48}
              value={gap}
              onChange={(e) => setGap(Number(e.target.value))}
            />
          </div>
          <Masonry
            columns={colCount}
            gap={gap}
            data={imageItems}
            renderItem={(item: any) => (
              <div>
                <div
                  style={{
                    background: imgColors[(item.id - 1) % imgColors.length],
                    height: item.height,
                    borderRadius: '8px 8px 0 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 24,
                    fontWeight: 600,
                  }}
                >
                  {item.id}
                </div>
                <div style={{ padding: 12 }}>
                  <h4 style={{ margin: '0 0 4px', fontSize: 14, color: '#333' }}>
                    {item.title}
                  </h4>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      borderRadius: 4,
                      fontSize: 12,
                      background: '#e6f7ff',
                      color: '#1890ff',
                    }}
                  >
                    {item.tag}
                  </span>
                </div>
              </div>
            )}
          />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>响应式断点</h3>
        <p style={{ color: '#666', marginBottom: 12 }}>
          拖动浏览器窗口大小可以看到列数自动变化（1200px: 4列, 992px: 3列, 768px: 2列, 0: 1列）
        </p>
        <DemoBlock
          code={`<Masonry
  breakpoints={{ 1200: 4, 992: 3, 768: 2, 0: 1 }}
  data={imageItems}
  renderItem={...}
/>`}
        >
          <Masonry
            breakpoints={{ 1200: 4, 992: 3, 768: 2, 0: 1 }}
            data={imageItems}
            renderItem={(item: any) => (
              <div>
                <div
                  style={{
                    background: imgColors[(item.id - 1) % imgColors.length],
                    height: item.height,
                    borderRadius: '8px 8px 0 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 24,
                    fontWeight: 600,
                  }}
                >
                  {item.id}
                </div>
                <div style={{ padding: 12 }}>
                  <h4 style={{ margin: '0 0 4px', fontSize: 14, color: '#333' }}>
                    {item.title}
                  </h4>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      borderRadius: 4,
                      fontSize: 12,
                      background: '#e6f7ff',
                      color: '#1890ff',
                    }}
                  >
                    {item.tag}
                  </span>
                </div>
              </div>
            )}
          />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>API</h3>
        <ApiTable dataSource={apiData} />
      </div>
    </>
  );
};

export default MasonryDemo;