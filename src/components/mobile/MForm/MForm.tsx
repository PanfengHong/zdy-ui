import React from 'react';
import classNames from 'classnames';

import './MForm.less';
interface FormProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const MForm: React.FC<FormProps> = ({
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
export default MForm;
