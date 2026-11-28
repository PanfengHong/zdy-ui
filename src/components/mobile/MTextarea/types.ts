import type { BaseTextareaProps } from '../../../types';

export interface MTextareaProps extends BaseTextareaProps {
  /** 默认值（非受控） */
  defaultValue?: string;
  /** 自动增高时的最小行数，默认等于 rows */
  minRows?: number;
  /** 自动增高时的最大行数，默认 6 */
  maxRows?: number;
}
