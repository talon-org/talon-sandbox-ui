import { useState, useEffect, useRef, useMemo, useId } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../primitives/clsx.js';
import { useFocusTrap } from '../../primitives/useFocusTrap.js';
import type { CmdKOverlayProps, CmdKItem } from './CmdKOverlay.types.js';

export function CmdKOverlay({
  open,
  onClose,
  items,
  placeholder = 'Search actions…',
  className,
}: CmdKOverlayProps) {
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLDivElement>(null);
  const baseId = useId();
  const listboxId = `${baseId}-listbox`;

  useFocusTrap(modalRef, open);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIdx(0);
    }
  }, [open]);

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const t = query.toLowerCase();
    return items.filter(
      (i) =>
        i.name.toLowerCase().includes(t) ||
        (i.hint ?? '').toLowerCase().includes(t) ||
        i.group.toLowerCase().includes(t),
    );
  }, [query, items]);

  useEffect(() => { setActiveIdx(0); }, [query]);

  // Scroll active item into view when activeIdx changes
  useEffect(() => {
    activeItemRef.current?.scrollIntoView?.({ block: 'nearest' });
  }, [activeIdx]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIdx((a) => filtered.length === 0 ? 0 : Math.min(filtered.length - 1, a + 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIdx((a) => Math.max(0, a - 1));
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        const it = filtered[activeIdx];
        if (it) { it.action(); onClose(); }
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, filtered, activeIdx, onClose]);

  if (!open || typeof window === 'undefined') return null;

  const groups: { name: string; items: (CmdKItem & { idx: number })[] }[] = [];
  const seen: Record<string, (typeof groups)[0]> = {};
  filtered.forEach((it, i) => {
    if (!seen[it.group]) {
      seen[it.group] = { name: it.group, items: [] };
      groups.push(seen[it.group]!);
    }
    seen[it.group]!.items.push({ ...it, idx: i });
  });

  const activeItemId = filtered.length > 0 ? `${baseId}-opt-${activeIdx}` : undefined;

  // role="presentation" 背景遮罩层，点击/Escape 关闭浮层
  return createPortal(
    <div
      className="tln-cmdk-back"
      role="presentation"
      onClick={onClose}
      onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}
    >
      <div
        ref={modalRef}
        className={cx('tln-cmdk-modal', className)}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="tln-cmdk-search">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--fg-3)', flexShrink: 0 }} aria-hidden="true">
            <circle cx="6.5" cy="6.5" r="4.5"/>
            <path d="M10.5 10.5l3 3"/>
          </svg>
          {/* role="combobox" 在 <input> 上是冗余的 implicit role，删除 */}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            aria-label="Search"
            aria-controls={listboxId}
            aria-activedescendant={activeItemId}
            aria-autocomplete="list"
            aria-expanded={true}
            autoComplete="off"
          />
          <span className="tln-cmdk-esc">ESC</span>
        </div>
        <div id={listboxId} className="tln-cmdk-list" role="listbox" aria-label="Results">
          {groups.length === 0 && (
            <div className="tln-cmdk-empty">No results for "{query}"</div>
          )}
          {groups.map((g) => (
            <div key={g.name} role="group" aria-label={g.name}>
              <div className="tln-cmdk-group-label">{g.name}</div>
              {g.items.map((it) => {
                const isActive = it.idx === activeIdx;
                return (
                  <div
                    key={it.name + it.idx}
                    id={`${baseId}-opt-${it.idx}`}
                    ref={isActive ? activeItemRef : undefined}
                    className={cx('tln-cmdk-item', isActive && 'tln-cmdk-item--active')}
                    role="option"
                    aria-selected={isActive}
                    // listbox 子项由父级 arrow key 管理焦点，tabIndex=-1 让它可接受 focus 但不进入 tab 序列
                    tabIndex={-1}
                    onClick={() => { it.action(); onClose(); }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        it.action();
                        onClose();
                      }
                    }}
                    onMouseEnter={() => setActiveIdx(it.idx)}
                  >
                    {it.icon != null && (
                      <span className="tln-cmdk-item__icon" aria-hidden="true">{it.icon}</span>
                    )}
                    <div className="tln-cmdk-item__name">
                      {it.name}
                      {it.hint && <span className="tln-cmdk-item__hint">{it.hint}</span>}
                    </div>
                    {it.kbd && <span className="tln-cmdk-item__kbd">{it.kbd}</span>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="tln-cmdk-foot" aria-hidden="true">
          <span>↑↓ navigate</span>
          <span>↩ open</span>
          <span style={{ marginLeft: 'auto' }}>esc close</span>
        </div>
      </div>
    </div>,
    document.body,
  );
}

CmdKOverlay.displayName = 'CmdKOverlay';
