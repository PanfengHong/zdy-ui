import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import type { TagProps, CheckableTagProps, TagColor, TagStatus } from '../../../types';

import './Tag.less';

// 预设颜色映射（含语义色和扩展色板）
const PRESET_COLORS: Record<string, { bg: string; border: string; text: string; bgHover?: string }> = {
  // 语义色
  default: { bg: '#fafafa', border: '#d9d9d9', text: '#595959', bgHover: '#f0f0f0' },
  success: { bg: '#f6ffed', border: '#b7eb8f', text: '#389e0d' },
  processing: { bg: '#e6f4ff', border: '#91caff', text: '#0958d9' },
  error: { bg: '#fff2f0', border: '#ffccc7', text: '#cf1322' },
  warning: { bg: '#fffbe6', border: '#ffe58f', text: '#d48806' },
  // 扩展色板
  magenta: { bg: '#fff0f6', border: '#ffadd2', text: '#c41d7f' },
  red: { bg: '#fff2f0', border: '#ffccc7', text: '#cf1322' },
  volcano: { bg: '#fff2e8', border: '#ffbb96', text: '#d4380d' },
  orange: { bg: '#fff7e6', border: '#ffd591', text: '#d46b08' },
  gold: { bg: '#fffbe6', border: '#ffe58f', text: '#d48806' },
  lime: { bg: '#fcffe6', border: '#eaff8f', text: '#7cb305' },
  green: { bg: '#f6ffed', border: '#b7eb8f', text: '#389e0d' },
  cyan: { bg: '#e6fffb', border: '#87e8de', text: '#08979c' },
  blue: { bg: '#e6f4ff', border: '#91caff', text: '#0958d9' },
  geekblue: { bg: '#f0f5ff', border: '#adc6ff', text: '#2f54eb' },
  purple: { bg: '#f9f0ff', border: '#d3adf7', text: '#531dab' },
};

// 状态色映射（与 status 属性配合）
const STATUS_COLORS: Record<TagStatus, { bg: string; border: string; text: string; dot: string }> = {
  default: { bg: '#fafafa', border: '#d9d9d9', text: '#595959', dot: '#8c8c8c' },
  success: { bg: '#f6ffed', border: '#b7eb8f', text: '#389e0d', dot: '#52c41a' },
  processing: { bg: '#e6f4ff', border: '#91caff', text: '#0958d9', dot: '#1677ff' },
  error: { bg: '#fff2f0', border: '#ffccc7', text: '#cf1322', dot: '#ff4d4f' },
  warning: { bg: '#fffbe6', border: '#ffe58f', text: '#d48806', dot: '#faad14' },
};

// 判断是否为预设色
const isPresetColor = (color: string): color is TagColor => {
  return color in PRESET_COLORS;
};

// 判断是否为合法的 CSS 颜色（支持 hex、rgb、rgba、hsl）
const isCssColor = (color: string): boolean => {
  return /^(#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$|rgb[a]?\(|hsl)/i.test(color);
};

// 默认关闭图标
const DefaultCloseIcon: React.FC = () => (
  <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor" className="zdy-tag-close-icon-svg">
    <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.98 7.98 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
  </svg>
);

const Tag: React.FC<TagProps> = ({
  children,
  color = 'default',
  status,
  closable = false,
  closeIcon,
  visible: controlledVisible,
  defaultVisible = true,
  bordered = true,
  icon,
  size = 'default',
  onClick,
  onClose,
  onChange,
  className = '',
  style
}) => {
  const [internalVisible, setInternalVisible] = useState(defaultVisible);
  const visible = controlledVisible ?? internalVisible;

  const handleClose = useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    onClose?.(e);
    if (controlledVisible === undefined) {
      setInternalVisible(false);
    }
    onChange?.(false);
  }, [controlledVisible, onClose, onChange]);

  if (!visible) return null;

  // 计算样式：优先级 status > color
  let tagStyle: React.CSSProperties = { ...style };
  let tagClass = '';

  if (status) {
    const conf = STATUS_COLORS[status];
    tagClass = `zdy-tag--status-${status}`;
    tagStyle = {
      backgroundColor: conf.bg,
      borderColor: conf.border,
      color: conf.text,
      ...style
    };
  } else if (color) {
    if (isPresetColor(color)) {
      tagClass = `zdy-tag--color-${color}`;
    } else if (isCssColor(color)) {
      // 自定义 CSS 颜色：文字用该色，背景用淡色
      tagStyle = {
        backgroundColor: 'transparent',
        borderColor: color,
        color: color,
        ...style
      };
    }
  }

  const classes = classNames(
    'zdy-tag',
    tagClass,
    `zdy-tag--size-${size}`,
    {
      'zdy-tag--bordered': bordered,
      'zdy-tag--closable': closable,
      'zdy-tag--clickable': !!onClick,
    },
    className
  );

  return (
    <span
      className={classes}
      style={tagStyle}
      onClick={onClick}
    >
      {status && <span className="zdy-tag-status-dot" />}
      {icon && <span className="zdy-tag-icon">{icon}</span>}
      <span className="zdy-tag-content">{children}</span>
      {closable && (
        <span className="zdy-tag-close-icon" onClick={handleClose}>
          {closeIcon ?? <DefaultCloseIcon />}
        </span>
      )}
    </span>
  );
};

// 可勾选的 Tag
const CheckableTag: React.FC<CheckableTagProps> = ({
  children,
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  onClick,
  className = '',
  style
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const checked = controlledChecked ?? internalChecked;

  const handleClick = useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
    onClick?.(e);
    const newChecked = !checked;
    if (controlledChecked === undefined) {
      setInternalChecked(newChecked);
    }
    onChange?.(newChecked);
  }, [checked, controlledChecked, onChange, onClick]);

  const classes = classNames(
    'zdy-tag',
    'zdy-tag-checkable',
    { 'zdy-tag-checkable--checked': checked },
    className
  );

  return (
    <span
      className={classes}
      style={style}
      onClick={handleClick}
    >
      {children}
    </span>
  );
};

// 附加 CheckableTag 作为静态属性
type TagType = typeof Tag & {
  CheckableTag: typeof CheckableTag;
};

const TagWithCheckable = Tag as TagType;
TagWithCheckable.CheckableTag = CheckableTag;

export default TagWithCheckable;
