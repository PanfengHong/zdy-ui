import React from 'react';
import classNames from 'classnames';

import './Board.less';
interface BoardProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Board: React.FC<BoardProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('board', className)} style={style}>
      {children}
    </div>
  );
};
export default Board;
