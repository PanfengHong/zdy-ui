import React from 'react';
import type { BaseComponentProps } from '../../../types';

export type TabsType = 'default' | 'capsule' | 'pill';

export interface TabPaneProps extends BaseComponentProps {
  tabKey: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}

export interface BaseTabsProps extends BaseComponentProps {
  type?: TabsType;
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  children?: React.ReactNode;
}
