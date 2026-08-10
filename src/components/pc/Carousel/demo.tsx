import { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Carousel from './Carousel';

const CarouselDemo = () => {
  const [autoplay, setAutoplay] = useState(true);
  const [effect, setEffect] = useState<'slide' | 'fade' | 'stack'>('slide');

  const slides = [
    { color: 'rgb(54, 77, 121)', title: '1', desc: '这里输入描述' },
    { color: 'rgb(54, 77, 121)', title: '2', desc: '这里输入描述' },
    { color: 'rgb(54, 77, 121)', title: '3', desc: '这里输入描述' },
    { color: 'rgb(54, 77, 121)', title: '4', desc: '这里输入描述' },
  ];

  const renderSlide = (color: string, title: string, desc: string) => (
    <div
      style={{
        background: color,
        height: 240,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        padding: 24,
        textAlign: 'center',
      }}
    >
      <div style={{ margin: '0 0 8px', fontSize: 28, fontWeight: 600 }}>{title}</div>
      <p style={{ margin: 0, fontSize: 14, opacity: 0.9 }}>{desc}</p>
    </div>
  );

  const apiData = [
    { prop: 'autoplay', desc: '是否自动播放', type: 'boolean', default: 'true' },
    { prop: 'interval', desc: '自动播放间隔（毫秒）', type: 'number', default: '3000' },
    { prop: 'effect', desc: '切换效果', type: "'slide' | 'fade' | 'stack'", default: "'slide'" },
    { prop: 'dots', desc: '是否显示指示点', type: 'boolean', default: 'true' },
    { prop: 'arrows', desc: '是否显示切换箭头', type: 'boolean', default: 'true' },
    { prop: 'loop', desc: '是否循环播放', type: 'boolean', default: 'true' },
    { prop: 'pauseOnHover', desc: '鼠标悬停时是否暂停', type: 'boolean', default: 'true' },
    { prop: 'defaultActiveIndex', desc: '默认激活的幻灯片索引', type: 'number', default: '0' },
    { prop: 'afterChange', desc: '切换完成回调', type: '(current: number) => void', default: '-' },
    { prop: 'beforeChange', desc: '切换前回调', type: '(from: number, to: number) => void', default: '-' },
    { prop: 'children', desc: '幻灯片内容', type: 'ReactNode', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' },
  ];

  const demos = [
    {
      title: '基础用法',
      code: `<Carousel style={{ width: 500 }}>\n  <div style={{ background: '#1890ff', height: 200 }}>Slide 1</div>\n  <div style={{ background: '#52c41a', height: 200 }}>Slide 2</div>\n  <div style={{ background: '#faad14', height: 200 }}>Slide 3</div>\n</Carousel>`,
      render: (
        <div style={{ width: 500, maxWidth: '100%' }}>
          <Carousel>
            {slides.map((s, i) => (
              <div key={i}>
                {renderSlide(s.color, s.title, s.desc)}
              </div>
            ))}
          </Carousel>
        </div>
      ),
    },
    {
      title: '效果切换',
      code: `<Carousel effect="fade" interval={2000}>\n  ...\n</Carousel>`,
      render: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <label>
              <input
                type="checkbox"
                checked={autoplay}
                onChange={(e) => setAutoplay(e.target.checked)}
              />
              &nbsp;自动播放
            </label>
            <select
              value={effect}
              onChange={(e) => setEffect(e.target.value as any)}
              style={{ padding: '4px 8px', borderRadius: 4 }}
            >
              <option value="slide">滑动效果 (slide)</option>
              <option value="fade">淡入淡出 (fade)</option>
              <option value="stack">层次堆叠 (stack)</option>
            </select>
          </div>
          <div style={{ width: 500, maxWidth: '100%' }}>
            <Carousel autoplay={autoplay} interval={2000} effect={effect}>
              {slides.map((s, i) => (
                <div key={i}>
                  {renderSlide(s.color, s.title, s.desc)}
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      ),
    },
    {
      title: '淡入淡出效果',
      code: `<Carousel effect="fade" interval={3000}>\n  ...\n</Carousel>`,
      render: (
        <div style={{ width: 500, maxWidth: '100%' }}>
          <Carousel effect="fade" interval={3000}>
            {slides.map((s, i) => (
              <div key={i}>
                {renderSlide(s.color, s.title, s.desc)}
              </div>
            ))}
          </Carousel>
        </div>
      ),
    },
    {
      title: '层次堆叠效果',
      code: `<Carousel effect="stack" interval={3000}>\n  ...\n</Carousel>`,
      render: (
        <>
          <div style={{ width: 500, maxWidth: '100%' }}>
            <Carousel effect="stack" interval={3000}>
              {slides.map((s, i) => (
                <div key={i}>
                  {renderSlide(s.color, s.title, s.desc)}
                </div>
              ))}
            </Carousel>
          </div>
          <p style={{ color: '#999', marginTop: 8 }}>
            当前幻灯片在最前面，其他幻灯片按层次堆叠在后面，产生3D视觉效果
          </p>
        </>
      ),
    },
    {
      title: '自定义间隔',
      code: `<Carousel interval={1000}>\n  ...\n</Carousel>`,
      render: (
        <>
          <div style={{ width: 500, maxWidth: '100%' }}>
            <Carousel interval={1000}>
              {slides.map((s, i) => (
                <div key={i}>
                  {renderSlide(s.color, s.title, s.desc)}
                </div>
              ))}
            </Carousel>
          </div>
          <p style={{ color: '#999', marginTop: 8 }}>每 1 秒自动切换一张</p>
        </>
      ),
    },
    {
      title: '无指示点',
      code: `<Carousel dots={false}>\n  ...\n</Carousel>`,
      render: (
        <div style={{ width: 500, maxWidth: '100%' }}>
          <Carousel dots={false}>
            {slides.map((s, i) => (
              <div key={i}>
                {renderSlide(s.color, s.title, s.desc)}
              </div>
            ))}
          </Carousel>
        </div>
      ),
    },
    {
      title: '无箭头',
      code: `<Carousel arrows={false}>\n  ...\n</Carousel>`,
      render: (
        <>
          <div style={{ width: 500, maxWidth: '100%' }}>
            <Carousel arrows={false}>
              {slides.map((s, i) => (
                <div key={i}>
                  {renderSlide(s.color, s.title, s.desc)}
                </div>
              ))}
            </Carousel>
          </div>
          <p style={{ color: '#999', marginTop: 8 }}>
            可通过底部指示点切换，或使用键盘左右方向键
          </p>
        </>
      ),
    },
    {
      title: '默认激活项',
      code: `<Carousel defaultActiveIndex={2}>\n  ...\n</Carousel>`,
      render: (
        <>
          <div style={{ width: 500, maxWidth: '100%' }}>
            <Carousel defaultActiveIndex={2}>
              {slides.map((s, i) => (
                <div key={i}>
                  {renderSlide(s.color, s.title, s.desc)}
                </div>
              ))}
            </Carousel>
          </div>
          <p style={{ color: '#999', marginTop: 8 }}>初始展示第三张幻灯片</p>
        </>
      ),
    },
    {
      title: '回调函数',
      code: `<Carousel\n  beforeChange={(from, to) => console.log('从', from, '切换到', to)}\n  afterChange={(current) => console.log('当前', current)}\n>\n  ...\n</Carousel>`,
      render: (
        <>
          <Carousel
            interval={4000}
            beforeChange={(from, to) =>
              console.log('切换前：从第', from + 1, '张到第', to + 1, '张')
            }
            afterChange={(current) =>
              console.log('切换后：当前第', current + 1, '张')
            }
          >
            {slides.map((s, i) => (
              <div key={i}>
                {renderSlide(s.color, s.title, s.desc)}
              </div>
            ))}
          </Carousel>
          <p style={{ color: '#999', marginTop: 8 }}>
            打开浏览器控制台查看切换回调日志
          </p>
        </>
      ),
    },
    {
      title: '键盘导航',
      code: `<Carousel>\n  // 使用 Tab 聚焦后，按 ← → 方向键切换\n  ...\n</Carousel>`,
      render: (
        <>
          <div style={{ width: 500, maxWidth: '100%' }}>
            <Carousel autoplay={false}>
              {slides.map((s, i) => (
                <div key={i}>
                  {renderSlide(s.color, s.title, s.desc)}
                </div>
              ))}
            </Carousel>
          </div>
          <p style={{ color: '#999', marginTop: 8 }}>
            点击轮播区域后，使用键盘 ← → 方向键切换幻灯片
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      {demos.map((demo) => (
        <div key={demo.title} className="component-group">
          <h3>{demo.title}</h3>
          <DemoBlock code={demo.code}>{demo.render}</DemoBlock>
        </div>
      ))}
      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>API</h3>
        <ApiTable dataSource={apiData} />
      </div>
    </>
  );
};

export default CarouselDemo;
