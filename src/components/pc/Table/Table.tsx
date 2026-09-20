import React, { useState, useCallback, useRef, useMemo } from "react";
import classNames from "classnames";
import type { TableProps, TableColumn } from "./types";
import Popover from "../Popover/Popover";
import Icon from "../Icon/Icon";

import "./Table.less";

// 简单的 Checkbox 组件（避免额外依赖）
const Checkbox: React.FC<{
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}> = ({ checked, indeterminate, disabled, onChange }) => {
  const ref = useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);
  return (
    <label
      className={classNames("zdy-checkbox", {
        "zdy-checkbox--disabled": disabled,
      })}
    >
      <input
        ref={ref}
        type="checkbox"
        className="zdy-checkbox-input"
        checked={!!checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className="zdy-checkbox-box">
        {(checked || indeterminate) && (
          <span className="zdy-checkbox-check">
            {indeterminate ? (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <rect x="2" y="4.5" width="6" height="1" fill="currentColor" />
              </svg>
            ) : (
              <svg
                width="10"
                height="8"
                viewBox="0 0 10 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="1 4 4 7 9 1" />
              </svg>
            )}
          </span>
        )}
      </span>
    </label>
  );
};

const Table: React.FC<TableProps> = ({
  columns,
  dataSource,
  className = "",
  style,
  bordered = true,
  rowSelection,
  draggable = false,
  onDragEnd,
  rowActions,
  showHeaderSelectAll = true,
  rowKey = "key",
}) => {
  // -------- 行选中 --------
  const isSelectionControlled = rowSelection?.selectedRowKeys !== undefined;
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<
    (string | number)[]
  >(rowSelection?.defaultSelectedRowKeys || []);
  const selectedKeys = isSelectionControlled
    ? rowSelection!.selectedRowKeys!
    : internalSelectedKeys;

  const getRowKey = useCallback(
    (record: any, index: number): string | number => {
      if (record[rowKey] !== undefined && record[rowKey] !== null) {
        return record[rowKey];
      }
      return index;
    },
    [rowKey],
  );

  const updateSelectedKeys = useCallback(
    (nextKeys: (string | number)[]) => {
      if (!isSelectionControlled) {
        setInternalSelectedKeys(nextKeys);
      }
      rowSelection?.onChange?.(
        nextKeys,
        dataSource.filter((row, i) => nextKeys.includes(getRowKey(row, i))),
      );
    },
    [isSelectionControlled, rowSelection, dataSource, getRowKey],
  );

  const isAllSelected =
    dataSource.length > 0 &&
    dataSource.every((row, i) => selectedKeys.includes(getRowKey(row, i)));
  const isIndeterminate = !isAllSelected && selectedKeys.length > 0;

  const handleHeaderCheck = useCallback(
    (checked: boolean) => {
      if (!rowSelection) return;
      if (checked) {
        const disabledKeys = new Set<string | number>();
        dataSource.forEach((row, i) => {
          const props = rowSelection.getCheckboxProps?.(row, i);
          if (props?.disabled) disabledKeys.add(getRowKey(row, i));
        });
        const allKeys = dataSource
          .map((row, i) => getRowKey(row, i))
          .filter((k) => !disabledKeys.has(k));
        updateSelectedKeys(allKeys);
      } else {
        updateSelectedKeys([]);
      }
    },
    [rowSelection, dataSource, updateSelectedKeys, getRowKey],
  );

  const handleRowCheck = useCallback(
    (record: any, index: number, checked: boolean) => {
      if (!rowSelection) return;
      const key = getRowKey(record, index);
      if (rowSelection.type === "radio") {
        updateSelectedKeys(checked ? [key] : []);
        return;
      }
      if (checked) {
        updateSelectedKeys([...selectedKeys, key]);
      } else {
        updateSelectedKeys(selectedKeys.filter((k) => k !== key));
      }
    },
    [rowSelection, selectedKeys, updateSelectedKeys, getRowKey],
  );

  // -------- 行拖拽 --------
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragFromIndexRef = useRef<number | null>(null);

  const handleDragStart = (index: number, e: React.DragEvent) => {
    dragFromIndexRef.current = index;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(index));
  };

  const handleDragOver = (index: number, e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverIndex !== index) setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (index: number, e: React.DragEvent) => {
    e.preventDefault();
    const from = dragFromIndexRef.current;
    dragFromIndexRef.current = null;
    setDragOverIndex(null);
    if (from === null || from === index) return;
    const newData = [...dataSource];
    const [moved] = newData.splice(from, 1);
    newData.splice(index, 0, moved);
    onDragEnd?.(from, index, newData);
  };

  const handleDragEnd = () => {
    dragFromIndexRef.current = null;
    setDragOverIndex(null);
  };

  // -------- 操作菜单 --------
  const [openMenuKey, setOpenMenuKey] = useState<string | number | null>(null);

  // -------- 构建列 --------
  const hasSelection = !!rowSelection;
  const finalColumns: TableColumn[] = useMemo(() => columns, [columns]);

  // 全选框 disabled 状态
  const allDisabled = useMemo(() => {
    if (!rowSelection?.getCheckboxProps) return false;
    return dataSource.every(
      (row, i) => rowSelection!.getCheckboxProps!(row, i).disabled,
    );
  }, [rowSelection, dataSource]);

  return (
    <div
      className={classNames(
        "zdy-table-wrapper",
        {
          "zdy-table-wrapper--bordered": bordered,
          "zdy-table-wrapper--draggable": draggable,
        },
        className,
      )}
      style={style}
    >
      <table className="zdy-table">
        <thead>
          <tr>
            {draggable && <th className="zdy-table-col-drag" />}
            {hasSelection && (
              <th className="zdy-table-col-select">
                {showHeaderSelectAll && rowSelection?.type !== "radio" && (
                  <Checkbox
                    checked={isAllSelected}
                    indeterminate={isIndeterminate}
                    disabled={allDisabled}
                    onChange={handleHeaderCheck}
                  />
                )}
              </th>
            )}
            {finalColumns.map((col, idx) => (
              <th
                key={col.dataIndex || col.key || String(idx)}
                style={{
                  width: col.width,
                  textAlign: col.align || "left",
                }}
              >
                {col.title}
              </th>
            ))}
            {rowActions && rowActions.length > 0 && (
              <th className="zdy-table-col-actions" />
            )}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((row, rowIndex) => {
            const rowKeyVal = getRowKey(row, rowIndex);
            const isSelected = selectedKeys.includes(rowKeyVal);
            const checkProps = rowSelection?.getCheckboxProps?.(row, rowIndex);

            return (
              <tr
                key={rowKeyVal}
                className={classNames("zdy-table-row", {
                  "zdy-table-row--selected": isSelected,
                  "zdy-table-row--drag-over": dragOverIndex === rowIndex,
                })}
                draggable={draggable}
                onDragStart={(e) => handleDragStart(rowIndex, e)}
                onDragOver={(e) => handleDragOver(rowIndex, e)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(rowIndex, e)}
                onDragEnd={handleDragEnd}
              >
                {draggable && (
                  <td className="zdy-table-cell-drag">
                    <span className="zdy-table-drag-handle" title="拖拽排序">
                      <Icon type="drag" size={14} />
                    </span>
                  </td>
                )}
                {hasSelection && (
                  <td className="zdy-table-cell-select">
                    <Checkbox
                      checked={isSelected}
                      disabled={checkProps?.disabled}
                      onChange={(checked) =>
                        handleRowCheck(row, rowIndex, checked)
                      }
                    />
                  </td>
                )}
                {finalColumns.map((col, colIdx) => (
                  <td
                    key={col.dataIndex || col.key || String(colIdx)}
                    style={{ textAlign: col.align || "left" }}
                  >
                    {col.render
                      ? col.render(
                          col.dataIndex ? row[col.dataIndex] : undefined,
                          row,
                          rowIndex,
                        )
                      : col.dataIndex
                        ? row[col.dataIndex]
                        : null}
                  </td>
                ))}
                {rowActions && rowActions.length > 0 && (
                  <td className="zdy-table-cell-actions">
                    <Popover
                      trigger="click"
                      placement="bottomRight"
                      arrow={false}
                      className="zdy-table-row-menu-popover"
                      open={openMenuKey === rowKeyVal}
                      onOpenChange={(open) => {
                        setOpenMenuKey(open ? rowKeyVal : null);
                      }}
                      content={
                        <div className="zdy-table-row-actions">
                          {rowActions.map((action) => (
                            <React.Fragment key={action.key}>
                              {action.divider && (
                                <div className="zdy-table-row-actions-divider" />
                              )}
                              <button
                                type="button"
                                disabled={action.disabled}
                                className={classNames(
                                  "zdy-table-row-action-item",
                                  {
                                    "zdy-table-row-action-item--danger":
                                      action.danger,
                                    "zdy-table-row-action-item--disabled":
                                      action.disabled,
                                  },
                                )}
                                onClick={() => {
                                  action.onClick?.(row, rowIndex);
                                  setOpenMenuKey(null);
                                }}
                              >
                                {action.icon && (
                                  <span className="zdy-table-row-action-icon">
                                    {action.icon}
                                  </span>
                                )}
                                <span>{action.label}</span>
                              </button>
                            </React.Fragment>
                          ))}
                        </div>
                      }
                    >
                      <button
                        type="button"
                        className="zdy-table-more-btn"
                        aria-label="More actions"
                      >
                        <Icon type="more-vertical" size={16} />
                      </button>
                    </Popover>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
