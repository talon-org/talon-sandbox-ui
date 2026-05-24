import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { ToastItem, ToastKind } from './Toast.types.js';

// ─── Timer bookkeeping ────────────────────────────────────────────────────────
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

function addToast(message: string, kind: ToastKind): string {
  const id = Math.random().toString(36).slice(2);
  _items = [..._items, { id, message, kind }];
  notify();
  scheduleRemoval(id, 3500);
  return id;
}

function removeToast(id?: string) {
  if (id == null || id === 'all') {
    // dismiss all
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
  _timers.set(id, { ...entry, timer: 0 as unknown as ReturnType<typeof setTimeout>, msLeft: Math.max(0, entry.msLeft - elapsed) });
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
    success: (message: string) => addToast(message, 'success'),
    error:   (message: string) => addToast(message, 'error'),
    info:    (message: string) => addToast(message, 'info'),
    warn:    (message: string) => addToast(message, 'warn'),
    /** Dismiss a specific toast by id, or dismiss all when called without arguments */
    dismiss: (id?: string) => { removeToast(id); },
  },
);

const KIND_CLASS: Record<ToastKind, string> = {
  default: '',
  success: 'ok',
  error:   'err',
  info:    'info',
  warn:    'warn',
};

// ─── Viewport component ───────────────────────────────────────────────────────
export function ToastViewport() {
  const [items, setItems] = useState<ToastItem[]>(() => getSnapshot());

  useEffect(() => {
    const listener: Listener = () => setItems([...getSnapshot()]);
    _listeners.add(listener);
    return () => { _listeners.delete(listener); };
  }, []);

  const content = (
    <div className="tln-toast-stack" role="region" aria-live="polite" aria-label="Notifications">
      {items.map((t) => (
        <div
          key={t.id}
          className={`tln-toast${KIND_CLASS[t.kind] ? ' ' + KIND_CLASS[t.kind] : ''}`}
          role="status"
          onMouseEnter={() => pauseToast(t.id)}
          onMouseLeave={() => resumeToast(t.id)}
        >
          <div className="body">{t.message}</div>
          <button
            type="button"
            aria-label="Dismiss notification"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--fg-3)',
              fontSize: '14px',
            }}
            onClick={() => toast.dismiss(t.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );

  if (typeof window === 'undefined') return content;
  return createPortal(content, document.body);
}

ToastViewport.displayName = 'ToastViewport';
