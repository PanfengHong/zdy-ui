import React from 'react';
import classNames from 'classnames';

import './MAnchor.less';
interface AnchorProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const MAnchor: React.FC<AnchorProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-mobile-anchor', className)} style={style}>
      {children}
    </div>
  );
};
export default MAnchor;
