import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import classNames from 'classnames';
import type { BaseTabsProps } from './types';
import TabPane from './TabPane';
import type { TabPaneProps } from './types';

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

  // 滑动指示块的位置与宽度
  const [inkStyle, setInkStyle] = useState<{ left: number; width: number } | null>(null);
  const navWrapRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLDivElement | null>>({});

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
      const tabPane = panes[0] as React.ReactElement<TabPaneProps>;
      return tabPane.props.tabKey;
    }
    return undefined;
  };

  const tabs = getTabPanes();
  const activeKeyFinal = currentActiveKey || getDefaultActiveKey();

  // 激活项变化或容器尺寸变化时重新测量指示块
  useLayoutEffect(() => {
    const update = () => {
      const el = activeKeyFinal ? tabRefs.current[activeKeyFinal] : null;
      if (!el) return;
      setInkStyle({ left: el.offsetLeft, width: el.offsetWidth });
    };

    update();

    const wrap = navWrapRef.current;
    if (!wrap || typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', update);
      return () => window.removeEventListener('resize', update);
    }

    const observer = new ResizeObserver(update);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [activeKeyFinal, type, tabs.length]);

  return (
    <div className={classNames('zdy-tabs', `zdy-tabs--${type}`, className)} style={style}>
      <div className="zdy-tabs-nav">
        <div className="zdy-tabs-nav-wrap" ref={navWrapRef}>
          <span
            className={classNames('zdy-tabs-ink', {
              'zdy-tabs-ink--ready': inkStyle !== null
            })}
            style={
              inkStyle
                ? { width: inkStyle.width, transform: `translateX(${inkStyle.left}px)` }
                : undefined
            }
          />
          {tabs.map((tab) => {
            if (!React.isValidElement(tab)) return null;
            const tabPane = tab as React.ReactElement<TabPaneProps>;
            const { tabKey, title } = tabPane.props;
            const isActive = tabKey === activeKeyFinal;
            return (
              <div
                key={tabKey}
                ref={el => {
                  tabRefs.current[tabKey] = el;
                }}
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
          const tabPane = tab as React.ReactElement<TabPaneProps>;
          const { tabKey, children: tabChildren } = tabPane.props;
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