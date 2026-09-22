import React, {
  useState,
  useCallback,
  useRef,
  useMemo,
  useLayoutEffect,
} from "react";
import classNames from "classnames";
import type { TableProps, TableColumn, TablePaginationConfig } from "./types";
import Popover from "../Popover/Popover";
import Pagination from "../Pagination/Pagination";
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
      </span>
    </label>
  );
};

// -------- 单元格描述符：把拖拽列 / 选择列 / 数据列 / 操作列统一建模 --------
type CellKind = "drag" | "select" | "data" | "actions";

interface CellDef {
  kind: CellKind;
  key: string;
  fixed?: "left" | "right";
  align?: "left" | "center" | "right";
  width?: number | string;
  column?: TableColumn;
}

const DRAG_CELL_KEY = "__drag__";
const SELECT_CELL_KEY = "__select__";
const ACTIONS_CELL_KEY = "__actions__";
const DRAG_CELL_WIDTH = 40;
const SELECT_CELL_WIDTH = 48;
const ACTIONS_CELL_WIDTH = 56;

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
  maxHeight,
  pagination,
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
  // draggable 直接挂在拖拽手柄上：只有抓手柄才能起拖，
  // 完全不影响 checkbox 点击 / 文本选择 / 操作按钮
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const dragFromIndexRef = useRef<number | null>(null);
  // dropIndicator: 插入位置（0..dataSource.length），表示"插到第 N 行之前"
  const [dropIndicator, setDropIndicator] = useState<number | null>(null);

  const handleDragStart = (index: number, e: React.DragEvent) => {
    dragFromIndexRef.current = index;
    setDraggingIndex(index);
    e.dataTransfer.effectAllowed = "move";
    // Firefox 必须 setData 才会真正启动拖拽
    e.dataTransfer.setData("text/plain", String(index));
    // 拖影使用整行而不是小手柄
    const rowEl = (e.currentTarget as HTMLElement).closest("tr");
    if (rowEl) {
      try {
        e.dataTransfer.setDragImage(rowEl, 0, 12);
      } catch {
        /* 老浏览器忽略 */
      }
    }
  };

  const computeDropPosition = (rowEl: HTMLElement, clientY: number): number => {
    const rect = rowEl.getBoundingClientRect();
    const rowIndex = Number(rowEl.getAttribute("data-row-index"));
    return clientY > rect.top + rect.height / 2 ? rowIndex + 1 : rowIndex;
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (dragFromIndexRef.current === null) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    const pos = computeDropPosition(e.currentTarget as HTMLElement, e.clientY);
    setDropIndicator((prev) => (prev === pos ? prev : pos));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const from = dragFromIndexRef.current;
    const indicator = dropIndicator;
    dragFromIndexRef.current = null;
    setDraggingIndex(null);
    setDropIndicator(null);
    if (from === null || indicator === null) return;
    // 前端分页时拖拽仅在当前页内进行，把页内坐标换算成全量 dataSource 坐标
    const pageOffset =
      paginationEnabled && !isRemotePagination
        ? (safePageCurrent - 1) * pageSize
        : 0;
    let globalFrom = from + pageOffset;
    let globalInsert = indicator + pageOffset;
    if (globalFrom < globalInsert) globalInsert -= 1;
    if (globalFrom === globalInsert) return;
    const newData = [...dataSource];
    const [moved] = newData.splice(globalFrom, 1);
    newData.splice(globalInsert, 0, moved);
    onDragEnd?.(globalFrom, globalInsert, newData);
  };

  const handleDragEnd = () => {
    dragFromIndexRef.current = null;
    setDraggingIndex(null);
    setDropIndicator(null);
  };

  // -------- 分页 --------
  const pageConfig: TablePaginationConfig | null =
    pagination && typeof pagination === "object" ? pagination : {};
  const paginationEnabled = pagination !== false && pagination !== undefined && pagination !== null;
  // 显式传 total → 服务端模式（dataSource 已是当前页数据，不再切片）
  const isRemotePagination = pageConfig.total !== undefined;

  const [innerPageCurrent, setInnerPageCurrent] = useState(
    pageConfig.current ?? pageConfig.defaultCurrent ?? 1,
  );
  const [innerPageSize, setInnerPageSize] = useState(
    pageConfig.pageSize ?? pageConfig.defaultPageSize ?? 10,
  );
  const pageCurrent = pageConfig.current ?? innerPageCurrent;
  const pageSize = pageConfig.pageSize ?? innerPageSize;
  const pageTotal = pageConfig.total ?? dataSource.length;
  const totalPages = Math.max(1, Math.ceil(pageTotal / pageSize));

  // 数据收缩（如删除最后一页的数据）时，自动回退到有效页码
  const safePageCurrent = Math.min(pageCurrent, totalPages);

  const handlePageChange = useCallback(
    (page: number, size: number) => {
      if (pageConfig.current === undefined) setInnerPageCurrent(page);
      if (pageConfig.pageSize === undefined) setInnerPageSize(size);
      pageConfig.onChange?.(page, size);
    },
    [pageConfig],
  );

  const handlePageSizeChange = useCallback(
    (current: number, size: number) => {
      if (pageConfig.current === undefined) setInnerPageCurrent(current);
      if (pageConfig.pageSize === undefined) setInnerPageSize(size);
      pageConfig.onShowSizeChange?.(current, size);
    },
    [pageConfig],
  );

  // 当前页渲染数据（服务端模式直接使用 dataSource）
  const displayData = useMemo(() => {
    if (!paginationEnabled || isRemotePagination) return dataSource;
    const start = (safePageCurrent - 1) * pageSize;
    return dataSource.slice(start, start + pageSize);
  }, [
    paginationEnabled,
    isRemotePagination,
    dataSource,
    safePageCurrent,
    pageSize,
  ]);

  // -------- 操作菜单 --------
  const [openMenuKey, setOpenMenuKey] = useState<string | number | null>(null);

  // -------- 构建统一的单元格描述符列表（DOM 顺序） --------
  const hasSelection = !!rowSelection;
  const hasActions = !!(rowActions && rowActions.length > 0);

  const cellDefs: CellDef[] = useMemo(() => {
    const defs: CellDef[] = [];
    if (draggable) {
      defs.push({
        kind: "drag",
        key: DRAG_CELL_KEY,
        fixed: "left",
        width: DRAG_CELL_WIDTH,
      });
    }
    if (hasSelection) {
      defs.push({
        kind: "select",
        key: SELECT_CELL_KEY,
        fixed: "left",
        width: SELECT_CELL_WIDTH,
      });
    }
    columns.forEach((col, i) => {
      defs.push({
        kind: "data",
        key: col.dataIndex || col.key || `col-${i}`,
        fixed: col.fixed,
        align: col.align,
        width: col.width,
        column: col,
      });
    });
    if (hasActions) {
      defs.push({
        kind: "actions",
        key: ACTIONS_CELL_KEY,
        fixed: "right",
        width: ACTIONS_CELL_WIDTH,
      });
    }
    return defs;
  }, [draggable, hasSelection, hasActions, columns]);

  // 阴影只出现在固定列"紧邻滚动区"的边缘那列
  const edgeCells = useMemo(() => {
    const leftKeys = cellDefs.filter((c) => c.fixed === "left");
    const rightKeys = cellDefs.filter((c) => c.fixed === "right");
    return {
      left: leftKeys.length > 0 ? leftKeys[leftKeys.length - 1].key : null,
      right: rightKeys.length > 0 ? rightKeys[0].key : null,
    };
  }, [cellDefs]);

  // -------- 实测固定列偏移（列宽未显式声明时也能正确） --------
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const headerRowRef = useRef<HTMLTableRowElement>(null);
  const [stickyOffsets, setStickyOffsets] = useState<
    Record<string, { left?: number; right?: number }>
  >({});
  const [scrollState, setScrollState] = useState({
    canScrollLeft: false,
    canScrollRight: false,
  });

  const updateScrollState = useCallback(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const canScrollLeft = el.scrollLeft > 1;
    const canScrollRight = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
    setScrollState((prev) =>
      prev.canScrollLeft === canScrollLeft &&
      prev.canScrollRight === canScrollRight
        ? prev
        : { canScrollLeft, canScrollRight },
    );
  }, []);

  useLayoutEffect(() => {
    const compute = () => {
      const headerRow = headerRowRef.current;
      if (!headerRow) return;
      const ths = Array.from(headerRow.querySelectorAll("th"));
      const next: Record<string, { left?: number; right?: number }> = {};

      let leftAcc = 0;
      ths.forEach((th) => {
        if (th.getAttribute("data-fixed") === "left") {
          const key = th.getAttribute("data-cell-key")!;
          next[key] = { ...next[key], left: leftAcc };
          leftAcc += th.offsetWidth;
        }
      });

      let rightAcc = 0;
      for (let i = ths.length - 1; i >= 0; i -= 1) {
        const th = ths[i];
        if (th.getAttribute("data-fixed") === "right") {
          const key = th.getAttribute("data-cell-key")!;
          next[key] = { ...next[key], right: rightAcc };
          rightAcc += th.offsetWidth;
        }
      }

      setStickyOffsets((prev) => {
        const prevKeys = Object.keys(prev);
        const nextKeys = Object.keys(next);
        const same =
          prevKeys.length === nextKeys.length &&
          nextKeys.every(
            (k) =>
              prev[k]?.left === next[k].left &&
              prev[k]?.right === next[k].right,
          );
        return same ? prev : next;
      });
      updateScrollState();
    };

    compute();
    const tableEl = tableRef.current;
    let ro: ResizeObserver | null = null;
    if (tableEl && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(compute);
      ro.observe(tableEl);
    }
    window.addEventListener("resize", compute);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, [cellDefs, dataSource, updateScrollState]);

  // 全选框 disabled 状态
  const allDisabled = useMemo(() => {
    if (!rowSelection?.getCheckboxProps) return false;
    return dataSource.every(
      (row, i) => rowSelection!.getCheckboxProps!(row, i).disabled,
    );
  }, [rowSelection, dataSource]);

  const wrapperMaxHeight =
    maxHeight === undefined
      ? undefined
      : typeof maxHeight === "number"
        ? `${maxHeight}px`
        : maxHeight;

  const renderHeaderCell = (def: CellDef) => {
    const offset = stickyOffsets[def.key];
    const isEdgeLeft = edgeCells.left === def.key;
    const isEdgeRight = edgeCells.right === def.key;
    const cellClass = classNames({
      "zdy-table-cell--fixed-left": def.fixed === "left",
      "zdy-table-cell--fixed-right": def.fixed === "right",
      "zdy-table-cell--edge-left": isEdgeLeft,
      "zdy-table-cell--edge-right": isEdgeRight,
      "zdy-table-col-drag": def.kind === "drag",
      "zdy-table-col-select": def.kind === "select",
      "zdy-table-col-actions": def.kind === "actions",
    });
    const stickyStyle: React.CSSProperties = {
      width: def.width,
      textAlign: def.kind === "actions" ? "right" : (def.align ?? "left"),
      left: offset?.left,
      right: offset?.right,
    };

    let content: React.ReactNode = null;
    if (def.kind === "select") {
      content =
        showHeaderSelectAll && rowSelection?.type !== "radio" ? (
          <Checkbox
            checked={isAllSelected}
            indeterminate={isIndeterminate}
            disabled={allDisabled}
            onChange={handleHeaderCheck}
          />
        ) : null;
    } else if (def.kind === "data") {
      content = def.column!.title;
    }

    return (
      <th
        key={def.key}
        data-cell-key={def.key}
        data-fixed={def.fixed}
        className={cellClass}
        style={stickyStyle}
      >
        {content}
      </th>
    );
  };

  const renderBodyCell = (
    def: CellDef,
    row: any,
    rowIndex: number,
    rowKeyVal: string | number,
    isSelected: boolean,
    checkProps: { disabled?: boolean } | undefined,
  ) => {
    const offset = stickyOffsets[def.key];
    const isEdgeLeft = edgeCells.left === def.key;
    const isEdgeRight = edgeCells.right === def.key;
    const cellClass = classNames({
      "zdy-table-cell--fixed-left": def.fixed === "left",
      "zdy-table-cell--fixed-right": def.fixed === "right",
      "zdy-table-cell--edge-left": isEdgeLeft,
      "zdy-table-cell--edge-right": isEdgeRight,
      "zdy-table-cell-drag": def.kind === "drag",
      "zdy-table-cell-select": def.kind === "select",
      "zdy-table-cell-actions": def.kind === "actions",
    });
    const stickyStyle: React.CSSProperties = {
      textAlign: def.kind === "actions" ? "right" : (def.align ?? "left"),
      left: offset?.left,
      right: offset?.right,
    };

    let content: React.ReactNode = null;
    if (def.kind === "drag") {
      content = (
        <span
          className="zdy-table-drag-handle"
          title="拖拽排序"
          draggable
          onDragStart={(e) => handleDragStart(rowIndex, e)}
          onDragEnd={handleDragEnd}
        >
          <Icon type="drag" size={14} />
        </span>
      );
    } else if (def.kind === "select") {
      content = (
        <Checkbox
          checked={isSelected}
          disabled={checkProps?.disabled}
          onChange={(checked) => handleRowCheck(row, rowIndex, checked)}
        />
      );
    } else if (def.kind === "data") {
      const col = def.column!;
      content = col.render
        ? col.render(
            col.dataIndex ? row[col.dataIndex] : undefined,
            row,
            rowIndex,
          )
        : col.dataIndex
          ? row[col.dataIndex]
          : null;
    } else if (def.kind === "actions") {
      content = (
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
              {rowActions!.map((action) => (
                <React.Fragment key={action.key}>
                  {action.divider && (
                    <div className="zdy-table-row-actions-divider" />
                  )}
                  <button
                    type="button"
                    disabled={action.disabled}
                    className={classNames("zdy-table-row-action-item", {
                      "zdy-table-row-action-item--danger": action.danger,
                      "zdy-table-row-action-item--disabled": action.disabled,
                    })}
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
      );
    }

    return (
      <td
        key={def.key}
        data-cell-key={def.key}
        data-fixed={def.fixed}
        className={cellClass}
        style={stickyStyle}
      >
        {content}
      </td>
    );
  };

  // 分页栏左侧总数文案
  const pageRange: [number, number] =
    pageTotal === 0
      ? [0, 0]
      : [
          (safePageCurrent - 1) * pageSize + 1,
          Math.min(safePageCurrent * pageSize, pageTotal),
        ];
  const totalNode = paginationEnabled
    ? pageConfig.showTotal === null
      ? null
      : (pageConfig.showTotal?.(pageTotal, pageRange) ?? (
          <span className="zdy-table-pagination-total">共 {pageTotal} 条</span>
        ))
    : null;

  return (
    <div
      className={classNames(
        "zdy-table-container",
        {
          "zdy-table-container--bordered": bordered,
        },
        className,
      )}
      style={style}
    >
      <div
        ref={wrapperRef}
        className={classNames("zdy-table-wrapper", {
          "zdy-table-wrapper--draggable": draggable,
          "zdy-table-wrapper--shadow-left": scrollState.canScrollLeft,
          "zdy-table-wrapper--shadow-right": scrollState.canScrollRight,
        })}
        style={{ maxHeight: wrapperMaxHeight }}
        onScroll={updateScrollState}
      >
        <table ref={tableRef} className="zdy-table">
          <thead>
            <tr ref={headerRowRef}>
              {cellDefs.map((def) => renderHeaderCell(def))}
            </tr>
          </thead>
          <tbody>
            {displayData.map((row, localIndex) => {
              // 对外（render / rowActions / getCheckboxProps / 拖拽回调）
              // 一律使用全量 dataSource 下标
              const rowIndex =
                paginationEnabled && !isRemotePagination
                  ? (safePageCurrent - 1) * pageSize + localIndex
                  : localIndex;
              const rowKeyVal = getRowKey(row, rowIndex);
              const isSelected = selectedKeys.includes(rowKeyVal);
              const checkProps = rowSelection?.getCheckboxProps?.(row, rowIndex);

              return (
                <tr
                  key={rowKeyVal}
                  data-row-index={localIndex}
                  className={classNames("zdy-table-row", {
                    "zdy-table-row--selected": isSelected,
                    "zdy-table-row--dragging": draggingIndex === localIndex,
                    "zdy-table-row--drop-before": dropIndicator === localIndex,
                    "zdy-table-row--drop-after":
                      dropIndicator === localIndex + 1,
                  })}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {cellDefs.map((def) =>
                    renderBodyCell(
                      def,
                      row,
                      rowIndex,
                      rowKeyVal,
                      isSelected,
                      checkProps,
                    ),
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {paginationEnabled && (
        <div className="zdy-table-pagination-bar">
          {totalNode}
          <Pagination
            current={safePageCurrent}
            pageSize={pageSize}
            total={pageTotal}
            showSizeChanger={pageConfig.showSizeChanger ?? true}
            showQuickJumper={pageConfig.showQuickJumper ?? false}
            pageSizeOptions={pageConfig.pageSizeOptions}
            size={pageConfig.size}
            onChange={handlePageChange}
            onShowSizeChange={handlePageSizeChange}
          />
        </div>
      )}
    </div>
  );
};

export default Table;
