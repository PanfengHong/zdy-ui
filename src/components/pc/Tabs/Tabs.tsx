import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import type { BaseTabsProps } from '../../../types';
import TabPane from './TabPane';
import type { TabPaneProps } from '../../../types';

import './Tabs.less';

const Tabs: React.FC<BaseTabsProps> & {
  TabPane: React.FC<TabPaneProps>;
} = ({
  type = 'default',
  activeKey,
  defaultActiveKey,
  onChange,
  className = '',
  style,
  children
}) => {
  const [currentActiveKey, setCurrentActiveKey] = useState<string | undefined>(defaultActiveKey);

  useEffect(() => {
    if (activeKey !== undefined) {
      setCurrentActiveKey(activeKey);
    }
  }, [activeKey]);

  const handleTabClick = (key: string) => {
    if (key === currentActiveKey) return;
    setCurrentActiveKey(key);
    onChange?.(key);
  };

  const getTabPanes = () => {
    const panes: React.ReactNode[] = [];
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        panes.push(child);
      }
    });
    return panes;
  };

  const getDefaultActiveKey = () => {
    const panes = getTabPanes();
    if (panes.length > 0 && React.isValidElement(panes[0])) {
      return panes[0].props.tabKey;
    }
    return undefined;
  };

  const tabs = getTabPanes();
  const activeKeyFinal = currentActiveKey || getDefaultActiveKey();

  return (
    <div className={classNames('zdy-tabs', `zdy-tabs--${type}`, className)} style={style}>
      <div className="zdy-tabs-nav">
        <div className="zdy-tabs-nav-wrap">
          {tabs.map((tab) => {
            if (!React.isValidElement(tab)) return null;
            const { tabKey, title } = tab.props;
            const isActive = tabKey === activeKeyFinal;
            return (
              <div
                key={tabKey}
                className={classNames('zdy-tabs-tab', { 'zdy-tabs-tab--active': isActive })}
                onClick={() => handleTabClick(tabKey)}
              >
                {title}
              </div>
            );
          })}
        </div>

      </div>
      <div className="zdy-tabs-content">
        {tabs.map((tab) => {
          if (!React.isValidElement(tab)) return null;
          const { tabKey, children: tabChildren } = tab.props;
          const isActive = tabKey === activeKeyFinal;
          return (
            <div
              key={tabKey}
              className={classNames('zdy-tabs-content-item', { 'zdy-tabs-content-item--active': isActive })}
            >
              {isActive && tabChildren}
            </div>
          );
        })}
      </div>
    </div>
  );
};

Tabs.TabPane = TabPane;

export default Tabs;