import React from 'react';
import classNames from 'classnames';

import './MMasonry.less';
interface MasonryProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const MMasonry: React.FC<MasonryProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-mobile-masonry', className)} style={style}>
      {children}
    </div>
  );
};
export default MMasonry;
