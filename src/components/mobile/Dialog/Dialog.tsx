import React from 'react';
import classNames from 'classnames';

import './Dialog.less';
interface DialogProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Dialog: React.FC<DialogProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('dialog', className)} style={style}>
      {children}
    </div>
  );
};
export default Dialog;
