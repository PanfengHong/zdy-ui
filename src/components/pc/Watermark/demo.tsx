import React, { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Watermark from './Watermark';
import Input from '../Input/Input';
import Slider from '../Slider/Slider';

const WatermarkDemo = () => {
  const [content, setContent] = useState('ZDY UI');
  const [fontSize, setFontSize] = useState(14);
  const [rotate, setRotate] = useState(-22);
  const [gapX, setGapX] = useState(100);
  const [gapY, setGapY] = useState(100);
  const [color, setColor] = useState('rgba(0, 0, 0, 0.15)');

  const containerStyle: React.CSSProperties = {
    height: 200,
    padding: 16,
    background: '#fafafa',
    border: '1px solid #f0f0f0',
    borderRadius: 8,
    overflow: 'hidden'
  };

  const apiData = [
    { prop: 'content', desc: '水印文字内容，支持多行（数组形式）', type: 'string | string[]', default: "'ZDY UI'" },
    { prop: 'image', desc: '水印图片地址（优先级高于content）', type: 'string', default: '-' },
    { prop: 'width', desc: '水印宽度', type: 'number', default: '120' },
    { prop: 'height', desc: '水印高度', type: 'number', default: '64' },
    { prop: 'rotate', desc: '旋转角度', type: 'number', default: '-22' },
    { prop: 'zIndex', desc: '水印层级', type: 'number', default: '9' },
    { prop: 'gap', desc: '水印间距 [水平, 垂直]', type: '[number, number]', default: '[100, 100]' },
    { prop: 'offset', desc: '水印偏移 [水平, 垂直]', type: '[number, number]', default: '[0, 0]' },
    { prop: 'font', desc: '字体配置', type: 'WatermarkFontConfig', default: '见下方' },
    { prop: 'inherit', desc: '是否继承父级水印', type: 'boolean', default: 'false' },
    { prop: 'children', desc: '被水印包裹的内容', type: 'ReactNode', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ];

  const fontApiData = [
    { prop: 'color', desc: '字体颜色', type: 'string', default: 'rgba(0, 0, 0, 0.15)' },
    { prop: 'fontSize', desc: '字体大小', type: 'number', default: '14' },
    { prop: 'fontFamily', desc: '字体族', type: 'string', default: 'sans-serif' },
    { prop: 'fontWeight', desc: '字体粗细', type: 'string | number', default: 'normal' }
  ];

  return (
    <>
      <div className="component-group">
        <h3>基础用法</h3>
        <DemoBlock
          code={`
<Watermark content="ZDY UI">
  <div style={{ height: 200, padding: 16, background: '#fafafa' }}>
    这是一段被水印包裹的内容，水印会以半透明的方式覆盖在内容之上。
  </div>
</Watermark>
          `.trim()}
        >
          <Watermark content="ZDY UI">
            <div style={containerStyle}>
              这是一段被水印包裹的内容，水印会以半透明的方式覆盖在内容之上。
            </div>
          </Watermark>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>多行水印</h3>
        <DemoBlock
          code={`
<Watermark content={['ZDY UI', 'Confidential']}>
  <div style={{ height: 200, padding: 16, background: '#fafafa' }}>
    多行水印示例，第一行是组件名，第二行是机密标识。
  </div>
</Watermark>
          `.trim()}
        >
          <Watermark content={['ZDY UI', 'Confidential']}>
            <div style={containerStyle}>
              多行水印示例，第一行是组件名，第二行是机密标识。
            </div>
          </Watermark>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>自定义字体</h3>
        <DemoBlock
          code={`
<Watermark
  content="ZDY UI"
  font={{
    color: 'rgba(24, 144, 255, 0.2)',
    fontSize: 20,
    fontFamily: 'Georgia',
    fontWeight: 'bold'
  }}
>
  <div style={{ height: 200, padding: 16, background: '#fafafa' }}>
    自定义水印字体样式。
  </div>
</Watermark>
          `.trim()}
        >
          <Watermark
            content="ZDY UI"
            font={{
              color: 'rgba(24, 144, 255, 0.2)',
              fontSize: 20,
              fontFamily: 'Georgia'
            }}
          >
            <div style={containerStyle}>
              自定义水印字体样式，蓝色半透明、加粗、20号字、Georgia字体。
            </div>
          </Watermark>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>自定义间距与旋转角度</h3>
        <DemoBlock
          code={`
<Watermark
  content="ZDY UI"
  gap={[200, 150]}
  rotate={-45}
>
  <div style={{ height: 200, padding: 16, background: '#fafafa' }}>
    更大的间距和更大的旋转角度。
  </div>
</Watermark>
          `.trim()}
        >
          <Watermark
            content="ZDY UI"
            gap={[200, 150]}
            rotate={-45}
          >
            <div style={containerStyle}>
              更大的间距（200x150）和更大的旋转角度（-45度）。
            </div>
          </Watermark>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>图片水印</h3>
        <DemoBlock
          code={`
<Watermark
  image="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
  width={100}
  height={100}
>
  <div style={{ height: 200, padding: 16, background: '#fafafa' }}>
    使用图片作为水印内容。
  </div>
</Watermark>
          `.trim()}
        >
          <Watermark
            image="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
            width={100}
            height={100}
          >
            <div style={containerStyle}>
              使用图片作为水印内容，支持任意图片URL。
            </div>
          </Watermark>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>动态配置</h3>
        <DemoBlock
          code={`
const [content, setContent] = useState('ZDY UI');
const [rotate, setRotate] = useState(-22);
const [gapX, setGapX] = useState(100);
const [gapY, setGapY] = useState(100);

<Watermark
  content={content}
  rotate={rotate}
  gap={[gapX, gapY]}
  font={{ color: 'rgba(0,0,0,0.15)', fontSize: 14 }}
>
  <div style={{ height: 200, padding: 16, background: '#fafafa' }}>
    动态调整水印参数。
  </div>
</Watermark>
          `.trim()}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
              <span>内容:</span>
              <Input size="small" value={content} onChange={(e: any) => setContent(e.target.value)} style={{ width: 160 }} />
              <span>字号: {fontSize}px</span>
              <Slider min={10} max={32} value={fontSize} onChange={setFontSize} style={{ width: 120 }} />
            </div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
              <span>旋转: {rotate}°</span>
              <Slider min={-90} max={90} value={rotate} onChange={setRotate} style={{ width: 120 }} />
              <span>水平间距: {gapX}</span>
              <Slider min={0} max={300} value={gapX} onChange={setGapX} style={{ width: 120 }} />
              <span>垂直间距: {gapY}</span>
              <Slider min={0} max={300} value={gapY} onChange={setGapY} style={{ width: 120 }} />
            </div>
            <Watermark
              content={content}
              rotate={rotate}
              gap={[gapX, gapY]}
              font={{ color, fontSize, fontWeight: 'normal' }}
            >
              <div style={containerStyle}>
                动态调整水印参数，实时预览效果。尝试用开发者工具删除水印元素，观察防篡改效果。
              </div>
            </Watermark>
          </div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>防篡改示例</h3>
        <DemoBlock
          code={`
// 水印使用 MutationObserver 监听，
// 如果通过开发者工具删除水印元素，会自动恢复。
<Watermark content="Protected">
  <div style={{ height: 150, padding: 16, background: '#fafafa' }}>
    尝试使用开发者工具删除此水印元素，它会自动恢复。
  </div>
</Watermark>
          `.trim()}
        >
          <Watermark content="Protected" zIndex={99}>
            <div style={{ ...containerStyle, height: 150 }}>
              尝试使用开发者工具（Elements 面板）删除水印的 overlay 元素，它会自动恢复。
              同时修改水印元素的 style 属性也会被还原。
            </div>
          </Watermark>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>API</h3>
        <ApiTable dataSource={apiData} />
      </div>

      <div className="component-group">
        <h3>WatermarkFontConfig API</h3>
        <ApiTable dataSource={fontApiData} />
      </div>
    </>
  );
};

export default WatermarkDemo;