import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './ProgressBar.css';

// ─── cva 定义 ─────────────────────────────────────────────────────────────

/** ProgressBar variant */
export const progressBarVariants = cva('tln-progress', {
  variants: {
    variant: {
      default: '',
      thin: 'tln-progress-thin',
      thick: 'tln-progress-thick',
    },
  },
  defaultVariants: { variant: 'default' },
});

// ─── ProgressBar ──────────────────────────────────────────────────────────

export interface ProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressBarVariants> {
  /**
   * 进度值，范围 0..100（整数或浮点均可，自动 clamp）
   * 默认: 0
   */
  value?: number;
  /** true 时渲染 indeterminate hairline 动画（tln-progress-indet） */
  indeterminate?: boolean;
  /**
   * 覆盖 fill 颜色的内联 CSS 颜色值
   * 只在需要动态着色时使用，通常由 CSS token 控制
   */
  color?: string;
}

/**
 * ProgressBar — 线形进度条。
 * value 范围 0..100（v0.3.0 从 0..1 改为 0..100，与测试/ARIA 对齐）。
 * indeterminate=true 时渲染 hairline 动画。
 * thin / thick bool 合并为 variant="thin"|"thick"。
 */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ value = 0, indeterminate, variant, color, className, style, ...rest }, ref) => {
    // indeterminate 模式：hairline 动画
    if (indeterminate) {
      return (
        <div
          ref={ref}
          className={cn('tln-progress-indet', className)}
          role="progressbar"
          aria-label="加载中"
          style={style}
          {...rest}
        />
      );
    }

    // value 范围 clamp 到 [0, 100]，NaN/Infinity 时降为 0
    const safeValue = Number.isFinite(value) ? value : 0;
    const clamped = Math.max(0, Math.min(100, safeValue));
    const fillStyle = color
      ? { width: `${clamped}%`, background: color }
      : { width: `${clamped}%` };

    return (
      <div
        ref={ref}
        className={cn(progressBarVariants({ variant }), className)}
        role="progressbar"
        aria-valuenow={Math.round(clamped)}
        aria-valuemin={0}
        aria-valuemax={100}
        style={style}
        {...rest}
      >
        <div className="fill" style={fillStyle} />
      </div>
    );
  },
);
ProgressBar.displayName = 'ProgressBar';
