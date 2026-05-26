import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import type { GridProps, GridGap } from './Grid.types.js';
import './Grid.css';

/* ── variants ── */
export const gridVariants = cva('tln-grid', {
  variants: {},
  defaultVariants: {},
});

/** 设计 token 间距映射表 */
const GAP_MAP: Record<string, string> = {
  xs: 'var(--s-2)',   //  4px
  sm: 'var(--s-4)',   //  8px
  md: 'var(--s-6)',   // 16px
  lg: 'var(--s-8)',   // 24px
};

/** 将 gap prop 解析为 CSS 字符串 */
function resolveGap(g: GridGap | undefined): string | undefined {
  if (g == null) return undefined;
  if (typeof g === 'number') return `${g}px`;
  return GAP_MAP[g] ?? g;
}

/**
 * Grid 布局原语 — 纯 inline style，不依赖 CSS 文件。
 * forwardRef → HTMLDivElement
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  function Grid(
    {
      cols,
      template,
      gap = 'md',
      rowGap,
      colGap,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) {
    // grid-template-columns 优先级：template > cols > 1fr
    const gridTemplateColumns = template
      ? template
      : typeof cols === 'number'
      ? `repeat(${cols}, minmax(0, 1fr))`
      : undefined;

    // gap 处理：rowGap/colGap 单独设置时分拆，否则合并为 shorthand
    const gapStyle: { gap?: string; rowGap?: string; columnGap?: string } = {};
    if (rowGap != null || colGap != null) {
      gapStyle.rowGap = resolveGap(rowGap ?? gap);
      gapStyle.columnGap = resolveGap(colGap ?? gap);
    } else {
      gapStyle.gap = resolveGap(gap);
    }

    return (
      <div
        ref={ref}
        className={cn(gridVariants(), className)}
        style={{
          display: 'grid',
          ...(gridTemplateColumns ? { gridTemplateColumns } : {}),
          ...gapStyle,
          ...style,
        }}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

Grid.displayName = 'Grid';
