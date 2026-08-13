import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import type { MenuProps, MenuItemProps, SubMenuProps, MenuMode, MenuTheme } from './types';
import Icon from '../Icon/Icon';

import './Menu.less';

interface MenuContextType {
  mode: MenuMode;
  theme: MenuTheme;
  selectedKeys: string[];
  openKeys: string[];
  inlineCollapsed: boolean;
  onSelect: (key: string) => void;
  onOpenChange: (keys: string[]) => void;
}

const MenuContext = React.createContext<MenuContextType | null>(null);

const useMenuContext = () => {
  const ctx = React.useContext(MenuContext);
  if (!ctx) throw new Error('Menu compound components must be used within Menu');
  return ctx;
};

const MenuItem: React.FC<MenuItemProps> = ({
  itemKey,
  icon,
  disabled = false,
  danger = false,
  onClick,
  className = '',
  style,
  children
}) => {
  const { mode, theme, selectedKeys, onSelect, inlineCollapsed } = useMenuContext();
  const isSelected = selectedKeys.includes(itemKey);

  const handleClick = () => {
    if (disabled) return;
    onSelect(itemKey);
    onClick?.();
  };

  const renderInner = () => {
    if (inlineCollapsed && mode === 'inline') {
      return (
        <span className="zdy-menu-item-collapsed-icon">{icon}</span>
      );
    }
    return (
      <>
        {icon && <span className="zdy-menu-item-icon">{icon}</span>}
        <span className="zdy-menu-item-label">{children}</span>
      </>
    );
  };

  return (
    <li
      className={classNames(
        'zdy-menu-item',
        `zdy-menu-item--${mode}`,
        `zdy-menu-item--theme-${theme}`,
        {
          'zdy-menu-item--selected': isSelected,
          'zdy-menu-item--disabled': disabled,
          'zdy-menu-item--danger': danger,
          'zdy-menu-item--collapsed': inlineCollapsed && mode === 'inline'
        },
        className
      )}
      style={style}
      onClick={handleClick}
    >
      {renderInner()}
    </li>
  );
};

const SubMenu: React.FC<SubMenuProps> = ({
  itemKey,
  icon,
  title,
  disabled = false,
  className = '',
  style,
  children
}) => {
  const { mode, theme, openKeys, onOpenChange, selectedKeys, onSelect, inlineCollapsed } = useMenuContext();
  const isOpen = openKeys.includes(itemKey);
  const hasSelectedChild = React.Children.toArray(children).some(child => {
    if (!React.isValidElement(child)) return false;
    const childProps = child.props as MenuItemProps;
    return childProps.itemKey && selectedKeys.includes(childProps.itemKey);
  });

  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    if (mode === 'inline') {
      const newOpenKeys = isOpen
        ? openKeys.filter(k => k !== itemKey)
        : [...openKeys, itemKey];
      onOpenChange(newOpenKeys);
    }
  };

  const handleItemSelect = (key: string) => {
    onSelect(key);
  };

  const renderChildren = () => {
    if (inlineCollapsed && mode === 'inline') {
      if (!isOpen) return null;
      return (
        <ul className="zdy-menu-sub zdy-menu-sub--inline zdy-menu-sub--collapsed">
          {React.Children.map(children, child => {
            if (!React.isValidElement(child)) return null;
            if (child.type === MenuItem) {
              return React.cloneElement(child as React.ReactElement<MenuItemProps>, {
                onClick: () => handleItemSelect((child.props as MenuItemProps).itemKey)
              });
            }
            return null;
          })}
        </ul>
      );
    }

    if (mode === 'inline') {
      return (
        <ul
          className={classNames(
            'zdy-menu-sub',
            'zdy-menu-sub--inline',
            { 'zdy-menu-sub--open': isOpen }
          )}
        >
          {React.Children.map(children, child => {
            if (!React.isValidElement(child)) return null;
            return React.cloneElement(child as React.ReactElement<MenuItemProps | SubMenuProps>);
          })}
        </ul>
      );
    }

    if (mode === 'vertical') {
      return (
        <ul
          className={classNames(
            'zdy-menu-sub',
            'zdy-menu-sub--vertical',
            { 'zdy-menu-sub--open': isOpen }
          )}
        >
          {React.Children.map(children, child => {
            if (!React.isValidElement(child)) return null;
            return React.cloneElement(child as React.ReactElement<MenuItemProps | SubMenuProps>);
          })}
        </ul>
      );
    }

    if (mode === 'horizontal') {
      return (
        <ul
          className={classNames(
            'zdy-menu-sub',
            'zdy-menu-sub--horizontal',
            { 'zdy-menu-sub--open': isOpen }
          )}
        >
          {React.Children.map(children, child => {
            if (!React.isValidElement(child)) return null;
            return React.cloneElement(child as React.ReactElement<MenuItemProps | SubMenuProps>);
          })}
        </ul>
      );
    }

    return null;
  };

  if (inlineCollapsed && mode === 'inline') {
    return (
      <li
        className={classNames(
          'zdy-menu-submenu',
          'zdy-menu-submenu--inline-collapsed',
          `zdy-menu-submenu--theme-${theme}`,
          {
            'zdy-menu-submenu--open': isOpen,
            'zdy-menu-submenu--disabled': disabled
          },
          className
        )}
        style={style}
      >
        <div
          className={classNames(
            'zdy-menu-submenu-title',
            'zdy-menu-submenu-title--inline-collapsed',
            { 'zdy-menu-submenu-title--selected': hasSelectedChild }
          )}
          onClick={handleTitleClick}
        >
          {icon && <span className="zdy-menu-item-icon">{icon}</span>}
        </div>
        {renderChildren()}
      </li>
    );
  }

  return (
    <li
      className={classNames(
        'zdy-menu-submenu',
        `zdy-menu-submenu--${mode}`,
        `zdy-menu-submenu--theme-${theme}`,
        {
          'zdy-menu-submenu--open': isOpen,
          'zdy-menu-submenu--disabled': disabled
        },
        className
      )}
      style={style}
    >
      <div
        className={classNames(
          'zdy-menu-submenu-title',
          `zdy-menu-submenu-title--${mode}`,
          { 'zdy-menu-submenu-title--selected': hasSelectedChild }
        )}
        onClick={handleTitleClick}
      >
        {icon && <span className="zdy-menu-item-icon">{icon}</span>}
        {!inlineCollapsed && <span className="zdy-menu-item-label">{title}</span>}
        <span className="zdy-menu-submenu-arrow">
          {mode === 'horizontal' ? <Icon type="down" size={16} /> : <Icon type="right" size={16} />}
        </span>
      </div>
      {renderChildren()}
    </li>
  );
};

const Menu: React.FC<MenuProps> & {
  Item: React.FC<MenuItemProps>;
  SubMenu: React.FC<SubMenuProps>;
} = ({
  mode = 'vertical',
  theme = 'light',
  selectedKeys: controlledSelectedKeys,
  defaultSelectedKeys = [],
  openKeys: controlledOpenKeys,
  defaultOpenKeys = [],
  inlineCollapsed: controlledInlineCollapsed = false,
  onSelect,
  onOpenChange,
  className = '',
  style,
  children
}) => {
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<string[]>(defaultSelectedKeys);
  const [internalOpenKeys, setInternalOpenKeys] = useState<string[]>(defaultOpenKeys);
  const [internalInlineCollapsed, setInternalInlineCollapsed] = useState(controlledInlineCollapsed);

  const selectedKeys = controlledSelectedKeys ?? internalSelectedKeys;
  const openKeys = controlledOpenKeys ?? internalOpenKeys;
  const inlineCollapsed = controlledInlineCollapsed ?? internalInlineCollapsed;

  useEffect(() => {
    if (controlledInlineCollapsed !== undefined) {
      setInternalInlineCollapsed(controlledInlineCollapsed);
    }
  }, [controlledInlineCollapsed]);

  const handleSelect = useCallback((key: string) => {
    if (controlledSelectedKeys === undefined) {
      setInternalSelectedKeys([key]);
    }
    onSelect?.(key);
  }, [controlledSelectedKeys, onSelect]);

  const handleOpenChange = useCallback((keys: string[]) => {
    if (controlledOpenKeys === undefined) {
      setInternalOpenKeys(keys);
    }
    onOpenChange?.(keys);
  }, [controlledOpenKeys, onOpenChange]);

  const contextValue: MenuContextType = {
    mode,
    theme,
    selectedKeys,
    openKeys,
    inlineCollapsed,
    onSelect: handleSelect,
    onOpenChange: handleOpenChange
  };

  const rootClass = classNames(
    'zdy-menu',
    `zdy-menu--${mode}`,
    `zdy-menu--theme-${theme}`,
    { 'zdy-menu--collapsed': inlineCollapsed && mode === 'inline' },
    className
  );

  const processedChildren = React.Children.map(children, child => {
    if (!React.isValidElement(child)) return child;
    return React.cloneElement(child as React.ReactElement<MenuItemProps | SubMenuProps>);
  });

  return (
    <MenuContext.Provider value={contextValue}>
      <ul className={rootClass} style={style} role="menu">
        {processedChildren}
      </ul>
    </MenuContext.Provider>
  );
};

Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;

export default Menu;
