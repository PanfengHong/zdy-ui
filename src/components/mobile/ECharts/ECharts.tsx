import React from 'react';
import classNames from 'classnames';

import './ECharts.less';
interface EChartsProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const ECharts: React.FC<EChartsProps> = ({
  children,
  className = '',
  style
}) => {

  return (
    <div className={classNames('zdy-mobile-echarts', className)} style={style}>
      {children}
    </div>
  );
};
export default ECharts;
