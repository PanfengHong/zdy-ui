import React from 'react';
import classNames from 'classnames';

import './MCarousel.less';
interface CarouselProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const MCarousel: React.FC<CarouselProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-mobile-carousel', className)} style={style}>
      {children}
    </div>
  );
};
export default MCarousel;
