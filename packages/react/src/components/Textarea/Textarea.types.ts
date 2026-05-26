import type { TextareaHTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { textareaVariants } from './Textarea.js';

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  /** 尺寸档位，默认 md */
  size?: 'sm' | 'md' | 'lg';
  /** 错误状态：红色边框 */
  error?: boolean;
  /** 可见行数，默认 4 */
  rows?: number;
}
