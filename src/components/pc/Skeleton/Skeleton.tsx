import React from 'react';
import classNames from 'classnames';
import type { BaseSkeletonProps } from './types';

import './Skeleton.less';

const SkeletonAvatar: React.FC<{
  avatar?: BaseSkeletonProps['avatar'];
  active?: boolean;
}> = ({ avatar = false, active = true }) => {
  if (!avatar) return null;

  const avatarConfig = typeof avatar === 'object' ? avatar : {};
  const size = avatarConfig.size || 40;
  const shape = avatarConfig.shape || 'circle';

  return (
    <span
      className={classNames('zdy-skeleton-avatar', `zdy-skeleton-avatar--${shape}`, {
        'zdy-skeleton-avatar--active': active
      })}
      style={{ width: size, height: size, lineHeight: `${size}px` }}
    />
  );
};

const SkeletonTitle: React.FC<{
  title?: BaseSkeletonProps['title'];
  active?: boolean;
}> = ({ title = false, active = true }) => {
  if (!title) return null;

  const titleConfig = typeof title === 'object' ? title : {};
  const width = titleConfig.width || '38%';

  return (
    <div
      className={classNames('zdy-skeleton-title', {
        'zdy-skeleton-title--active': active
      })}
      style={{ width }}
    />
  );
};

const SkeletonParagraph: React.FC<{
  paragraph?: BaseSkeletonProps['paragraph'];
  active?: boolean;
}> = ({ paragraph = true, active = true }) => {
  if (!paragraph) return null;

  const config = typeof paragraph === 'object' ? paragraph : {};
  const rows = config.rows || 3;
  const width = config.width;

  const getRowWidth = (index: number) => {
    if (Array.isArray(width)) {
      return width[index] || width[width.length - 1] || '100%';
    }
    if (typeof width === 'number' || typeof width === 'string') {
      return width;
    }
    if (index === rows - 1) {
      return '61%';
    }
    return '100%';
  };

  return (
    <div className="zdy-skeleton-paragraph">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className={classNames('zdy-skeleton-paragraph-row', {
            'zdy-skeleton-paragraph-row--active': active
          })}
          style={{ width: getRowWidth(index) }}
        />
      ))}
    </div>
  );
};

const Skeleton: React.FC<BaseSkeletonProps> = ({
  active = true,
  avatar = false,
  title = true,
  paragraph = true,
  loading = true,
  children,
  className,
  style
}) => {
  if (!loading) {
    return <>{children}</>;
  }

  const hasAvatar = !!avatar;
  const hasTitle = !!title;
  const hasParagraph = !!paragraph;

  if (!hasAvatar && !hasTitle && !hasParagraph) {
    return (
      <div className={classNames('zdy-skeleton', { 'zdy-skeleton--active': active }, className)} style={style}>
        <div className="zdy-skeleton-block" />
      </div>
    );
  }

  return (
    <div
      className={classNames('zdy-skeleton', { 'zdy-skeleton--active': active }, className)}
      style={style}
    >
      {hasAvatar && (
        <div className="zdy-skeleton-header">
          <SkeletonAvatar avatar={avatar} active={active} />
          {hasTitle && (
            <div className="zdy-skeleton-header-info">
              <SkeletonTitle title={title} active={active} />
            </div>
          )}
        </div>
      )}
      {!hasAvatar && hasTitle && (
        <SkeletonTitle title={title} active={active} />
      )}
      {hasParagraph && (
        <SkeletonParagraph paragraph={paragraph} active={active} />
      )}
    </div>
  );
};

export default Skeleton;