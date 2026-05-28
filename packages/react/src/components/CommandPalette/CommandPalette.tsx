/**
 * CommandPalette — ⌘K 命令面板，拆分为 shadcn Command 风格子组件。
 *
 * 拆分为子组件：
 *   Command / CommandInput / CommandList / CommandGroup /
 *   CommandItem / CommandSeparator / CommandEmpty / CommandShortcut
 *   CommandDialog（= Dialog 包裹的 Command，保留原 CommandPalette 别名）
 *
 * 架构（shadcn 对齐）：
 * - Command = 纯容器（管理 query state + filter + keyboard nav），不带 Dialog
 * - CommandDialog = <Dialog><DialogContent><Command> 包装，用于 ⌘K 场景
 * - CommandPalette = CommandDialog 的别名（向后兼容）
 *
 * Command 可嵌入任何 surface（Popover / Sheet / Dialog 都行，不只是 ⌘K）。
 * 键盘导航（↑↓↵）由 Command 内部管理，Esc 由外层 Dialog/Radix 处理。
 */
import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
  useId,
} from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { cn } from '../../lib/utils.js';
import './CommandPalette.css';

// ─── Command 内部状态 context ─────────────────────────────────────────────────
interface CommandContextValue {
  query: string;
  setQuery: (q: string) => void;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  /** 注册可选 item（id → onSelectRef，用 ref 跟踪最新回调，避免 stale closure） */
  registerItem: (id: string, onSelectRef?: React.MutableRefObject<(() => void) | undefined>, disabled?: boolean) => void;
  unregisterItem: (id: string) => void;
  /** 按顺序排列的 item id 列表（用于键盘导航） */
  itemIds: string[];
  /** visible item 数量，供 CommandEmpty 判断是否显示 */
  visibleCount: number;
  setVisibleCount: React.Dispatch<React.SetStateAction<number>>;
}

const CommandContext = createContext<CommandContextValue | null>(null);

function useCommandContext() {
  const ctx = useContext(CommandContext);
  if (!ctx) throw new Error('Command 子组件必须在 Command 或 CommandDialog 内使用');
  return ctx;
}

// ─── Command（纯容器，不带 Dialog） ──────────────────────────────────────────
// 可嵌入任意 surface：Popover / Sheet / Dialog / ⌘K 等
export interface CommandProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const Command = forwardRef<HTMLDivElement, CommandProps>(
  function Command({ className, children, ...props }, ref) {
    const [query, setQuery] = useState('');
    const [activeId, setActiveId] = useState<string | null>(null);
    // visible item 计数，供 CommandEmpty 读取
    const [visibleCount, setVisibleCount] = useState(0);
    // 有序 item 列表（由 CommandItem 注册）
    const itemIdsRef = useRef<string[]>([]);
    // 存 ref 对象而非回调值，避免每次 onSelect 变化重新注册（stale closure 修复）
    const itemsMapRef = useRef<Map<string, { onSelectRef?: React.MutableRefObject<(() => void) | undefined>; disabled?: boolean }>>(new Map());

    const registerItem = (id: string, onSelectRef?: React.MutableRefObject<(() => void) | undefined>, disabled?: boolean) => {
      if (!itemIdsRef.current.includes(id)) {
        itemIdsRef.current = [...itemIdsRef.current, id];
      }
      // 存 ref 对象，保证 Enter 调用时总是读到最新回调
      itemsMapRef.current.set(id, { onSelectRef, disabled });
    };

    const unregisterItem = (id: string) => {
      itemIdsRef.current = itemIdsRef.current.filter((i) => i !== id);
      itemsMapRef.current.delete(id);
    };

    // 键盘导航（↑↓↵；Esc 由外层 Dialog/Radix 处理）
    const handleKeyDown = (e: React.KeyboardEvent) => {
      const ids = itemIdsRef.current;
      if (ids.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const current = activeId ? ids.indexOf(activeId) : -1;
        const next = Math.min(ids.length - 1, current + 1);
        setActiveId(ids[next] ?? null);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const current = activeId ? ids.indexOf(activeId) : ids.length;
        const prev = Math.max(0, current - 1);
        setActiveId(ids[prev] ?? null);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeId) {
          const item = itemsMapRef.current.get(activeId);
          if (item && !item.disabled) {
            // 通过 ref.current() 调用，始终是最新回调（避免 stale closure）
            item.onSelectRef?.current?.();
          }
        }
      }
    };

    const ctxValue: CommandContextValue = {
      query,
      setQuery,
      activeId,
      setActiveId,
      registerItem,
      unregisterItem,
      itemIds: itemIdsRef.current,
      visibleCount,
      setVisibleCount,
    };

    return (
      <CommandContext.Provider value={ctxValue}>
        {/* role="presentation" + aria-label：外层容器仅作键盘事件捕获器，真实交互语义在内部 input/option 上 */}
        <div
          ref={ref}
          className={cn('tln-cmdk-root', className)}
          role="presentation"
          onKeyDown={handleKeyDown}
          {...props}
        >
          {children}
        </div>
      </CommandContext.Provider>
    );
  }
);
Command.displayName = 'Command';

// ─── CommandDialog（= Dialog + Command，⌘K 场景） ────────────────────────────
// 对齐 shadcn：Command 独立，CommandDialog 是 Dialog 包装层
export interface CommandDialogProps extends React.ComponentPropsWithoutRef<typeof RadixDialog.Root> {
  children?: React.ReactNode;
}

export function CommandDialog({ open, onOpenChange, children, ...props }: CommandDialogProps) {
  // Dialog 打开时重置 Command 搜索状态，通过 key 触发 Command 重新挂载
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange} {...props}>
      <RadixDialog.Portal>
        {/* 背景遮罩 */}
        <RadixDialog.Overlay className="tln-cmdk-backdrop" />
        {/* 面板主体：Radix 自带 focus trap / aria-modal / Esc */}
        <RadixDialog.Content
          className="tln-cmdk"
          aria-label="命令面板"
          onOpenAutoFocus={(e) => {
            // 阻止 Radix 默认聚焦行为，让 CommandInput 自己处理
            e.preventDefault();
          }}
        >
          {/* Screen reader 标题（视觉隐藏） */}
          <RadixDialog.Title className="sr-only">命令面板</RadixDialog.Title>
          {/* Command 纯容器包裹，key=open 保证每次打开时重置搜索状态 */}
          <Command key={open ? 'open' : 'closed'}>
            {children}
          </Command>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
CommandDialog.displayName = 'CommandDialog';

// ─── CommandPalette（= CommandDialog 向后兼容别名） ────────────────────────
// CommandPalette props 与 CommandDialog 相同
export interface CommandPaletteProps extends CommandDialogProps {}

export function CommandPalette(props: CommandPaletteProps) {
  return <CommandDialog {...props} />;
}
CommandPalette.displayName = 'CommandPalette';

// ─── CommandInput ─────────────────────────────────────────────────────────────
export interface CommandInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** 搜索框占位文字 */
  placeholder?: string;
}

export const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
  function CommandInput({ className, placeholder = '搜索…', ...props }, ref) {
    const { query, setQuery } = useCommandContext();
    const inputRef = useRef<HTMLInputElement>(null);
    const combinedRef = (node: HTMLInputElement | null) => {
      (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
    };

    // 面板打开时自动聚焦
    useEffect(() => {
      requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
    }, []);

    return (
      <div className={cn('tln-cmdk-input', className)}>
        {/* 搜索图标 */}
        <span className="ic" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
            strokeLinejoin="round">
            <circle cx="7" cy="7" r="4.5" />
            <path d="M10.5 10.5L14 14" />
          </svg>
        </span>
        {/* 先 spread props，再覆盖 onChange，确保内部 setQuery 先执行，之后调用消费者 onChange */}
        <input
          ref={combinedRef}
          value={query}
          placeholder={placeholder}
          aria-label="搜索命令"
          autoComplete="off"
          {...props}
          onChange={(e) => {
            setQuery(e.target.value);
            props.onChange?.(e);
          }}
        />
        <span style={{ color: 'var(--fg-3)', fontFamily: 'var(--font-mono)', fontSize: 11, padding: '1px 5px', border: '1px solid var(--line)', borderRadius: 3 }}>
          esc
        </span>
      </div>
    );
  }
);
CommandInput.displayName = 'CommandInput';

// ─── CommandList ──────────────────────────────────────────────────────────────
export interface CommandListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CommandList = forwardRef<HTMLDivElement, CommandListProps>(
  function CommandList({ className, children, ...props }, ref) {
    return (
      <div ref={ref} className={cn('tln-cmdk-list', className)} role="listbox" {...props}>
        {children}
      </div>
    );
  }
);
CommandList.displayName = 'CommandList';

// ─── CommandEmpty ─────────────────────────────────────────────────────────────
export interface CommandEmptyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CommandEmpty = forwardRef<HTMLDivElement, CommandEmptyProps>(
  function CommandEmpty({ className, children, ...props }, ref) {
    // 只在没有可见 item 时才显示空状态
    const { visibleCount } = useCommandContext();
    if (visibleCount > 0) return null;
    return (
      <div ref={ref} className={cn('tln-cmdk-empty', className)} {...props}>
        {children}
      </div>
    );
  }
);
CommandEmpty.displayName = 'CommandEmpty';

// ─── CommandGroup ─────────────────────────────────────────────────────────────
export interface CommandGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 分组标题（可选） */
  heading?: React.ReactNode;
}

export const CommandGroup = forwardRef<HTMLDivElement, CommandGroupProps>(
  function CommandGroup({ className, heading, children, ...props }, ref) {
    return (
      <div ref={ref} className={cn('tln-cmdk-group', className)} {...props}>
        {/* role="presentation" 是冗余的，直接删除 */}
        {heading && (
          <div className="tln-cmdk-section">
            {heading}
          </div>
        )}
        {children}
      </div>
    );
  }
);
CommandGroup.displayName = 'CommandGroup';

// ─── CommandItem ──────────────────────────────────────────────────────────────
export interface CommandItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 选项唯一值，用于搜索过滤 */
  value?: string;
  /** 点击/回车时的回调 */
  onSelect?: () => void;
  /** 是否禁用 */
  disabled?: boolean;
}

export const CommandItem = forwardRef<HTMLDivElement, CommandItemProps>(
  function CommandItem({ className, value, onSelect, disabled, children, ...props }, ref) {
    const { activeId, setActiveId, registerItem, unregisterItem, setVisibleCount, query } = useCommandContext();
    const id = useId();

    // 用 ref 跟踪最新 onSelect，避免 stale closure 问题（Fix 1）
    const onSelectRef = useRef(onSelect);
    useEffect(() => { onSelectRef.current = onSelect; });

    // 搜索过滤：如果有 query 且 value 不包含 query，则不渲染
    const hidden = query.trim()
      ? !(value ?? '').toLowerCase().includes(query.trim().toLowerCase())
      : false;

    useEffect(() => {
      if (!hidden) {
        // 注册时传入 ref 对象而非值，回调变化不触发重注册
        registerItem(id, onSelectRef, disabled);
        // 计数 +1
        setVisibleCount((c) => c + 1);
      }
      return () => {
        unregisterItem(id);
        if (!hidden) setVisibleCount((c) => Math.max(0, c - 1));
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, hidden, disabled]);

    if (hidden) return null;

    const isActive = activeId === id;

    return (
      <div
        ref={ref}
        id={id}
        className={cn('tln-cmdk-item', isActive && 'active', className)}
        role="option"
        aria-selected={isActive}
        aria-disabled={disabled || undefined}
        // listbox option：tabIndex=-1，由父级 arrow key 管理焦点；Enter/Space 激活
        tabIndex={-1}
        onMouseEnter={() => !disabled && setActiveId(id)}
        onClick={() => {
          if (!disabled) {
            // 通过 ref.current() 调用，始终是最新回调
            onSelectRef.current?.();
          }
        }}
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onSelectRef.current?.();
          }
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CommandItem.displayName = 'CommandItem';

// ─── CommandSeparator ─────────────────────────────────────────────────────────
export interface CommandSeparatorProps extends React.HTMLAttributes<HTMLHRElement> {}

export const CommandSeparator = forwardRef<HTMLHRElement, CommandSeparatorProps>(
  function CommandSeparator({ className, ...props }, ref) {
    /* 使用原生 <hr> 取代 <div role="separator"> */
    return (
      <hr ref={ref} className={cn('tln-cmdk-sep', className)} {...props} />
    );
  }
);
CommandSeparator.displayName = 'CommandSeparator';

// ─── CommandShortcut ─────────────────────────────────────────────────────────
export interface CommandShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const CommandShortcut = forwardRef<HTMLSpanElement, CommandShortcutProps>(
  function CommandShortcut({ className, ...props }, ref) {
    return (
      <span ref={ref} className={cn('tln-cmdk-shortcut', className)} {...props} />
    );
  }
);
CommandShortcut.displayName = 'CommandShortcut';
