import { forwardRef, Fragment, useMemo } from 'react';
import { cn } from '../../lib/utils.js';
import { Kbd } from './Kbd.js';
import type { KbdSize } from './Kbd.types.js';

/**
 * Shortcut — 渲染一组键位提示。
 *
 * 适用两类语义:
 *   1. Sequential（顺序按键，Vim 风格）: 例如 G 然后 D → ['G', 'D']
 *      默认两个 keycap 之间不显示连接符,留 4px 空隙。
 *   2. Modifier combo（同时按）: 例如 Cmd+Shift+K → ['mod', 'shift', 'K']
 *      mod / cmd / ctrl / shift / alt / opt / enter / esc / space / tab / arrow*
 *      会被自动归一化到对应符号(Mac vs Win/Linux):
 *
 *   token         macOS    Win/Linux
 *   ──────────    ──────   ─────────
 *   mod           ⌘        Ctrl
 *   cmd / meta    ⌘        ⊞ Win
 *   ctrl          ⌃        Ctrl
 *   shift         ⇧        ⇧
 *   alt / opt     ⌥        Alt
 *   enter         ⏎        Enter
 *   esc           Esc      Esc
 *   space         Space    Space
 *   tab           ⇥        Tab
 *   up/down/left/right   ↑ ↓ ← →
 *
 * 单字母（如 'G' / 'k'）原样大写显示。
 *
 * @example
 *   <Shortcut keys={['G', 'D']} />        // Sequential: G then D
 *   <Shortcut keys={['mod', 'N']} />      // ⌘ N (Mac) / Ctrl N (Win)
 *   <Shortcut keys={['mod', 'shift', 'K']} separator="+" />
 */
export interface ShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 键序列。字符串会被自动归一化(见组件 doc)。 */
  keys: string[];
  /** 单个 Kbd 的尺寸。默认 sm,适合 menu / cmd palette 内联使用。 */
  size?: KbdSize;
  /**
   * 键与键之间的连接符。
   * - `'gap'`(默认): 只留空隙,适合 Sequential
   * - `'+'`: 显示 "+",适合 Modifier combo
   * - 任意 string: 自定义
   */
  separator?: 'gap' | '+' | string;
  /**
   * 主机平台。默认自动检测(macOS / 其他)。
   * 服务端渲染场景可以显式传 'mac' 或 'other'。
   */
  platform?: 'mac' | 'other' | 'auto';
}

function detectPlatform(): 'mac' | 'other' {
  if (typeof navigator === 'undefined') return 'other';
  // navigator.platform 已 deprecated 但仍是最稳的 client-side 检测;
  // userAgentData 是异步且部分浏览器不支持。
  return navigator.platform.toUpperCase().includes('MAC') ? 'mac' : 'other';
}

function normalizeKey(raw: string, mac: boolean): string {
  const k = raw.trim().toLowerCase();
  switch (k) {
    case 'mod':            return mac ? '⌘' : 'Ctrl';
    case 'cmd':
    case 'meta':           return mac ? '⌘' : '⊞';
    case 'ctrl':
    case 'control':        return mac ? '⌃' : 'Ctrl';
    case 'shift':          return '⇧';
    case 'alt':
    case 'opt':
    case 'option':         return mac ? '⌥' : 'Alt';
    case 'enter':
    case 'return':         return mac ? '⏎' : 'Enter';
    case 'esc':
    case 'escape':         return 'Esc';
    case 'space':          return 'Space';
    case 'tab':            return mac ? '⇥' : 'Tab';
    case 'backspace':      return mac ? '⌫' : 'Back';
    case 'delete':
    case 'del':            return mac ? '⌦' : 'Del';
    case 'up':
    case 'arrowup':        return '↑';
    case 'down':
    case 'arrowdown':      return '↓';
    case 'left':
    case 'arrowleft':      return '←';
    case 'right':
    case 'arrowright':     return '→';
    default:
      // 单字符大写,多字符原样(如 "F1" / "Home"):
      return raw.length === 1 ? raw.toUpperCase() : raw;
  }
}

export const Shortcut = forwardRef<HTMLSpanElement, ShortcutProps>(
  ({ keys, size = 'sm', separator = 'gap', platform = 'auto', className, ...rest }, ref) => {
    const mac = useMemo(
      () => (platform === 'auto' ? detectPlatform() : platform) === 'mac',
      [platform],
    );
    const rendered = useMemo(() => keys.map(k => normalizeKey(k, mac)), [keys, mac]);

    return (
      <span
        ref={ref}
        className={cn('tln-shortcut', className)}
        aria-label={keys.join('+')}
        {...rest}
      >
        {rendered.map((key, i) => (
          <Fragment key={i}>
            {i > 0 && separator !== 'gap' && (
              <span className="tln-shortcut-sep" aria-hidden="true">{separator}</span>
            )}
            <Kbd size={size}>{key}</Kbd>
          </Fragment>
        ))}
      </span>
    );
  },
);
Shortcut.displayName = 'Shortcut';
