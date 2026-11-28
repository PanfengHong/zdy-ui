import type { DemoConfig } from '../../../pages/Components/Demo/types';
import MImage from './MImage';

const landscapeImage =
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=misty%20mountain%20lake%20at%20sunrise%2C%20photorealistic%20landscape%20photography&image_size=landscape_4_3';
const workspaceImage =
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimal%20modern%20workspace%20with%20laptop%20and%20plants%2C%20soft%20daylight&image_size=landscape_4_3';

const mImageDemo: DemoConfig = {
  intro:
    '移动端图片组件用于展示图像资源，支持加载占位、失败兜底、object-fit 填充模式、圆角与点击全屏预览。',
  demos: [
    {
      title: '基础用法',
      desc: '通过 width / height 设置容器尺寸，preview 开启点击预览大图。',
      code: `<MImage
  src={url}
  alt="山间湖泊"
  width="100%"
  height={150}
  preview
/>`,
      render: (
        <div className="mdemo-stack">
          <MImage
            src={landscapeImage}
            alt="山间湖泊"
            width="100%"
            height={150}
            preview
            inline
          />
          <p className="mdemo-tip">点击图片可全屏预览，点击遮罩或关闭按钮退出</p>
        </div>
      )
    },
    {
      title: '圆角与填充模式',
      desc: 'radius 自定义圆角，fit 对应 CSS object-fit，contain 完整显示。',
      code: `<MImage src={url} width="100%" height={120} radius={16} fit="contain" />`,
      render: (
        <div className="mdemo-stack">
          <MImage
            src={workspaceImage}
            alt="工作台"
            width="100%"
            height={120}
            radius={16}
            fit="contain"
            inline
          />
        </div>
      )
    },
    {
      title: '加载失败',
      desc: '未提供 src 或加载失败时展示 fallback 内容。',
      code: `<MImage width="100%" height={120} fallback="图片加载失败" />`,
      render: (
        <div className="mdemo-stack">
          <MImage width="100%" height={120} fallback="图片加载失败" inline />
        </div>
      )
    }
  ],
  api: [
    { prop: 'src', desc: '图片地址', type: 'string', default: '-' },
    { prop: 'alt', desc: '图片描述', type: 'string', default: "''" },
    { prop: 'width', desc: '容器宽度，数字按 px 处理', type: 'number | string', default: '-' },
    { prop: 'height', desc: '容器高度，数字按 px 处理', type: 'number | string', default: '-' },
    { prop: 'fit', desc: '图片填充模式', type: "'fill' | 'contain' | 'cover' | 'none' | 'scale-down'", default: "'cover'" },
    { prop: 'radius', desc: '圆角，数字按 px 处理', type: 'number | string', default: '-' },
    { prop: 'lazy', desc: '是否懒加载', type: 'boolean', default: 'false' },
    { prop: 'preview', desc: '是否点击预览大图', type: 'boolean', default: 'false' },
    { prop: 'inline', desc: '预览层内联，铺满最近定位父级（预览场景）', type: 'boolean', default: 'false' },
    { prop: 'placeholder', desc: '加载中占位内容', type: 'ReactNode', default: "'加载中'" },
    { prop: 'fallback', desc: '加载失败内容', type: 'ReactNode', default: "'加载失败'" },
    { prop: 'onLoad', desc: '图片加载完成回调', type: 'function', default: '-' },
    { prop: 'onError', desc: '图片加载失败回调', type: 'function', default: '-' },
    { prop: 'onClick', desc: '点击回调', type: 'function', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ]
};

export default mImageDemo;
