import { forwardRef } from 'react';
import { cn } from '../../lib/utils.js';
import './Divider.css';

// ─── Divider ──────────────────────────────────────────────────────────────

export interface DividerProps extends React.HTMLAttributes<HTMLElement> {
  /** 居中文字标签（传入时渲染 .tln-divider-h） */
  label?: React.ReactNode;
  /**
   * 方向，默认 horizontal
   * v0.3.0: `vertical` bool 改为 `orientation="vertical"`
   */
  orientation?: 'horizontal' | 'vertical';
  /** 向后兼容：vertical=true 等同于 orientation="vertical" */
  vertical?: boolean;
}

/**
 * Divider — 分隔线。
 * - `<Divider />` → 水平 hr
 * - `<Divider label="或" />` → 带居中标签
 * - `<Divider orientation="vertical" />` → 竖向
 */
export const Divider = forwardRef<HTMLElement, DividerProps>(
  ({ label, orientation, vertical, className, ...rest }, ref) => {
    // orientation 优先，向后兼容 vertical bool
    const isVertical = orientation === 'vertical' || vertical === true;

    if (isVertical) {
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          role="separator"
          aria-orientation="vertical"
          className={cn('tln-vdivider', className)}
          {...(rest as React.HTMLAttributes<HTMLSpanElement>)}
        />
      );
    }

    if (label != null) {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          role="separator"
          aria-orientation="horizontal"
          className={cn('tln-divider-h', className)}
          {...(rest as React.HTMLAttributes<HTMLDivElement>)}
        >
          <span>{label}</span>
        </div>
      );
    }

    return (
      <hr
        ref={ref as React.Ref<HTMLHRElement>}
        className={cn('tln-divider', className)}
        {...(rest as React.HTMLAttributes<HTMLHRElement>)}
      />
    );
  },
);
Divider.displayName = 'Divider';
