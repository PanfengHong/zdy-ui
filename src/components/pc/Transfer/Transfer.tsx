import React, { useState, useMemo, useCallback } from 'react';
import classNames from 'classnames';
import type { TransferProps, TransferItem } from './types';

import './Transfer.less';

const defaultFilter = (inputValue: string, item: TransferItem): boolean => {
  return (
    item.title.toLowerCase().includes(inputValue.toLowerCase()) ||
    (item.description?.toLowerCase().includes(inputValue.toLowerCase()) ?? false)
  );
};

// 单个列表组件
interface TransferListProps {
  titleText: string;
  items: TransferItem[];
  selectedKeys: string[];
  searchText: string;
  showSearch: boolean;
  disabled?: boolean;
  filterOption?: (inputValue: string, item: TransferItem) => boolean;
  render?: (item: TransferItem) => React.ReactNode;
  footer?: React.ReactNode;
  style?: React.CSSProperties;
  onSelectChange: (keys: string[]) => void;
  onSearchChange: (value: string) => void;
}

const TransferList: React.FC<TransferListProps> = ({
  titleText,
  items,
  selectedKeys,
  searchText,
  showSearch,
  disabled,
  filterOption = defaultFilter,
  render,
  footer,
  style,
  onSelectChange,
  onSearchChange
}) => {
  const [searchValue, setSearchValue] = useState(searchText);

  const filteredItems = useMemo(() => {
    if (!searchValue) return items;
    return items.filter((item) => filterOption(searchValue, item));
  }, [items, searchValue, filterOption]);

  // 全选/取消全选
  const allChecked = filteredItems.length > 0 && filteredItems.every((item) =>
    selectedKeys.includes(item.key) || item.disabled
  );
  const checkableItems = filteredItems.filter((item) => !item.disabled);
  const checkedCount = filteredItems.filter((item) => selectedKeys.includes(item.key)).length;

  const handleCheckAll = () => {
    if (allChecked) {
      // 取消选中当前列表中所有已选的
      const newSelected = selectedKeys.filter(
        (key) => !checkableItems.some((item) => item.key === key)
      );
      onSelectChange(newSelected);
    } else {
      // 选中当前列表中所有可选的
      const newKeys = new Set(selectedKeys);
      checkableItems.forEach((item) => newKeys.add(item.key));
      onSelectChange(Array.from(newKeys));
    }
  };

  const handleItemCheck = (key: string, checked: boolean) => {
    if (checked) {
      onSelectChange([...selectedKeys, key]);
    } else {
      onSelectChange(selectedKeys.filter((k) => k !== key));
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onSearchChange(e.target.value);
  };

  return (
    <div
      className={classNames('zdy-transfer-list', { 'zdy-transfer-list--disabled': disabled })}
      style={style}
    >
      {/* 头部 */}
      <div className="zdy-transfer-list-header">
        <label className="zdy-transfer-list-check-all">
          <input
            type="checkbox"
            checked={allChecked}
            onChange={handleCheckAll}
            disabled={disabled || checkableItems.length === 0}
          />
          <span className="zdy-transfer-list-header-title">
            {titleText}
          </span>
        </label>
        <span className="zdy-transfer-list-header-count">
          {checkedCount}/{filteredItems.length}
        </span>
      </div>

      {/* 搜索框 */}
      {showSearch && (
        <div className="zdy-transfer-list-search">
          <input
            type="text"
            placeholder="搜索"
            value={searchValue}
            onChange={handleSearch}
            disabled={disabled}
          />
          <span className="zdy-transfer-list-search-icon">🔍</span>
        </div>
      )}

      {/* 列表内容 */}
      <div className="zdy-transfer-list-body">
        {filteredItems.length === 0 ? (
          <div className="zdy-transfer-list-empty">暂无数据</div>
        ) : (
          <ul className="zdy-transfer-list-content">
            {filteredItems.map((item) => {
              const isSelected = selectedKeys.includes(item.key);
              return (
                <li
                  key={item.key}
                  className={classNames('zdy-transfer-list-item', {
                    'zdy-transfer-list-item--selected': isSelected,
                    'zdy-transfer-list-item--disabled': item.disabled
                  })}
                  onClick={() => !item.disabled && !disabled && handleItemCheck(item.key, !isSelected)}
                >
                  <label className="zdy-transfer-list-item-checkbox" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => handleItemCheck(item.key, e.target.checked)}
                      disabled={item.disabled || disabled}
                    />
                  </label>
                  <span className="zdy-transfer-list-item-content">
                    {render ? render(item) : (
                      <>
                        <span className="zdy-transfer-list-item-title">{item.title}</span>
                        {item.description && (
                          <span className="zdy-transfer-list-item-desc">{item.description}</span>
                        )}
                      </>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* 底部 */}
      {footer && (
        <div className="zdy-transfer-list-footer">{footer}</div>
      )}
    </div>
  );
};

const Transfer: React.FC<TransferProps> = ({
  dataSource,
  targetKeys: controlledTargetKeys,
  defaultTargetKeys = [],
  selectedKeys: controlledSelectedKeys,
  titles = ['源列表', '目标列表'],
  operations = ['→', '←'],
  showSearch = false,
  filterOption = defaultFilter,
  listStyle,
  disabled = false,
  oneWay = false,
  render,
  footer,
  onChange,
  onSelectChange,
  onSearch,
  className = '',
  style
}) => {
  const [internalTargetKeys, setInternalTargetKeys] = useState<string[]>(defaultTargetKeys);
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<string[]>([]);

  const targetKeys = controlledTargetKeys ?? internalTargetKeys;
  const selectedKeys = controlledSelectedKeys ?? internalSelectedKeys;

  // 左侧（源）数据
  const leftItems = useMemo(
    () => dataSource.filter((item) => !targetKeys.includes(item.key)),
    [dataSource, targetKeys]
  );

  // 右侧（目标）数据
  const rightItems = useMemo(
    () => dataSource.filter((item) => targetKeys.includes(item.key)),
    [dataSource, targetKeys]
  );

  // 左右两侧的搜索值
  const [leftSearch, setLeftSearch] = useState('');
  const [rightSearch, setRightSearch] = useState('');

  // 左右两侧选中的 key
  const leftSelectedKeys = useMemo(
    () => selectedKeys.filter((key) => leftItems.some((item) => item.key === key)),
    [selectedKeys, leftItems]
  );
  const rightSelectedKeys = useMemo(
    () => selectedKeys.filter((key) => rightItems.some((item) => item.key === key)),
    [selectedKeys, rightItems]
  );

  const updateSelectedKeys = useCallback((newKeys: string[]) => {
    if (controlledSelectedKeys === undefined) {
      setInternalSelectedKeys(newKeys);
    }
    const newLeft = newKeys.filter((key) => leftItems.some((item) => item.key === key));
    const newRight = newKeys.filter((key) => rightItems.some((item) => item.key === key));
    onSelectChange?.(newLeft, newRight);
  }, [controlledSelectedKeys, leftItems, rightItems, onSelectChange]);

  const moveToRight = useCallback(() => {
    const moveKeys = leftSelectedKeys;
    if (moveKeys.length === 0) return;
    const newTargetKeys = [...targetKeys, ...moveKeys];
    if (controlledTargetKeys === undefined) {
      setInternalTargetKeys(newTargetKeys);
    }
    // 清除选中
    const newSelected = selectedKeys.filter((key) => !moveKeys.includes(key));
    if (controlledSelectedKeys === undefined) {
      setInternalSelectedKeys(newSelected);
    }
    onChange?.(newTargetKeys, 'right', moveKeys);
    onSelectChange?.(
      newSelected.filter((key) => leftItems.some((item) => item.key === key) && !moveKeys.includes(key)),
      newSelected.filter((key) => rightItems.some((item) => item.key === key))
    );
  }, [leftSelectedKeys, targetKeys, controlledTargetKeys, controlledSelectedKeys, selectedKeys, leftItems, rightItems, onChange, onSelectChange]);

  const moveToLeft = useCallback(() => {
    const moveKeys = rightSelectedKeys;
    if (moveKeys.length === 0) return;
    const newTargetKeys = targetKeys.filter((key) => !moveKeys.includes(key));
    if (controlledTargetKeys === undefined) {
      setInternalTargetKeys(newTargetKeys);
    }
    const newSelected = selectedKeys.filter((key) => !moveKeys.includes(key));
    if (controlledSelectedKeys === undefined) {
      setInternalSelectedKeys(newSelected);
    }
    onChange?.(newTargetKeys, 'left', moveKeys);
    onSelectChange?.(
      newSelected.filter((key) => leftItems.some((item) => item.key === key)),
      newSelected.filter((key) => rightItems.some((item) => item.key === key) && !moveKeys.includes(key))
    );
  }, [rightSelectedKeys, targetKeys, controlledTargetKeys, controlledSelectedKeys, selectedKeys, leftItems, rightItems, onChange, onSelectChange]);

  const handleLeftSearch = (value: string) => {
    setLeftSearch(value);
    onSearch?.('left', value);
  };

  const handleRightSearch = (value: string) => {
    setRightSearch(value);
    onSearch?.('right', value);
  };

  const rootClass = classNames(
    'zdy-transfer',
    { 'zdy-transfer--disabled': disabled, 'zdy-transfer--one-way': oneWay },
    className
  );

  return (
    <div className={rootClass} style={style}>
      <TransferList
        titleText={titles[0]}
        items={leftItems}
        selectedKeys={selectedKeys}
        searchText={leftSearch}
        showSearch={showSearch}
        disabled={disabled}
        filterOption={filterOption}
        render={render}
        footer={footer?.({ direction: 'left' })}
        style={listStyle}
        onSelectChange={updateSelectedKeys}
        onSearchChange={handleLeftSearch}
      />

      {/* 操作按钮 */}
      <div className="zdy-transfer-operation">
        <button
          className="zdy-transfer-btn"
          onClick={moveToRight}
          disabled={disabled || leftSelectedKeys.length === 0}
          title={operations[0]}
        >
          {operations[0]}
        </button>
        {!oneWay && (
          <button
            className="zdy-transfer-btn"
            onClick={moveToLeft}
            disabled={disabled || rightSelectedKeys.length === 0}
            title={operations[1]}
          >
            {operations[1]}
          </button>
        )}
      </div>

      <TransferList
        titleText={titles[1]}
        items={rightItems}
        selectedKeys={selectedKeys}
        searchText={rightSearch}
        showSearch={showSearch}
        disabled={disabled}
        filterOption={filterOption}
        render={render}
        footer={footer?.({ direction: 'right' })}
        style={listStyle}
        onSelectChange={updateSelectedKeys}
        onSearchChange={handleRightSearch}
      />
    </div>
  );
};

export default Transfer;
