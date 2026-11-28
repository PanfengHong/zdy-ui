import React from 'react';
import classNames from 'classnames';
import type { MProgressProps, MProgressStatus } from './types';

import './MProgress.less';

const statusColorMap: Record<MProgressStatus, string> = {
  normal: '#1890ff',
  active: '#1890ff',
  success: '#52c41a',
  exception: '#f5222d'
};

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5.5 12.6 9.8 17 18.5 7.6"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CrossIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M6.5 6.5l11 11m0-11-11 11"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MProgress: React.FC<MProgressProps> = ({
  percent = 0,
  type = 'line',
  status,
  strokeColor,
  strokeWidth,
  showInfo = true,
  format,
  trailColor,
  width,
  gapDegree = 0,
  ariaLabel,
  className,
  style
}) => {
  const clampedPercent = Math.min(100, Math.max(0, percent));
  const actualStatus: MProgressStatus =
    status || (clampedPercent >= 100 ? 'success' : 'normal');
  const color = strokeColor || statusColorMap[actualStatus];
  const rootClassName = classNames(
    'zdy-mobile-progress',
    `zdy-mobile-progress--${type}`,
    `zdy-mobile-progress--${actualStatus}`,
    className
  );

  const renderStatusIcon = () => {
    if (actualStatus === 'success') return <CheckIcon />;
    if (actualStatus === 'exception') return <CrossIcon />;
    return null;
  };

  const getInfoText = () => {
    if (format) return format(clampedPercent);
    if (type === 'circle' && (actualStatus === 'success' || actualStatus === 'exception')) {
      return renderStatusIcon();
    }
    return `${clampedPercent}%`;
  };

  const a11yProps = {
    role: 'progressbar' as const,
    'aria-valuenow': clampedPercent,
    'aria-valuemin': 0,
    'aria-valuemax': 100,
    'aria-label': ariaLabel
  };

  if (type === 'circle') {
    const circleWidth = width || 96;
    const lineWidth = strokeWidth || 6;
    const radius = Math.max((circleWidth - lineWidth) / 2, 0);
    const circumference = 2 * Math.PI * radius;
    const gap = Math.min(340, Math.max(0, gapDegree));
    const arcLength = circumference * ((360 - gap) / 360);
    const center = circleWidth / 2;
    const infoSize = Math.round(circleWidth * 0.19);

    return (
      <div className={rootClassName} style={style} {...a11yProps}>
        <svg
          className="zdy-mobile-progress-circle-svg"
          width={circleWidth}
          height={circleWidth}
          viewBox={`0 0 ${circleWidth} ${circleWidth}`}
          style={{ transform: `rotate(${-90 + gap / 2}deg)` }}
        >
          <circle
            className="zdy-mobile-progress-circle-trail"
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            strokeWidth={lineWidth}
            strokeLinecap="round"
            strokeDasharray={`${arcLength} ${circumference}`}
            style={{ stroke: trailColor || 'var(--zdy-bg-hover)' }}
          />
          <circle
            className="zdy-mobile-progress-circle-path"
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={lineWidth}
            strokeLinecap="round"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={arcLength * (1 - clampedPercent / 100)}
          />
        </svg>
        {showInfo && (
          <span
            className="zdy-mobile-progress-circle-info"
            style={{
              color,
              fontSize: infoSize,
              maxWidth: circleWidth - lineWidth * 2 - 4
            }}
          >
            {getInfoText()}
          </span>
        )}
      </div>
    );
  }

  const lineHeight = strokeWidth || 6;
  const isGradient = /gradient\(/i.test(color);

  return (
    <div className={rootClassName} style={style} {...a11yProps}>
      <div className="zdy-mobile-progress-outer">
        <div
          className="zdy-mobile-progress-inner"
          style={{ height: lineHeight, backgroundColor: trailColor }}
        >
          <div
            className="zdy-mobile-progress-bar"
            style={{
              width: `${clampedPercent}%`,
              height: lineHeight,
              borderRadius: lineHeight / 2,
              ...(isGradient ? { background: color } : { backgroundColor: color })
            }}
          />
        </div>
      </div>
      {showInfo && (
        <span className="zdy-mobile-progress-info" style={{ color }}>
          {getInfoText()}
        </span>
      )}
    </div>
  );
};

export default MProgress;
