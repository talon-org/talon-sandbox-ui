import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import { useFormField } from '../../primitives/FormFieldContext.js';
import './Textarea.css';
import type { TextareaProps } from './Textarea.types.js';

// ─── cva variant 定义 ───────────────────────────────────────────
export const textareaVariants = cva('tln-textarea', {
  variants: {
    size: {
      sm: 'tln-textarea-sm',
      md: '',
      lg: 'tln-textarea-lg',
    },
  },
  defaultVariants: { size: 'md' },
});

/**
 * Textarea — 多行文本框。
 *
 * - 默认 mono 字体（命令、yaml、env）
 * - size sm/md/lg 控制字号和 padding
 * - error → .error class（红色边框）
 * - 在 FormField 内部时，自动继承 controlId 和 hasError
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    size = 'md',
    error,
    rows = 4,
    id,
    className,
    ...rest
  },
  ref,
) {
  // 从 FormField context 读取字段 id 和错误状态
  const field = useFormField();
  const resolvedId = id ?? field?.controlId;
  const resolvedError = error || (field?.hasError ?? false);

  return (
    <textarea
      ref={ref}
      id={resolvedId}
      className={cn(
        textareaVariants({ size }),
        resolvedError && 'error',
        className,
      )}
      rows={rows}
      aria-invalid={resolvedError || undefined}
      {...rest}
    />
  );
});

Textarea.displayName = 'Textarea';
