import React from 'react';
import type { TabPaneProps } from './types';

const TabPane: React.FC<TabPaneProps> = ({ children }) => {
  return <div className="zdy-tabs-tabpane">{children}</div>;
};

export default TabPane;