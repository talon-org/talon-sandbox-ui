import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import type { FlexProps, FlexGap } from './Flex.types.js';
import './Flex.css';

/* ── variants ── */
export const flexVariants = cva('tln-flex', {
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
function resolveGap(g: FlexGap | undefined): string | undefined {
  if (g == null) return undefined;
  if (typeof g === 'number') return `${g}px`;
  return GAP_MAP[g] ?? g;
}

/** justify-content 值映射 */
const JUSTIFY_MAP: Record<string, string> = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

/** align-items 值映射 */
const ALIGN_MAP: Record<string, string> = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  stretch: 'stretch',
  baseline: 'baseline',
};

/**
 * Flex 布局原语 — 纯 inline style，不依赖 CSS 文件。
 * forwardRef → HTMLDivElement
 */
export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  function Flex(
    {
      direction = 'row',
      gap = 'sm',
      align = 'stretch',
      justify = 'start',
      wrap = false,
      inline = false,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cn(flexVariants(), className)}
        style={{
          display: inline ? 'inline-flex' : 'flex',
          flexDirection: direction === 'col' ? 'column' : 'row',
          gap: resolveGap(gap),
          alignItems: ALIGN_MAP[align] ?? align,
          justifyContent: JUSTIFY_MAP[justify] ?? justify,
          flexWrap: wrap ? 'wrap' : 'nowrap',
          ...style,
        }}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

Flex.displayName = 'Flex';
