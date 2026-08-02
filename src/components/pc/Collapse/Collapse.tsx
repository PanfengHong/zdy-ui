import React, { useState, useEffect, useRef, useCallback } from 'react';
import classNames from 'classnames';
import type { CollapseProps, CollapsePanelProps } from '../../../types';
import Icon from '../Icon/Icon';

import './Collapse.less';

// 将 activeKey 标准化为数组
const toArray = (activeKey: string[] | string | undefined): string[] => {
  if (activeKey === undefined || activeKey === null) return [];
  if (Array.isArray(activeKey)) return activeKey.map(String);
  return [String(activeKey)];
};

const CollapsePanel: React.FC<CollapsePanelProps> = () => null;

interface PanelContentType {
  panelKey: string;
  header?: React.ReactNode;
  disabled?: boolean;
  extra?: React.ReactNode;
  forceRender?: boolean;
  showArrow?: boolean;
  collapsible?: CollapsePanelProps['collapsible'];
  children?: React.ReactNode;
}

const PanelContent: React.FC<{
  panel: PanelContentType;
  isActive: boolean;
  expandIcon?: React.ReactNode;
  expandIconPosition: 'start' | 'end';
  destroyInactivePanel: boolean;
  onToggle: (key: string) => void;
}> = ({ panel, isActive, expandIcon, expandIconPosition, destroyInactivePanel, onToggle }) => {
  const {
    panelKey,
    header,
    disabled,
    extra,
    forceRender,
    showArrow = true,
    collapsible = 'header',
    children,
  } = panel;

  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(isActive ? undefined : 0);

  // 测量内容高度并应用动画
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (isActive) {
      const scrollH = el.scrollHeight;
      setContentHeight(scrollH);
      // 动画结束后设置为 auto 以适应内容变化
      const timer = window.setTimeout(() => {
        if (contentRef.current) setContentHeight(undefined);
      }, 300);
      return () => window.clearTimeout(timer);
    } else {
      // 折叠前先固定当前高度，再下一帧设为 0 以触发过渡
      const scrollH = el.scrollHeight;
      setContentHeight(scrollH);
      const raf = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setContentHeight(0));
      });
      return () => window.cancelAnimationFrame(raf);
    }
  }, [isActive]);

  const showArrowIcon = showArrow && collapsible !== false;
  const isDisabled = disabled || collapsible === 'disabled';
  const headerClickable = !isDisabled && collapsible === 'header';

  const handleHeaderClick = () => {
    if (!headerClickable) return;
    onToggle(panelKey);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!headerClickable) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle(panelKey);
    }
  };

  const defaultExpandIcon = expandIcon !== undefined ? expandIcon : (
    <Icon type="right" size={14} color="currentColor" />
  );

  // 渲染内容
  const shouldRenderChildren = isActive || forceRender || !destroyInactivePanel;
  const childrenNode = shouldRenderChildren ? children : null;

  return (
    <div
      className={classNames('zdy-collapse-item', {
        'zdy-collapse-item--active': isActive,
        'zdy-collapse-item--disabled': isDisabled,
      })}
    >
      <div
        className={classNames('zdy-collapse-header', {
          'zdy-collapse-header--clickable': headerClickable,
          'zdy-collapse-header--end': expandIconPosition === 'end',
        })}
        role="button"
        tabIndex={headerClickable ? 0 : -1}
        onClick={handleHeaderClick}
        onKeyDown={handleKeyDown}
        aria-expanded={isActive}
        aria-disabled={isDisabled}
      >
        {showArrowIcon && expandIconPosition === 'start' && (
          <span className={classNames('zdy-collapse-arrow', { 'zdy-collapse-arrow--active': isActive })}>
            {defaultExpandIcon}
          </span>
        )}
        <span className="zdy-collapse-header-text">{header}</span>
        {extra && <span className="zdy-collapse-extra" onClick={(e) => e.stopPropagation()}>{extra}</span>}
        {showArrowIcon && expandIconPosition === 'end' && (
          <span className={classNames('zdy-collapse-arrow', { 'zdy-collapse-arrow--active': isActive })}>
            {defaultExpandIcon}
          </span>
        )}
      </div>
      <div
        ref={contentRef}
        className={classNames('zdy-collapse-content', { 'zdy-collapse-content--hidden': !isActive && contentHeight === 0 })}
        style={{
          height: contentHeight === undefined ? 'auto' : contentHeight,
        }}
      >
        <div className="zdy-collapse-content-box">{childrenNode}</div>
      </div>
    </div>
  );
};

const Collapse: React.FC<CollapseProps> & {
  Panel: React.FC<CollapsePanelProps>;
} = ({
  activeKey,
  defaultActiveKey,
  accordion = false,
  bordered = true,
  ghost = false,
  expandIcon,
  expandIconPosition = 'start',
  destroyInactivePanel = false,
  onChange,
  className = '',
  style,
  children,
}) => {
  const [activeKeys, setActiveKeys] = useState<string[]>(() => toArray(defaultActiveKey));

  // 受控模式
  const isControlled = activeKey !== undefined;
  useEffect(() => {
    if (isControlled) {
      let keys = toArray(activeKey);
      // 手风琴模式下只保留第一个
      if (accordion && keys.length > 1) {
        keys = keys.slice(0, 1);
      }
      setActiveKeys(keys);
    }
  }, [activeKey, accordion, isControlled]);

  const handleToggle = useCallback(
    (key: string) => {
      let nextKeys: string[];
      if (accordion) {
        nextKeys = activeKeys.includes(key) ? [] : [key];
      } else {
        nextKeys = activeKeys.includes(key)
          ? activeKeys.filter((k) => k !== key)
          : [...activeKeys, key];
      }
      if (!isControlled) {
        setActiveKeys(nextKeys);
      }
      onChange?.(nextKeys);
    },
    [activeKeys, accordion, isControlled, onChange]
  );

  // 提取所有 Panel 子节点
  const panels: PanelContentType[] = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === CollapsePanel) {
      const props = child.props as CollapsePanelProps;
      panels.push({
        panelKey: props.panelKey,
        header: props.header,
        disabled: props.disabled,
        extra: props.extra,
        forceRender: props.forceRender,
        showArrow: props.showArrow,
        collapsible: props.collapsible,
        children: props.children,
      });
    }
  });

  return (
    <div
      className={classNames('zdy-collapse', className, {
        'zdy-collapse--bordered': bordered && !ghost,
        'zdy-collapse--ghost': ghost,
      })}
      style={style}
    >
      {panels.map((panel) => (
        <PanelContent
          key={panel.panelKey}
          panel={panel}
          isActive={activeKeys.includes(panel.panelKey)}
          expandIcon={expandIcon}
          expandIconPosition={expandIconPosition}
          destroyInactivePanel={destroyInactivePanel}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
};

Collapse.Panel = CollapsePanel;

export default Collapse;
