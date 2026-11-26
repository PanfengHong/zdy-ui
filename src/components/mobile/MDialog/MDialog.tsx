import React from 'react';
import classNames from 'classnames';

import './MDialog.less';
interface DialogProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const MDialog: React.FC<DialogProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-mobile-dialog', className)} style={style}>
      {children}
    </div>
  );
};
export default MDialog;
