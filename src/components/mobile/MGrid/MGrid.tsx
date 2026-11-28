import type { CSSProperties, ReactElement } from 'react';
import classNames from 'classnames';
import type { MGridItemProps, MGridProps } from './types';

import './MGrid.less';

const MGrid = (({
  columnNum = 4,
  border = true,
  children,
  className,
  style
}: MGridProps) => {
  const columns = Math.max(1, Math.floor(columnNum || 4));
  const gridStyle = {
    ...style,
    '--zdy-mobile-grid-columns': columns
  } as CSSProperties;

  return (
    <div
      className={classNames('zdy-mobile-grid', { 'zdy-mobile-grid--border': border }, className)}
      style={gridStyle}
      data-column-num={columns}
    >
      {children}
    </div>
  );
}) as {
  (props: MGridProps): ReactElement;
  Item: (props: MGridItemProps) => ReactElement;
};

const MGridItem = ({
  icon,
  label,
  onClick,
  children,
  className,
  style
}: MGridItemProps) => {
  const classNameValue = classNames(
    'zdy-mobile-grid-item',
    { 'zdy-mobile-grid-item--clickable': Boolean(onClick) },
    className
  );

  const content = (
    <>
      {icon !== undefined && icon !== null && (
        <span className="zdy-mobile-grid-item-icon">{icon}</span>
      )}
      {label !== undefined && label !== null && (
        <span className="zdy-mobile-grid-item-label">{label}</span>
      )}
      {children}
    </>
  );

  if (onClick) {
    return (
      <button type="button" className={classNameValue} style={style} onClick={onClick}>
        {content}
      </button>
    );
  }

  return (
    <div className={classNameValue} style={style}>
      {content}
    </div>
  );
};

MGrid.Item = MGridItem;

export default MGrid;
