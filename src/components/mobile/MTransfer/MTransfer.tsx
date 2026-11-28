import React from 'react';
import classNames from 'classnames';
import './MTransfer.less';

interface TransferProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const MTransfer: React.FC<TransferProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-mobile-transfer', className)} style={style}>
      {children}
    </div>
  );
};
export default MTransfer;
