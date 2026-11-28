import type { CSSProperties, ReactNode } from 'react';

export type MDrawerPlacement = 'top' | 'right' | 'bottom' | 'left';

export interface MDrawerProps {
  /** 是否显示（受控） */
  visible?: boolean;
  /** 初始是否显示（非受控） */
  defaultVisible?: boolean;
  /** 滑出方向，默认 bottom */
  placement?: MDrawerPlacement;
  /** 宽度，left / right 方向生效；数字按 px 处理，默认 80% */
  width?: string | number;
  /** 高度，top / bottom 方向生效；数字按 px 处理，默认 50% */
  height?: string | number;
  /** 标题 */
  title?: ReactNode;
  /** 是否显示右上角关闭按钮 */
  closable?: boolean;
  /** 点击遮罩是否关闭 */
  maskClosable?: boolean;
  /** 是否支持 ESC 关闭 */
  keyboard?: boolean;
  /** 底部操作区，传 null 隐藏 */
  footer?: ReactNode | null;
  /** 内联渲染：铺满最近定位父级，用于手机预览等受限容器 */
  inline?: boolean;
  onClose?: () => void;
  className?: string;
  /** 内容区域自定义类名 */
  bodyClassName?: string;
  style?: CSSProperties;
  children?: ReactNode;
}
