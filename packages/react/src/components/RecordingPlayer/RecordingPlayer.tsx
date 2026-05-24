import { useEffect, useRef, useMemo } from 'react';
import { cx } from '../../primitives/clsx.js';
import type { RecordingPlayerProps } from './RecordingPlayer.types.js';

function fmtT(s: number): string {
  return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
}

/**
 * Binary search: returns the number of frames with time <= target.
 * O(log n) — safe for 10k+ frame recordings.
 */
export function binarySearch(frames: { time: number }[], target: number): number {
  let lo = 0;
  let hi = frames.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const frame = frames[mid];
    if (frame !== undefined && frame.time <= target) lo = mid + 1;
    else hi = mid - 1;
  }
  return lo;
}

const DEFAULT_SPEED_OPTIONS = [0.5, 1, 2];

export function RecordingPlayer({
  recording,
  frames,
  steps = [],
  currentTime,
  onSeek,
  isPlaying,
  onTogglePlay,
  speed = 1,
  onSpeedChange,
  speedOptions = DEFAULT_SPEED_OPTIONS,
  onBack,
  className,
}: RecordingPlayerProps) {
  const { duration } = recording;

  // ── Built-in rAF loop (C1) ──────────────────────────────────────────────
  const lastTRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      lastTRef.current = null;
      return;
    }

    let raf: number;

    function tick(now: number) {
      if (lastTRef.current === null) {
        lastTRef.current = now;
        raf = requestAnimationFrame(tick);
        return;
      }
      const dt = (now - lastTRef.current) / 1000;
      lastTRef.current = now;

      const next = currentTime + dt * speed;

      if (next >= duration) {
        onSeek(duration);
        onTogglePlay(); // stop
        return;
      }

      onSeek(next);
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // currentTime intentionally excluded: we read it via closure snapshot at
    // rAF start; parent updates it each frame via onSeek.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, speed, duration]);

  // ── Visible frames via binary search (I2) ─────────────────────────────
  const visibleCount = useMemo(() => binarySearch(frames, currentTime), [frames, currentTime]);
  const visibleFrames = frames.slice(0, visibleCount);

  // ── Current step index ────────────────────────────────────────────────
  const currentStepIdx = steps.findIndex(
    (s, i) =>
      s.time <= currentTime &&
      (i === steps.length - 1 || (steps[i + 1]?.time ?? Infinity) > currentTime),
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
            <div key={i} className={cx('line', 'frame', f.kind && `frame--${f.kind}`)}>
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
                role="button"
                tabIndex={0}
                className={cx(
                  'recp-step',
                  i === currentStepIdx && 'active',
                  step.time <= currentTime && i !== currentStepIdx && 'done',
                )}
                onClick={() => onSeek(step.time)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSeek(step.time);
                  }
                }}
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
          {/* Speed control (C1) */}
          <div className="tln-rec-player__speed">
            {speedOptions.map((s) => (
              <button
                key={s}
                type="button"
                className={cx('speed-opt', s === speed && 'active')}
                aria-pressed={s === speed}
                onClick={() => onSpeedChange?.(s)}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

RecordingPlayer.displayName = 'RecordingPlayer';
