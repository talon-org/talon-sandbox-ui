import { cx } from '../../primitives/clsx.js';
import type { SandboxStateBarProps, SandboxState } from './SandboxStateBar.types.js';

const DEFAULT_STATE_ORDER: SandboxState[] = [
  'running', 'pulling-image', 'provisioning', 'idle',
  'paused', 'terminating', 'failed', 'evicted',
];

const DEFAULT_STATE_COLORS: Record<SandboxState, string> = {
  'running':       'var(--ok)',
  'pulling-image': 'var(--warn)',
  'provisioning':  'var(--warn)',
  'terminating':   'var(--warn)',
  'idle':          'var(--fg-3)',
  'paused':        'var(--fg-4)',
  'failed':        'var(--err)',
  'evicted':       'var(--fg-4)',
};

const STATE_LABELS: Record<SandboxState, string> = {
  'running':       'Running',
  'pulling-image': 'Pulling image',
  'provisioning':  'Provisioning',
  'terminating':   'Terminating',
  'idle':          'Idle',
  'paused':        'Paused',
  'failed':        'Failed',
  'evicted':       'Evicted',
};

export function SandboxStateBar({
  counts,
  stateOrder = DEFAULT_STATE_ORDER,
  stateColors,
  className,
}: SandboxStateBarProps) {
  const colors = stateColors
    ? { ...DEFAULT_STATE_COLORS, ...stateColors }
    : DEFAULT_STATE_COLORS;

  const total = stateOrder.reduce((sum, k) => sum + (counts[k] ?? 0), 0) || 1;

  return (
    <div className={cx('tln-state-bar', className)}>
      <div className="tln-state-bar__track" role="img" aria-label="Sandbox state distribution">
        {stateOrder.map((k) => {
          const c = counts[k] ?? 0;
          if (!c) return null;
          return (
            <div
              key={k}
              className="tln-state-bar__segment"
              style={{ flex: c, background: colors[k] }}
              title={`${STATE_LABELS[k]}: ${c}`}
            />
          );
        })}
      </div>
      <div className="tln-state-bar__legend">
        {stateOrder.map((k) => {
          const c = counts[k] ?? 0;
          return (
            <div key={k} className="tln-state-bar__legend-item">
              <span
                className="tln-state-bar__swatch"
                style={{ background: colors[k] }}
                aria-hidden="true"
              />
              <span className="tln-state-bar__legend-label">{STATE_LABELS[k]}</span>
              <span className={cx('tln-state-bar__legend-count', c === 0 && 'tln-state-bar__legend-count--zero')}>
                {c}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

SandboxStateBar.displayName = 'SandboxStateBar';
export { DEFAULT_STATE_ORDER, DEFAULT_STATE_COLORS };
