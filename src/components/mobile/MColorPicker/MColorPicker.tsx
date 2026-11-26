import React from 'react';
import classNames from 'classnames';

import './MColorPicker.less';
interface ColorPickerProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const MColorPicker: React.FC<ColorPickerProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-mobile-colorpicker', className)} style={style}>
      {children}
    </div>
  );
};
export default MColorPicker;
