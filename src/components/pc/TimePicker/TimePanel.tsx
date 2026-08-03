import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

export interface TimePanelProps {
  hour: number;
  minute: number;
  second: number;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  use12Hours?: boolean;
  disabledHours?: () => number[];
  disabledMinutes?: (selectedHour: number) => number[];
  disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
  hideDisabledOptions?: boolean;
  onSelect: (h: number, m: number, s: number) => void;
  className?: string;
}

const scrollToSelected = (list: HTMLDivElement, index: number) => {
  const el = list.children[index] as HTMLElement;
  if (el) {
    list.scrollTop = Math.max(0, el.offsetTop - list.clientHeight / 2 + el.clientHeight / 2);
  }
};

const buildOptions = (max: number, step: number, disabled?: number[]): number[] => {
  const arr: number[] = [];
  for (let i = 0; i < max; i++) {
    if (i % step === 0) arr.push(i);
  }
  if (!disabled || disabled.length === 0) return arr;
  return arr.filter((v) => !disabled.includes(v));
};

const TimePanel: React.FC<TimePanelProps> = ({
  hour,
  minute,
  second,
  hourStep = 1,
  minuteStep = 1,
  secondStep = 1,
  use12Hours = false,
  disabledHours,
  disabledMinutes,
  disabledSeconds,
  hideDisabledOptions = false,
  onSelect,
  className,
}) => {
  const maxHour = use12Hours ? 12 : 24;
  const hours = buildOptions(maxHour, hourStep, disabledHours?.());
  const minutes = buildOptions(60, minuteStep, disabledMinutes?.(hour));
  const seconds = buildOptions(60, secondStep, disabledSeconds?.(hour, minute));

  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hourRef.current) {
      const idx = hours.findIndex((h) => h === hour);
      if (idx >= 0) scrollToSelected(hourRef.current, idx);
    }
    if (minuteRef.current) {
      const idx = minutes.findIndex((m) => m === minute);
      if (idx >= 0) scrollToSelected(minuteRef.current, idx);
    }
    if (secondRef.current) {
      const idx = seconds.findIndex((s) => s === second);
      if (idx >= 0) scrollToSelected(secondRef.current, idx);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hour, minute, second, hours, minutes, seconds]);

  const renderItem = (
    list: number[],
    selected: number,
    listMax: number,
    onClick: (val: number) => void
  ) => {
    // 当选中值不在可选列表中（被禁用且 hideDisabledOptions），展示选中态到最接近的值
    return list.map((val) => (
      <div
        key={val}
        className={classNames('zdy-picker-time-item', {
          'zdy-picker-time-item--selected': val === selected,
          'zdy-picker-time-item--disabled': false,
        })}
        onClick={() => onClick(val)}
      >
        {String(val).padStart(2, '0')}
      </div>
    ));
  };

  return (
    <div className={classNames('zdy-picker-panel', 'zdy-picker-time-panel', className)}>
      <div className="zdy-picker-time-header">
        <div className="zdy-picker-time-header-cell">时</div>
        <div className="zdy-picker-time-header-cell">分</div>
        <div className="zdy-picker-time-header-cell">秒</div>
      </div>
      <div className="zdy-picker-time-body">
        <div className="zdy-picker-time-list" ref={hourRef}>
          {renderItem(hours, hour, maxHour, (h) => onSelect(h, minute, second))}
        </div>
        <div className="zdy-picker-time-list" ref={minuteRef}>
          {renderItem(minutes, minute, 60, (m) => onSelect(hour, m, second))}
        </div>
        <div className="zdy-picker-time-list" ref={secondRef}>
          {renderItem(seconds, second, 60, (s) => onSelect(hour, minute, s))}
        </div>
      </div>
    </div>
  );
};

export default TimePanel;
