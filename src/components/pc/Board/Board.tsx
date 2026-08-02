import React, { useState, useRef, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import type {
  BoardProps,
  BoardColumnData,
  BoardCardData,
  BoardPriority,
} from './types';
import Icon from '../Icon/Icon';

import './Board.less';

// 优先级配置
const PRIORITY_CONFIG: Record<BoardPriority, { label: string; color: string; bg: string }> = {
  low: { label: '低', color: '#52c41a', bg: '#f6ffed' },
  medium: { label: '中', color: '#faad14', bg: '#fffbe6' },
  high: { label: '高', color: '#fa541c', bg: '#fff2e8' },
  urgent: { label: '紧急', color: '#f5222d', bg: '#fff1f0' },
};

// 生成唯一 id
const genId = (): string => `id_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

interface DragState {
  cardId: string;
  fromColumnId: string;
  fromIndex: number;
}

interface DropIndicator {
  columnId: string;
  index: number;
}

const Board: React.FC<BoardProps> = ({
  columns: columnsProp,
  defaultColumns = [],
  draggable = true,
  showColumnCount = true,
  showAddColumn = true,
  showAddCard = true,
  allowRemoveColumn = true,
  allowRemoveCard = true,
  emptyDescription = '暂无卡片',
  onColumnsChange,
  onCardMove,
  onColumnAdd,
  onColumnRemove,
  onCardAdd,
  onCardRemove,
  onCardClick,
  onColumnTitleChange,
  renderCard,
  renderColumnHeader,
  className = '',
  style,
}) => {
  // 受控/非受控
  const isControlled = columnsProp !== undefined;
  const [innerColumns, setInnerColumns] = useState<BoardColumnData[]>(defaultColumns);
  const columns = isControlled ? columnsProp! : innerColumns;

  // 拖拽状态
  const dragStateRef = useRef<DragState | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dropIndicator, setDropIndicator] = useState<DropIndicator | null>(null);
  const [overColumnId, setOverColumnId] = useState<string | null>(null);

  // 添加列状态
  const [addingColumn, setAddingColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');

  // 添加卡片状态
  const [addingCardColumnId, setAddingCardColumnId] = useState<string | null>(null);
  const [newCardTitle, setNewCardTitle] = useState('');

  // 编辑列标题
  const [editingColumnId, setEditingColumnId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  // 更新列
  const updateColumns = useCallback(
    (next: BoardColumnData[]) => {
      if (!isControlled) {
        setInnerColumns(next);
      }
      onColumnsChange?.(next);
    },
    [isControlled, onColumnsChange]
  );

  // ============ 列操作 ============
  const handleAddColumn = useCallback(() => {
    const title = newColumnTitle.trim();
    if (!title) {
      setAddingColumn(false);
      setNewColumnTitle('');
      return;
    }
    const newColumn: BoardColumnData = { id: genId(), title, cards: [] };
    updateColumns([...columns, newColumn]);
    onColumnAdd?.(title);
    setNewColumnTitle('');
    setAddingColumn(false);
  }, [newColumnTitle, columns, updateColumns, onColumnAdd]);

  const handleRemoveColumn = useCallback(
    (columnId: string) => {
      const next = columns.filter((c) => c.id !== columnId);
      updateColumns(next);
      onColumnRemove?.(columnId);
    },
    [columns, updateColumns, onColumnRemove]
  );

  const handleStartEditColumn = useCallback((column: BoardColumnData) => {
    setEditingColumnId(column.id);
    setEditingTitle(column.title);
  }, []);

  const handleFinishEditColumn = useCallback(
    (columnId: string) => {
      const title = editingTitle.trim();
      if (!title) {
        setEditingColumnId(null);
        return;
      }
      const next = columns.map((c) => (c.id === columnId ? { ...c, title } : c));
      updateColumns(next);
      onColumnTitleChange?.(columnId, title);
      setEditingColumnId(null);
    },
    [editingTitle, columns, updateColumns, onColumnTitleChange]
  );

  // ============ 卡片操作 ============
  const handleAddCard = useCallback(
    (columnId: string) => {
      const title = newCardTitle.trim();
      if (!title) {
        setAddingCardColumnId(null);
        setNewCardTitle('');
        return;
      }
      const newCard: BoardCardData = { id: genId(), title };
      const next = columns.map((c) =>
        c.id === columnId ? { ...c, cards: [...c.cards, newCard] } : c
      );
      updateColumns(next);
      onCardAdd?.(columnId, newCard);
      setNewCardTitle('');
      setAddingCardColumnId(null);
    },
    [newCardTitle, columns, updateColumns, onCardAdd]
  );

  const handleRemoveCard = useCallback(
    (columnId: string, cardId: string, e: React.MouseEvent) => {
      e.stopPropagation();
      const next = columns.map((c) =>
        c.id === columnId ? { ...c, cards: c.cards.filter((card) => card.id !== cardId) } : c
      );
      updateColumns(next);
      onCardRemove?.(columnId, cardId);
    },
    [columns, updateColumns, onCardRemove]
  );

  // ============ 拖拽逻辑 ============
  const handleDragStart = useCallback(
    (e: React.DragEvent, card: BoardCardData, columnId: string, index: number) => {
      if (!draggable) return;
      dragStateRef.current = { cardId: card.id, fromColumnId: columnId, fromIndex: index };
      setDraggingId(card.id);
      e.dataTransfer.effectAllowed = 'move';
      try {
        e.dataTransfer.setData('text/plain', card.id);
      } catch {
        /* 某些环境会抛错，忽略 */
      }
    },
    [draggable]
  );

  const handleDragEnd = useCallback(() => {
    dragStateRef.current = null;
    setDraggingId(null);
    setDropIndicator(null);
    setOverColumnId(null);
  }, []);

  // 计算落点 index（基于鼠标在卡片上的位置判断插在上方还是下方）
  const computeDropIndex = useCallback(
    (e: React.DragEvent, container: HTMLElement, cardIds: string[]): number => {
      const rect = container.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const cardEls = container.querySelectorAll<HTMLElement>('[data-board-card]');
      if (cardEls.length === 0) return 0;
      let index = 0;
      cardEls.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const mid = r.top - rect.top + r.height / 2;
        if (y > mid) {
          index = i + 1;
        }
      });
      // 边界
      if (index > cardIds.length) index = cardIds.length;
      return index;
    },
    []
  );

  const handleCardDragOver = useCallback(
    (e: React.DragEvent, columnId: string, cardIds: string[]) => {
      if (!draggable || !dragStateRef.current) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      setOverColumnId(columnId);
      const container = e.currentTarget as HTMLElement;
      const index = computeDropIndex(e, container, cardIds);
      setDropIndicator({ columnId, index });
    },
    [draggable, computeDropIndex]
  );

  const handleColumnDragOver = useCallback(
    (e: React.DragEvent, columnId: string) => {
      if (!draggable || !dragStateRef.current) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      setOverColumnId(columnId);
      setDropIndicator((prev) => (prev && prev.columnId === columnId ? prev : { columnId, index: 0 }));
    },
    [draggable]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent, toColumnId: string, cardIds: string[]) => {
      if (!draggable || !dragStateRef.current) return;
      e.preventDefault();
      const { cardId, fromColumnId, fromIndex } = dragStateRef.current;
      const container = e.currentTarget as HTMLElement;
      let toIndex = computeDropIndex(e, container, cardIds);
      // 同列内移动需要校正索引（移除原位置会影响后续索引）
      if (fromColumnId === toColumnId && fromIndex < toIndex) {
        toIndex -= 1;
      }
      // 实际数据变更
      const next = columns.map((col) => {
        if (col.id === fromColumnId && col.id !== toColumnId) {
          return { ...col, cards: col.cards.filter((_, i) => i !== fromIndex) };
        }
        if (col.id === toColumnId) {
          const targetCard = columns.find((c) => c.id === fromColumnId)?.cards[fromIndex];
          if (!targetCard) return col;
          if (fromColumnId === toColumnId) {
            const newCards = [...col.cards];
            const [moved] = newCards.splice(fromIndex, 1);
            newCards.splice(toIndex, 0, moved);
            return { ...col, cards: newCards };
          }
          const newCards = [...col.cards];
          newCards.splice(toIndex, 0, targetCard);
          return { ...col, cards: newCards };
        }
        return col;
      });
      updateColumns(next);
      onCardMove?.(cardId, fromColumnId, toColumnId, toIndex);
      handleDragEnd();
    },
    [draggable, columns, updateColumns, onCardMove, computeDropIndex, handleDragEnd]
  );

  // 渲染单张卡片
  const renderCardNode = useCallback(
    (card: BoardCardData, column: BoardColumnData, index: number) => {
      const isDragging = draggingId === card.id;
      const showIndicator =
        dropIndicator &&
        dropIndicator.columnId === column.id &&
        dropIndicator.index === index;

      const priority = card.priority ? PRIORITY_CONFIG[card.priority] : null;

      const node = renderCard ? (
        renderCard(card, column)
      ) : (
        <div
          className={classNames('zdy-board-card', { 'zdy-board-card--dragging': isDragging })}
          onClick={() => onCardClick?.(card, column.id)}
        >
          {priority && (
            <span
              className="zdy-board-card-priority"
              style={{ color: priority.color, background: priority.bg }}
            >
              {priority.label}
            </span>
          )}
          <div className="zdy-board-card-title">{card.title}</div>
          {card.description && <div className="zdy-board-card-desc">{card.description}</div>}
          {(card.tags?.length || card.assignee || card.label) && (
            <div className="zdy-board-card-footer">
              {card.label != null && <span className="zdy-board-card-label">{card.label}</span>}
              {card.tags?.length ? (
                <div className="zdy-board-card-tags">
                  {card.tags.map((t, i) => (
                    <span key={i} className="zdy-board-card-tag">{t}</span>
                  ))}
                </div>
              ) : null}
              {card.assignee && (
                <span className="zdy-board-card-assignee">{card.assignee}</span>
              )}
            </div>
          )}
          {allowRemoveCard && (
            <span
              className="zdy-board-card-remove"
              onClick={(e) => handleRemoveCard(column.id, card.id, e)}
              title="删除卡片"
            >
              <Icon type="close" size={12} color="#999" />
            </span>
          )}
        </div>
      );

      return (
        <div key={card.id} data-board-card>
          {showIndicator && <div className="zdy-board-drop-indicator" />}
          <div
            draggable={draggable}
            onDragStart={(e) => handleDragStart(e, card, column.id, index)}
            onDragEnd={handleDragEnd}
          >
            {node}
          </div>
        </div>
      );
    },
    [
      draggingId,
      dropIndicator,
      renderCard,
      onCardClick,
      allowRemoveCard,
      draggable,
      handleDragStart,
      handleDragEnd,
      handleRemoveCard,
    ]
  );

  // 渲染列
  const renderColumn = useCallback(
    (column: BoardColumnData) => {
      const isOver = overColumnId === column.id;
      const wipExceeded = typeof column.wip === 'number' && column.cards.length > column.wip;
      const isEditing = editingColumnId === column.id;

      const header = renderColumnHeader ? (
        renderColumnHeader(column)
      ) : (
        <div className="zdy-board-column-header">
          <span
            className="zdy-board-column-color"
            style={{ background: column.color || '#1890ff' }}
          />
          {isEditing ? (
            <input
              className="zdy-board-column-title-input"
              value={editingTitle}
              autoFocus
              onChange={(e) => setEditingTitle(e.target.value)}
              onBlur={() => handleFinishEditColumn(column.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleFinishEditColumn(column.id);
                if (e.key === 'Escape') setEditingColumnId(null);
              }}
            />
          ) : (
            <span
              className="zdy-board-column-title"
              onClick={() => handleStartEditColumn(column)}
              title="点击编辑标题"
            >
              {column.title}
            </span>
          )}
          {showColumnCount && (
            <span className={classNames('zdy-board-column-count', { 'is-wip-exceeded': wipExceeded })}>
              {column.cards.length}
              {typeof column.wip === 'number' ? `/${column.wip}` : ''}
            </span>
          )}
          {allowRemoveColumn && (
            <span
              className="zdy-board-column-remove"
              onClick={() => handleRemoveColumn(column.id)}
              title="删除列"
            >
              <Icon type="close" size={12} color="#999" />
            </span>
          )}
        </div>
      );

      return (
        <div
          key={column.id}
          className={classNames('zdy-board-column', { 'zdy-board-column--over': isOver })}
          onDragOver={(e) => handleColumnDragOver(e, column.id)}
          onDrop={(e) => handleDrop(e, column.id, column.cards.map((c) => c.id))}
        >
          {header}
          <div
            className="zdy-board-column-body"
            onDragOver={(e) => handleCardDragOver(e, column.id, column.cards.map((c) => c.id))}
            onDrop={(e) => handleDrop(e, column.id, column.cards.map((c) => c.id))}
          >
            {column.cards.length === 0 && addingCardColumnId !== column.id && (
              <div className="zdy-board-column-empty">{emptyDescription}</div>
            )}
            {column.cards.map((card, i) => renderCardNode(card, column, i))}
            {dropIndicator &&
              dropIndicator.columnId === column.id &&
              dropIndicator.index === column.cards.length && (
                <div className="zdy-board-drop-indicator" />
              )}
            {addingCardColumnId === column.id ? (
              <div className="zdy-board-add-card-form">
                <textarea
                  className="zdy-board-add-card-input"
                  value={newCardTitle}
                  autoFocus
                  placeholder="输入卡片标题，支持多行"
                  onChange={(e) => setNewCardTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleAddCard(column.id);
                    }
                    if (e.key === 'Escape') {
                      setAddingCardColumnId(null);
                      setNewCardTitle('');
                    }
                  }}
                />
                <div className="zdy-board-add-card-actions">
                  <button
                    className="zdy-board-btn zdy-board-btn--primary"
                    onClick={() => handleAddCard(column.id)}
                  >
                    添加
                  </button>
                  <button
                    className="zdy-board-btn"
                    onClick={() => {
                      setAddingCardColumnId(null);
                      setNewCardTitle('');
                    }}
                  >
                    取消
                  </button>
                </div>
              </div>
            ) : showAddCard ? (
              <button
                className="zdy-board-add-card-trigger"
                onClick={() => setAddingCardColumnId(column.id)}
              >
                <Icon type="add" size={12} color="#999" />
                <span>添加卡片</span>
              </button>
            ) : null}
          </div>
        </div>
      );
    },
    [
      overColumnId,
      editingColumnId,
      editingTitle,
      renderColumnHeader,
      showColumnCount,
      allowRemoveColumn,
      handleColumnDragOver,
      handleDrop,
      handleCardDragOver,
      addingCardColumnId,
      newCardTitle,
      emptyDescription,
      renderCardNode,
      dropIndicator,
      showAddCard,
      handleFinishEditColumn,
      handleStartEditColumn,
      handleRemoveColumn,
      handleAddCard,
    ]
  );

  const memoColumns = useMemo(() => columns.map(renderColumn), [columns, renderColumn]);

  return (
    <div className={classNames('zdy-board', className)} style={style}>
      {memoColumns}
      {showAddColumn && (
        <div className="zdy-board-add-column">
          {addingColumn ? (
            <div className="zdy-board-add-column-form">
              <input
                className="zdy-board-add-column-input"
                value={newColumnTitle}
                autoFocus
                placeholder="输入列标题"
                onChange={(e) => setNewColumnTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddColumn();
                  if (e.key === 'Escape') {
                    setAddingColumn(false);
                    setNewColumnTitle('');
                  }
                }}
              />
              <div className="zdy-board-add-column-actions">
                <button
                  className="zdy-board-btn zdy-board-btn--primary"
                  onClick={handleAddColumn}
                >
                  添加列
                </button>
                <button
                  className="zdy-board-btn"
                  onClick={() => {
                    setAddingColumn(false);
                    setNewColumnTitle('');
                  }}
                >
                  取消
                </button>
              </div>
            </div>
          ) : (
            <button
              className="zdy-board-add-column-trigger"
              onClick={() => setAddingColumn(true)}
            >
              <Icon type="add" size={14} color="#999" />
              <span>添加列</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Board;
