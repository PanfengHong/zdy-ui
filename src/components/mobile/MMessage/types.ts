import type { CSSProperties, ReactNode } from 'react';

export type MMessageType = 'info' | 'success' | 'warning' | 'error';

export interface MMessageConfig {
  /** 提示内容 */
  content?: ReactNode;
  /** 提示类型，决定图标与强调色 */
  type?: MMessageType;
  /** 自动关闭时间（毫秒），0 表示不自动关闭 */
  duration?: number;
  /** 是否显示类型图标 */
  showIcon?: boolean;
  /** 是否显示关闭按钮 */
  closable?: boolean;
  /** 关闭回调 */
  onClose?: () => void;
}

export interface MMessageGlobalConfig {
  /** 静态方法的挂载容器，默认 document.body */
  getContainer?: () => HTMLElement;
}

export interface MMessageProps extends MMessageConfig {
  /** 是否显示（声明式用法） */
  visible?: boolean;
  /** 在最近定位父级内显示（手机预览等受限容器） */
  inline?: boolean;
  /** 提示内容，content 未传时使用 */
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
