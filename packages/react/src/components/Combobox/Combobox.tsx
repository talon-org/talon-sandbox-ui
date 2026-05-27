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
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './Combobox.css';

// ─── cva 变体 ─────────────────────────────────────────────────────
export const comboboxVariants = cva('tln-combo', {
  variants: {
    size: {
      sm: 'tln-combo-sm',
      md: '',
      lg: 'tln-combo-lg',
    },
  },
  defaultVariants: { size: 'md' },
});

// ─── Context ──────────────────────────────────────────────────────
interface ComboboxCtx {
  /** 当前选中的值 */
  value: string;
  /** 选择某个值 */
  onSelect: (v: string) => void;
  /** popover 开关状态 */
  open: boolean;
  setOpen: (o: boolean) => void;
  /** 搜索关键词（由 ComboboxContent 管理） */
  query: string;
  setQuery: (q: string) => void;
  /** mono 字体 */
  mono?: boolean;
  size: 'sm' | 'md' | 'lg';
  /** 当前可见 item 数(>0 表示有结果) */
  visibleCount: number;
  /** Item mount/visible 时调用 */
  registerVisible: (id: string) => void;
  /** Item unmount/hidden 时调用 */
  unregisterVisible: (id: string) => void;
}

const ComboboxContext = createContext<ComboboxCtx | null>(null);

function useComboboxContext() {
  const ctx = useContext(ComboboxContext);
  if (!ctx) throw new Error('Combobox 子组件必须在 <Combobox> 内使用');
  return ctx;
}

// ─── Combobox Root ────────────────────────────────────────────────
export interface ComboboxProps extends VariantProps<typeof comboboxVariants> {
  /** 受控值 */
  value?: string;
  /** 非受控初始值 */
  defaultValue?: string;
  /** 值变化回调 */
  onValueChange?: (value: string) => void;
  /** 触发器使用等宽字体 */
  mono?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * Combobox — 可搜索下拉选择根容器。
 * 用法：Combobox > ComboboxTrigger > ComboboxContent > ComboboxItem
 */
export const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
  function Combobox(
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
    const [internalValue, setInternalValue] = useState<string>(defaultValue ?? '');
    const selectedValue = isControlled ? (controlledValue ?? '') : internalValue;

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');

    // 用 ref+state 跟踪可见 item 集合,避免每次 register 触发全树重渲染
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

    const onSelect = useCallback(
      (v: string) => {
        if (!isControlled) setInternalValue(v);
        onValueChange?.(v);
        setOpen(false);
        setQuery('');
      },
      [isControlled, onValueChange],
    );

    const handleOpenChange = useCallback((o: boolean) => {
      setOpen(o);
      if (!o) setQuery('');
    }, []);

    const ctx = useMemo<ComboboxCtx>(
      () => ({
        value: selectedValue,
        onSelect,
        open,
        setOpen,
        query,
        setQuery,
        mono,
        size: size ?? 'md',
        visibleCount,
        registerVisible,
        unregisterVisible,
      }),
      [selectedValue, onSelect, open, query, mono, size, visibleCount, registerVisible, unregisterVisible],
    );

    return (
      <ComboboxContext.Provider value={ctx}>
        <RadixPopover.Root open={open} onOpenChange={handleOpenChange}>
          <div
            ref={ref}
            className={cn(comboboxVariants({ size }), className)}
            data-open={open ? 'true' : 'false'}
            data-disabled={disabled ? 'true' : undefined}
          >
            {children}
          </div>
        </RadixPopover.Root>
      </ComboboxContext.Provider>
    );
  },
);
Combobox.displayName = 'Combobox';

// ─── ComboboxTrigger ─────────────────────────────────────────────
export interface ComboboxTriggerProps {
  asChild?: boolean;
  children?: ReactNode;
  className?: string;
}

/**
 * ComboboxTrigger — 触发下拉的按钮。
 * asChild=true 时把 open/close 注入子元素，不渲染多余 button。
 */
export const ComboboxTrigger = forwardRef<HTMLButtonElement, ComboboxTriggerProps>(
  function ComboboxTrigger({ asChild, className, children }, ref) {
    return (
      <RadixPopover.Trigger asChild={asChild} ref={ref} className={cn('tln-combo-trigger-wrap', className)}>
        {children}
      </RadixPopover.Trigger>
    );
  },
);
ComboboxTrigger.displayName = 'ComboboxTrigger';

// ─── ComboboxContent ─────────────────────────────────────────────
export interface ComboboxContentProps {
  /** 是否显示搜索框（默认 true） */
  searchable?: boolean;
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
 * ComboboxContent — 下拉面板，可选搜索框。
 * searchable=true（默认）时渲染搜索框并在打开时自动聚焦。
 */
export const ComboboxContent = forwardRef<HTMLDivElement, ComboboxContentProps>(
  function ComboboxContent(
    {
      searchable = true,
      placeholder = '过滤…',
      className,
      children,
      sideOffset = 4,
    },
    ref,
  ) {
    const { open, query, setQuery } = useComboboxContext();
    const inputRef = useRef<HTMLInputElement>(null);

    // 打开时聚焦搜索框
    useEffect(() => {
      if (!open || !searchable) return;
      requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
    }, [open, searchable]);

    return (
      <RadixPopover.Portal>
        <RadixPopover.Content
          ref={ref}
          sideOffset={sideOffset}
          className={cn('tln-combo-panel', className)}
          style={{ width: 'var(--radix-popover-trigger-width)' }}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {searchable && (
            <div className="tln-combo-search">
              <SearchIcon />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                aria-label="搜索选项"
              />
            </div>
          )}
          <div className="tln-combo-options">{children}</div>
        </RadixPopover.Content>
      </RadixPopover.Portal>
    );
  },
);
ComboboxContent.displayName = 'ComboboxContent';

// ─── ComboboxItem ─────────────────────────────────────────────────
export interface ComboboxItemProps {
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
 * ComboboxItem — 单个选项。
 * 选中时显示 check 图标，激活时高亮。
 */
export const ComboboxItem = forwardRef<HTMLDivElement, ComboboxItemProps>(
  function ComboboxItem({ value, hint, disabled, className, children }, ref) {
    const { value: selectedValue, onSelect, query, mono, registerVisible, unregisterVisible } = useComboboxContext();

    // 搜索过滤判断
    const visible = (() => {
      if (!query) return true;
      const text = typeof children === 'string' ? children.toLowerCase() : '';
      const hintText = typeof hint === 'string' ? hint.toLowerCase() : '';
      const q = query.toLowerCase();
      return text.includes(q) || value.toLowerCase().includes(q) || hintText.includes(q);
    })();

    // 向 context 报告可见状态(让 ComboboxEmpty 知道是否还有结果)
    useEffect(() => {
      if (visible) {
        registerVisible(value);
        return () => unregisterVisible(value);
      }
      return;
    }, [visible, value, registerVisible, unregisterVisible]);

    if (!visible) return null;

    const isSelected = selectedValue === value;

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={isSelected}
        data-disabled={disabled ? 'true' : undefined}
        className={cn('tln-combo-opt', mono && 'mono', isSelected && 'selected', className)}
        onMouseDown={(e) => {
          e.preventDefault();
          if (!disabled) onSelect(value);
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
ComboboxItem.displayName = 'ComboboxItem';

// ─── ComboboxGroup ────────────────────────────────────────────────
export interface ComboboxGroupProps {
  /** 分组标签 */
  heading?: ReactNode;
  className?: string;
  children?: ReactNode;
}

/**
 * ComboboxGroup — 选项分组（可选标题）。
 * prototype class: tln-combo-group。
 */
export const ComboboxGroup = forwardRef<HTMLDivElement, ComboboxGroupProps>(
  function ComboboxGroup({ heading, className, children }, ref) {
    return (
      <div ref={ref} className={cn('tln-combo-group-wrap', className)}>
        {heading && <div className="tln-combo-group">{heading}</div>}
        {children}
      </div>
    );
  },
);
ComboboxGroup.displayName = 'ComboboxGroup';

// ─── ComboboxEmpty ────────────────────────────────────────────────
export interface ComboboxEmptyProps {
  className?: string;
  children?: ReactNode;
}

/**
 * ComboboxEmpty — 无搜索结果时的占位（调用方手动放置，或配合 query 判断渲染）。
 * prototype class: tln-combo-empty。
 */
export const ComboboxEmpty = forwardRef<HTMLDivElement, ComboboxEmptyProps>(
  function ComboboxEmpty({ className, children = '无结果' }, ref) {
    const { visibleCount } = useComboboxContext();
    // 有可见 item 时不渲染,避免误显示"无结果"
    if (visibleCount > 0) return null;
    return (
      <div ref={ref} className={cn('tln-combo-empty', className)}>
        {children}
      </div>
    );
  },
);
ComboboxEmpty.displayName = 'ComboboxEmpty';
