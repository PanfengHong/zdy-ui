import React from 'react';
import classNames from 'classnames';
import type { BaseProgressProps } from './types';
import Icon from '../Icon/Icon';



import './Progress.less';

const statusColorMap: Record<string, string> = {
  normal: '#1890ff',
  success: '#52c41a',
  exception: '#f5222d',
  active: '#1890ff'
};

const statusIconMap: Record<string, React.ReactNode> = {
  success: (
    <Icon type="confirm" />
  ),
  exception: (
    <Icon type="error" />
  )
};

const Progress: React.FC<BaseProgressProps> = ({
  percent = 0,
  type = 'line',
  status,
  strokeColor,
  strokeWidth,
  showInfo = true,
  format,
  trailColor,
  width = 120,
  gapDegree = 0,
  className,
  style
}) => {
  const clampedPercent = Math.min(100, Math.max(0, percent));
  const actualStatus = status || (clampedPercent >= 100 ? 'success' : 'normal');
  const color = strokeColor || statusColorMap[actualStatus] || statusColorMap.normal;

  const getInfoText = () => {
    if (format) {
      return format(clampedPercent);
    }
    if (actualStatus === 'success') {
      return type === 'circle' ? statusIconMap.success : `${clampedPercent}%`;
    }
    if (actualStatus === 'exception') {
      return type === 'circle' ? statusIconMap.exception : `${clampedPercent}%`;
    }
    return `${clampedPercent}%`;
  };

  if (type === 'circle') {
    const circleWidth = width;
    const lineWidth = strokeWidth || 6;
    const radius = (circleWidth - lineWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - clampedPercent / 100);
    const center = circleWidth / 2;

    return (
      <div
        className={classNames(
          'zdy-progress',
          'zdy-progress--circle',
          `zdy-progress--${actualStatus}`,
          className
        )}
        style={style}
      >
        <svg width={circleWidth} height={circleWidth}>
          <circle
            className="zdy-progress-circle-trail"
            cx={center}
            cy={center}
            r={radius}
            stroke={trailColor || '#f5f5f5'}
            strokeWidth={lineWidth}
            fill="none"
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              ...(gapDegree > 0
                ? {
                    strokeDashoffset: circumference * (gapDegree / 360),
                    transform: 'rotate(-90deg)',
                    transformOrigin: 'center'
                  }
                : {})
            }}
          />
          <circle
            className="zdy-progress-circle-path"
            cx={center}
            cy={center}
            r={radius}
            stroke={color}
            strokeWidth={lineWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{
              transition: 'stroke-dashoffset 0.3s ease',
              ...(gapDegree > 0
                ? {
                    transform: 'rotate(-90deg)',
                    transformOrigin: 'center'
                  }
                : {})
            }}
          />
        </svg>
        {showInfo && (
          <span className="zdy-progress-circle-info" style={{ color }}>
            {getInfoText()}
          </span>
        )}
      </div>
    );
  }

  const lineHeight = strokeWidth || 8;

  return (
    <div
      className={classNames(
        'zdy-progress',
        'zdy-progress--line',
        `zdy-progress--${actualStatus}`,
        className
      )}
      style={style}
    >
      <div className="zdy-progress-outer">
        <div
          className="zdy-progress-inner"
          style={{ height: lineHeight, backgroundColor: trailColor }}
        >
          <div
            className="zdy-progress-bar"
            style={{
              width: `${clampedPercent}%`,
              height: lineHeight,
              backgroundColor: color,
              borderRadius: lineHeight / 2
            }}
          />
        </div>
      </div>
      {showInfo && (
        <span className="zdy-progress-info" style={{ color }}>
          {getInfoText()}
        </span>
      )}
    </div>
  );
};

export default Progress;