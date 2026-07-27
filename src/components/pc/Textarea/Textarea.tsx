import { forwardRef, useRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import type { BaseTextareaProps } from '../../../types';

import './Textarea.less';

const Textarea = forwardRef<HTMLTextAreaElement, BaseTextareaProps>(({
  value,
  onChange,
  placeholder,
  disabled = false,
  size = 'medium',
  rows = 4,
  cols = 50,
  maxLength,
  showCount = false,
  autoSize = false,
  className = '',
  style
}, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [currentValue, setCurrentValue] = useState(value || '');

  useEffect(() => {
    setCurrentValue(value || '');
  }, [value]);

  useEffect(() => {
    if (autoSize && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [currentValue, autoSize]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentValue(e.target.value);
    onChange?.(e);
  };

  const charCount = currentValue.length;

  return (
    <div className={classNames(
      'zdy-textarea-wrapper',
      `zdy-textarea-wrapper--${size}`,
      {'zdy-textarea-wrapper--disabled': disabled},
      {'zdy-textarea-wrapper--show-count': showCount},
      className
    )} style={style}>
      <textarea
        ref={textareaRef || ref}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        rows={autoSize ? 1 : rows}
        cols={cols}
        maxLength={maxLength}
        className="zdy-textarea"
      />
      {showCount && maxLength && (
        <span className={classNames('zdy-textarea-count', { 'zdy-textarea-count--overflow': charCount >= maxLength })}>
          {charCount} / {maxLength}
        </span>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;