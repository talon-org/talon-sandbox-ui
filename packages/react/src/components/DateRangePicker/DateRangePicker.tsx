import { forwardRef, useState, useEffect, useRef, useMemo } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './DateRangePicker.css';

/**
 * DateRangePicker — 日期范围选择器。
 * trigger 显示 from → to，点开 popover 包含左侧预设列和右侧内嵌日历。
 * 支持受控/非受控。
 * 新 API：onValueChange（向后兼容 onChange 仍支持）
 */

/* ── variants ── */
export const dateRangePickerVariants = cva('tln-daterange', {
  variants: {},
  defaultVariants: {},
});

// ─── 工具函数 ──────────────────────────────────────────────────

/** 月份中文名 */
const MONTH_NAMES = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
/** 星期标题（周一首日） */
const DOW = ['一','二','三','四','五','六','日'];

/** 日期格式化为 YYYY-MM-DD */
function fmtDate(d: Date | null | undefined): string {
  if (!d) return '';
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** 判断两个日期是否同天 */
function sameDay(a: Date | null | undefined, b: Date | null | undefined): boolean {
  return !!a && !!b
    && a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();
}

/** 判断 d 是否在 [a, b] 范围内（不含端点） */
function between(d: Date, a: Date | null | undefined, b: Date | null | undefined): boolean {
  if (!a || !b) return false;
  const t = d.getTime();
  const lo = Math.min(a.getTime(), b.getTime());
  const hi = Math.max(a.getTime(), b.getTime());
  return t > lo && t < hi;
}

// ─── 内嵌日历子组件 ────────────────────────────────────────────

interface InlineCalendarProps {
  range: [Date | null, Date | null];
  anchor: Date;
  onSelect: (d: Date) => void;
}

function InlineCalendar({ range, anchor, onSelect }: InlineCalendarProps) {
  const [view, setView] = useState(() => new Date(anchor.getFullYear(), anchor.getMonth(), 1));

  // 生成当月的 42 个格子（周一首日）
  const days = useMemo<Date[]>(() => {
    const y = view.getFullYear();
    const m = view.getMonth();
    const first = new Date(y, m, 1);
    const dow = (first.getDay() + 6) % 7; // 周一 = 0
    const start = new Date(first);
    start.setDate(1 - dow);
    return Array.from({ length: 42 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, [view]);

  const today = new Date();
  const [rA, rB] = range;

  return (
    <div className="tln-cal">
      {/* 月份导航 */}
      <div className="tln-cal-head">
        <button
          type="button"
          aria-label="上个月"
          onClick={() => setView((v) => new Date(v.getFullYear(), v.getMonth() - 1, 1))}
        >
          ‹
        </button>
        <span className="title">{view.getFullYear()} · {MONTH_NAMES[view.getMonth()]}</span>
        <button
          type="button"
          aria-label="下个月"
          onClick={() => setView((v) => new Date(v.getFullYear(), v.getMonth() + 1, 1))}
        >
          ›
        </button>
      </div>

      {/* 日历格子 */}
      <div className="tln-cal-grid" role="grid" aria-label="日历">
        {/* 星期标题行 */}
        {DOW.map((d) => (
          <div key={d} className="tln-cal-dow" role="columnheader" aria-label={d}>{d}</div>
        ))}
        {/* 日期格子 */}
        {days.map((d, i) => {
          const inMonth = d.getMonth() === view.getMonth();
          const isStart = sameDay(d, rA);
          const isEnd   = sameDay(d, rB);
          const inRange = between(d, rA, rB);
          const isToday = sameDay(d, today);

          return (
            <span
              key={i}
              role="gridcell"
              aria-label={fmtDate(d)}
              aria-pressed={isStart || isEnd ? true : undefined}
              className={cn(
                'tln-cal-day',
                !inMonth && 'muted',
                isToday && 'today',
                isStart && 'range-start',
                isEnd && 'range-end',
                inRange && 'in-range',
              )}
              onClick={() => onSelect(d)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect(d);
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
}

// ─── 日期范围预设 ──────────────────────────────────────────────

/** 日期范围预设 */
export interface DateRangePreset {
  /** 显示文字 */
  label: React.ReactNode;
  /** 预设范围 [开始, 结束] */
  range: [Date, Date];
}

// ─── DateRangePicker 主组件 ────────────────────────────────────

export interface DateRangePickerProps {
  /** 受控：当前选中范围 [from, to] */
  value?: [Date, Date];
  /** 非受控默认值 */
  defaultValue?: [Date, Date];
  /**
   * 范围变更回调（新 API）
   */
  onValueChange?: (range: [Date, Date]) => void;
  /**
   * 向后兼容：等价于 onValueChange
   * @deprecated 请使用 onValueChange
   */
  onChange?: (range: [Date, Date]) => void;
  /** 左侧预设列表 */
  presets?: DateRangePreset[];
}

export const DateRangePicker = forwardRef<HTMLSpanElement, DateRangePickerProps>(
  function DateRangePicker({
    value,
    defaultValue,
    onValueChange,
    onChange,
    presets,
  }, ref) {
    // 两个回调都调用：onValueChange 是新 API，onChange 是向后兼容别名
    const handleChange = (range: [Date, Date]) => {
      onValueChange?.(range);
      onChange?.(range);
    };
    const isControlled = value !== undefined;

    const [internalValue, setInternalValue] = useState<[Date, Date] | null>(
      defaultValue ?? null,
    );

    // 当前生效的范围（受控时使用 value）
    const current = isControlled ? value : internalValue;
    const from = current?.[0] ?? null;
    const to   = current?.[1] ?? null;

    const [open, setOpen] = useState(false);
    // 第一次点击记录起始日，第二次点击完成范围
    const [pendingFrom, setPendingFrom] = useState<Date | null>(null);

    const wrapRef = useRef<HTMLSpanElement>(null);

    // 合并 ref
    const setRef = (node: HTMLSpanElement | null) => {
      (wrapRef as React.MutableRefObject<HTMLSpanElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLSpanElement | null>).current = node;
    };

    // 点击外部关闭
    useEffect(() => {
      if (!open) return;
      const onDoc = (e: MouseEvent) => {
        if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
          setOpen(false);
          setPendingFrom(null);
        }
      };
      document.addEventListener('mousedown', onDoc);
      return () => document.removeEventListener('mousedown', onDoc);
    }, [open]);

    const pickDay = (d: Date) => {
      if (pendingFrom == null) {
        // 第一次点击：记录起始日，清空已选范围
        setPendingFrom(d);
        if (!isControlled) setInternalValue(null);
      } else {
        // 第二次点击：确定范围（按时间顺序排序）
        const lo = pendingFrom.getTime() <= d.getTime() ? pendingFrom : d;
        const hi = pendingFrom.getTime() <= d.getTime() ? d : pendingFrom;
        const range: [Date, Date] = [lo, hi];
        if (!isControlled) setInternalValue(range);
        handleChange?.(range);
        setPendingFrom(null);
        setOpen(false);
      }
    };

    const applyPreset = (range: [Date, Date]) => {
      if (!isControlled) setInternalValue(range);
      handleChange?.(range);
      setOpen(false);
      setPendingFrom(null);
    };

    // trigger 显示文字
    const label = pendingFrom
      ? `${fmtDate(pendingFrom)} → 选结束日`
      : from && to
      ? `${fmtDate(from)} → ${fmtDate(to)}`
      : '选择日期范围';

    return (
      <span ref={setRef} style={{ position: 'relative', display: 'inline-block' }}>
        {/* trigger */}
        <button
          type="button"
          className="tln-daterange-trigger"
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="ic" aria-hidden="true">
            {/* 日历图标 */}
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2.5" y="3.5" width="11" height="10" rx="1"/>
              <path d="M2.5 6.5h11M5.5 2v3M10.5 2v3"/>
            </svg>
          </span>
          {label}
        </button>

        {/* popover */}
        {open && (
          <div
            className="tln-daterange-pop"
            role="dialog"
            aria-label="选择日期范围"
          >
            {/* 预设列 */}
            {presets && presets.length > 0 && (
              <div className="tln-daterange-presets">
                {presets.map((p, i) => {
                  const isActive = from && to
                    && sameDay(from, p.range[0]) && sameDay(to, p.range[1]);
                  return (
                    <button
                      key={i}
                      type="button"
                      className={cn(isActive && 'active')}
                      onClick={() => applyPreset(p.range)}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            )}

            {/* 内嵌日历 */}
            <InlineCalendar
              range={[pendingFrom ?? from, to]}
              anchor={pendingFrom ?? from ?? new Date()}
              onSelect={pickDay}
            />
          </div>
        )}
      </span>
    );
  },
);

DateRangePicker.displayName = 'DateRangePicker';
