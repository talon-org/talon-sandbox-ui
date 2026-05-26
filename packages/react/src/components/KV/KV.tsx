import { forwardRef, Fragment } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './KV.css';

/**
 * KV — 键值表，详情页主力。
 * 每行两个直接子 span（.k / .v），CSS grid 布局 `130px 1fr`。
 * cls 字段附加到 .v 上，支持任意 class 组合（如 'fg-0', 'acc', 'dim'）。
 * 对应 prototype TlnKV。
 */

/* ── variants ── */
export const kvVariants = cva('tln-kv', {
  variants: {},
  defaultVariants: {},
});

/* ── 行类型 ── */
export interface KVRow {
  /** 键名，渲染在 .k cell */
  k: React.ReactNode;
  /** 值，渲染在 .v cell */
  v: React.ReactNode;
  /**
   * 附加到 .v 上的 CSS class，允许任意空格分隔字符串
   * 常用: 'fg-0'（高亮）| 'dim'（次要）| 'acc'（accent 色）
   */
  cls?: string;
}

/* ── KV ── */
export interface KVProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 行数据数组，每行渲染为 .k + .v 两个 span（直接子元素，CSS grid 布局） */
  rows: KVRow[];
}

export const KV = forwardRef<HTMLDivElement, KVProps>(
  ({ rows, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(kvVariants(), className)} {...props}>
        {rows.map((row, i) => (
          // 直接用 Fragment，不包 div，保持 CSS grid 的直接子元素顺序
          <Fragment key={i}>
            <span className="k">{row.k}</span>
            <span className={cn('v', row.cls)}>{row.v}</span>
          </Fragment>
        ))}
      </div>
    );
  },
);

KV.displayName = 'KV';
