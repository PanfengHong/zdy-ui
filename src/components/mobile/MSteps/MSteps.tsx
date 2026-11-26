import React from 'react';
import classNames from 'classnames';

import './MSteps.less';
interface StepsProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const MSteps: React.FC<StepsProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-mobile-steps', className)} style={style}>
      {children}
    </div>
  );
};
export default MSteps;
