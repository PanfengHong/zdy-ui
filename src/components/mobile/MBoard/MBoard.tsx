import React from 'react';
import classNames from 'classnames';

import './MBoard.less';
interface BoardProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const MBoard: React.FC<BoardProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-mobile-board', className)} style={style}>
      {children}
    </div>
  );
};
export default MBoard;
