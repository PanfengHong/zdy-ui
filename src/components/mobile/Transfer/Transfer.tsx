import React from 'react';
import classNames from 'classnames';

import './Transfer.less';
interface TransferProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Transfer: React.FC<TransferProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('transfer', className)} style={style}>
      {children}
    </div>
  );
};
export default Transfer;
