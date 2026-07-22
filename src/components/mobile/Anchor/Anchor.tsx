import React from 'react';
import classNames from 'classnames';

import './Anchor.less';
interface AnchorProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Anchor: React.FC<AnchorProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('anchor', className)} style={style}>
      {children}
    </div>
  );
};
export default Anchor;
