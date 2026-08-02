import React, { useState, useMemo } from 'react';
import classNames from 'classnames';
import type { PaginationProps } from '../../../types';
import Icon from '../Icon/Icon';

import './Pagination.less';

// 计算页码列表，包含省略号
const getPageList = (current: number, total: number): (number | string)[] => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [1];

  if (current <= 4) {
    // 靠近开头
    pages.push(2, 3, 4, 5, '...', total);
  } else if (current >= total - 3) {
    // 靠近末尾
    pages.push('...', total - 4, total - 3, total - 2, total - 1, total);
  } else {
    // 中间
    pages.push('...', current - 1, current, current + 1, '...', total);
  }

  return pages;
};

const Pagination: React.FC<PaginationProps> = ({
  current: controlledCurrent,
  defaultCurrent = 1,
  pageSize: controlledPageSize,
  defaultPageSize = 10,
  total = 0,
  showSizeChanger = false,
  showQuickJumper = false,
  showTotal,
  pageSizeOptions = [10, 20, 50, 100],
  size = 'default',
  disabled = false,
  simple = false,
  onChange,
  onShowSizeChange,
  className = '',
  style
}) => {
  const [internalCurrent, setInternalCurrent] = useState(defaultCurrent);
  const [internalPageSize, setInternalPageSize] = useState(defaultPageSize);
  const [jumperValue, setJumperValue] = useState('');

  const current = controlledCurrent ?? internalCurrent;
  const pageSize = controlledPageSize ?? internalPageSize;

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total, pageSize]);

  const handleChange = (page: number, size: number) => {
    const clampedPage = Math.min(Math.max(1, page), totalPages);
    if (controlledCurrent === undefined) {
      setInternalCurrent(clampedPage);
    }
    onChange?.(clampedPage, size);
  };

  const handlePageSizeChange = (newSize: number) => {
    const newTotalPages = Math.max(1, Math.ceil(total / newSize));
    const newCurrent = Math.min(current, newTotalPages);
    if (controlledPageSize === undefined) {
      setInternalPageSize(newSize);
    }
    if (controlledCurrent === undefined) {
      setInternalCurrent(newCurrent);
    }
    onShowSizeChange?.(newCurrent, newSize);
    onChange?.(newCurrent, newSize);
  };

  const goPrev = () => {
    if (current > 1) handleChange(current - 1, pageSize);
  };

  const goNext = () => {
    if (current < totalPages) handleChange(current + 1, pageSize);
  };

  const handleJumperKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const page = parseInt(jumperValue, 10);
      if (!isNaN(page) && page >= 1 && page <= totalPages) {
        handleChange(page, pageSize);
      }
      setJumperValue('');
    }
  };

  const pageList = getPageList(current, totalPages);

  // 计算当前数据范围
  const rangeStart = total === 0 ? 0 : (current - 1) * pageSize + 1;
  const rangeEnd = Math.min(current * pageSize, total);

  const rootClass = classNames(
    'zdy-pagination',
    `zdy-pagination--${size}`,
    { 'zdy-pagination--disabled': disabled },
    className
  );

  // ====== 简洁模式 ======
  if (simple) {
    return (
      <div className={rootClass} style={style}>
        <button
          className="zdy-pagination-prev"
          onClick={goPrev}
          disabled={disabled || current <= 1}
        >
          <Icon type="left" size={14} color="currentColor" />
        </button>
        <span className="zdy-pagination-simple-pager">
          <input
            type="text"
            value={String(current)}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (!isNaN(val) && val >= 1 && val <= totalPages) {
                handleChange(val, pageSize);
              }
            }}
            disabled={disabled}
            className="zdy-pagination-simple-input"
          />
          <span className="zdy-pagination-simple-slash">/</span>
          <span>{totalPages}</span>
        </span>
        <button
          className="zdy-pagination-next"
          onClick={goNext}
          disabled={disabled || current >= totalPages}
        >
          <Icon type="right" size={14} color="currentColor" />
        </button>
      </div>
    );
  }

  return (
    <div className={rootClass} style={style}>
      {/* 总数显示 */}
      {showTotal && (
        <span className="zdy-pagination-total-text">
          {showTotal(total, [rangeStart, rangeEnd])}
        </span>
      )}

      {/* 上一页 */}
      <button
        className={classNames('zdy-pagination-prev', { 'zdy-pagination-prev--disabled': current <= 1 })}
        onClick={goPrev}
        disabled={disabled || current <= 1}
      >
        <Icon type="left" size={14} color="currentColor" />
      </button>

      {/* 页码列表 */}
      <ul className="zdy-pagination-pager-list">
        {pageList.map((page, index) => {
          if (page === '...') {
            return (
              <li key={`ellipsis-${index}`} className="zdy-pagination-ellipsis">
                •••
              </li>
            );
          }
          const pageNum = page as number;
          return (
            <li
              key={pageNum}
              className={classNames('zdy-pagination-pager', {
                'zdy-pagination-pager--active': pageNum === current
              })}
              onClick={() => pageNum !== current && handleChange(pageNum, pageSize)}
            >
              {pageNum}
            </li>
          );
        })}
      </ul>

      {/* 下一页 */}
      <button
        className={classNames('zdy-pagination-next', { 'zdy-pagination-next--disabled': current >= totalPages })}
        onClick={goNext}
        disabled={disabled || current >= totalPages}
      >
        <Icon type="right" size={14} color="currentColor" />
      </button>

      {/* 每页条数选择器 */}
      {showSizeChanger && (
        <select
          className="zdy-pagination-size-changer"
          value={pageSize}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          disabled={disabled}
        >
          {pageSizeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt} 条/页
            </option>
          ))}
        </select>
      )}

      {/* 快速跳转 */}
      {showQuickJumper && (
        <span className="zdy-pagination-quick-jumper">
          跳至
          <input
            type="text"
            value={jumperValue}
            onChange={(e) => setJumperValue(e.target.value)}
            onKeyDown={handleJumperKeyDown}
            disabled={disabled}
            className="zdy-pagination-quick-jumper-input"
          />
          页
        </span>
      )}
    </div>
  );
};

export default Pagination;
