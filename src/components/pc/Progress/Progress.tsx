import React from 'react';
import classNames from 'classnames';
import type { BaseProgressProps } from './types';

import './Progress.less';

const statusColorMap: Record<string, string> = {
  normal: '#1890ff',
  success: '#52c41a',
  exception: '#f5222d',
  active: '#1890ff'
};

const statusIconMap: Record<string, React.ReactNode> = {
  success: (
    <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 5 25.9 13.3l71.2 98.8 157.2-218c6-8.4 15.6-13.3 25.9-13.3H699c6.5 0 11.8 7.4 6.5 12.7z" />
    </svg>
  ),
  exception: (
    <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-0.3L512 563.4l-99.3 118.4-66.1 0.3c-4.4 0-8-3.5-8-8 0-1.9 0.7-3.7 1.9-5.2l130.1-155L340.5 359c-1.2-1.5-1.9-3.3-1.9-5.2 0-4.4 3.6-8 8-8l66.1 0.3L512 464.6l99.3-118.4 66-0.3c4.4 0 8 3.5 8 8 0 1.9-0.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" />
    </svg>
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