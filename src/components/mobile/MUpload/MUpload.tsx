import React from 'react';
import classNames from 'classnames';

import './MUpload.less';
interface UploadProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const MUpload: React.FC<UploadProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-mobile-upload', className)} style={style}>
      {children}
    </div>
  );
};
export default MUpload;
