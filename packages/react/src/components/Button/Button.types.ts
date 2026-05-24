import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'default' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. Defaults to "default". Use at most one "primary" per screen. */
  variant?: ButtonVariant;
  /** Height tier. Matches --ctrl-h-sm / --ctrl-h-md / --ctrl-h-lg tokens. */
  size?: ButtonSize;
  /** Square aspect ratio; use for icon-only buttons. */
  iconOnly?: boolean;
  /** Optional keyboard hint label, e.g. "ctrl+k". */
  kbd?: string;
  /** Renders a spinner and disables the button. */
  loading?: boolean;
  /** Content rendered inside the button. */
  children?: ReactNode;
}
