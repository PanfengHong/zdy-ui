import React from 'react';
import classNames from 'classnames';

import './Carousel.less';
interface CarouselProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Carousel: React.FC<CarouselProps> = ({
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
export default Carousel;
