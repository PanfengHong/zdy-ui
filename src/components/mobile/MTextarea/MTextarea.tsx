import { forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import classNames from 'classnames';
import type { MTextareaProps } from './types';

import './MTextarea.less';

const MTextarea = forwardRef<HTMLTextAreaElement, MTextareaProps>(
  (
    {
      value,
      defaultValue = '',
      onChange,
      placeholder,
      disabled = false,
      size = 'medium',
      rows = 4,
      cols,
      maxLength,
      showCount = false,
      autoSize = false,
      minRows,
      maxRows = 6,
      className = '',
      style
    },
    ref
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [innerValue, setInnerValue] = useState(defaultValue);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : innerValue;
    const charCount = currentValue.length;
    const countOverflow = maxLength !== undefined && charCount >= maxLength;

    useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement, []);

    // 自适应高度：按内容滚动高度计算，并限制在 minRows ~ maxRows 之间
    useLayoutEffect(() => {
      const el = textareaRef.current;
      if (!el) return;

      if (!autoSize) {
        el.style.height = '';
        el.style.overflowY = '';
        return;
      }

      const computed = window.getComputedStyle(el);
      const lineHeight = parseFloat(computed.lineHeight) || 24;
      const verticalExtra =
        (parseFloat(computed.paddingTop) || 0) +
        (parseFloat(computed.paddingBottom) || 0) +
        (parseFloat(computed.borderTopWidth) || 0) +
        (parseFloat(computed.borderBottomWidth) || 0);

      const minHeight = Math.max(minRows ?? rows, 1) * lineHeight + verticalExtra;
      const maxHeight = Math.max(maxRows, minRows ?? rows, 1) * lineHeight + verticalExtra;

      el.style.height = 'auto';
      const nextHeight = Math.min(Math.max(el.scrollHeight, minHeight), maxHeight);
      el.style.height = `${nextHeight}px`;
      el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';
    }, [autoSize, currentValue, minRows, maxRows, rows, size]);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) setInnerValue(event.target.value);
      onChange?.(event);
    };

    return (
      <div
        className={classNames(
          'zdy-mobile-textarea-wrapper',
          `zdy-mobile-textarea-wrapper--${size}`,
          {
            'zdy-mobile-textarea-wrapper--disabled': disabled,
            'zdy-mobile-textarea-wrapper--show-count': showCount,
            'zdy-mobile-textarea-wrapper--auto-size': autoSize
          },
          className
        )}
        style={style}
      >
        <textarea
          ref={textareaRef}
          className="zdy-mobile-textarea"
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          rows={autoSize ? Math.max(minRows ?? rows, 1) : rows}
          cols={cols}
          maxLength={maxLength}
        />
        {showCount && (
          <span
            className={classNames('zdy-mobile-textarea-count', {
              'zdy-mobile-textarea-count--overflow': countOverflow
            })}
          >
            {maxLength !== undefined ? `${charCount} / ${maxLength}` : charCount}
          </span>
        )}
      </div>
    );
  }
);

MTextarea.displayName = 'MTextarea';

export default MTextarea;
