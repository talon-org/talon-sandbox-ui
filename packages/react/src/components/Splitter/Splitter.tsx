import { forwardRef, useState, useRef, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './Splitter.css';

/**
 * Splitter — 可拖动分割面板，左右（或上下）两个面板。
 * 新 API：defaultRatio (0-1)、orientation ("horizontal"|"vertical")。
 * 向后兼容：defaultLeft (0-100 %)、vertical bool 仍支持。
 */

/* ── variants ── */
export const splitterVariants = cva('tln-splitter', {
  variants: {
    orientation: {
      horizontal: '',
      vertical: 'vertical',
    },
  },
  defaultVariants: { orientation: 'horizontal' },
});

/* ── Splitter ── */
export interface SplitterProps {
  /**
   * 初始第一个面板占比（0-1，默认 0.5）。
   * 拖动后只更新内部状态（非受控）。
   */
  defaultRatio?: number;
  /**
   * 向后兼容：初始第一个面板百分比（0-100，默认 50）。
   * 若同时传 defaultRatio，以 defaultRatio 为准。
   */
  defaultLeft?: number;
  /** 分割方向，默认 horizontal */
  orientation?: 'horizontal' | 'vertical';
  /** 向后兼容：等价于 orientation="vertical" */
  vertical?: boolean;
  /**
   * 恰好两个子节点：[first, second]
   * horizontal 时对应 [left, right]，vertical 时对应 [top, bottom]
   */
  children: [React.ReactNode, React.ReactNode];
  className?: string;
  style?: React.CSSProperties;
}

export const Splitter = forwardRef<HTMLDivElement, SplitterProps>(
  ({ defaultRatio, defaultLeft = 50, orientation, vertical, children, className, style }, ref) => {
    // 解析 orientation
    const isVertical = vertical === true || orientation === 'vertical';
    // 解析初始比例（统一转为 0-100 %）
    const initialRatio =
      defaultRatio !== undefined
        ? Math.max(10, Math.min(90, defaultRatio * 100))
        : Math.max(10, Math.min(90, defaultLeft));

    const [ratio, setRatio] = useState(initialRatio);
    const containerRef = useRef<HTMLDivElement>(null);
    const dragging = useRef(false);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
      const onMove = (e: MouseEvent) => {
        if (!dragging.current || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const pct = isVertical
          ? ((e.clientY - rect.top) / rect.height) * 100
          : ((e.clientX - rect.left) / rect.width) * 100;
        // 限制最小/最大比例
        setRatio(Math.max(10, Math.min(90, pct)));
      };
      const onUp = () => {
        if (dragging.current) {
          dragging.current = false;
          setIsDragging(false);
        }
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
      return () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      };
    }, [isVertical]);

    const [first, second] = children;

    // 合并 ref
    const setRef = (node: HTMLDivElement | null) => {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };

    return (
      <div
        ref={setRef}
        className={cn(splitterVariants({ orientation: isVertical ? 'vertical' : 'horizontal' }), className)}
        style={style}
      >
        {/* 第一个面板：固定尺寸，ratio% */}
        <div
          className="tln-splitter-pane"
          style={{ flex: `0 0 ${ratio}%` }}
        >
          {first}
        </div>

        {/* 拖动分隔条 */}
        <div
          className={cn('tln-splitter-handle', isDragging && 'dragging')}
          role="separator"
          aria-orientation={isVertical ? 'horizontal' : 'vertical'}
          aria-valuenow={ratio}
          aria-valuemin={10}
          aria-valuemax={90}
          tabIndex={0}
          onMouseDown={(e) => {
            e.preventDefault();
            dragging.current = true;
            setIsDragging(true);
          }}
          onKeyDown={(e) => {
            // 键盘微调（每步 1%）
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
              e.preventDefault();
              setRatio((r) => Math.max(10, r - 1));
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
              e.preventDefault();
              setRatio((r) => Math.min(90, r + 1));
            }
          }}
        />

        {/* 第二个面板：flex: 1 撑满剩余空间 */}
        <div className="tln-splitter-pane">{second}</div>
      </div>
    );
  },
);

Splitter.displayName = 'Splitter';
