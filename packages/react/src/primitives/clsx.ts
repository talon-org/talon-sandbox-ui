import { clsx as _clsx } from 'clsx';
export type { ClassValue } from 'clsx';

/**
 * Lightweight className merger. Re-exports clsx directly.
 * Drop-in: import { cx } from '../primitives/clsx.js'
 */
export const cx = _clsx;
export default _clsx;
