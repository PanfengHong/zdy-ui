import React from 'react';
import classNames from 'classnames';

import './MTag.less';
interface TagProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const MTag: React.FC<TagProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-mobile-tag', className)} style={style}>
      {children}
    </div>
  );
};
export default MTag;
