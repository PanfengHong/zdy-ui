import React from 'react';
import classNames from 'classnames';
import type { EmptyProps } from '../../../types';

import './Empty.less';

// 默认空状态 SVG 插画
const DefaultEmptyImage: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg
    className="zdy-empty-img"
    style={style}
    width="152"
    height="134"
    viewBox="0 0 152 134"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      {/* 顶部装饰圆点 */}
      <circle cx="76" cy="12" r="3" fill="#D9D9D9" />
      <circle cx="20" cy="20" r="2" fill="#E8E8E8" />
      <circle cx="132" cy="22" r="2" fill="#E8E8E8" />
      {/* 主体盒子 */}
      <rect x="28" y="30" width="96" height="72" rx="4" fill="#F5F5F5" stroke="#D9D9D9" strokeWidth="1.5" />
      <rect x="40" y="44" width="44" height="6" rx="3" fill="#E8E8E8" />
      <rect x="40" y="58" width="72" height="6" rx="3" fill="#E8E8E8" />
      <rect x="40" y="72" width="56" height="6" rx="3" fill="#E8E8E8" />
      <rect x="40" y="86" width="40" height="6" rx="3" fill="#E8E8E8" />
      {/* 底部阴影 */}
      <ellipse cx="76" cy="120" rx="48" ry="6" fill="#F0F0F0" />
    </g>
  </svg>
);

const Empty: React.FC<EmptyProps> = ({
  image,
  description = '暂无数据',
  imageStyle,
  children,
  className = '',
  style,
}) => {
  // image 为空时使用默认插画；false 时不渲染图片
  let imageNode: React.ReactNode = null;
  if (image === false) {
    imageNode = null;
  } else if (image === undefined || image === null) {
    imageNode = <DefaultEmptyImage style={imageStyle} />;
  } else {
    imageNode =
      typeof image === 'string' ? (
        <img className="zdy-empty-img" src={image} alt="" style={imageStyle} />
      ) : (
        <div className="zdy-empty-img" style={imageStyle}>
          {image}
        </div>
      );
  }

  return (
    <div className={classNames('zdy-empty', className)} style={style}>
      {imageNode}
      {description !== null && description !== undefined && (
        <p className="zdy-empty-description">{description}</p>
      )}
      {children && <div className="zdy-empty-footer">{children}</div>}
    </div>
  );
};

export default Empty;
