import React from 'react';
import classNames from 'classnames';

import './Textarea.less';
interface TextareaProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Textarea: React.FC<TextareaProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-mobile-textarea', className)} style={style}>
      {children}
    </div>
  );
};
export default Textarea;
