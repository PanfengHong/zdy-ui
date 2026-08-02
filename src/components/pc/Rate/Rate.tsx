import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import type { RateProps } from './types';

import './Rate.less';

const StarIcon = ({ fill }: { fill: number }) => {
  // fill: 0 (空), 0.5 (半), 1 (满)
  if (fill === 0) {
    return (
      <svg viewBox="0 0 24 24" className="zdy-rate-star-icon" width="100%" height="100%">
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (fill === 0.5) {
    return (
      <svg viewBox="0 0 24 24" className="zdy-rate-star-icon" width="100%" height="100%">
        <defs>
          <linearGradient id="zdy-rate-half-star">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill="url(#zdy-rate-half-star)"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="zdy-rate-star-icon" width="100%" height="100%">
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const Rate: React.FC<RateProps> = ({
  count = 5,
  value: controlledValue,
  defaultValue = 0,
  allowHalf = false,
  allowClear = true,
  disabled = false,
  character,
  size = 'default',
  tooltips = [],
  onChange,
  onHoverChange,
  className = '',
  style
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState(0);

  const currentValue = controlledValue ?? internalValue;
  const displayValue = hoverValue > 0 ? hoverValue : currentValue;

  const sizeMap = {
    small: 16,
    default: 20,
    large: 28
  };
  const starSize = sizeMap[size];

  const getStarFill = useCallback((starIndex: number): number => {
    // starIndex 从 1 开始
    if (displayValue >= starIndex) return 1;
    if (allowHalf && displayValue >= starIndex - 0.5) return 0.5;
    return 0;
  }, [displayValue, allowHalf]);

  // 判断鼠标位置决定是否半选
  const getMouseValue = (e: React.MouseEvent, starIndex: number): number => {
    if (!allowHalf) return starIndex;
    const rect = e.currentTarget.getBoundingClientRect();
    const isLeftHalf = e.clientX - rect.left < rect.width / 2;
    return isLeftHalf ? starIndex - 0.5 : starIndex;
  };

  const handleClick = (e: React.MouseEvent, starIndex: number) => {
    if (disabled) return;
    const newValue = getMouseValue(e, starIndex);

    // allowClear: 点击当前值时清零
    if (allowClear && newValue === currentValue) {
      if (controlledValue === undefined) {
        setInternalValue(0);
      }
      onChange?.(0);
      return;
    }

    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleMouseMove = (e: React.MouseEvent, starIndex: number) => {
    if (disabled) return;
    const newValue = getMouseValue(e, starIndex);
    if (newValue !== hoverValue) {
      setHoverValue(newValue);
      onHoverChange?.(newValue);
    }
  };

  const handleMouseLeave = () => {
    if (hoverValue !== 0) {
      setHoverValue(0);
      onHoverChange?.(0);
    }
  };

  const renderCharacter = (fill: number) => {
    if (character) {
      return (
        <span
          className={classNames('zdy-rate-character', {
            'zdy-rate-character--filled': fill > 0
          })}
        >
          {character}
        </span>
      );
    }
    return <StarIcon fill={fill} />;
  };

  const rootClass = classNames(
    'zdy-rate',
    `zdy-rate--${size}`,
    { 'zdy-rate--disabled': disabled },
    className
  );

  return (
    <ul className={rootClass} style={style} onMouseLeave={handleMouseLeave}>
      {Array.from({ length: count }, (_, i) => {
        const starIndex = i + 1;
        const fill = getStarFill(starIndex);
        const tip = tooltips[i];

        return (
          <li
            key={i}
            className={classNames('zdy-rate-star', {
              'zdy-rate-star--active': fill > 0,
              'zdy-rate-star--has-tip': !!tip
            })}
            style={{ width: starSize, height: starSize }}
            onMouseMove={(e) => handleMouseMove(e, starIndex)}
            onClick={(e) => handleClick(e, starIndex)}
          >
            {tip && <div className="zdy-rate-star-tip">{tip}</div>}
            {renderCharacter(fill)}
          </li>
        );
      })}
    </ul>
  );
};

export default Rate;
