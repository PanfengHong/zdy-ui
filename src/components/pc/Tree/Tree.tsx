import React, { useState, useMemo, useCallback, useRef } from 'react';
import classNames from 'classnames';
import type { TreeProps, TreeNodeData } from '../../../types';
import Icon from '../Icon/Icon';

import './Tree.less';

// 默认 switcher 箭头图标
const DefaultSwitcher: React.FC<{ expanded: boolean }> = ({ expanded }) => (
  <Icon
    type="caret-right"
    size={10}
    color="currentColor"
    style={{ transform: expanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s ease' }}
  />
);

// 构建 key -> node 映射
function buildKeyMap(nodes: TreeNodeData[], map: Map<string | number, TreeNodeData> = new Map()): Map<string | number, TreeNodeData> {
  nodes.forEach((node) => {
    map.set(node.key, node);
    if (node.children) {
      buildKeyMap(node.children, map);
    }
  });
  return map;
}

// 获取所有 key
function getAllKeys(nodes: TreeNodeData[]): (string | number)[] {
  const keys: (string | number)[] = [];
  const walk = (list: TreeNodeData[]) => {
    list.forEach((n) => {
      keys.push(n.key);
      if (n.children) walk(n.children);
    });
  };
  walk(nodes);
  return keys;
}

// 获取父节点 key 映射
function getParentMap(nodes: TreeNodeData[], parentKey?: string | number, map: Map<string | number, string | number | undefined> = new Map()): Map<string | number, string | number | undefined> {
  nodes.forEach((node) => {
    map.set(node.key, parentKey);
    if (node.children) {
      getParentMap(node.children, node.key, map);
    }
  });
  return map;
}

const Tree: React.FC<TreeProps> = ({
  treeData = [],
  expandedKeys: controlledExpandedKeys,
  defaultExpandedKeys = [],
  selectedKeys: controlledSelectedKeys,
  defaultSelectedKeys = [],
  checkedKeys: controlledCheckedKeys,
  defaultCheckedKeys = [],
  checkable = false,
  checkStrictly = false,
  disabled = false,
  showIcon = false,
  showLine = false,
  draggable = false,
  blockNode = false,
  multiple = false,
  defaultExpandAll = false,
  switcherIcon,
  titleRender,
  onExpand,
  onSelect,
  onCheck,
  onDragStart,
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDragEnd,
  onDrop,
  className = '',
  style,
}) => {
  // 内部状态
  const [internalExpandedKeys, setInternalExpandedKeys] = useState<(string | number)[]>(() => {
    if (defaultExpandAll) return getAllKeys(treeData);
    return defaultExpandedKeys;
  });
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<(string | number)[]>(defaultSelectedKeys);
  const [internalCheckedKeys, setInternalCheckedKeys] = useState<(string | number)[]>(defaultCheckedKeys);
  const [internalHalfCheckedKeys, setInternalHalfCheckedKeys] = useState<(string | number)[]>([]);
  const [dragOverKey, setDragOverKey] = useState<string | number | null>(null);
  const [dragOverPos, setDragOverPos] = useState<'before' | 'inside' | 'after' | null>(null);
  const [draggingKey, setDraggingKey] = useState<string | number | null>(null);
  const dragNodeRef = useRef<TreeNodeData | null>(null);

  // 计算属性
  const expandedKeys = controlledExpandedKeys ?? internalExpandedKeys;
  const selectedKeys = controlledSelectedKeys ?? internalSelectedKeys;

  // 计算 checkedKeys
  const checkedKeysRaw = controlledCheckedKeys ?? internalCheckedKeys;
  const checkedKeys: (string | number)[] = Array.isArray(checkedKeysRaw) ? checkedKeysRaw : checkedKeysRaw.checked;
  const halfCheckedKeys: (string | number)[] = Array.isArray(checkedKeysRaw) ? internalHalfCheckedKeys : checkedKeysRaw.halfChecked;

  // 缓存映射
  const parentMap = useMemo(() => getParentMap(treeData), [treeData]);
  const keyMap = useMemo(() => buildKeyMap(treeData), [treeData]);

  // 展开/收起
  const handleExpand = useCallback(
    (key: string | number, expanded: boolean) => {
      let newKeys: (string | number)[];
      if (expanded) {
        newKeys = [...expandedKeys, key];
      } else {
        newKeys = expandedKeys.filter((k) => k !== key);
      }
      if (!controlledExpandedKeys) {
        setInternalExpandedKeys(newKeys);
      }
      onExpand?.(newKeys, { expanded, node: keyMap.get(key)! });
    },
    [expandedKeys, controlledExpandedKeys, keyMap, onExpand]
  );

  // 选择
  const handleSelect = useCallback(
    (key: string | number, node: TreeNodeData) => {
      if (disabled || node.selectable === false) return;
      let newKeys: (string | number)[];
      const isSelected = selectedKeys.includes(key);
      if (multiple) {
        newKeys = isSelected ? selectedKeys.filter((k) => k !== key) : [...selectedKeys, key];
      } else {
        newKeys = isSelected ? [] : [key];
      }
      if (!controlledSelectedKeys) {
        setInternalSelectedKeys(newKeys);
      }
      onSelect?.(newKeys, { selected: !isSelected, node });
    },
    [disabled, selectedKeys, multiple, controlledSelectedKeys, onSelect]
  );

  // 勾选（级联）
  const handleCheck = useCallback(
    (key: string | number, node: TreeNodeData, checked: boolean) => {
      if (disabled || node.disableCheckbox || checkStrictly) {
        // 严格模式：只勾选当前节点，不影响父子
        let newChecked: (string | number)[];
        if (checked) {
          newChecked = [...checkedKeys, key];
        } else {
          newChecked = checkedKeys.filter((k) => k !== key);
        }
        if (!controlledCheckedKeys) {
          setInternalCheckedKeys(newChecked);
          setInternalHalfCheckedKeys([]);
        }
        onCheck?.(newChecked, { checked, node });
        return;
      }

      // 收集所有子孙节点 key
      const descendantKeys: (string | number)[] = [];
      const collectDescendants = (n: TreeNodeData) => {
        if (n.disableCheckbox) return;
        descendantKeys.push(n.key);
        n.children?.forEach(collectDescendants);
      };
      collectDescendants(node);

      let newChecked: (string | number)[];
      if (checked) {
        newChecked = Array.from(new Set([...checkedKeys, ...descendantKeys]));
      } else {
        newChecked = checkedKeys.filter((k) => !descendantKeys.includes(k));
      }

      // 向上计算父节点半选状态
      const newHalfChecked: (string | number)[] = [];
      const computeParentState = (k: string | number) => {
        const pk = parentMap.get(k);
        if (pk === undefined) return;
        const parentNode = keyMap.get(pk);
        if (!parentNode || !parentNode.children) return;

        const childKeys: (string | number)[] = parentNode.children.map((c: TreeNodeData) => c.key);
        const allChecked = childKeys.every((ck: string | number) => newChecked.includes(ck));
        const someChecked = childKeys.some((ck: string | number) => newChecked.includes(ck) || newHalfChecked.includes(ck));

        if (allChecked) {
          newChecked = Array.from(new Set([...newChecked, pk]));
          const idx = newHalfChecked.indexOf(pk);
          if (idx > -1) newHalfChecked.splice(idx, 1);
        } else if (someChecked) {
          newHalfChecked.push(pk);
          newChecked = newChecked.filter((ck) => ck !== pk);
        } else {
          newChecked = newChecked.filter((ck) => ck !== pk);
          const idx = newHalfChecked.indexOf(pk);
          if (idx > -1) newHalfChecked.splice(idx, 1);
        }
        computeParentState(pk);
      };
      descendantKeys.forEach((dk) => computeParentState(dk));

      if (!controlledCheckedKeys) {
        setInternalCheckedKeys(newChecked);
        setInternalHalfCheckedKeys(newHalfChecked);
      }
      onCheck?.(newChecked, { checked, node });
    },
    [disabled, checkStrictly, checkedKeys, controlledCheckedKeys, parentMap, keyMap, onCheck]
  );

  // 拖拽处理
  const handleDragStart = (e: React.DragEvent, node: TreeNodeData) => {
    if (!draggable || disabled) return;
    e.stopPropagation();
    dragNodeRef.current = node;
    setDraggingKey(node.key);
    e.dataTransfer.effectAllowed = 'move';
    onDragStart?.({ node });
  };

  const handleDragEnter = (e: React.DragEvent, node: TreeNodeData) => {
    if (!draggable || disabled) return;
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';

    // 自动展开
    const hasChildren = node.children && node.children.length > 0;
    if (hasChildren && !expandedKeys.includes(node.key)) {
      let newKeys = [...expandedKeys, node.key];
      if (!controlledExpandedKeys) {
        setInternalExpandedKeys(newKeys);
      }
      onDragEnter?.({ node, expandedKeys: newKeys });
    } else {
      onDragEnter?.({ node, expandedKeys });
    }

    // 计算放置位置
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const y = e.clientY - rect.top;
    const h = rect.height;
    if (y < h * 0.3) setDragOverPos('before');
    else if (y > h * 0.7) setDragOverPos('after');
    else setDragOverPos('inside');
    setDragOverKey(node.key);
  };

  const handleDragOver = (e: React.DragEvent, node: TreeNodeData) => {
    if (!draggable || disabled) return;
    e.preventDefault();
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const y = e.clientY - rect.top;
    const h = rect.height;
    if (y < h * 0.3) setDragOverPos('before');
    else if (y > h * 0.7) setDragOverPos('after');
    else setDragOverPos('inside');
    onDragOver?.({ node });
  };

  const handleDragLeave = (e: React.DragEvent, node: TreeNodeData) => {
    if (!draggable || disabled) return;
    e.stopPropagation();
    onDragLeave?.({ node });
  };

  const handleDragEnd = (e: React.DragEvent, node: TreeNodeData) => {
    if (!draggable || disabled) return;
    e.stopPropagation();
    setDraggingKey(null);
    setDragOverKey(null);
    setDragOverPos(null);
    dragNodeRef.current = null;
    onDragEnd?.({ node });
  };

  const handleDrop = (e: React.DragEvent, node: TreeNodeData) => {
    if (!draggable || disabled) return;
    e.preventDefault();
    e.stopPropagation();
    const dragNode = dragNodeRef.current;
    const pos = dragOverPos;
    setDraggingKey(null);
    setDragOverKey(null);
    setDragOverPos(null);
    dragNodeRef.current = null;
    if (!dragNode || dragNode.key === node.key) return;

    // 计算 dropPosition 和 dropToGap
    let dropPosition = 0;
    let dropToGap = false;
    if (pos === 'before') {
      dropToGap = true;
      dropPosition = -1;
    } else if (pos === 'after') {
      dropToGap = true;
      dropPosition = 1;
    } else {
      dropToGap = false;
      dropPosition = 0;
    }
    onDrop?.({ node, dragNode, dropPosition, dropToGap });
  };

  // 渲染节点
  const renderNode = (node: TreeNodeData, level: number): React.ReactNode => {
    const hasChildren = node.children && node.children.length > 0;
    const expanded = expandedKeys.includes(node.key);
    const selected = selectedKeys.includes(node.key);
    const checked = checkedKeys.includes(node.key);
    const halfChecked = halfCheckedKeys.includes(node.key);
    const isDisabled = disabled || node.disabled;
    const isDragging = draggingKey === node.key;
    const isDragOver = dragOverKey === node.key;

    return (
      <div
        key={node.key}
        className={classNames('zdy-tree-node', {
          'zdy-tree-node--selected': selected,
          'zdy-tree-node--disabled': isDisabled,
          'zdy-tree-node--dragging': isDragging,
          'zdy-tree-node--drag-over': isDragOver,
          [`zdy-tree-node--drag-${dragOverPos}`]: isDragOver && dragOverPos,
        })}
        draggable={draggable && !isDisabled}
        onDragStart={(e) => handleDragStart(e, node)}
        onDragEnter={(e) => handleDragEnter(e, node)}
        onDragOver={(e) => handleDragOver(e, node)}
        onDragLeave={(e) => handleDragLeave(e, node)}
        onDragEnd={(e) => handleDragEnd(e, node)}
        onDrop={(e) => handleDrop(e, node)}
      >
        <div className="zdy-tree-node-content" style={{ paddingLeft: level * 18 }}>
          {/* switcher */}
          <span
            className={classNames('zdy-tree-switcher', {
              'zdy-tree-switcher--leaf': !hasChildren,
              'zdy-tree-switcher--expanded': expanded,
            })}
            onClick={(e) => {
              e.stopPropagation();
              if (hasChildren && !isDisabled) {
                handleExpand(node.key, !expanded);
              }
            }}
          >
            {hasChildren ? (
              switcherIcon !== undefined ? (
                switcherIcon
              ) : (
                <DefaultSwitcher expanded={expanded} />
              )
            ) : showLine ? (
              <span className="zdy-tree-switcher-line" />
            ) : null}
          </span>

          {/* checkbox */}
          {checkable && (
            <span
              className={classNames('zdy-tree-checkbox', {
                'zdy-tree-checkbox--checked': checked,
                'zdy-tree-checkbox--indeterminate': halfChecked,
                'zdy-tree-checkbox--disabled': isDisabled || node.disableCheckbox,
              })}
              onClick={(e) => {
                e.stopPropagation();
                if (!isDisabled && !node.disableCheckbox) {
                  handleCheck(node.key, node, !checked);
                }
              }}
            >
              <span className="zdy-tree-checkbox-inner" />
            </span>
          )}

          {/* icon */}
          {showIcon && node.icon && <span className="zdy-tree-icon">{node.icon}</span>}

          {/* title */}
          <span
            className={classNames('zdy-tree-title', { 'zdy-tree-title--block': blockNode })}
            onClick={(e) => {
              e.stopPropagation();
              handleSelect(node.key, node);
            }}
          >
            {titleRender ? titleRender(node) : node.title}
          </span>
        </div>

        {/* children */}
        {hasChildren && expanded && (
          <div className="zdy-tree-children">
            {node.children!.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={classNames('zdy-tree', className, {
        'zdy-tree--show-line': showLine,
        'zdy-tree--disabled': disabled,
      })}
      style={style}
    >
      {treeData.map((node) => renderNode(node, 0))}
    </div>
  );
};

export default Tree;
