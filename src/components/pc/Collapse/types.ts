import React from 'react';
import type { BaseComponentProps } from '../../../types';

export type CollapseExpandIconPosition = 'start' | 'end';
export type CollapseCollapsible = 'header' | 'disabled' | false;

export interface CollapsePanelProps extends BaseComponentProps {
  panelKey: string;
  header?: React.ReactNode;
  disabled?: boolean;
  extra?: React.ReactNode;
  forceRender?: boolean;
  showArrow?: boolean;
  collapsible?: CollapseCollapsible;
  children?: React.ReactNode;
}

export interface CollapseProps extends BaseComponentProps {
  activeKey?: string[] | string;
  defaultActiveKey?: string[] | string;
  accordion?: boolean;
  bordered?: boolean;
  ghost?: boolean;
  expandIcon?: React.ReactNode;
  expandIconPosition?: CollapseExpandIconPosition;
  destroyInactivePanel?: boolean;
  onChange?: (key: string[]) => void;
  children?: React.ReactNode;
}
