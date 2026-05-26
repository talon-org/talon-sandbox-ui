import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './Kbd.css';

// ─── cva 定义 ─────────────────────────────────────────────────────────────

/** Kbd size variant */
export const kbdVariants = cva('tln-kbd', {
  variants: {
    size: {
      sm: 'tln-kbd-sm',
      md: '',
      lg: 'tln-kbd-lg',
    },
  },
  defaultVariants: { size: 'md' },
});

// ─── Kbd ──────────────────────────────────────────────────────────────────

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {}

/**
 * Kbd — 键位提示 chip，用于 button / tooltip / 命令栏内联场景。
 * 来源：ui-forms.jsx KBD 段
 */
export const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ size, className, children, ...rest }, ref) => (
    <kbd
      ref={ref as React.Ref<HTMLElement>}
      className={cn(kbdVariants({ size }), className)}
      {...rest}
    >
      {children}
    </kbd>
  ),
);
Kbd.displayName = 'Kbd';
