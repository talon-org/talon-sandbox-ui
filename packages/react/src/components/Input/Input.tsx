import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import { Icon } from '../../primitives/icons.js';
import { useFormField } from '../../primitives/FormFieldContext.js';
import './Input.css';
import type { InputProps } from './Input.types.js';
import type { IconName } from '../../primitives/icons.js';

// ─── cva variant 定义 ───────────────────────────────────────────
export const inputVariants = cva('tln-input', {
  variants: {
    size: {
      sm: 'tln-input-sm',
      md: '',
      lg: 'tln-input-lg',
    },
  },
  defaultVariants: { size: 'md' },
});

/**
 * Input — 单行文本框。
 *
 * - size sm/md/lg 控制高度（tln-input / tln-input-sm / tln-input-lg）
 * - mono → .mono class（等宽字体，用于 ID/key/token/path）
 * - error → .error class（红色边框）
 * - leadIcon → 渲染 .tln-input-w-icon 包裹层 + .ic-lead 前置图标
 * - trailingIcon → 渲染 .tln-input-w-icon 包裹层 + .ic-trail 后置图标
 * - 在 FormField 内部时，自动继承 controlId 和 hasError
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    size = 'md',
    mono,
    error,
    leadIcon,
    trailingIcon,
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

  // 图标尺寸：sm=13 / md=14 / lg=15
  const iconSize = size === 'sm' ? 13 : size === 'lg' ? 15 : 14;
  const hasIcon = Boolean(leadIcon || trailingIcon);

  const inputEl = (
    <input
      ref={ref}
      id={resolvedId}
      className={cn(
        inputVariants({ size }),
        resolvedError && 'error',
        mono && 'mono',
        // 有包裹层时 className 加到外层 wrapper
        !hasIcon && className,
      )}
      aria-invalid={resolvedError || undefined}
      {...rest}
    />
  );

  // 有图标时渲染 .tln-input-w-icon 包裹层
  if (hasIcon) {
    return (
      <div
        className={cn(
          'tln-input-w-icon',
          size === 'sm' && 'sm',
          size === 'lg' && 'lg',
          className,
        )}
      >
        {leadIcon && (
          <span className="ic-lead">
            {typeof leadIcon === 'string'
              ? <Icon name={leadIcon as IconName} size={iconSize} />
              : leadIcon}
          </span>
        )}
        {inputEl}
        {trailingIcon && (
          <span className="ic-trail">
            {typeof trailingIcon === 'string'
              ? <Icon name={trailingIcon as IconName} size={iconSize} />
              : trailingIcon}
          </span>
        )}
      </div>
    );
  }

  return inputEl;
});

Input.displayName = 'Input';
