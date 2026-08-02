import React from 'react';
import type { BaseComponentProps } from '../../../types';

export type BoardPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface BoardCardData {
  id: string;
  title: string;
  description?: string;
  label?: React.ReactNode;
  priority?: BoardPriority;
  assignee?: string;
  tags?: string[];
  meta?: Record<string, any>;
}

export interface BoardColumnData {
  id: string;
  title: string;
  cards: BoardCardData[];
  color?: string;
  wip?: number; // 在制品数量限制
}

export interface BoardProps extends BaseComponentProps {
  columns?: BoardColumnData[];
  defaultColumns?: BoardColumnData[];
  draggable?: boolean;
  showColumnCount?: boolean;
  showAddColumn?: boolean;
  showAddCard?: boolean;
  allowRemoveColumn?: boolean;
  allowRemoveCard?: boolean;
  emptyDescription?: string;
  onColumnsChange?: (columns: BoardColumnData[]) => void;
  onCardMove?: (cardId: string, fromColumnId: string, toColumnId: string, toIndex: number) => void;
  onColumnAdd?: (title: string) => void;
  onColumnRemove?: (columnId: string) => void;
  onCardAdd?: (columnId: string, card: BoardCardData) => void;
  onCardRemove?: (columnId: string, cardId: string) => void;
  onCardClick?: (card: BoardCardData, columnId: string) => void;
  onColumnTitleChange?: (columnId: string, title: string) => void;
  renderCard?: (card: BoardCardData, column: BoardColumnData) => React.ReactNode;
  renderColumnHeader?: (column: BoardColumnData) => React.ReactNode;
}
