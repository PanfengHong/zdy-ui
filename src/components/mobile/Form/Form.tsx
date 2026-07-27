import React from 'react';
import classNames from 'classnames';

import './Form.less';
interface FormProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Form: React.FC<FormProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-mobile-form', className)} style={style}>
      {children}
    </div>
  );
};
export default Form;
