import React from 'react';
import classNames from 'classnames';
import type { BaseRowProps, BaseColProps, ColSpanType } from './types';

import './Grid.less';

interface SizeType {
  span?: ColSpanType;
  offset?: ColSpanType;
}

type GridType = React.FC & {
  Row: typeof Row;
  Col: typeof Col;
};

const Row: React.FC<BaseRowProps> = ({
  children,
  className = '',
  style,
  gutter = 0,
  justify = 'start',
  align = 'top'
}) => {
  const getGutterStyle = () => {
    if (typeof gutter === 'number') {
      return {
        marginLeft: `${-gutter / 2}px`,
        marginRight: `${-gutter / 2}px`
      };
    }
    return {};
  };

  return (
    <div 
      className={classNames('zdy-row', `zdy-row-justify-${justify}`, `zdy-row-align-${align}`, className)} 
      style={{ ...getGutterStyle(), ...style }}
      data-gutter={typeof gutter === 'number' ? gutter : JSON.stringify(gutter)}
    >
      {children}
    </div>
  );
};

const Col: React.FC<BaseColProps> = ({
  children,
  className = '',
  style,
  span = 24,
  offset = 0,
  push = 0,
  pull = 0,
  xs,
  sm,
  md,
  lg,
  xl
}) => {
  const getSizeClass = (size: SizeType | ColSpanType | undefined, prefix: string) => {
    if (!size) return '';
    if (typeof size === 'number' || typeof size === 'string') {
      return `${prefix}-${size}`;
    }
    const classes: string[] = [];
    if (size.span) {
      classes.push(`${prefix}-${size.span}`);
    }
    if (size.offset) {
      classes.push(`${prefix}-offset-${size.offset}`);
    }
    return classes.join(' ');
  };

  const classes = classNames(
    'zdy-col',
    { [`zdy-col-${span}`]: span },
    { [`zdy-col-offset-${offset}`]: offset },
    { [`zdy-col-push-${push}`]: push },
    { [`zdy-col-pull-${pull}`]: pull },
    getSizeClass(xs, 'zdy-col-xs'),
    getSizeClass(sm, 'zdy-col-sm'),
    getSizeClass(md, 'zdy-col-md'),
    getSizeClass(lg, 'zdy-col-lg'),
    getSizeClass(xl, 'zdy-col-xl'),
    className
  );

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
};

const Grid: GridType = () => null;

Grid.Row = Row;
Grid.Col = Col;

export default Grid;
