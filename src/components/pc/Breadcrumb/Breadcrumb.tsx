import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import type { BreadcrumbProps, BreadcrumbItemProps } from './types';

import './Breadcrumb.less';

const BreadcrumbContext = React.createContext<React.ReactNode>('/');

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  href,
  onClick,
  icon,
  overlay,
  className = '',
  style,
  children
}) => {
  const separator = React.useContext(BreadcrumbContext);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const itemRef = useRef<HTMLLIElement>(null);

  // 点击外部关闭下拉
  useEffect(() => {
    if (!overlay) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (itemRef.current && !itemRef.current.contains(e.target as Node)) {
        setOverlayVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [overlay]);

  const renderContent = () => {
    if (href) {
      return (
        <a href={href} className="zdy-breadcrumb-item-link" onClick={onClick}>
          {icon && <span className="zdy-breadcrumb-item-icon">{icon}</span>}
          <span>{children}</span>
        </a>
      );
    }
    if (onClick) {
      return (
        <a className="zdy-breadcrumb-item-link zdy-breadcrumb-item-clickable" onClick={onClick}>
          {icon && <span className="zdy-breadcrumb-item-icon">{icon}</span>}
          <span>{children}</span>
          {overlay && <span className="zdy-breadcrumb-item-arrow">▾</span>}
        </a>
      );
    }
    return (
      <span className="zdy-breadcrumb-item-link">
        {icon && <span className="zdy-breadcrumb-item-icon">{icon}</span>}
        <span>{children}</span>
      </span>
    );
  };

  return (
    <li
      ref={itemRef}
      className={classNames('zdy-breadcrumb-item', className)}
      style={style}
    >
      {overlay ? (
        <div
          className="zdy-breadcrumb-item-overlay-wrapper"
          onMouseEnter={() => setOverlayVisible(true)}
          onMouseLeave={() => setOverlayVisible(false)}
        >
          {renderContent()}
          {overlayVisible && (
            <div className="zdy-breadcrumb-overlay">{overlay}</div>
          )}
        </div>
      ) : (
        renderContent()
      )}
      <span className="zdy-breadcrumb-separator">{separator}</span>
    </li>
  );
};

const Breadcrumb: React.FC<BreadcrumbProps> & {
  Item: React.FC<BreadcrumbItemProps>;
} = ({
  separator = '/',
  items,
  className = '',
  style,
  children
}) => {
  const breadcrumbClass = classNames('zdy-breadcrumb', className);

  // 数据驱动模式
  if (items && items.length > 0) {
    return (
      <BreadcrumbContext.Provider value={separator}>
        <nav className={breadcrumbClass} style={style}>
          <ol className="zdy-breadcrumb-list">
            {items.map((item, index) => (
              <BreadcrumbItem
                key={index}
                href={item.href}
                icon={item.icon}
                onClick={item.onClick}
              >
                {item.title}
              </BreadcrumbItem>
            ))}
          </ol>
        </nav>
      </BreadcrumbContext.Provider>
    );
  }

  // 声明式模式
  return (
    <BreadcrumbContext.Provider value={separator}>
      <nav className={breadcrumbClass} style={style}>
        <ol className="zdy-breadcrumb-list">
          {children}
        </ol>
      </nav>
    </BreadcrumbContext.Provider>
  );
};

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
