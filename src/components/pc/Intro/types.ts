import React from 'react';
import type { BaseComponentProps } from '../../../types';

export type IntroPlacement =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'left'
  | 'right';

export interface IntroStep {
  target: string | HTMLElement | (() => HTMLElement | null);
  title?: React.ReactNode;
  content?: React.ReactNode;
  placement?: IntroPlacement;
  className?: string;
  style?: React.CSSProperties;
  allowClickTarget?: boolean;
  nextBtnText?: string;
  prevBtnText?: string;
  doneBtnText?: string;
  hidePrev?: boolean;
  hideNext?: boolean;
}

export interface IntroProps extends BaseComponentProps {
  steps: IntroStep[];
  defaultOpen?: boolean;
  open?: boolean;
  current?: number;
  defaultCurrent?: number;
  mask?: boolean;
  maskClosable?: boolean;
  showSteps?: boolean;
  showSkip?: boolean;
  allowKeyboard?: boolean;
  padding?: number;
  borderRadius?: number;
  scrollIntoView?: boolean;
  highlightColor?: string;
  zIndex?: number;
  onOpenChange?: (open: boolean) => void;
  onCurrentChange?: (current: number) => void;
  onChange?: (current: number) => void;
  onClose?: () => void;
  onDone?: () => void;
  onSkip?: () => void;
  onNext?: (current: number) => void;
  onPrev?: (current: number) => void;
  renderButtons?: (ctx: {
    current: number;
    total: number;
    next: () => void;
    prev: () => void;
    skip: () => void;
    done: () => void;
  }) => React.ReactNode;
}
