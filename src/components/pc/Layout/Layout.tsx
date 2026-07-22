import React, { useState, Children } from 'react';
import classNames from 'classnames';
import type { LayoutProps, LayoutHeaderProps, LayoutContentProps, LayoutFooterProps, LayoutSiderProps } from '../../../types';

import './Layout.less';

const Layout: React.FC<LayoutProps> & {
  Header: React.FC<LayoutHeaderProps>;
  Content: React.FC<LayoutContentProps>;
  Footer: React.FC<LayoutFooterProps>;
  Sider: React.FC<LayoutSiderProps>;
} = ({
  children,
  className = '',
  style,
  hasSider
}) => {
  const childArray = Children.toArray(children);
  const detectedHasSider = hasSider ?? childArray.some(child => 
    React.isValidElement(child) && (child as React.ReactElement).type === Layout.Sider
  );

  const header = childArray.find(child => 
    React.isValidElement(child) && (child as React.ReactElement).type === Layout.Header
  );

  const footer = childArray.find(child => 
    React.isValidElement(child) && (child as React.ReactElement).type === Layout.Footer
  );

  const mainChildren = childArray.filter(child => {
    if (!React.isValidElement(child)) return true;
    const type = (child as React.ReactElement).type;
    return type !== Layout.Header && type !== Layout.Footer;
  });

  return (
    <div className={classNames('zdy-layout', { 'zdy-layout-has-sider': detectedHasSider }, className)} style={style}>
      {header}
      <div className="zdy-layout-main">
        {mainChildren}
      </div>
      {footer}
    </div>
  );
};

const Header: React.FC<LayoutHeaderProps> = ({
  children,
  className = '',
  style
}) => {
  return (
    <header className={classNames('zdy-layout-header', className)} style={style}>
      {children}
    </header>
  );
};

const Content: React.FC<LayoutContentProps> = ({
  children,
  className = '',
  style
}) => {
  return (
    <main className={classNames('zdy-layout-content', className)} style={style}>
      {children}
    </main>
  );
};

const Footer: React.FC<LayoutFooterProps> = ({
  children,
  className = '',
  style
}) => {
  return (
    <footer className={classNames('zdy-layout-footer', className)} style={style}>
      {children}
    </footer>
  );
};

const Sider: React.FC<LayoutSiderProps> = ({
  children,
  className = '',
  style,
  width = 200,
  collapsible = false,
  collapsed = false,
  collapsedWidth = 80,
  onCollapse
}) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  const handleCollapse = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onCollapse?.(newCollapsed);
  };

  const siderWidth = isCollapsed ? collapsedWidth : width;

  return (
    <aside 
      className={classNames('zdy-layout-sider', { 'zdy-layout-sider-collapsed': isCollapsed }, className)} 
      style={{ ...style, width: typeof siderWidth === 'number' ? `${siderWidth}px` : siderWidth }}
    >
      {children}
      {collapsible && (
        <button 
          className="zdy-layout-sider-trigger" 
          onClick={handleCollapse}
        >
          {isCollapsed ? '›' : '‹'}
        </button>
      )}
    </aside>
  );
};

Layout.Header = Header;
Layout.Content = Content;
Layout.Footer = Footer;
Layout.Sider = Sider;

export default Layout;
