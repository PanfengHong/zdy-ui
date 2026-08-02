import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import type { BaseSelectProps } from '../../../types';
import Icon from '../Icon/Icon';

import './Select.less';

const Select = ({
  value: valueProp,
  defaultValue,
  options = [],
  placeholder = '请选择',
  disabled = false,
  onChange,
  className = '',
  style
}: BaseSelectProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const selectRef = useRef<HTMLDivElement>(null);

  const isControlled = valueProp !== undefined;
  const currentValue = isControlled ? valueProp : internalValue;

  const updateDropdownPosition = useCallback(() => {
    if (!selectRef.current) return;

    const triggerRect = selectRef.current.getBoundingClientRect();
    const dropdownWidth = triggerRect.width;
    const dropdownHeight = Math.min(options.length * 36 + 8, 200);
    
    let top = triggerRect.bottom + 4;
    let left = triggerRect.left;

    if (top + dropdownHeight > window.innerHeight) {
      top = triggerRect.top - dropdownHeight - 4;
    }

    if (left + dropdownWidth > window.innerWidth) {
      left = window.innerWidth - dropdownWidth;
    }

    setDropdownStyle({
      position: 'absolute' as const,
      top: top + window.scrollY,
      left: left + window.scrollX,
      width: dropdownWidth,
      maxHeight: dropdownHeight,
    });
  }, [options]);

  useEffect(() => {
    if (isOpen) {
      updateDropdownPosition();
      window.addEventListener('resize', updateDropdownPosition);
    }

    return () => {
      window.removeEventListener('resize', updateDropdownPosition);
    };
  }, [isOpen, updateDropdownPosition]);

  const handleChange = (value: string) => {
    if (!isControlled) {
      setInternalValue(value);
    }
    onChange?.(value);
    setIsOpen(false);
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (selectRef.current && !selectRef.current.contains(target) && !target.closest('.zdy-select-dropdown')) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      const selectedIndex = options.findIndex(opt => opt.value === currentValue);
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          const nextIndex = (selectedIndex + 1) % options.length;
          if (!options[nextIndex]?.disabled) {
            handleChange(options[nextIndex].value);
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          const prevIndex = selectedIndex === -1 ? options.length - 1 : (selectedIndex - 1 + options.length) % options.length;
          if (!options[prevIndex]?.disabled) {
            handleChange(options[prevIndex].value);
          }
          break;
        case 'Enter':
          e.preventDefault();
          setIsOpen(false);
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          break;
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentValue, options, handleChange]);

  const selectedOption = options.find(opt => opt.value === currentValue);
  const displayValue = selectedOption?.label || (!currentValue ? placeholder : null);

  const dropdownContent = (
    <div className={classNames('zdy-select-dropdown', { 'zdy-select-dropdown--open': isOpen })} style={dropdownStyle}>
      {options.map((option) => (
        <div
          key={option.value}
          className={classNames('zdy-select-option', { 'zdy-select-option--selected': option.value === currentValue }, { 'zdy-select-option--disabled': option.disabled })}
          onClick={() => {
            if (!option.disabled) {
              handleChange(option.value);
            }
          }}
        >
          {option.label}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div
        ref={selectRef}
        className={classNames('zdy-select', { 'zdy-select--open': isOpen }, { 'zdy-select--disabled': disabled }, className)}
        style={style}
      >
        <div className="zdy-select-trigger" onClick={handleToggle}>
          <span className="zdy-select-value">{displayValue}</span>
          <span className="zdy-select-arrow">
            <Icon type="down" size={14} color="currentColor" />
          </span>
        </div>
      </div>
      
      {isOpen && typeof window !== 'undefined' && ReactDOM.createPortal(dropdownContent, document.body)}
    </>
  );
};

export default Select;