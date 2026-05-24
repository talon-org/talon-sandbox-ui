import { useEffect, useRef, useCallback, useId } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../primitives/clsx.js';
import { useFocusTrap } from '../../primitives/useFocusTrap.js';
import type { DialogProps } from './Dialog.types.js';

export function Dialog({ open, onClose, title, children, footer, className }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

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
    >
      <div
        ref={dialogRef}
        className={cx('tln-dialog', className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="tln-dialog-head">
          <h3 id={titleId} className="tln-dialog-title">{title}</h3>
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
        {footer && <div className="tln-dialog-foot">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}

Dialog.displayName = 'Dialog';
