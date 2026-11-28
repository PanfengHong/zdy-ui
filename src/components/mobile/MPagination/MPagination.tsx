import { useEffect, useMemo, useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import Icon from '../../pc/Icon/Icon';
import type { MPaginationProps } from './types';

import './MPagination.less';

// 触发翻页的最小水平位移（px）
const SWIPE_THRESHOLD = 48;
// 与 CSS 退出动画时长保持一致
const ANIMATION_DURATION = 220;

type PanelType = 'page' | 'size';

interface DragState {
  startX: number;
  startY: number;
  axis: '' | 'x' | 'y';
  pointerId: number;
}

const MPagination = ({
  current,
  defaultCurrent = 1,
  pageSize,
  defaultPageSize = 10,
  total = 0,
  mode = 'compact',
  swipeable = true,
  showSizeChanger = false,
  pageSizeOptions = [10, 20, 50, 100],
  showTotal,
  disabled = false,
  inline = false,
  closeOnMaskClick = true,
  onChange,
  onShowSizeChange,
  className = '',
  style
}: MPaginationProps) => {
  const isCurrentControlled = current !== undefined;
  const isPageSizeControlled = pageSize !== undefined;

  const [innerCurrent, setInnerCurrent] = useState(defaultCurrent);
  const [innerPageSize, setInnerPageSize] = useState(defaultPageSize);

  const currentPageSize = pageSize ?? innerPageSize;
  const totalPages = Math.max(1, Math.ceil(total / currentPageSize));
  const activePage = Math.min(Math.max(1, current ?? innerCurrent), totalPages);

  const [openPanel, setOpenPanel] = useState<PanelType | null>(null);
  const [mountedPanel, setMountedPanel] = useState<PanelType | null>(null);
  const [closing, setClosing] = useState(false);
  const [jumperDraft, setJumperDraft] = useState('');

  const stripRef = useRef<HTMLDivElement>(null);
  const activePageRef = useRef<HTMLButtonElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const suppressClickUntilRef = useRef(0);
  const closeTimerRef = useRef<number | null>(null);

  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, index) => index + 1),
    [totalPages]
  );

  const quickPages = useMemo(() => {
    const pages = new Set([1, activePage - 1, activePage, activePage + 1, totalPages]);
    return Array.from(pages)
      .filter(page => page >= 1 && page <= totalPages)
      .sort((a, b) => a - b);
  }, [activePage, totalPages]);

  const rangeStart = total === 0 ? 0 : (activePage - 1) * currentPageSize + 1;
  const rangeEnd = Math.min(activePage * currentPageSize, total);

  // 非受控模式下，数据总量或每页条数变化后修正越界的当前页（渲染期调整，避免额外提交）
  const [prevTotalPages, setPrevTotalPages] = useState(totalPages);
  if (prevTotalPages !== totalPages) {
    setPrevTotalPages(totalPages);
    if (!isCurrentControlled && innerCurrent > totalPages) {
      setInnerCurrent(totalPages);
    }
  }

  // 弹层与 MSelect 一致：从底部滑入，关闭时保留退出动画再卸载
  const openSheet = (type: PanelType) => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setMountedPanel(type);
    setClosing(false);
    setOpenPanel(type);
  };

  const closeSheet = () => {
    if (!mountedPanel) return;
    setClosing(true);
    setOpenPanel(null);
    if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setMountedPanel(null);
      setClosing(false);
      closeTimerRef.current = null;
    }, ANIMATION_DURATION);
  };

  // 支持 ESC 关闭
  useEffect(() => {
    if (!mountedPanel) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeSheet();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  // 非内联模式下锁定页面滚动
  useEffect(() => {
    if (!mountedPanel || inline) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mountedPanel, inline]);

  useEffect(() => () => {
    if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
  }, []);

  // 数字模式下把当前页滚动到可视区域中间
  useEffect(() => {
    if (mode !== 'number') return;
    const strip = stripRef.current;
    const chip = activePageRef.current;
    if (!strip || !chip) return;

    const left = chip.offsetLeft - (strip.clientWidth - chip.clientWidth) / 2;
    try {
      strip.scrollTo({ left, behavior: 'smooth' });
    } catch {
      strip.scrollLeft = left;
    }
  }, [activePage, mode, totalPages]);

  const changePage = (page: number) => {
    closeSheet();
    if (disabled || !Number.isFinite(page)) return;

    const nextPage = Math.min(Math.max(1, Math.trunc(page)), totalPages);
    if (nextPage === activePage) return;

    if (!isCurrentControlled) setInnerCurrent(nextPage);
    onChange?.(nextPage, currentPageSize);
  };

  const goPrev = () => {
    if (!disabled && activePage > 1) changePage(activePage - 1);
  };

  const goNext = () => {
    if (!disabled && activePage < totalPages) changePage(activePage + 1);
  };

  const changePageSize = (size: number) => {
    closeSheet();
    if (disabled || size === currentPageSize) return;

    const nextTotalPages = Math.max(1, Math.ceil(total / size));
    const nextPage = Math.min(activePage, nextTotalPages);

    if (!isPageSizeControlled) setInnerPageSize(size);
    if (!isCurrentControlled) setInnerCurrent(nextPage);

    onShowSizeChange?.(nextPage, size);
    onChange?.(nextPage, size);
  };

  const openPagePanel = () => {
    if (disabled) return;
    setJumperDraft(String(activePage));
    openSheet('page');
  };

  const confirmJumper = () => {
    changePage(Number.parseInt(jumperDraft, 10));
  };

  // ====== 手势翻页：先判定方向，只接管水平滑动，垂直滑动交还页面滚动 ======
  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    // 新一轮触摸开始，清除上一次滑动遗留的点击拦截
    suppressClickUntilRef.current = 0;
    if (!swipeable || disabled || mountedPanel) return;
    dragRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      axis: '',
      pointerId: event.pointerId
    };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId || drag.axis) return;

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
    drag.axis = Math.abs(dx) > Math.abs(dy) * 1.2 ? 'x' : 'y';
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    dragRef.current = null;
    if (!drag || drag.pointerId !== event.pointerId || drag.axis !== 'x') return;

    const dx = event.clientX - drag.startX;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;

    // 滑动结束后浏览器仍可能补发一次 click，这里拦截避免误触按钮
    suppressClickUntilRef.current = Date.now() + 400;

    if (dx < 0) goNext();
    else goPrev();
  };

  const handlePointerCancel = () => {
    dragRef.current = null;
  };

  const handleClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (Date.now() >= suppressClickUntilRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickUntilRef.current = 0;
  };

  const rootClass = classNames(
    'zdy-mobile-pagination',
    `zdy-mobile-pagination--${mode}`,
    {
      'zdy-mobile-pagination--disabled': disabled,
      'zdy-mobile-pagination--swipeable': swipeable && !disabled
    },
    className
  );

  const sheet = mountedPanel && (
    <div
      className={classNames('zdy-mobile-pagination-root', {
        'zdy-mobile-pagination-root--inline': inline,
        'zdy-mobile-pagination-root--closing': closing
      })}
    >
      <div
        className="zdy-mobile-pagination-mask"
        onClick={closeOnMaskClick ? closeSheet : undefined}
      />
      <div
        className="zdy-mobile-pagination-sheet"
        role="dialog"
        aria-modal="true"
        aria-label={mountedPanel === 'page' ? '跳转页码' : '每页条数'}
      >
        <div className="zdy-mobile-pagination-sheet-header">
          <span className="zdy-mobile-pagination-sheet-title">
            {mountedPanel === 'page' ? '跳转至' : '每页显示'}
          </span>
          <button
            type="button"
            className="zdy-mobile-pagination-sheet-close"
            aria-label="关闭"
            onClick={closeSheet}
          >
            <Icon type="close" size={16} />
          </button>
        </div>

        {mountedPanel === 'page' ? (
          <div className="zdy-mobile-pagination-sheet-body">
            <input
              className="zdy-mobile-pagination-jumper"
              type="number"
              inputMode="numeric"
              min={1}
              max={totalPages}
              value={jumperDraft}
              aria-label="目标页码"
              onChange={event => setJumperDraft(event.target.value)}
              onKeyDown={event => {
                if (event.key === 'Enter') confirmJumper();
              }}
            />
            <div className="zdy-mobile-pagination-quick-pages">
              {quickPages.map(page => (
                <button
                  key={page}
                  type="button"
                  className={classNames('zdy-mobile-pagination-quick-page', {
                    'zdy-mobile-pagination-quick-page--active': page === activePage
                  })}
                  onClick={() => changePage(page)}
                >
                  {page}
                </button>
              ))}
            </div>
            <button type="button" className="zdy-mobile-pagination-confirm" onClick={confirmJumper}>
              确定
            </button>
          </div>
        ) : (
          <div className="zdy-mobile-pagination-sheet-options">
            {pageSizeOptions.map(option => (
              <button
                key={option}
                type="button"
                className={classNames('zdy-mobile-pagination-sheet-option', {
                  'zdy-mobile-pagination-sheet-option--active': option === currentPageSize
                })}
                onClick={() => changePageSize(option)}
              >
                <span>{option} 条/页</span>
                {option === currentPageSize && <Icon type="check" size={16} />}
              </button>
            ))}
          </div>
        )}

        <div className="zdy-mobile-pagination-sheet-cancel-wrap">
          <button type="button" className="zdy-mobile-pagination-sheet-cancel" onClick={closeSheet}>
            取消
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div
        className={rootClass}
        style={style}
        role="navigation"
        aria-label="分页"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onClickCapture={handleClickCapture}
      >
        {showTotal && (
          <div className="zdy-mobile-pagination-total">
            {showTotal(total, [rangeStart, rangeEnd])}
          </div>
        )}

        <div className="zdy-mobile-pagination-bar">
          <button
            type="button"
            className="zdy-mobile-pagination-nav"
            aria-label="上一页"
            disabled={disabled || activePage <= 1}
            onClick={goPrev}
          >
            <Icon type="left" size={20} />
          </button>

          {mode === 'compact' ? (
            <button
              type="button"
              className={classNames('zdy-mobile-pagination-current', {
                'zdy-mobile-pagination-current--open': openPanel === 'page'
              })}
              disabled={disabled}
              aria-haspopup="dialog"
              aria-expanded={openPanel === 'page'}
              aria-label={`第 ${activePage} 页，共 ${totalPages} 页，点击跳转`}
              onClick={openPagePanel}
            >
              <span className="zdy-mobile-pagination-current-value">{activePage}</span>
              <span className="zdy-mobile-pagination-current-sep">/</span>
              <span>{totalPages}</span>
              <Icon type="caret-down" size={14} />
            </button>
          ) : (
            <div className="zdy-mobile-pagination-pages" ref={stripRef} aria-label="页码列表">
              {pageNumbers.map(page => (
                <button
                  key={page}
                  ref={page === activePage ? activePageRef : undefined}
                  type="button"
                  className={classNames('zdy-mobile-pagination-page', {
                    'zdy-mobile-pagination-page--active': page === activePage
                  })}
                  aria-current={page === activePage ? 'page' : undefined}
                  aria-label={`第 ${page} 页`}
                  disabled={disabled}
                  onClick={() => changePage(page)}
                >
                  {page}
                </button>
              ))}
            </div>
          )}

          {showSizeChanger && (
            <button
              type="button"
              className={classNames('zdy-mobile-pagination-size', {
                'zdy-mobile-pagination-size--open': openPanel === 'size'
              })}
              disabled={disabled}
              aria-haspopup="dialog"
              aria-expanded={openPanel === 'size'}
              onClick={() => (openPanel === 'size' ? closeSheet() : openSheet('size'))}
            >
              <span>{currentPageSize} 条/页</span>
              <Icon type="caret-down" size={12} />
            </button>
          )}

          <button
            type="button"
            className="zdy-mobile-pagination-nav"
            aria-label="下一页"
            disabled={disabled || activePage >= totalPages}
            onClick={goNext}
          >
            <Icon type="right" size={20} />
          </button>
        </div>
      </div>

      {inline ? sheet : createPortal(sheet, document.body)}
    </>
  );
};

export default MPagination;
