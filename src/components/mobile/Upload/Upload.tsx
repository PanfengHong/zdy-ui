import React from 'react';
import classNames from 'classnames';

import './Upload.less';
interface UploadProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Upload: React.FC<UploadProps> = ({
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
export default Upload;
