import React, { useState, useMemo } from 'react';
import classNames from 'classnames';
import type { BaseListProps, ListItemProps } from './types';

import './List.less';

const List: React.FC<BaseListProps> = ({
  header,
  footer,
  loading = false,
  itemLayout = 'horizontal',
  grid,
  dataSource,
  renderItem,
  pagination = false,
  locale,
  children,
  className,
  style,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const isGrid = !!grid;

  const paginationConfig = pagination === false ? null : pagination;
  const pageSize = paginationConfig?.pageSize || 10;
  const total = paginationConfig?.total ?? dataSource?.length ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(currentPage, totalPages);

  const pagedDataSource = useMemo(() => {
    if (!dataSource) return [];
    if (!paginationConfig) return dataSource;
    const start = (current - 1) * pageSize;
    return dataSource.slice(start, start + pageSize);
  }, [dataSource, paginationConfig, current, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    paginationConfig?.onChange?.(page, pageSize);
  };

  const renderSkeleton = () => (
    <div className="zdy-list-loading">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="zdy-list-loading-row">
          <div className="zdy-list-loading-avatar" />
          <div className="zdy-list-loading-content">
            <div className="zdy-list-loading-line zdy-list-loading-line--title" />
            <div className="zdy-list-loading-line" />
            <div className="zdy-list-loading-line zdy-list-loading-line--short" />
          </div>
        </div>
      ))}
    </div>
  );

  const renderEmpty = () => (
    <div className="zdy-list-empty">
      <div className="zdy-list-empty-icon">
        <svg width="64" height="41" viewBox="0 0 64 41" fill="none">
          <path d="M24 35C24 35 28 31 32 31C36 31 40 35 40 35" stroke="#d9d9d9" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="44" cy="17" r="1" fill="#d9d9d9"/>
          <circle cx="20" cy="17" r="1" fill="#d9d9d9"/>
          <rect x="4" y="6" width="56" height="31" rx="2" stroke="#d9d9d9" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M4 14L32 6L60 14" stroke="#d9d9d9" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="32" cy="22" r="3" stroke="#d9d9d9" strokeWidth="1.5"/>
        </svg>
      </div>
      <div className="zdy-list-empty-text">{locale?.emptyText || '暂无数据'}</div>
    </div>
  );

  const renderGridItem = (item: ListItemProps, index: number) => {
    const colClass = grid?.column ? `zdy-list-grid-item--col-${grid.column}` : '';
    return (
      <div
        key={item.key ?? index}
        className={classNames('zdy-list-grid-item', colClass)}
        style={{ marginBottom: (grid?.gutter ?? 0) }}
      >
        <div className="zdy-list-card">
          {item.avatar && (
            <div className="zdy-list-card-avatar">
              {item.avatar}
            </div>
          )}
          <div className="zdy-list-card-body">
            {item.title && <div className="zdy-list-card-title">{item.title}</div>}
            {item.description && (
              <div className="zdy-list-card-desc">{item.description}</div>
            )}
            {item.content && <div className="zdy-list-card-content">{item.content}</div>}
          </div>
          {item.extra && <div className="zdy-list-card-extra">{item.extra}</div>}
          {item.actions && (
            <div className="zdy-list-card-actions">
              {item.actions.map((action, i) => (
                <span key={i} className="zdy-list-card-action" style={{ marginRight: i < item.actions!.length - 1 ? 8 : 0 }}>
                  {action}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderListItem = (item: ListItemProps, index: number) => {
    const isVertical = itemLayout === 'vertical';

    if (isVertical) {
      return (
        <div
          key={item.key ?? index}
          className="zdy-list-item zdy-list-item--vertical"
        >
          {item.avatar && (
            <div className="zdy-list-item-avatar">
              {item.avatar}
            </div>
          )}
          <div className="zdy-list-item-body">
            <div className="zdy-list-item-header">
              {item.title && <span className="zdy-list-item-title">{item.title}</span>}
              {item.extra && <span className="zdy-list-item-extra">{item.extra}</span>}
            </div>
            {item.description && (
              <div className="zdy-list-item-description">{item.description}</div>
            )}
            {item.content && (
              <div className="zdy-list-item-content">{item.content}</div>
            )}
            {item.actions && (
              <div className="zdy-list-item-actions">
                {item.actions.map((action, i) => (
                  <React.Fragment key={i}>
                    <span className="zdy-list-item-action">{action}</span>
                    {i < item.actions!.length - 1 && (
                      <span className="zdy-list-item-action-divider" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div
        key={item.key ?? index}
        className="zdy-list-item zdy-list-item--horizontal"
      >
        {item.avatar && (
          <div className="zdy-list-item-avatar">
            {item.avatar}
          </div>
        )}
        <div className="zdy-list-item-body">
          <div className="zdy-list-item-header">
            {item.title && <span className="zdy-list-item-title">{item.title}</span>}
            {item.description && (
              <span className="zdy-list-item-description">{item.description}</span>
            )}
          </div>
          {item.content && (
            <div className="zdy-list-item-content">{item.content}</div>
          )}
        </div>
        {(item.extra || item.actions) && (
          <div className="zdy-list-item-side">
            {item.extra && <div className="zdy-list-item-extra">{item.extra}</div>}
            {item.actions && (
              <div className="zdy-list-item-actions">
                {item.actions.map((action, i) => (
                  <React.Fragment key={i}>
                    <span className="zdy-list-item-action">{action}</span>
                    {i < item.actions!.length - 1 && (
                      <span className="zdy-list-item-action-divider" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderPagination = () => {
    if (!paginationConfig || totalPages <= 1) return null;

    const pages: React.ReactNode[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            className={classNames('zdy-list-pagination-item', {
              'zdy-list-pagination-item--active': i === current,
            })}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      pages.push(
        <button
          key="prev"
          className="zdy-list-pagination-item zdy-list-pagination-item--nav"
          disabled={current <= 1}
          onClick={() => handlePageChange(current - 1)}
        >
          ‹
        </button>
      );

      const start = Math.max(1, current - 2);
      const end = Math.min(totalPages, start + 4);
      const adjustedStart = Math.max(1, end - 4);

      if (adjustedStart > 1) {
        pages.push(<span key="start-ellipsis" className="zdy-list-pagination-ellipsis">...</span>);
      }

      for (let i = adjustedStart; i <= end; i++) {
        pages.push(
          <button
            key={i}
            className={classNames('zdy-list-pagination-item', {
              'zdy-list-pagination-item--active': i === current,
            })}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }

      if (end < totalPages) {
        pages.push(<span key="end-ellipsis" className="zdy-list-pagination-ellipsis">...</span>);
      }

      pages.push(
        <button
          key="next"
          className="zdy-list-pagination-item zdy-list-pagination-item--nav"
          disabled={current >= totalPages}
          onClick={() => handlePageChange(current + 1)}
        >
          ›
        </button>
      );
    }

    return (
      <div className="zdy-list-pagination">
        {pages}
      </div>
    );
  };

  const renderContent = () => {
    if (loading) return renderSkeleton();

    const items = dataSource ? pagedDataSource : [];

    if (items.length === 0) return renderEmpty();

    if (isGrid) {
      const col = grid?.column || 1;
      const gutter = grid?.gutter ?? 16;
      const gridStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: `repeat(${col}, 1fr)`,
        gap: gutter,
      };
      return (
        <div className="zdy-list-grid" style={gridStyle}>
          {items.map((item, index) =>
            renderItem ? renderItem(item, index) : renderGridItem(item, index)
          )}
        </div>
      );
    }

    return (
      <div className={classNames('zdy-list-items', {
        'zdy-list-items--split': true,
      })}>
        {items.map((item, index) =>
          renderItem ? renderItem(item, index) : renderListItem(item, index)
        )}
      </div>
    );
  };

  return (
    <div className={classNames('zdy-list', className)} style={style}>
      {header && <div className="zdy-list-header">{header}</div>}
      <div className="zdy-list-body">
        {children ? children : renderContent()}
      </div>
      {paginationConfig && !loading && renderPagination()}
      {footer && <div className="zdy-list-footer">{footer}</div>}
    </div>
  );
};

export default List;