export type TweaksTheme =
  | 'ink' | 'onyx' | 'pewter' | 'iron' | 'phosphor'
  | 'indigo' | 'violet' | 'sky' | 'teal';

export type TweaksMode = 'dark' | 'light';
export type TweaksDensity = 'compact' | 'standard' | 'relaxed';
export type TweaksFont = 'geist' | 'plex' | 'jetbrains' | 'system';
export type TweaksLang = 'en' | 'zh';

export interface TweaksPanelProps {
  theme: TweaksTheme;
  mode: TweaksMode;
  density: TweaksDensity;
  font: TweaksFont;
  lang: TweaksLang;
  onSet: (key: 'theme' | 'mode' | 'density' | 'font' | 'lang', value: string) => void;
  className?: string;
}
