import { useState, useCallback, useEffect } from 'react';
import type { GlobalProvider } from '@ladle/react';
import {
  TweaksPanel,
  type TweaksTheme,
  type TweaksMode,
  type TweaksDensity,
  type TweaksFont,
  type TweaksLang,
} from '@talon-sandbox/react';
import '@talon-sandbox/react/styles';

// localStorage keys — same as talon-sandbox-console
const LS_KEYS = {
  theme:   'tln:v2:theme',
  mode:    'tln:v2:mode',
  density: 'tln:v2:density',
  font:    'tln:v2:font',
  lang:    'tln:v2:lang',
} as const;

function readLS<T extends string>(key: string, fallback: T): T {
  try {
    return (localStorage.getItem(key) as T | null) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeLS(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Safari private mode — ignore
  }
}

function applyToRoot(key: string, value: string): void {
  (document.documentElement.dataset as Record<string, string>)[key] = value;
}

export const Provider: GlobalProvider = ({ children }) => {
  const [theme,   setTheme]   = useState<TweaksTheme>  (() => readLS(LS_KEYS.theme,   'ink'));
  const [mode,    setMode]    = useState<TweaksMode>   (() => readLS(LS_KEYS.mode,    'dark'));
  const [density, setDensity] = useState<TweaksDensity>(() => readLS(LS_KEYS.density, 'standard'));
  const [font,    setFont]    = useState<TweaksFont>   (() => readLS(LS_KEYS.font,    'geist'));
  const [lang,    setLang]    = useState<TweaksLang>   (() => readLS(LS_KEYS.lang,    'en'));

  // Apply all values to <html> on mount (covers page reload with existing LS)
  useEffect(() => {
    applyToRoot('theme',   theme);
    applyToRoot('mode',    mode);
    applyToRoot('density', density);
    applyToRoot('font',    font);
    applyToRoot('lang',    lang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSet = useCallback((
    key: 'theme' | 'mode' | 'density' | 'font' | 'lang',
    value: string,
  ) => {
    writeLS(LS_KEYS[key], value);
    applyToRoot(key, value);
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
      style={{ minHeight: '100vh' }}
    >
      {/* TweaksPanel: fixed top-right, floats above story canvas, default closed */}
      <div style={{
        position: 'fixed',
        top: 12,
        right: 12,
        zIndex: 9999,
      }}>
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
};
