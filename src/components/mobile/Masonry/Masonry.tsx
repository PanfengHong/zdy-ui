import React from 'react';
import classNames from 'classnames';

import './Masonry.less';
interface MasonryProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Masonry: React.FC<MasonryProps> = ({
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
export default Masonry;
