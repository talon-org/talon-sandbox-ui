'use client';

/**
 * Preview — live component demo container.
 *
 * Must-fix §1: All @talon-sandbox/react components may use hooks/refs and
 * therefore require a client boundary. This component is 'use client',
 * meaning everything rendered inside it (including imported lib components)
 * runs on the client. The parent MDX page stays RSC.
 *
 * S2: TweaksPanel controls data-mode on THIS wrapper div only — it does not
 * touch <html> data-mode (that's owned by next-themes / Fumadocs toggle).
 * Each preview is a self-contained themed island.
 */

import { type ReactNode, useState, useCallback } from 'react';
import {
  TweaksPanel,
  type TweaksTheme,
  type TweaksMode,
  type TweaksDensity,
  type TweaksFont,
  type TweaksLang,
} from '@talon-sandbox/react';

const LS_KEYS = {
  theme:   'tln:v2:theme',
  mode:    'tln:v2:mode',
  density: 'tln:v2:density',
  font:    'tln:v2:font',
  lang:    'tln:v2:lang',
} as const;

function readLS<T extends string>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try { return (localStorage.getItem(key) as T | null) ?? fallback; }
  catch { return fallback; }
}

function writeLS(key: string, value: string): void {
  try { localStorage.setItem(key, value); } catch { /* Safari private */ }
}

interface PreviewProps {
  children: ReactNode;
  /** Minimum height of the preview canvas. Default: 80px */
  minHeight?: number;
  /** Additional class on the canvas wrapper */
  className?: string;
}

export function Preview({ children, minHeight = 80, className }: PreviewProps) {
  const [theme,   setTheme]   = useState<TweaksTheme>  (() => readLS(LS_KEYS.theme,   'ink'));
  const [mode,    setMode]    = useState<TweaksMode>   (() => readLS(LS_KEYS.mode,    'dark'));
  const [density, setDensity] = useState<TweaksDensity>(() => readLS(LS_KEYS.density, 'standard'));
  const [font,    setFont]    = useState<TweaksFont>   (() => readLS(LS_KEYS.font,    'geist'));
  const [lang,    setLang]    = useState<TweaksLang>   (() => readLS(LS_KEYS.lang,    'en'));

  const handleSet = useCallback((
    key: 'theme' | 'mode' | 'density' | 'font' | 'lang',
    value: string,
  ) => {
    writeLS(LS_KEYS[key], value);
    if (key === 'theme')   setTheme(value as TweaksTheme);
    if (key === 'mode')    setMode(value as TweaksMode);
    if (key === 'density') setDensity(value as TweaksDensity);
    if (key === 'font')    setFont(value as TweaksFont);
    if (key === 'lang')    setLang(value as TweaksLang);
  }, []);

  return (
    <div
      data-theme={theme}
      data-mode={mode}
      data-density={density}
      data-font={font}
      data-lang={lang}
      className={`tln-preview-host not-prose ${className ?? ''}`}
      style={{
        position: 'relative',
        border: '1px solid var(--line)',
        borderRadius: '6px',
        background: 'var(--bg-0)',
        padding: '24px',
        minHeight,
        marginBottom: '16px',
      }}
    >
      {/* TweaksPanel: pinned top-right inside canvas, default closed */}
      <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 10 }}>
        <TweaksPanel
          theme={theme}
          mode={mode}
          density={density}
          font={font}
          lang={lang}
          onSet={handleSet}
          defaultOpen={false}
        />
      </div>

      {children}
    </div>
  );
}
