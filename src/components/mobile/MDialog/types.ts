import type { CSSProperties, ReactNode } from 'react';

export interface MDialogProps {
  // 是否显示（受控）
  visible?: boolean;
  // 初始是否显示（非受控）
  defaultVisible?: boolean;
  // 标题
  title?: ReactNode;
  // 标题下方的辅助描述
  description?: ReactNode;
  // 正文内容，超出高度时内部滚动
  children?: ReactNode;
  // 底部操作区，传 null 隐藏（默认无操作区）
  footer?: ReactNode | null;
  // 是否显示右上角关闭按钮
  closable?: boolean;
  // 点击遮罩是否关闭
  maskClosable?: boolean;
  // 是否支持 ESC 关闭
  keyboard?: boolean;
  // 内联渲染：相对最近的定位父级铺满（用于手机预览等受限容器）
  inline?: boolean;
  onClose?: () => void;
  className?: string;
  // 正文区域自定义类名
  bodyClassName?: string;
  style?: CSSProperties;
}
