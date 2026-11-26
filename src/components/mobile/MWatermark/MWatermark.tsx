import React from 'react';
import classNames from 'classnames';

import './MWatermark.less';
interface WatermarkProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const MWatermark: React.FC<WatermarkProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-mobile-watermark', className)} style={style}>
      {children}
    </div>
  );
};
export default MWatermark;
