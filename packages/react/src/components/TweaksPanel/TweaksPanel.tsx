import { useState } from 'react';
import { cx } from '../../primitives/clsx.js';
import { SegmentedGroup, SegmentedItem } from '../Segmented/index.js';
import type { TweaksPanelProps } from './TweaksPanel.types.js';

const THEME_SWATCHES = [
  { id: 'ink',      label: 'Ink',      bg: '#7d97ff' },
  { id: 'onyx',     label: 'Onyx',     bg: '#e6cf4a' },
  { id: 'pewter',   label: 'Pewter',   bg: '#b8d6f0' },
  { id: 'iron',     label: 'Iron',     bg: '#e85d4a' },
  { id: 'phosphor', label: 'Phosphor', bg: '#b6e63e' },
  { id: 'indigo',   label: 'Indigo',   bg: '#8194f0' },
  { id: 'violet',   label: 'Violet',   bg: '#b298f0' },
  { id: 'sky',      label: 'Sky',      bg: '#5cb6ee' },
  { id: 'teal',     label: 'Teal',     bg: '#56cbb8' },
] as const;

export function TweaksPanel({
  theme,
  mode,
  density,
  font,
  lang,
  onSet,
  defaultOpen = true,
  className,
}: TweaksPanelProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={cx('tln-tweaks', !open && 'tln-tweaks--collapsed', className)}>
      <button
        type="button"
        className="tln-tweaks__head"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M8 2L14 14H2L8 2Z"/>
        </svg>
        <span className="tln-tweaks__label">Tweaks</span>
        <svg
          className="tln-tweaks__chev"
          width="12" height="12" viewBox="0 0 16 16"
          fill="none" stroke="currentColor" strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4"/>
        </svg>
      </button>

      {open && (
        <div className="tln-tweaks__body">
          <div className="tln-tweaks__row">
            <span className="tln-tweaks__key">Theme</span>
            <div className="tln-tweaks__swatches">
              {THEME_SWATCHES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className="tln-tweaks__swatch"
                  style={{ background: t.bg }}
                  aria-pressed={theme === t.id}
                  aria-label={t.label}
                  title={t.label}
                  onClick={() => onSet('theme', t.id)}
                />
              ))}
            </div>
          </div>

          <div className="tln-tweaks__row">
            <span className="tln-tweaks__key">Mode</span>
            <SegmentedGroup size="sm" value={mode} onValueChange={(v) => onSet('mode', v)}>
              <SegmentedItem value="dark">Dark</SegmentedItem>
              <SegmentedItem value="light">Light</SegmentedItem>
            </SegmentedGroup>
          </div>

          <div className="tln-tweaks__row">
            <span className="tln-tweaks__key">Language</span>
            <SegmentedGroup size="sm" value={lang} onValueChange={(v) => onSet('lang', v)}>
              <SegmentedItem value="en">EN</SegmentedItem>
              <SegmentedItem value="zh">中文</SegmentedItem>
            </SegmentedGroup>
          </div>

          <div className="tln-tweaks__row">
            <span className="tln-tweaks__key">Density</span>
            <SegmentedGroup size="sm" value={density} onValueChange={(v) => onSet('density', v)}>
              <SegmentedItem value="compact">Compact</SegmentedItem>
              <SegmentedItem value="standard">Standard</SegmentedItem>
              <SegmentedItem value="relaxed">Relaxed</SegmentedItem>
            </SegmentedGroup>
          </div>

          <div className="tln-tweaks__row">
            <span className="tln-tweaks__key">Font</span>
            <SegmentedGroup size="sm" value={font} onValueChange={(v) => onSet('font', v)}>
              <SegmentedItem value="geist">Geist</SegmentedItem>
              <SegmentedItem value="plex">Plex</SegmentedItem>
              <SegmentedItem value="jetbrains">JBM</SegmentedItem>
              <SegmentedItem value="system">Sys</SegmentedItem>
            </SegmentedGroup>
          </div>
        </div>
      )}
    </div>
  );
}

TweaksPanel.displayName = 'TweaksPanel';
export { THEME_SWATCHES };
