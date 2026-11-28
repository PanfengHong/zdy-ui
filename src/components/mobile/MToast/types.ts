import type { CSSProperties, ReactNode } from 'react';

export type MToastType = 'info' | 'success' | 'error' | 'warning' | 'loading';

export type MToastPosition = 'top' | 'center' | 'bottom';

export interface MToastConfig {
  /** 提示内容 */
  content?: ReactNode;
  /** 提示类型，决定默认图标；info 为纯文字提示 */
  type?: MToastType;
  /** 显示位置 */
  position?: MToastPosition;
  /** 自动关闭时间（毫秒），0 表示不自动关闭；loading 默认不自动关闭 */
  duration?: number;
  /** 是否显示透明遮罩，阻止页面点击 */
  mask?: boolean;
  /** 自定义图标；传 null 可隐藏图标 */
  icon?: ReactNode;
  /** 关闭回调 */
  onClose?: () => void;
}

export interface MToastProps extends MToastConfig {
  /** 是否显示（声明式用法） */
  visible?: boolean;
  /** 在最近定位父级内显示（手机预览等受限容器） */
  inline?: boolean;
  /** 提示内容，content 未传时使用 */
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
