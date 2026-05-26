import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './Tag.css';

// ─── cva 定义 ─────────────────────────────────────────────────────────────

/** Tag variant + size */
export const tagVariants = cva('tln-tag', {
  variants: {
    variant: {
      default: '',
      accent: 'tln-tag-acc',
      mono: 'tln-tag-mono',
    },
    size: {
      sm: 'tln-tag-sm',
      md: '',
      lg: 'tln-tag-lg',
    },
  },
  defaultVariants: { variant: 'default', size: 'md' },
});

// ─── Tag ──────────────────────────────────────────────────────────────────

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  /**
   * 移除回调，有值时自动显示 × 按钮。
   * v0.3.0: `removable` bool 改为由 `onRemove` 有值时自动推断
   */
  onRemove?: () => void;
}

/**
 * Tag — 语义中性 chip，用于元数据标签、过滤标签。
 * 与 Badge 语义不同：Tag 无状态色点，用于内容标签。
 *
 * @example
 * <Tag size="sm" variant="accent" onRemove={remove}>gpu</Tag>
 */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ variant, size, onRemove, className, children, ...rest }, ref) => (
    <span
      ref={ref}
      className={cn(tagVariants({ variant, size }), className)}
      {...rest}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          className="tln-tag-rm"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label="移除标签"
        >
          <svg width="8" height="8" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8"/>
          </svg>
        </button>
      )}
    </span>
  ),
);
Tag.displayName = 'Tag';
