import React, { Children, isValidElement } from 'react';
import classNames from 'classnames';
import type { StepsProps, StepProps, StepItem, StepStatus } from './types';

import './Steps.less';

// 默认图标：完成（对勾）、处理中（数字）、错误（叉）
const FinishIcon: React.FC = () => (
  <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor" className="zdy-steps-icon-svg">
    <path d="M912 192h-24.9c-4.2 0-8.2 1.7-11.1 4.7L360 712.6 148.1 538.6a14.85 14.85 0 00-11.1-4.7H112c-6.5 0-10.3 7.4-6.5 12.6l246 209.6c3.3 2.8 8.1 2.8 11.4 0l555.6-551.3c3.8-5.2 0-12.6-6.5-12.6z" />
  </svg>
);

const ErrorIcon: React.FC = () => (
  <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor" className="zdy-steps-icon-svg">
    <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.98 7.98 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
  </svg>
);

// 根据 current 和 index 计算步骤状态
const getStepStatus = (
  index: number,
  current: number,
  status: StepStatus,
  stepStatus?: StepStatus
): StepStatus => {
  // 子组件显式指定的 status 优先
  if (stepStatus) return stepStatus;
  // 错误状态：当前步标记为 error
  if (status === 'error' && index === current) return 'error';
  if (index < current) return 'finish';
  if (index === current) return status;
  return 'wait';
};

// 渲染图标内容
const renderIcon = (
  index: number,
  status: StepStatus,
  customIcon?: React.ReactNode,
  percent?: number
): React.ReactNode => {
  if (customIcon) return customIcon;

  if (status === 'finish') return <FinishIcon />;
  if (status === 'error') return <ErrorIcon />;
  if (status === 'process') {
    // 进度环
    if (typeof percent === 'number') {
      const p = Math.min(100, Math.max(0, percent));
      const r = 20;
      const c = 2 * Math.PI * r;
      const offset = c - (c * p) / 100;
      return (
        <span className="zdy-steps-progress">
          <svg viewBox="0 0 48 48" width="100%" height="100%">
            <circle cx="24" cy="24" r={r} fill="none" stroke="#e8e8e8" strokeWidth="4" />
            <circle
              cx="24" cy="24" r={r} fill="none" stroke="currentColor" strokeWidth="4"
              strokeDasharray={c} strokeDashoffset={offset}
              strokeLinecap="round" transform="rotate(-90 24 24)"
            />
          </svg>
          <span className="zdy-steps-progress-text">{p}%</span>
        </span>
      );
    }
    return index + 1;
  }
  // wait
  return index + 1;
};

const Steps: React.FC<StepsProps> & {
  Step: React.FC<StepProps>;
} = ({
  current = 0,
  initial = 0,
  direction = 'horizontal',
  status = 'process',
  size = 'default',
  labelPlacement,
  percent,
  type = 'default',
  onChange,
  children,
  className = '',
  style
}) => {
  // 默认 labelPlacement：标题默认在图标下方（vertical）
  const resolvedLabelPlacement = labelPlacement ?? 'vertical';

  // 提取所有 Step 子组件
  const stepElements = Children.toArray(children).filter(
    (child) => isValidElement(child) && (child.type as any)?.displayName === 'Step'
  ) as React.ReactElement<StepProps>[];

  const total = stepElements.length;
  const realCurrent = current - initial;

  const containerClass = classNames(
    'zdy-steps',
    `zdy-steps--${direction}`,
    `zdy-steps--${size}`,
    `zdy-steps--${type}`,
    `zdy-steps--label-${resolvedLabelPlacement}`,
    className
  );

  return (
    <div className={containerClass} style={style}>
      {stepElements.map((stepEl, index) => {
        const {
          title,
          description,
          icon,
          status: stepStatus,
          disabled,
          onClick,
        } = stepEl.props;

        const computedStatus = getStepStatus(index, realCurrent, status, stepStatus);
        const isLast = index === total - 1;
        const clickable = !!onChange || !!onClick;

        const stepClass = classNames(
          'zdy-steps-item',
          `zdy-steps-item--${computedStatus}`,
          {
            'zdy-steps-item--last': isLast,
            'zdy-steps-item--clickable': clickable && !disabled,
            'zdy-steps-item--disabled': disabled,
            'zdy-steps-item--custom-icon': !!icon,
          }
        );

        const handleStepClick = (e: React.MouseEvent<HTMLDivElement>) => {
          onClick?.(e);
          if (disabled) return;
          onChange?.(initial + index);
        };

        return (
          <div
            key={index}
            className={stepClass}
            onClick={clickable && !disabled ? handleStepClick : undefined}
          >
            <div className="zdy-steps-item-container">
              {/* 图标 */}
              <div className="zdy-steps-item-icon">
                {renderIcon(index, computedStatus, icon, computedStatus === 'process' ? percent : undefined)}
              </div>

              {/* 内容 */}
              <div className="zdy-steps-item-content">
                <div className="zdy-steps-item-title">{title}</div>
                {description && (
                  <div className="zdy-steps-item-description">{description}</div>
                )}
              </div>
            </div>

            {/* 连接线 */}
            {!isLast && (
              <div className="zdy-steps-item-tail" />
            )}
          </div>
        );
      })}
    </div>
  );
};

// Step 子组件（实际渲染由 Steps 控制，这里仅作占位与类型校验）
const Step: React.FC<StepProps> = ({ children }) => {
  return <>{children}</>;
};
Step.displayName = 'Step';

Steps.Step = Step;

export default Steps;
