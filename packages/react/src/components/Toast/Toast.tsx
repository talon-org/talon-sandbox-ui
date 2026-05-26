/**
 * Toast — 命令式消息通知，基于 @radix-ui/react-toast。
 *
 * 公开 API：
 * - `toast(message)` — 命令式触发（默认 kind）
 * - `toast.success / .error / .warn / .info` — 带 kind 的快捷方式
 * - `toast.dismiss(id?)` — 关闭指定或全部 toast
 * - `<Toaster />` — 渲染层，挂在 App 根部（原名 ToastViewport）
 * - `ToastViewport` — 旧名别名，下一个 major 版本删除
 *
 * 实现要点：
 * - 全局 pub/sub store 与 Radix open 状态解耦
 * - Radix duration=Infinity，自己的 timer 机制控制生命周期
 * - hover 时 pause / leave 时 resume
 */
import { useState, useEffect } from 'react';
import * as RadixToast from '@radix-ui/react-toast';
import { cn } from '../../lib/utils.js';
import { Icon } from '../../primitives/icons.js';
import type { ToastItem, ToastKind } from './Toast.types.js';
import './Toast.css';

// ─── 全局 pub/sub ─────────────────────────────────────────────────────────────
interface TimerEntry {
  timer: ReturnType<typeof setTimeout>;
  msLeft: number;
  startedAt: number;
}

type Listener = () => void;
let _items: ToastItem[] = [];
const _listeners = new Set<Listener>();
const _timers = new Map<string, TimerEntry>();

function notify() { _listeners.forEach((l) => l()); }
function getSnapshot() { return _items; }

function scheduleRemoval(id: string, ms: number) {
  const timer = setTimeout(() => removeToast(id), ms);
  _timers.set(id, { timer, msLeft: ms, startedAt: Date.now() });
}

function addToast(message: string, kind: ToastKind, title?: string): string {
  const id = Math.random().toString(36).slice(2);
  _items = [..._items, { id, message, kind, title }];
  notify();
  scheduleRemoval(id, 3500);
  return id;
}

function removeToast(id?: string) {
  if (id == null || id === 'all') {
    // 全部关闭
    _timers.forEach((entry) => clearTimeout(entry.timer));
    _timers.clear();
    _items = [];
  } else {
    const entry = _timers.get(id);
    if (entry) { clearTimeout(entry.timer); _timers.delete(id); }
    _items = _items.filter((t) => t.id !== id);
  }
  notify();
}

function pauseToast(id: string) {
  const entry = _timers.get(id);
  if (!entry) return;
  clearTimeout(entry.timer);
  const elapsed = Date.now() - entry.startedAt;
  _timers.set(id, {
    ...entry,
    timer: 0 as unknown as ReturnType<typeof setTimeout>,
    msLeft: Math.max(0, entry.msLeft - elapsed),
  });
}

function resumeToast(id: string) {
  const entry = _timers.get(id);
  if (!entry) return;
  scheduleRemoval(id, entry.msLeft);
}

// ─── Public API ───────────────────────────────────────────────────────────────
export const toast = Object.assign(
  (message: string): string => addToast(message, 'default'),
  {
    success: (message: string, opts?: { title?: string }) => addToast(message, 'success', opts?.title),
    error:   (message: string, opts?: { title?: string }) => addToast(message, 'error', opts?.title),
    info:    (message: string, opts?: { title?: string }) => addToast(message, 'info', opts?.title),
    warn:    (message: string, opts?: { title?: string }) => addToast(message, 'warn', opts?.title),
    /** 关闭指定 toast；不传参数时关闭全部 */
    dismiss: (id?: string) => { removeToast(id); },
  },
);

// kind → CSS modifier class 映射
const KIND_CLASS: Record<ToastKind, string> = {
  default: '',
  success: 'ok',
  error:   'err',
  info:    'info',
  warn:    'warn',
};

// ─── Toaster（渲染层，挂在 App 根部） ─────────────────────────────────────────
export function Toaster() {
  const [items, setItems] = useState<ToastItem[]>(() => getSnapshot());

  // 订阅全局 store 变更
  useEffect(() => {
    const listener: Listener = () => setItems([...getSnapshot()]);
    _listeners.add(listener);
    return () => { _listeners.delete(listener); };
  }, []);

  return (
    // Provider 包在 Viewport 外层；duration=Infinity 让 Radix 不自动关闭
    <RadixToast.Provider duration={Infinity} swipeDirection="right">
      {items.map((t) => {
        const kindCls = KIND_CLASS[t.kind];
        return (
          <RadixToast.Root
            key={t.id}
            open={true}
            onOpenChange={(open) => { if (!open) toast.dismiss(t.id); }}
            className={cn('tln-toast', kindCls && kindCls)}
            duration={Infinity}
            onMouseEnter={() => pauseToast(t.id)}
            onMouseLeave={() => resumeToast(t.id)}
          >
            {/* 使用带命名空间的类名，避免与全局 .body/.title 冲突 */}
            <div className="tln-toast-body">
              {/* 可选标题 */}
              {t.title && (
                <RadixToast.Title className="tln-toast-title">{t.title}</RadixToast.Title>
              )}
              {/* 正文 */}
              <RadixToast.Description>{t.message}</RadixToast.Description>
            </div>

            {/* 关闭按钮 */}
            <RadixToast.Close asChild>
              <button
                type="button"
                aria-label="Dismiss notification"
                className="tln-toast-dismiss"
                onClick={() => toast.dismiss(t.id)}
              >
                <Icon name="x" size={14} />
              </button>
            </RadixToast.Close>
          </RadixToast.Root>
        );
      })}

      {/* Radix 官方 Viewport：无障碍公告区，固定定位在右下角 */}
      <RadixToast.Viewport className="tln-toast-stack" />
    </RadixToast.Provider>
  );
}

Toaster.displayName = 'Toaster';

/**
 * @deprecated 旧名别名，使用 `Toaster` 代替。下一个 major 版本删除。
 */
export const ToastViewport = Toaster;
