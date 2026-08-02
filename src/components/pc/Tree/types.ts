import React from 'react';
import type { BaseComponentProps } from '../../../types';

export interface TreeNodeData {
  key: string | number;
  title: React.ReactNode;
  children?: TreeNodeData[];
  disabled?: boolean;
  disableCheckbox?: boolean;
  selectable?: boolean;
  isLeaf?: boolean;
  icon?: React.ReactNode;
  [key: string]: any;
}

export interface TreeProps extends BaseComponentProps {
  treeData?: TreeNodeData[];
  expandedKeys?: (string | number)[];
  defaultExpandedKeys?: (string | number)[];
  selectedKeys?: (string | number)[];
  defaultSelectedKeys?: (string | number)[];
  checkedKeys?: (string | number)[] | { checked: (string | number)[]; halfChecked: (string | number)[] };
  defaultCheckedKeys?: (string | number)[];
  checkable?: boolean;
  checkStrictly?: boolean;
  disabled?: boolean;
  showIcon?: boolean;
  showLine?: boolean;
  draggable?: boolean;
  blockNode?: boolean;
  multiple?: boolean;
  autoExpandParent?: boolean;
  defaultExpandAll?: boolean;
  switcherIcon?: React.ReactNode;
  titleRender?: (node: TreeNodeData) => React.ReactNode;
  onLoad?: (treeNode: TreeNodeData) => Promise<void>;
  onExpand?: (expandedKeys: (string | number)[], info: { expanded: boolean; node: TreeNodeData }) => void;
  onSelect?: (selectedKeys: (string | number)[], info: { selected: boolean; node: TreeNodeData }) => void;
  onCheck?: (
    checkedKeys: (string | number)[] | { checked: (string | number)[]; halfChecked: (string | number)[] },
    info: { checked: boolean; node: TreeNodeData }
  ) => void;
  onDragStart?: (info: { node: TreeNodeData }) => void;
  onDragEnter?: (info: { node: TreeNodeData; expandedKeys: (string | number)[] }) => void;
  onDragOver?: (info: { node: TreeNodeData }) => void;
  onDragLeave?: (info: { node: TreeNodeData }) => void;
  onDragEnd?: (info: { node: TreeNodeData }) => void;
  onDrop?: (info: { node: TreeNodeData; dragNode: TreeNodeData; dropPosition: number; dropToGap: boolean }) => void;
}
