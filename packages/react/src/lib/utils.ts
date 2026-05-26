import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 合并 class 名,支持条件类与 tailwind utility 去重。
 *
 * Talon cva 产出的是 `tln-*` 语义类,twMerge 在内部场景下无明显作用,
 * 但保留它是为了让消费方在 app 层叠加 tailwind utility 时,组件能优雅共存。
 *
 * @example
 *   cn('tln-btn', 'tln-btn-primary', isActive && 'active')
 *   cn(buttonVariants({ variant: 'primary' }), className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
