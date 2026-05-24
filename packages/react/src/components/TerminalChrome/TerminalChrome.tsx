import { cx } from '../../primitives/clsx.js';
import type { TerminalChromeProps } from './TerminalChrome.types.js';

export function TerminalChrome({
  sandbox,
  onBack,
  recording = false,
  onToggleRecord,
  topActions,
  bottomStatus,
  children,
  className,
}: TerminalChromeProps) {
  return (
    <div className={cx('tln-term-chrome', className)}>
      <div className="tln-term-chrome__top term-chrome-top">
        {onBack && (
          <button className="tln-term-chrome__back back" onClick={onBack} type="button">
            ← {sandbox.id}
          </button>
        )}
        <div className="tln-term-chrome__info info">
          <span className="tln-term-chrome__dot dot" />
          <span className="id">{sandbox.id}</span>
          {sandbox.name && (
            <>
              <span className="sep">·</span>
              <span className="name">{sandbox.name}</span>
            </>
          )}
        </div>
        <div
          className="tln-term-chrome__actions actions"
          style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}
        >
          {onToggleRecord && (
            <button
              className={cx('tln-term-chrome__rec-btn', 'rec-btn', recording && 'on')}
              onClick={onToggleRecord}
              type="button"
            >
              <span className="dot" />
              {recording ? 'Recording' : 'Record'}
            </button>
          )}
          {topActions}
        </div>
      </div>
      <div className="tln-term-chrome__body term-body">{children}</div>
      {bottomStatus && (
        <div className="tln-term-chrome__bot term-chrome-bot">{bottomStatus}</div>
      )}
    </div>
  );
}

TerminalChrome.displayName = 'TerminalChrome';
