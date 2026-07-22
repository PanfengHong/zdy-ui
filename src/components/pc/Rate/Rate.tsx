import React from 'react';
import classNames from 'classnames';

import './Rate.less';
interface RateProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Rate: React.FC<RateProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('rate', className)} style={style}>
      {children}
    </div>
  );
};
export default Rate;
