import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../primitives/clsx.js';
import type { DrawerProps } from './Drawer.types.js';

export function Drawer({ open, onClose, side = 'right', width = 560, children, className }: DrawerProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, handleEscape]);

  if (!open || typeof window === 'undefined') return null;

  const positionStyle: React.CSSProperties =
    side === 'left'
      ? { left: 0, right: 'auto', borderLeft: 'none', borderRight: '1px solid var(--line)' }
      : {};

  return createPortal(
    <>
      <div
        className="tln-drawer-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={cx('tln-drawer', className)}
        role="dialog"
        aria-modal="true"
        style={{ width: typeof width === 'number' ? `${width}px` : width, ...positionStyle }}
      >
        <div className="tln-drawer-head">
          <div className="tln-drawer-title" />
          <button
            type="button"
            className="tln-btn tln-btn-ghost tln-btn-sm tln-btn-icon"
            aria-label="Close drawer"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="tln-drawer-body">{children}</div>
      </div>
    </>,
    document.body,
  );
}

Drawer.displayName = 'Drawer';
