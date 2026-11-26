import React from 'react';
import classNames from 'classnames';
import type { LayoutProps, LayoutHeaderProps, LayoutContentProps, LayoutFooterProps } from '../../../types';

import './MLayout.less';

const MLayout: React.FC<LayoutProps> & {
  Header: React.FC<LayoutHeaderProps>;
  Content: React.FC<LayoutContentProps>;
  Footer: React.FC<LayoutFooterProps>;
} = ({
  children,
  className = '',
  style
}) => {
  return (
    <div className={classNames('zdy-layout', className)} style={style}>
      {children}
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

MLayout.Header = Header;
MLayout.Content = Content;
MLayout.Footer = Footer;

export default MLayout;