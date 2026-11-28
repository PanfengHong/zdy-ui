import React from 'react';
import classNames from 'classnames';
import type { MSkeletonProps } from './types';

import './MSkeleton.less';

const SHIMMER_CLASS = 'zdy-mobile-skeleton-shimmer';

const SkeletonAvatar: React.FC<{ avatar: NonNullable<MSkeletonProps['avatar']> }> = ({
  avatar
}) => {
  const config = typeof avatar === 'object' ? avatar : {};
  const size = config.size || 44;
  const shape = config.shape || 'circle';

  return (
    <span
      className={classNames(
        'zdy-mobile-skeleton-avatar',
        `zdy-mobile-skeleton-avatar--${shape}`,
        SHIMMER_CLASS
      )}
      style={{ width: size, height: size, flexBasis: size }}
    />
  );
};

const SkeletonTitle: React.FC<{ title: NonNullable<MSkeletonProps['title']> }> = ({ title }) => {
  const config = typeof title === 'object' ? title : {};
  const width = config.width || '40%';

  return (
    <div className={classNames('zdy-mobile-skeleton-title', SHIMMER_CLASS)} style={{ width }} />
  );
};

const SkeletonParagraph: React.FC<{ paragraph: NonNullable<MSkeletonProps['paragraph']> }> = ({
  paragraph
}) => {
  const config = typeof paragraph === 'object' ? paragraph : {};
  const rows = config.rows || 3;
  const width = config.width;

  const getRowWidth = (index: number) => {
    if (Array.isArray(width)) {
      return width[index] ?? width[width.length - 1] ?? '100%';
    }
    if (typeof width === 'number' || typeof width === 'string') {
      return width;
    }
    return index === rows - 1 ? '62%' : '100%';
  };

  return (
    <div className="zdy-mobile-skeleton-paragraph">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className={classNames('zdy-mobile-skeleton-row', SHIMMER_CLASS)}
          style={{ width: getRowWidth(index) }}
        />
      ))}
    </div>
  );
};

const MSkeleton: React.FC<MSkeletonProps> = ({
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

  const rootClassName = classNames(
    'zdy-mobile-skeleton',
    { 'zdy-mobile-skeleton--active': active },
    className
  );

  if (!avatar && !title && !paragraph) {
    return (
      <div className={rootClassName} style={style} aria-busy="true">
        <div className={classNames('zdy-mobile-skeleton-block', SHIMMER_CLASS)} />
      </div>
    );
  }

  return (
    <div className={rootClassName} style={style} aria-busy="true">
      {avatar ? (
        <div className="zdy-mobile-skeleton-header">
          <SkeletonAvatar avatar={avatar} />
          {title ? (
            <div className="zdy-mobile-skeleton-header-info">
              <SkeletonTitle title={title} />
            </div>
          ) : null}
        </div>
      ) : title ? (
        <SkeletonTitle title={title} />
      ) : null}
      {paragraph ? <SkeletonParagraph paragraph={paragraph} /> : null}
    </div>
  );
};

export default MSkeleton;
