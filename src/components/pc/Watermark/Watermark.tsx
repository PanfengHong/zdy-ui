import React from 'react';
import classNames from 'classnames';

import './Watermark.less';
interface WatermarkProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Watermark: React.FC<WatermarkProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('watermark', className)} style={style}>
      {children}
    </div>
  );
};
export default Watermark;
