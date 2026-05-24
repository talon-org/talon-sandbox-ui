/*
 * Talon Sandbox UI - Tailwind CSS v3 preset
 * Maps CSS variables from tokens.css into Tailwind utilities.
 *
 * Usage:
 *   // tailwind.config.cjs
 *   module.exports = {
 *     presets: [require('@talon-sandbox/tokens/preset')],
 *     content: ['./src/**\/*.{js,jsx,ts,tsx}'],
 *   }
 *
 * Also import tokens.css in your entry CSS:
 *   @import '@talon-sandbox/tokens/css';
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-mode="light"]'],
  theme: {
    extend: {
      colors: {
        // Surfaces
        bg: {
          0: 'var(--bg-0)',
          1: 'var(--bg-1)',
          2: 'var(--bg-2)',
          3: 'var(--bg-3)',
          4: 'var(--bg-4)',
          input: 'var(--bg-input)',
          hover: 'var(--bg-hover)',
          active: 'var(--bg-active)',
        },
        // Lines / borders
        line: {
          DEFAULT: 'var(--line)',
          soft: 'var(--line-soft)',
          strong: 'var(--line-strong)',
          emphasis: 'var(--line-emphasis)',
        },
        // Text
        fg: {
          0: 'var(--fg-0)',
          1: 'var(--fg-1)',
          2: 'var(--fg-2)',
          3: 'var(--fg-3)',
          4: 'var(--fg-4)',
        },
        // Accent (ink blue by default)
        acc: {
          DEFAULT: 'var(--acc)',
          fg: 'var(--acc-fg)',
          soft: 'var(--acc-soft)',
          line: 'var(--acc-line)',
          strong: 'var(--acc-strong)',
          dim: 'var(--acc-dim)',
        },
        // Status
        ok: {
          DEFAULT: 'var(--ok)',
          soft: 'var(--ok-soft)',
        },
        warn: {
          DEFAULT: 'var(--warn)',
          soft: 'var(--warn-soft)',
        },
        err: {
          DEFAULT: 'var(--err)',
          soft: 'var(--err-soft)',
        },
        info: {
          DEFAULT: 'var(--info)',
          soft: 'var(--info-soft)',
        },
        magenta: {
          DEFAULT: 'var(--magenta)',
          soft: 'var(--magenta-soft)',
        },
        teal: {
          DEFAULT: 'var(--teal)',
          soft: 'var(--teal-soft)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      fontSize: {
        'tln-xs':   'var(--text-xs)',
        'tln-sm':   'var(--text-sm)',
        'tln-base': 'var(--text-base)',
        'tln-md':   'var(--text-md)',
        'tln-lg':   'var(--text-lg)',
        'tln-xl':   'var(--text-xl)',
        'tln-2xl':  'var(--text-2xl)',
        'tln-3xl':  'var(--text-3xl)',
        'tln-4xl':  'var(--text-4xl)',
      },
      spacing: {
        's-0':  'var(--s-0)',
        's-1':  'var(--s-1)',
        's-2':  'var(--s-2)',
        's-3':  'var(--s-3)',
        's-4':  'var(--s-4)',
        's-5':  'var(--s-5)',
        's-6':  'var(--s-6)',
        's-7':  'var(--s-7)',
        's-8':  'var(--s-8)',
        's-9':  'var(--s-9)',
        's-10': 'var(--s-10)',
        's-11': 'var(--s-11)',
        's-12': 'var(--s-12)',
      },
      borderRadius: {
        'tln-1':    'var(--r-1)',
        'tln-2':    'var(--r-2)',
        'tln-3':    'var(--r-3)',
        'tln-4':    'var(--r-4)',
        'tln-5':    'var(--r-5)',
        'tln-full': 'var(--r-full)',
      },
      boxShadow: {
        'tln-1': 'var(--shadow-1)',
        'tln-2': 'var(--shadow-2)',
        'tln-3': 'var(--shadow-3)',
      },
      height: {
        'ctrl-sm': 'var(--ctrl-h-sm)',
        'ctrl-md': 'var(--ctrl-h-md)',
        'ctrl-lg': 'var(--ctrl-h-lg)',
        'row':     'var(--row-h)',
        'topbar':  'var(--topbar-h)',
      },
      width: {
        'sidebar': 'var(--sidebar-w)',
      },
      transitionTimingFunction: {
        'tln-out': 'var(--ease-out)',
        'tln-in-out': 'var(--ease-in-out)',
      },
      transitionDuration: {
        'tln-fast': 'var(--dur-fast)',
        'tln-base': 'var(--dur-base)',
        'tln-slow': 'var(--dur-slow)',
      },
      zIndex: {
        cmdk:   'var(--z-cmdk)',
        drawer: 'var(--z-drawer)',
        dialog: 'var(--z-dialog)',
        toast:  'var(--z-toast)',
      },
    },
  },
  plugins: [],
};
