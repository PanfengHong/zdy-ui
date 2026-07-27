import React from 'react';
import classNames from 'classnames';

import './Intro.less';
interface IntroProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Intro: React.FC<IntroProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-mobile-intro', className)} style={style}>
      {children}
    </div>
  );
};
export default Intro;
