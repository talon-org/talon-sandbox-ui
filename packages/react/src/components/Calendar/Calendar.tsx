import { forwardRef, useMemo, useState, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './Calendar.css';

/**
 * Calendar — 月视图日历选择器，周一起始。
 * - 单选模式：value + onSelect（或非受控 defaultValue）
 * - Range 模式：range=[起,止]，选中日有 .range-start / .range-end / .in-range class
 */

/* ── variants ── */
export const calendarVariants = cva('tln-cal', {
  variants: {},
  defaultVariants: {},
});

/** 月份中文名（与 prototype 一致）*/
const MONTH_NAMES = [
  '一月', '二月', '三月', '四月', '五月', '六月',
  '七月', '八月', '九月', '十月', '十一月', '十二月',
];

/** 星期标题，周一起始（与 prototype 一致）*/
const DOW = ['一', '二', '三', '四', '五', '六', '日'];

/** 判断两个日期是否为同一天 */
function sameDay(a: Date | undefined | null, b: Date | undefined | null): boolean {
  return !!(a && b
    && a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate());
}

/** 判断日期 d 是否在 [a, b] 的严格内部（两端不含）*/
function between(d: Date, a: Date | undefined | null, b: Date | undefined | null): boolean {
  if (!a || !b) return false;
  const t = d.getTime();
  const lo = Math.min(a.getTime(), b.getTime());
  const hi = Math.max(a.getTime(), b.getTime());
  return t > lo && t < hi;
}

export interface CalendarProps {
  /** 受控选中日期（单选模式）*/
  value?: Date;
  /** 非受控默认选中日期 */
  defaultValue?: Date;
  /** 日期选择回调 */
  onSelect?: (date: Date) => void;
  /**
   * Range 模式：[起始日期, 结束日期]
   * 传入此 prop 后忽略 value/defaultValue
   */
  range?: [Date, Date];
  /** 可选最小日期（含）*/
  min?: Date;
  /** 可选最大日期（含）*/
  max?: Date;
  /** 附加 className */
  className?: string;
}

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  function Calendar(
    { value, defaultValue, onSelect, range, min, max, className },
    ref,
  ) {
    // 非受控内部 state
    const [internalValue, setInternalValue] = useState<Date | undefined>(defaultValue);

    // 受控优先
    const controlled = value !== undefined;
    const selected = controlled ? value : internalValue;

    // 视图锚点：优先用 range[0]，否则用 value/defaultValue，最后用今天
    const initialView = range?.[0] ?? selected ?? new Date();
    const [view, setView] = useState<Date>(
      new Date(initialView.getFullYear(), initialView.getMonth(), 1),
    );

    // 外部受控 value 跨月切换时，同步更新 view（避免日历停在旧月份）
    useEffect(() => {
      if (!value) return;
      const isSameMonth =
        value.getFullYear() === view.getFullYear() &&
        value.getMonth() === view.getMonth();
      if (!isSameMonth) {
        setView(new Date(value.getFullYear(), value.getMonth(), 1));
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    // 生成当前视图月的所有格子（固定 42 格，周一对齐）
    const days = useMemo(() => {
      const y = view.getFullYear();
      const m = view.getMonth();
      const first = new Date(y, m, 1);
      // getDay() 0=周日，需转为周一=0：(0+6)%7=6 → 即周日排到最后
      const dow = (first.getDay() + 6) % 7;
      const start = new Date(first);
      start.setDate(1 - dow);
      const cells: Date[] = [];
      for (let i = 0; i < 42; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        cells.push(d);
      }
      return cells;
    }, [view]);

    const today = new Date();
    const [rA, rB] = range ?? [];

    const handleSelect = (d: Date) => {
      // 检查 min/max 限制
      if (min && d < min) return;
      if (max && d > max) return;
      if (!controlled) setInternalValue(d);
      onSelect?.(d);
    };

    const prevMonth = () =>
      setView((v) => new Date(v.getFullYear(), v.getMonth() - 1, 1));
    const nextMonth = () =>
      setView((v) => new Date(v.getFullYear(), v.getMonth() + 1, 1));

    return (
      <div ref={ref} className={cn(calendarVariants(), className)}>
        {/* 月份标题 + 前后翻页 */}
        <div className="tln-cal-head">
          <button
            type="button"
            onClick={prevMonth}
            aria-label="上一月"
          >
            ‹
          </button>
          <span className="title">
            {view.getFullYear()} · {MONTH_NAMES[view.getMonth()]}
          </span>
          <button
            type="button"
            onClick={nextMonth}
            aria-label="下一月"
          >
            ›
          </button>
        </div>

        {/* 7 列网格 */}
        <div className="tln-cal-grid" role="grid" aria-label="日历">
          {/* 星期标题行 */}
          {DOW.map((d) => (
            <div key={d} className="tln-cal-dow" role="columnheader">
              {d}
            </div>
          ))}

          {/* 日期格子 */}
          {days.map((d, i) => {
            const inMonth = d.getMonth() === view.getMonth();
            const isToday = sameDay(d, today);
            const isSel = !range && sameDay(d, selected);
            const isStart = !!range && sameDay(d, rA);
            const isEnd = !!range && sameDay(d, rB);
            const inRange = !!range && between(d, rA, rB);
            const isDisabled = (min != null && d < min) || (max != null && d > max);

            return (
              <span
                key={i}
                role="gridcell"
                className={cn(
                  'tln-cal-day',
                  !inMonth && 'muted',
                  isToday && 'today',
                  isSel && 'selected',
                  isStart && 'range-start',
                  isEnd && 'range-end',
                  inRange && 'in-range',
                )}
                onClick={() => !isDisabled && handleSelect(d)}
                aria-selected={isSel || isStart || isEnd || undefined}
                aria-disabled={isDisabled || undefined}
                tabIndex={isDisabled ? -1 : 0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (!isDisabled) handleSelect(d);
                  }
                }}
              >
                {d.getDate()}
              </span>
            );
          })}
        </div>
      </div>
    );
  },
);

Calendar.displayName = 'Calendar';
