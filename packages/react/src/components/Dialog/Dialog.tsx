import { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../primitives/clsx.js';
import type { DialogProps } from './Dialog.types.js';

function useFocusTrap(containerRef: React.RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    if (!active || !containerRef.current) return;
    const el = containerRef.current;
    const focusable = el.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [active, containerRef]);
}

export function Dialog({ open, onClose, title, children, className }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(dialogRef, open);

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

  return createPortal(
    <div
      className="tln-dialog-backdrop"
      onClick={onClose}
      aria-modal="true"
    >
      <div
        ref={dialogRef}
        className={cx('tln-dialog', className)}
        role="dialog"
        aria-labelledby="tln-dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="tln-dialog-head">
          <span id="tln-dialog-title" className="tln-dialog-title">{title}</span>
          <button
            type="button"
            className="tln-btn tln-btn-ghost tln-btn-sm tln-btn-icon"
            aria-label="Close dialog"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="tln-dialog-body">{children}</div>
      </div>
    </div>,
    document.body,
  );
}

Dialog.displayName = 'Dialog';
