import { cx } from '../../primitives/clsx.js';
import type { RecordingPlayerProps } from './RecordingPlayer.types.js';

function fmtT(s: number): string {
  return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
}

export function RecordingPlayer({
  recording,
  frames,
  steps = [],
  currentTime,
  onSeek,
  isPlaying,
  onTogglePlay,
  onBack,
  className,
}: RecordingPlayerProps) {
  const { duration } = recording;
  const visibleFrames = frames.filter((f) => f.time <= currentTime);
  const currentStepIdx = steps.findIndex(
    (s, i) => s.time <= currentTime && (i === steps.length - 1 || (steps[i + 1]?.time ?? Infinity) > currentTime),
  );

  return (
    <div className={cx('tln-rec-player', 'recp', className)}>
      {/* Top bar */}
      <div className="tln-rec-player__top recp-top">
        {onBack && (
          <button className="tln-rec-player__back back" onClick={onBack} type="button">
            ← Recordings
          </button>
        )}
        <div className="tln-rec-player__meta meta">
          <span className="title">{recording.name ?? recording.id}</span>
          <span className="sub">{recording.id}</span>
          <span className="sub">{fmtT(duration)}</span>
        </div>
      </div>

      {/* Stage */}
      <div className="tln-rec-player__stage recp-stage">
        <div className="tln-rec-player__stage-inner recp-stage-inner">
          {visibleFrames.map((f, i) => (
            <div key={i} className="line out">
              {f.text}
            </div>
          ))}
          {isPlaying && currentTime < duration && <span className="caret" />}
        </div>
      </div>

      {/* Steps sidebar */}
      {steps.length > 0 && (
        <div className="tln-rec-player__side recp-side">
          <div className="head">
            <span className="label">Steps</span>
            <span className="count" style={{ marginLeft: 'auto' }}>
              {currentStepIdx + 1} / {steps.length}
            </span>
          </div>
          <div className="steps">
            {steps.map((step, i) => (
              <div
                key={i}
                className={cx(
                  'recp-step',
                  i === currentStepIdx && 'active',
                  step.time <= currentTime && i !== currentStepIdx && 'done',
                )}
                onClick={() => onSeek(step.time)}
              >
                <span className="ix">#{i + 1}</span>
                <span className="ts">{fmtT(step.time)}</span>
                <span className="what">{step.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom scrubber + controls */}
      <div className="tln-rec-player__bot recp-bot">
        <div className="scrubber">
          <div className="track" />
          <div
            className="fill"
            style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
          />
          {steps.map((s, i) => (
            <div
              key={i}
              className={cx('marker', s.time <= currentTime && 'passed')}
              style={{ left: `${duration > 0 ? (s.time / duration) * 100 : 0}%` }}
            />
          ))}
          <div
            className="handle"
            style={{
              left: `calc(${duration > 0 ? (currentTime / duration) * 100 : 0}% - 7px)`,
            }}
          />
          <input
            type="range"
            min={0}
            max={duration}
            step={0.1}
            value={currentTime}
            onChange={(e) => onSeek(+e.target.value)}
            aria-label="Seek"
          />
        </div>
        <div className="controls">
          <button
            className="play"
            onClick={onTogglePlay}
            type="button"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <div className="time">
            <span className="cur">{fmtT(currentTime)}</span> / {fmtT(duration)}
          </div>
        </div>
      </div>
    </div>
  );
}

RecordingPlayer.displayName = 'RecordingPlayer';
