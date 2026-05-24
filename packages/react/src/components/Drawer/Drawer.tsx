import { useEffect, useRef, useCallback, useId } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../primitives/clsx.js';
import { useFocusTrap } from '../../primitives/useFocusTrap.js';
import type { DrawerProps } from './Drawer.types.js';

export function Drawer({ open, onClose, title, side = 'right', width = 560, children, className }: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useFocusTrap(drawerRef, open);

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
        ref={drawerRef}
        className={cx('tln-drawer', className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        style={{ width: typeof width === 'number' ? `${width}px` : width, ...positionStyle }}
      >
        <div className="tln-drawer-head">
          <div className="tln-drawer-title" id={titleId}>{title}</div>
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
