import type { ReactElement } from 'react';
import classNames from 'classnames';
import type {
  MLayoutContentProps,
  MLayoutFooterProps,
  MLayoutHeaderProps,
  MLayoutProps
} from './types';

import './MLayout.less';

const Header = ({ children, className, style }: MLayoutHeaderProps) => (
  <header className={classNames('zdy-mobile-layout-header', className)} style={style}>
    {children}
  </header>
);

const Content = ({ children, className, style }: MLayoutContentProps) => (
  <main className={classNames('zdy-mobile-layout-content', className)} style={style}>
    {children}
  </main>
);

const Footer = ({ children, className, style }: MLayoutFooterProps) => (
  <footer className={classNames('zdy-mobile-layout-footer', className)} style={style}>
    {children}
  </footer>
);

const MLayout = (({
  fullscreen = false,
  safeArea = true,
  children,
  className,
  style
}: MLayoutProps) => (
  <div
    className={classNames(
      'zdy-mobile-layout',
      {
        'zdy-mobile-layout--fullscreen': fullscreen,
        'zdy-mobile-layout--safe-area': safeArea
      },
      className
    )}
    style={style}
  >
    {children}
  </div>
)) as {
  (props: MLayoutProps): ReactElement;
  Header: (props: MLayoutHeaderProps) => ReactElement;
  Content: (props: MLayoutContentProps) => ReactElement;
  Footer: (props: MLayoutFooterProps) => ReactElement;
};

MLayout.Header = Header;
MLayout.Content = Content;
MLayout.Footer = Footer;

export default MLayout;
