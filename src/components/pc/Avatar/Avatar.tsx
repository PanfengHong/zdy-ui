import React, { useState, useCallback, useRef, useEffect } from 'react';
import classNames from 'classnames';
import type { AvatarProps, AvatarGroupProps, AvatarStatus } from './types';

import './Avatar.less';

// 尺寸映射
const SIZE_MAP: Record<string, number> = {
  small: 24,
  medium: 32,
  large: 40,
};

// 状态点颜色映射
const STATUS_COLORS: Record<AvatarStatus, string> = {
  online: '#52c41a',
  busy: '#f5222d',
  away: '#faad14',
  offline: '#bfbfbf',
};

// 默认用户图标
const DefaultUserIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const Avatar: React.FC<AvatarProps> = ({
  src,
  srcSet,
  alt,
  icon,
  text,
  size = 'medium',
  shape = 'circle',
  status,
  statusColor,
  gap = 4,
  onError,
  onClick,
  className = '',
  style,
}) => {
  const [isImgError, setIsImgError] = useState(false);
  const [scale, setScale] = useState(1);
  const textRef = useRef<HTMLSpanElement>(null);
  const avatarRef = useRef<HTMLSpanElement>(null);

  const hasImage = src && !isImgError;
  const numericSize = typeof size === 'number' ? size : SIZE_MAP[size] || 32;

  // 文字自适应缩放：当文字宽度超过头像宽度时按比例缩小
  useEffect(() => {
    if (text && textRef.current && avatarRef.current) {
      const textWidth = textRef.current.offsetWidth;
      const avatarWidth = avatarRef.current.offsetWidth;
      if (textWidth > 0 && avatarWidth > 0) {
        const availableWidth = avatarWidth - gap * 2;
        if (textWidth > availableWidth) {
          setScale(availableWidth / textWidth);
        } else {
          setScale(1);
        }
      }
    }
  }, [text, gap, numericSize]);

  const handleImgError = useCallback(() => {
    const ret = onError?.();
    if (ret !== false) {
      setIsImgError(true);
    }
  }, [onError]);

  const classes = classNames(
    'zdy-avatar',
    `zdy-avatar--${shape}`,
    {
      'zdy-avatar--clickable': !!onClick,
    },
    className
  );

  // 头像内容渲染优先级：图片 > 图标 > 文字 > 默认图标
  let content: React.ReactNode;
  if (hasImage) {
    content = (
      <img
        src={src}
        srcSet={srcSet}
        alt={alt}
        onError={handleImgError}
        className="zdy-avatar-img"
      />
    );
  } else if (icon) {
    content = <span className="zdy-avatar-icon">{icon}</span>;
  } else if (text) {
    content = (
      <span
        ref={textRef}
        className="zdy-avatar-text"
        style={{ transform: `scale(${scale})` }}
      >
        {text}
      </span>
    );
  } else {
    content = <DefaultUserIcon size={numericSize} />;
  }

  const avatarStyle: React.CSSProperties = {
    width: numericSize,
    height: numericSize,
    ...style,
  };

  return (
    <span className="zdy-avatar-wrapper" style={{ width: numericSize, height: numericSize }}>
      <span
        ref={avatarRef}
        className={classes}
        style={avatarStyle}
        onClick={onClick}
      >
        {content}
      </span>
      {status && (
        <span
          className={classNames('zdy-avatar-status', `zdy-avatar-status--${status}`)}
          style={{ backgroundColor: statusColor || STATUS_COLORS[status] }}
        />
      )}
    </span>
  );
};

// ============== Avatar.Group ==============
const Group: React.FC<AvatarGroupProps> = ({
  children,
  maxCount,
  maxStyle,
  size,
  shape,
  className = '',
  style,
}) => {
  const childrenArray = React.Children.toArray(children);

  let renderChildren = childrenArray;
  let excessCount = 0;

  if (maxCount !== undefined && maxCount >= 0 && childrenArray.length > maxCount) {
    renderChildren = childrenArray.slice(0, maxCount);
    excessCount = childrenArray.length - maxCount;
  }

  const numericSize = typeof size === 'number' ? size : SIZE_MAP[size || 'medium'] || 32;

  return (
    <span
      className={classNames('zdy-avatar-group', className)}
      style={style}
    >
      {renderChildren.map((child, index) => {
        if (React.isValidElement<AvatarProps>(child)) {
          return React.cloneElement(child, {
            key: index,
            size: size ?? child.props.size,
            shape: shape ?? child.props.shape,
          });
        }
        return child;
      })}
      {excessCount > 0 && (
        <span
          className={classNames('zdy-avatar', 'zdy-avatar--excess', shape ? `zdy-avatar--${shape}` : 'zdy-avatar--circle')}
          style={{
            width: numericSize,
            height: numericSize,
            ...maxStyle,
          }}
        >
          <span className="zdy-avatar-text">+{excessCount}</span>
        </span>
      )}
    </span>
  );
};

// 附加 Group 作为静态属性
type AvatarType = typeof Avatar & {
  Group: typeof Group;
};

const AvatarWithGroup = Avatar as AvatarType;
AvatarWithGroup.Group = Group;

export default AvatarWithGroup;
