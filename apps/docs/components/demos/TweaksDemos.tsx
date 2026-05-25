'use client';
import { useState } from 'react';
import { TweaksPanel } from '@/components/TalonComponents';

export function TweaksPanelDemo() {
  const [theme, setTheme] = useState('ink');
  const [mode, setMode] = useState('dark');
  const [density, setDensity] = useState('standard');
  const [font, setFont] = useState('geist');
  const [lang, setLang] = useState('en');

  const handleSet = (key: string, value: string) => {
    if (key === 'theme') setTheme(value);
    if (key === 'mode') setMode(value);
    if (key === 'density') setDensity(value);
    if (key === 'font') setFont(value);
    if (key === 'lang') setLang(value);
  };

  return (
    <div style={{ position: 'relative', minHeight: 60, display: 'flex', alignItems: 'flex-start', gap: 16 }}>
      <TweaksPanel
        theme={theme as 'ink'} mode={mode as 'dark'} density={density as 'standard'} font={font as 'geist'} lang={lang as 'en'}
        onSet={handleSet}
        defaultOpen={true}
      />
      <div style={{ color: 'var(--fg-3)', fontSize: 12, paddingTop: 4 }}>
        theme: {theme} / mode: {mode} / density: {density}
      </div>
    </div>
  );
}
