import React from 'react';
import classNames from 'classnames';

import './MGrid.less';

interface GridProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  columnNum?: number;
  border?: boolean;
}

interface GridItemProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  label?: React.ReactNode;
}

const MGrid: React.FC<GridProps> & {
  Item: React.FC<GridItemProps>;
} = ({
  children,
  className = '',
  style,
  columnNum = 4,
  border = true
}) => {
  return (
    <div className={classNames('zdy-grid', { 'zdy-grid-border': border }, className)} style={style} data-column-num={columnNum}>
      {children}
    </div>
  );
};

const GridItem: React.FC<GridItemProps> = ({
  children,
  className = '',
  style,
  icon,
  label
}) => {
  return (
    <div className={classNames('zdy-grid-item', className)} style={style}>
      {icon && <div className="zdy-grid-item-icon">{icon}</div>}
      {children || label && <div className="zdy-grid-item-label">{label}</div>}
    </div>
  );
};

MGrid.Item = GridItem;

export default MGrid;
