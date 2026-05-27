import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import * as RadixPopover from '@radix-ui/react-popover';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './MultiSelect.css';

// ─── cva 变体 ─────────────────────────────────────────────────────
export const multiSelectVariants = cva('tln-multiselect', {
  variants: {
    size: {
      sm: 'tln-multiselect-sm',
      md: '',
      lg: 'tln-multiselect-lg',
    },
  },
  defaultVariants: { size: 'md' },
});

// ─── Context ──────────────────────────────────────────────────────
interface MultiSelectCtx {
  /** 当前选中值数组 */
  value: string[];
  /** 切换某个值（选中→取消，未选→选中） */
  toggle: (v: string) => void;
  /** 移除某个值（pill 上的 ✕ 按钮使用） */
  remove: (v: string) => void;
  /** popover 开关状态 */
  open: boolean;
  setOpen: (o: boolean) => void;
  /** 搜索关键词（由 MultiSelectContent 管理） */
  query: string;
  setQuery: (q: string) => void;
  /** mono 字体标志 */
  mono?: boolean;
  /** 尺寸档位 */
  size: 'sm' | 'md' | 'lg';
  /** 是否禁用 */
  disabled?: boolean;
  /** 当前可见 item 数(>0 表示有结果) */
  visibleCount: number;
  /** Item mount/visible 时调用 */
  registerVisible: (id: string) => void;
  /** Item unmount/hidden 时调用 */
  unregisterVisible: (id: string) => void;
}

const MultiSelectContext = createContext<MultiSelectCtx | null>(null);

function useMultiSelectContext() {
  const ctx = useContext(MultiSelectContext);
  if (!ctx) throw new Error('MultiSelect 子组件必须在 <MultiSelect> 内使用');
  return ctx;
}

// ─── MultiSelect Root ─────────────────────────────────────────────
export interface MultiSelectProps extends VariantProps<typeof multiSelectVariants> {
  /** 受控值（已选 value 数组） */
  value?: string[];
  /** 非受控初始值 */
  defaultValue?: string[];
  /** 值变化回调 */
  onValueChange?: (values: string[]) => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 触发器使用等宽字体 */
  mono?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * MultiSelect — 多选下拉根容器。
 * 用法：MultiSelect > MultiSelectTrigger + MultiSelectContent > MultiSelectItem
 */
export const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(
  function MultiSelect(
    {
      value: controlledValue,
      defaultValue,
      onValueChange,
      size = 'md',
      mono,
      disabled,
      className,
      children,
    },
    ref,
  ) {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState<string[]>(defaultValue ?? []);
    const selectedValues = isControlled ? (controlledValue ?? []) : internalValue;

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');

    // 可见 item 集合(用于 MultiSelectEmpty 判断)
    const visibleIdsRef = useRef<Set<string>>(new Set());
    const [visibleCount, setVisibleCount] = useState(0);
    const registerVisible = useCallback((id: string) => {
      visibleIdsRef.current.add(id);
      setVisibleCount(visibleIdsRef.current.size);
    }, []);
    const unregisterVisible = useCallback((id: string) => {
      visibleIdsRef.current.delete(id);
      setVisibleCount(visibleIdsRef.current.size);
    }, []);

    const toggle = useCallback(
      (v: string) => {
        const next = selectedValues.includes(v)
          ? selectedValues.filter((x) => x !== v)
          : [...selectedValues, v];
        if (!isControlled) setInternalValue(next);
        onValueChange?.(next);
      },
      [selectedValues, isControlled, onValueChange],
    );

    const remove = useCallback(
      (v: string) => {
        const next = selectedValues.filter((x) => x !== v);
        if (!isControlled) setInternalValue(next);
        onValueChange?.(next);
      },
      [selectedValues, isControlled, onValueChange],
    );

    const handleOpenChange = useCallback(
      (o: boolean) => {
        if (disabled) return;
        setOpen(o);
        if (!o) setQuery('');
      },
      [disabled],
    );

    const ctx = useMemo<MultiSelectCtx>(
      () => ({
        value: selectedValues,
        toggle,
        remove,
        open,
        setOpen,
        query,
        setQuery,
        mono,
        size: size ?? 'md',
        disabled,
        visibleCount,
        registerVisible,
        unregisterVisible,
      }),
      [selectedValues, toggle, remove, open, query, mono, size, disabled, visibleCount, registerVisible, unregisterVisible],
    );

    return (
      <MultiSelectContext.Provider value={ctx}>
        <RadixPopover.Root open={open} onOpenChange={handleOpenChange}>
          <div
            ref={ref}
            className={cn(multiSelectVariants({ size }), className)}
            data-open={open ? 'true' : 'false'}
            data-disabled={disabled ? 'true' : undefined}
          >
            {children}
          </div>
        </RadixPopover.Root>
      </MultiSelectContext.Provider>
    );
  },
);
MultiSelect.displayName = 'MultiSelect';

// ─── MultiSelectTrigger ───────────────────────────────────────────
export interface MultiSelectTriggerProps {
  /** 未选时的占位文字 */
  placeholder?: string;
  className?: string;
}

/**
 * MultiSelectTrigger — 触发器，显示已选 pill chip，未选时显示占位文字。
 * 使用 div[role=combobox] 而非 button，避免 button 嵌套 button 的 HTML 无效问题。
 * pill 内删除按钮可以是合法 <button>。
 */
export const MultiSelectTrigger = forwardRef<HTMLDivElement, MultiSelectTriggerProps>(
  function MultiSelectTrigger({ placeholder = '选择…', className }, ref) {
    const { value, remove, open, setOpen, disabled, mono } = useMultiSelectContext();

    // Enter/Space 触发打开，Esc 由 Radix 处理
    const onTriggerKey = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!disabled) setOpen(true);
        }
      },
      [disabled, setOpen],
    );

    return (
      // asChild 让 Radix Popover.Trigger 把事件代理到此 div
      <RadixPopover.Trigger asChild>
        <div
          ref={ref}
          role="combobox"
          tabIndex={disabled ? -1 : 0}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={cn('tln-multiselect-trigger', className)}
          onKeyDown={onTriggerKey}
        >
          {/* 未选时显示占位 */}
          {value.length === 0 && (
            <span className="tln-multiselect-placeholder">{placeholder}</span>
          )}
          {/* 已选项作为 pill chip 渲染 */}
          {value.map((v) => (
            <span className={cn('tln-multiselect-pill', mono && 'mono')} key={v}>
              <span className="tln-multiselect-pill-label">{v}</span>
              {/* pill 内删除按钮：合法，因为外层是 div */}
              <button
                type="button"
                className="tln-multiselect-pill-remove"
                onClick={(e) => {
                  e.stopPropagation();
                  remove(v);
                }}
                aria-label={`移除 ${v}`}
              >
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>
            </span>
          ))}
          {/* 展开箭头 */}
          <svg
            className="tln-multiselect-chev"
            width="10"
            height="10"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </div>
      </RadixPopover.Trigger>
    );
  },
);
MultiSelectTrigger.displayName = 'MultiSelectTrigger';

// ─── MultiSelectContent ───────────────────────────────────────────
export interface MultiSelectContentProps {
  /** 搜索框占位文字 */
  placeholder?: string;
  className?: string;
  children?: ReactNode;
  sideOffset?: number;
}

const SearchIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="7" cy="7" r="4.5" />
    <path d="M10.5 10.5L14 14" />
  </svg>
);

/**
 * MultiSelectContent — 下拉面板，包含搜索框与选项列表。
 * 打开时自动聚焦搜索框，底部显示已选数量。
 */
export const MultiSelectContent = forwardRef<HTMLDivElement, MultiSelectContentProps>(
  function MultiSelectContent(
    { placeholder = '过滤…', className, children, sideOffset = 4 },
    ref,
  ) {
    const { open, query, setQuery, value } = useMultiSelectContext();
    const inputRef = useRef<HTMLInputElement>(null);

    // 打开时聚焦搜索框
    useEffect(() => {
      if (!open) return;
      requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
    }, [open]);

    return (
      <RadixPopover.Portal>
        <RadixPopover.Content
          ref={ref}
          sideOffset={sideOffset}
          className={cn('tln-multiselect-content', className)}
          style={{ width: 'var(--radix-popover-trigger-width)' }}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {/* 搜索框 */}
          <div className="tln-multiselect-search">
            <SearchIcon />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              aria-label="搜索选项"
            />
          </div>
          {/* 选项列表 */}
          <div className="tln-multiselect-options">{children}</div>
          {/* 底部状态栏 */}
          <div className="tln-multiselect-foot">
            <span>{value.length} 已选</span>
            <span className="tln-multiselect-foot-keys">
              <span>esc</span>
            </span>
          </div>
        </RadixPopover.Content>
      </RadixPopover.Portal>
    );
  },
);
MultiSelectContent.displayName = 'MultiSelectContent';

// ─── MultiSelectItem ──────────────────────────────────────────────
export interface MultiSelectItemProps {
  /** 选项值 */
  value: string;
  /** 副列提示文字（右侧 mono 小字） */
  hint?: ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * MultiSelectItem — 单个选项。
 * 选中时显示 check 图标；query 存在时自动按文字过滤。
 */
export const MultiSelectItem = forwardRef<HTMLDivElement, MultiSelectItemProps>(
  function MultiSelectItem({ value, hint, disabled, className, children }, ref) {
    const { value: selectedValues, toggle, query, mono, registerVisible, unregisterVisible } = useMultiSelectContext();

    // 搜索过滤判断
    const visible = (() => {
      if (!query) return true;
      const text = typeof children === 'string' ? children.toLowerCase() : '';
      const hintText = typeof hint === 'string' ? hint.toLowerCase() : '';
      const q = query.toLowerCase();
      return text.includes(q) || value.toLowerCase().includes(q) || hintText.includes(q);
    })();

    // 向 context 报告可见状态(让 MultiSelectEmpty 知道是否还有结果)
    useEffect(() => {
      if (visible) {
        registerVisible(value);
        return () => unregisterVisible(value);
      }
      return;
    }, [visible, value, registerVisible, unregisterVisible]);

    if (!visible) return null;

    const isSelected = selectedValues.includes(value);

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={isSelected}
        data-disabled={disabled ? 'true' : undefined}
        className={cn(
          'tln-multiselect-item',
          mono && 'mono',
          isSelected && 'selected',
          className,
        )}
        onMouseDown={(e) => {
          e.preventDefault();
          if (!disabled) toggle(value);
        }}
      >
        {/* 选中标记 */}
        {isSelected ? (
          <svg
            className="check"
            width="11"
            height="11"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 8l3.5 3.5L13 5" />
          </svg>
        ) : (
          <span className="check-slot" aria-hidden="true" />
        )}
        <span className="lbl">{children}</span>
        {hint && <span className="opt-hint">{hint}</span>}
      </div>
    );
  },
);
MultiSelectItem.displayName = 'MultiSelectItem';

// ─── MultiSelectEmpty ─────────────────────────────────────────────
export interface MultiSelectEmptyProps {
  className?: string;
  children?: ReactNode;
}

/**
 * MultiSelectEmpty — 无搜索结果时的占位。
 */
export const MultiSelectEmpty = forwardRef<HTMLDivElement, MultiSelectEmptyProps>(
  function MultiSelectEmpty({ className, children = '无结果' }, ref) {
    const { visibleCount } = useMultiSelectContext();
    if (visibleCount > 0) return null;
    return (
      <div ref={ref} className={cn('tln-multiselect-empty', className)}>
        {children}
      </div>
    );
  },
);
MultiSelectEmpty.displayName = 'MultiSelectEmpty';
