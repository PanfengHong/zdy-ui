import React from 'react';
import classNames from 'classnames';

import './Slider.less';
interface SliderProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Slider: React.FC<SliderProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-mobile-slider', className)} style={style}>
      {children}
    </div>
  );
};
export default Slider;
