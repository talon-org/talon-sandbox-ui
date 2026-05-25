'use client';
import { useEffect, useState } from 'react';
import {
  TweaksPanel,
  type TweaksTheme,
  type TweaksMode,
  type TweaksDensity,
  type TweaksFont,
  type TweaksLang,
} from '@/components/TalonComponents';

export function TweaksPanelDemo() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<TweaksTheme>('ink');
  const [mode, setMode] = useState<TweaksMode>('dark');
  const [density, setDensity] = useState<TweaksDensity>('standard');
  const [font, setFont] = useState<TweaksFont>('geist');
  const [lang, setLang] = useState<TweaksLang>('en');

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const handleSet = (key: 'theme' | 'mode' | 'density' | 'font' | 'lang', value: string) => {
    if (key === 'theme') setTheme(value as TweaksTheme);
    if (key === 'mode') setMode(value as TweaksMode);
    if (key === 'density') setDensity(value as TweaksDensity);
    if (key === 'font') setFont(value as TweaksFont);
    if (key === 'lang') setLang(value as TweaksLang);
  };

  return (
    <div style={{ position: 'relative', minHeight: 60, display: 'flex', alignItems: 'flex-start', gap: 16 }}>
      <TweaksPanel
        theme={theme}
        mode={mode}
        density={density}
        font={font}
        lang={lang}
        onSet={handleSet}
        defaultOpen={true}
      />
      <div style={{ color: 'var(--fg-3)', fontSize: 12, paddingTop: 4 }}>
        theme: {theme} / mode: {mode} / density: {density}
      </div>
    </div>
  );
}
