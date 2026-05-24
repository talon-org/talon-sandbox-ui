import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { ToastItem, ToastKind } from './Toast.types.js';

// ─── Minimal external store ───────────────────────────────────────────────────
type Listener = () => void;
let _items: ToastItem[] = [];
const _listeners = new Set<Listener>();

function notify() { _listeners.forEach((l) => l()); }
function getSnapshot() { return _items; }

function addToast(message: string, kind: ToastKind): string {
  const id = Math.random().toString(36).slice(2);
  _items = [..._items, { id, message, kind }];
  notify();
  setTimeout(() => removeToast(id), 3500);
  return id;
}

function removeToast(id: string) {
  if (id === 'all') { _items = []; }
  else { _items = _items.filter((t) => t.id !== id); }
  notify();
}

// ─── Public API ───────────────────────────────────────────────────────────────
export const toast = Object.assign(
  (message: string): string => addToast(message, 'default'),
  {
    success: (message: string) => addToast(message, 'success'),
    error:   (message: string) => addToast(message, 'error'),
    info:    (message: string) => addToast(message, 'info'),
    warn:    (message: string) => addToast(message, 'warn'),
    dismiss: (id: string)      => { removeToast(id); },
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
    <div className="tln-toast-viewport" role="region" aria-live="polite" aria-label="Notifications">
      {items.map((t) => (
        <div
          key={t.id}
          className={`tln-toast${KIND_CLASS[t.kind] ? ' ' + KIND_CLASS[t.kind] : ''}`}
          role="status"
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
