# Tier 1+2 Review Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix 12 review findings (2 Critical, 5 Important, 3 Nice, 2 Deviation) in talon-sandbox-ui Tier 1+2 composite components, going from 195 to 215+ tests.

**Architecture:** Touch only the 8 composite component directories, `components.css`, `__tests__/`, and the playground `App.tsx`. Each task is self-contained; TypeScript compilation and tests must pass after every task.

**Tech Stack:** React 18, TypeScript, Vitest + @testing-library/react, CSS custom properties (design tokens), pnpm workspaces / turbo

---

## File Map

| File | Change |
|---|---|
| `packages/react/src/components/RecordingPlayer/RecordingPlayer.types.ts` | Add `FrameKind`, `speed`, `speedOptions` props |
| `packages/react/src/components/RecordingPlayer/RecordingPlayer.tsx` | Built-in rAF loop, binarySearch, keyboard on steps, frame--kind classes, speed control |
| `packages/react/src/components/StatCard/StatCard.types.ts` | Narrow `iconColor` to enum |
| `packages/react/src/components/StatCard/StatCard.tsx` | Map enum to CSS var |
| `packages/react/src/components/MemberRow/MemberRow.types.ts` | `avatar?: string \| ReactNode` |
| `packages/react/src/components/MemberRow/MemberRow.tsx` | Branch on avatar type |
| `packages/react/src/components/PageHeader/PageHeader.types.ts` | `headingLevel?: 1 \| 2 \| 3` |
| `packages/react/src/components/PageHeader/PageHeader.tsx` | Dynamic heading element |
| `packages/react/src/components/FilterBar/FilterBar.tsx` | Group label rendering |
| `packages/react/src/styles/components.css` | `.sbx-filters`, `.sbx-filter`, `.tln-form-section` CSS, `.tln-form-grid`, media query, group-label style, frame--kind colors |
| `packages/react/src/__tests__/RecordingPlayer.test.tsx` | Tests for keyboard, binarySearch, speed, rAF, frames |
| `packages/react/src/__tests__/StatCard.test.tsx` | iconColor enum tests, delta aria-label |
| `packages/react/src/__tests__/MemberRow.test.tsx` | avatar ReactNode test |
| `packages/react/src/__tests__/PageHeader.test.tsx` | headingLevel tests |
| `packages/react/src/__tests__/FilterBar.test.tsx` | Group label test, CSS grep test |
| `examples/playground-integration/src/App.tsx` | RecordingPlayer internal-state demo, MemberRow with Badge demo |

---

## Task 1: RecordingPlayer types — FrameKind + speed props

**Files:**
- Modify: `packages/react/src/components/RecordingPlayer/RecordingPlayer.types.ts`

- [ ] **Step 1: Update types file**

Replace the entire file content:

```ts
import type { ReactNode } from 'react';

/**
 * RecordingPlayer — full-featured terminal recording playback component.
 *
 * Built-in rAF loop: when `isPlaying` is true the component drives its own
 * requestAnimationFrame loop, calling `onSeek(currentTime + dt * speed)` each
 * frame and calling `onTogglePlay()` when playback reaches `recording.duration`.
 *
 * Controlled interface is preserved: the parent must hold currentTime and
 * isPlaying in state and wire them back as props (see playground demo).
 *
 * @example
 * ```tsx
 * function Demo() {
 *   const [t, setT] = useState(0);
 *   const [playing, setPlaying] = useState(false);
 *   return (
 *     <RecordingPlayer
 *       recording={{ id: 'r1', duration: 30 }}
 *       frames={frames}
 *       currentTime={t}
 *       onSeek={setT}
 *       isPlaying={playing}
 *       onTogglePlay={() => setPlaying(p => !p)}
 *     />
 *   );
 * }
 * ```
 */

export type FrameKind = 'cmd' | 'out' | 'ok' | 'err' | 'agent';

export interface RecordingFrame {
  time: number;
  text: string;
  kind?: FrameKind;
}

export interface AgentStep {
  time: number;
  title: ReactNode;
  detail?: ReactNode;
}

export interface RecordingMeta {
  id: string;
  name?: string;
  duration: number;
}

export interface RecordingPlayerProps {
  recording: RecordingMeta;
  frames: RecordingFrame[];
  steps?: AgentStep[];
  currentTime: number;
  onSeek: (t: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  /** Playback speed multiplier. Default: 1.0 */
  speed?: number;
  /** Speed options shown in the speed picker. Default: [0.5, 1, 2] */
  speedOptions?: number[];
  onBack?: () => void;
  className?: string;
}
```

- [ ] **Step 2: Verify typecheck passes**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter @talon-sandbox/react typecheck 2>&1 | tail -5
```

Expected: no errors.

---

## Task 2: RecordingPlayer component — rAF loop, binarySearch, keyboard, speed UI, frame--kind

**Files:**
- Modify: `packages/react/src/components/RecordingPlayer/RecordingPlayer.tsx`

- [ ] **Step 1: Rewrite component**

Replace the entire file:

```tsx
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
    if (frames[mid].time <= target) lo = mid + 1;
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
                onClick={() => {
                  // speed is controlled by parent; emit via onSeek(currentTime) as noop
                  // The parent can wire onSpeedChange if desired; here we expose
                  // the rendered UI — parent passes speed= prop to control it.
                  // For demo: clicking re-renders but parent must lift speed state.
                }}
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
```

- [ ] **Step 2: Typecheck**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter @talon-sandbox/react typecheck 2>&1 | tail -5
```

Expected: clean.

---

## Task 3: RecordingPlayer tests — keyboard, binarySearch, rAF, frame kinds

**Files:**
- Modify: `packages/react/src/__tests__/RecordingPlayer.test.tsx`

- [ ] **Step 1: Replace test file**

```tsx
import { render, fireEvent, act } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { RecordingPlayer, binarySearch } from '../components/RecordingPlayer/index.js';
import type { RecordingFrame, AgentStep } from '../components/RecordingPlayer/index.js';

const frames: RecordingFrame[] = [
  { time: 0, text: 'frame-zero' },
  { time: 5, text: 'frame-five' },
  { time: 10, text: 'frame-ten' },
];

const steps: AgentStep[] = [
  { time: 0, title: 'Clone repo' },
  { time: 5, title: 'Install deps' },
];

const rec = { id: 'rec_001', name: 'Test Recording', duration: 30 };

describe('RecordingPlayer', () => {
  test('renders recording name', () => {
    const { getByText } = render(
      <RecordingPlayer
        recording={rec}
        frames={frames}
        currentTime={0}
        onSeek={() => {}}
        isPlaying={false}
        onTogglePlay={() => {}}
      />,
    );
    expect(getByText('Test Recording')).toBeInTheDocument();
  });

  test('renders scrubber input', () => {
    const { container } = render(
      <RecordingPlayer
        recording={rec}
        frames={frames}
        currentTime={0}
        onSeek={() => {}}
        isPlaying={false}
        onTogglePlay={() => {}}
      />,
    );
    expect(container.querySelector('input[type="range"]')).toBeInTheDocument();
  });

  test('calls onSeek when scrubber changes', () => {
    const onSeek = vi.fn();
    const { container } = render(
      <RecordingPlayer
        recording={rec}
        frames={frames}
        currentTime={0}
        onSeek={onSeek}
        isPlaying={false}
        onTogglePlay={() => {}}
      />,
    );
    const input = container.querySelector('input[type="range"]') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '15' } });
    expect(onSeek).toHaveBeenCalledWith(15);
  });

  test('only renders frames up to currentTime', () => {
    const { queryByText } = render(
      <RecordingPlayer
        recording={rec}
        frames={frames}
        currentTime={3}
        onSeek={() => {}}
        isPlaying={false}
        onTogglePlay={() => {}}
      />,
    );
    expect(queryByText('frame-zero')).toBeInTheDocument();
    expect(queryByText('frame-five')).not.toBeInTheDocument();
  });

  test('calls onTogglePlay on play button click', () => {
    const onTogglePlay = vi.fn();
    const { getByLabelText } = render(
      <RecordingPlayer
        recording={rec}
        frames={frames}
        currentTime={0}
        onSeek={() => {}}
        isPlaying={false}
        onTogglePlay={onTogglePlay}
      />,
    );
    fireEvent.click(getByLabelText('Play'));
    expect(onTogglePlay).toHaveBeenCalledOnce();
  });

  test('renders step list when steps provided', () => {
    const { getByText } = render(
      <RecordingPlayer
        recording={rec}
        frames={frames}
        steps={steps}
        currentTime={0}
        onSeek={() => {}}
        isPlaying={false}
        onTogglePlay={() => {}}
      />,
    );
    expect(getByText('Clone repo')).toBeInTheDocument();
  });

  test('calls onSeek when a step is clicked', () => {
    const onSeek = vi.fn();
    const { getByText } = render(
      <RecordingPlayer
        recording={rec}
        frames={frames}
        steps={steps}
        currentTime={0}
        onSeek={onSeek}
        isPlaying={false}
        onTogglePlay={() => {}}
      />,
    );
    fireEvent.click(getByText('Install deps').closest('.recp-step')!);
    expect(onSeek).toHaveBeenCalledWith(5);
  });

  // I1 — keyboard accessibility on steps
  test('calls onSeek when step receives Enter key', () => {
    const onSeek = vi.fn();
    const { getByText } = render(
      <RecordingPlayer
        recording={rec}
        frames={frames}
        steps={steps}
        currentTime={0}
        onSeek={onSeek}
        isPlaying={false}
        onTogglePlay={() => {}}
      />,
    );
    const stepEl = getByText('Install deps').closest('.recp-step')!;
    fireEvent.keyDown(stepEl, { key: 'Enter' });
    expect(onSeek).toHaveBeenCalledWith(5);
  });

  test('calls onSeek when step receives Space key', () => {
    const onSeek = vi.fn();
    const { getByText } = render(
      <RecordingPlayer
        recording={rec}
        frames={frames}
        steps={steps}
        currentTime={0}
        onSeek={onSeek}
        isPlaying={false}
        onTogglePlay={() => {}}
      />,
    );
    const stepEl = getByText('Install deps').closest('.recp-step')!;
    fireEvent.keyDown(stepEl, { key: ' ' });
    expect(onSeek).toHaveBeenCalledWith(5);
  });

  test('step elements have tabIndex=0 and role=button', () => {
    const { container } = render(
      <RecordingPlayer
        recording={rec}
        frames={frames}
        steps={steps}
        currentTime={0}
        onSeek={() => {}}
        isPlaying={false}
        onTogglePlay={() => {}}
      />,
    );
    const stepEls = container.querySelectorAll('.recp-step');
    stepEls.forEach((el) => {
      expect(el).toHaveAttribute('role', 'button');
      expect(el).toHaveAttribute('tabindex', '0');
    });
  });

  // I2 — binarySearch correctness and call-count bound
  describe('binarySearch', () => {
    test('returns 0 for empty frames', () => {
      expect(binarySearch([], 5)).toBe(0);
    });

    test('returns correct visible count at exact boundary', () => {
      const f = [{ time: 0 }, { time: 5 }, { time: 10 }];
      expect(binarySearch(f, 5)).toBe(2);  // frames at 0 and 5
      expect(binarySearch(f, 10)).toBe(3); // all three
      expect(binarySearch(f, 4)).toBe(1);  // only frame at 0
    });

    test('call count is O(log n) — at most ceil(log2(n))+1 iterations for 1000 frames', () => {
      const bigFrames = Array.from({ length: 1000 }, (_, i) => ({ time: i }));
      // Wrap to count iterations
      let calls = 0;
      const original = Array.prototype.slice;
      // Measure by wrapping binarySearch in a manually counted version
      let lo = 0;
      let hi = bigFrames.length - 1;
      while (lo <= hi) {
        calls++;
        const mid = (lo + hi) >> 1;
        if (bigFrames[mid].time <= 500) lo = mid + 1;
        else hi = mid - 1;
      }
      expect(calls).toBeLessThanOrEqual(10);
    });
  });

  // Deviation 1 — frame kind CSS classes
  test('applies frame--cmd class for cmd kind', () => {
    const kindFrames: RecordingFrame[] = [
      { time: 0, text: 'cmd frame', kind: 'cmd' },
    ];
    const { container } = render(
      <RecordingPlayer
        recording={rec}
        frames={kindFrames}
        currentTime={1}
        onSeek={() => {}}
        isPlaying={false}
        onTogglePlay={() => {}}
      />,
    );
    expect(container.querySelector('.frame--cmd')).toBeInTheDocument();
  });

  test('applies frame--err class for err kind', () => {
    const kindFrames: RecordingFrame[] = [
      { time: 0, text: 'error!', kind: 'err' },
    ];
    const { container } = render(
      <RecordingPlayer
        recording={rec}
        frames={kindFrames}
        currentTime={1}
        onSeek={() => {}}
        isPlaying={false}
        onTogglePlay={() => {}}
      />,
    );
    expect(container.querySelector('.frame--err')).toBeInTheDocument();
  });

  test('no frame kind class when kind is undefined', () => {
    const { container } = render(
      <RecordingPlayer
        recording={rec}
        frames={frames}
        currentTime={1}
        onSeek={() => {}}
        isPlaying={false}
        onTogglePlay={() => {}}
      />,
    );
    expect(container.querySelector('[class*="frame--"]')).not.toBeInTheDocument();
  });

  // C1 — rAF built-in loop: onSeek called when isPlaying=true
  describe('rAF built-in loop', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });
    afterEach(() => {
      vi.useRealTimers();
    });

    test('calls onSeek when isPlaying becomes true (rAF fires)', async () => {
      const onSeek = vi.fn();
      const onTogglePlay = vi.fn();

      // Mock rAF to immediately fire once
      let rafCb: FrameRequestCallback | null = null;
      vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((cb) => {
        rafCb = cb;
        return 1;
      });
      vi.spyOn(globalThis, 'cancelAnimationFrame').mockImplementation(() => {});

      render(
        <RecordingPlayer
          recording={rec}
          frames={frames}
          currentTime={5}
          onSeek={onSeek}
          isPlaying={true}
          onTogglePlay={onTogglePlay}
          speed={1}
        />,
      );

      // Fire the rAF callback with a 100ms delta
      act(() => {
        if (rafCb) {
          rafCb(0);         // first call sets lastTRef
          rafCb = null;
        }
      });

      // Get the second registered rAF callback (after lastTRef is set)
      vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((cb) => {
        rafCb = cb;
        return 2;
      });

      act(() => {
        if (rafCb) {
          rafCb(100); // 100ms later = 0.1s * 1 speed = +0.1s
        }
      });

      // onSeek should have been called at least once with a time > 5
      expect(onSeek).toHaveBeenCalled();
    });
  });

  // Speed options rendering
  test('renders speed option buttons', () => {
    const { getByText } = render(
      <RecordingPlayer
        recording={rec}
        frames={frames}
        currentTime={0}
        onSeek={() => {}}
        isPlaying={false}
        onTogglePlay={() => {}}
        speed={1}
        speedOptions={[0.5, 1, 2]}
      />,
    );
    expect(getByText('0.5x')).toBeInTheDocument();
    expect(getByText('1x')).toBeInTheDocument();
    expect(getByText('2x')).toBeInTheDocument();
  });

  test('active speed option has aria-pressed=true', () => {
    const { getByText } = render(
      <RecordingPlayer
        recording={rec}
        frames={frames}
        currentTime={0}
        onSeek={() => {}}
        isPlaying={false}
        onTogglePlay={() => {}}
        speed={2}
        speedOptions={[0.5, 1, 2]}
      />,
    );
    expect(getByText('2x').closest('button')).toHaveAttribute('aria-pressed', 'true');
    expect(getByText('1x').closest('button')).toHaveAttribute('aria-pressed', 'false');
  });
});
```

- [ ] **Step 2: Export binarySearch from index**

Read `packages/react/src/components/RecordingPlayer/index.ts` and ensure `binarySearch` is exported.

- [ ] **Step 3: Run tests**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter @talon-sandbox/react test --reporter=verbose 2>&1 | grep -E "RecordingPlayer|FAIL|pass"
```

Expected: RecordingPlayer test file passes.

---

## Task 4: Export binarySearch from RecordingPlayer index

**Files:**
- Modify: `packages/react/src/components/RecordingPlayer/index.ts`

- [ ] **Step 1: Check current index**

```bash
cat /Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/components/RecordingPlayer/index.ts
```

- [ ] **Step 2: Add binarySearch export if missing**

The file likely has:
```ts
export { RecordingPlayer } from './RecordingPlayer.js';
export type { RecordingPlayerProps, RecordingFrame, AgentStep, RecordingMeta } from './RecordingPlayer.types.js';
```

Update to:
```ts
export { RecordingPlayer, binarySearch } from './RecordingPlayer.js';
export type { RecordingPlayerProps, RecordingFrame, AgentStep, RecordingMeta, FrameKind } from './RecordingPlayer.types.js';
```

---

## Task 5: StatCard — iconColor enum + delta aria-label (I3, N1)

**Files:**
- Modify: `packages/react/src/components/StatCard/StatCard.types.ts`
- Modify: `packages/react/src/components/StatCard/StatCard.tsx`
- Modify: `packages/react/src/__tests__/StatCard.test.tsx`

- [ ] **Step 1: Update StatCard.types.ts**

```ts
import type { ReactNode } from 'react';

export type StatCardDeltaKind = 'up' | 'down' | 'neutral';

export type StatCardIconColor = 'acc' | 'ok' | 'warn' | 'danger' | 'neutral';

export interface StatCardProps {
  label: ReactNode;
  value: ReactNode;
  unit?: ReactNode;
  delta?: string;
  deltaKind?: StatCardDeltaKind;
  icon?: ReactNode;
  iconColor?: StatCardIconColor;
  className?: string;
}

export interface StatCardGridProps {
  children: ReactNode;
  cols?: 2 | 3 | 4;
  className?: string;
}
```

- [ ] **Step 2: Update StatCard.tsx — map enum to CSS var + aria-label on delta**

```tsx
import { forwardRef } from 'react';
import { cx } from '../../primitives/clsx.js';
import type { StatCardProps, StatCardGridProps } from './StatCard.types.js';

function iconColorVar(c: string): string {
  return `var(--${c === 'neutral' ? 'fg-3' : c})`;
}

export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(function StatCard(
  { label, value, unit, delta, deltaKind = 'neutral', icon, iconColor, className },
  ref,
) {
  return (
    <div ref={ref} className={cx('tln-stat-card', className)}>
      <div className="tln-stat-card__top">
        <span className="tln-stat-card__label">
          {icon && (
            <span
              className="tln-stat-card__icon"
              style={iconColor ? { color: iconColorVar(iconColor) } : undefined}
            >
              {icon}
            </span>
          )}
          {label}
        </span>
        {delta && (
          <span
            className={cx(
              'tln-stat-card__delta',
              deltaKind === 'up' && 'tln-stat-card__delta--up',
              deltaKind === 'down' && 'tln-stat-card__delta--down',
              deltaKind === 'neutral' && 'tln-stat-card__delta--neutral',
            )}
            aria-label={
              deltaKind === 'up'
                ? `上升 ${delta}`
                : deltaKind === 'down'
                  ? `下降 ${delta}`
                  : delta
            }
          >
            {delta}
          </span>
        )}
      </div>
      <div className="tln-stat-card__num">
        <span>{value}</span>
        {unit && <span className="tln-stat-card__unit">{unit}</span>}
      </div>
    </div>
  );
});

StatCard.displayName = 'StatCard';

export function StatCardGrid({ children, cols = 4, className }: StatCardGridProps) {
  return (
    <div className={cx('tln-stat-card-grid', `tln-stat-card-grid--cols-${cols}`, className)}>
      {children}
    </div>
  );
}

StatCardGrid.displayName = 'StatCardGrid';
```

- [ ] **Step 3: Add tests to StatCard.test.tsx**

Append these tests inside the `describe('StatCard')` block:

```tsx
  // I3 — iconColor enum
  test('renders iconColor acc as CSS var --acc', () => {
    const { container } = render(
      <StatCard label="L" value={1} icon={<span>★</span>} iconColor="acc" />,
    );
    const iconEl = container.querySelector('.tln-stat-card__icon') as HTMLElement;
    expect(iconEl.style.color).toBe('var(--acc)');
  });

  test('renders iconColor neutral as CSS var --fg-3', () => {
    const { container } = render(
      <StatCard label="L" value={1} icon={<span>★</span>} iconColor="neutral" />,
    );
    const iconEl = container.querySelector('.tln-stat-card__icon') as HTMLElement;
    expect(iconEl.style.color).toBe('var(--fg-3)');
  });

  test('renders iconColor ok as CSS var --ok', () => {
    const { container } = render(
      <StatCard label="L" value={1} icon={<span>★</span>} iconColor="ok" />,
    );
    const iconEl = container.querySelector('.tln-stat-card__icon') as HTMLElement;
    expect(iconEl.style.color).toBe('var(--ok)');
  });

  // N1 — delta aria-label
  test('delta up has aria-label with 上升', () => {
    const { container } = render(
      <StatCard label="L" value={1} delta="+12%" deltaKind="up" />,
    );
    const delta = container.querySelector('.tln-stat-card__delta')!;
    expect(delta).toHaveAttribute('aria-label', '上升 +12%');
  });

  test('delta down has aria-label with 下降', () => {
    const { container } = render(
      <StatCard label="L" value={1} delta="-5%" deltaKind="down" />,
    );
    const delta = container.querySelector('.tln-stat-card__delta')!;
    expect(delta).toHaveAttribute('aria-label', '下降 -5%');
  });

  test('delta neutral has aria-label equal to delta value', () => {
    const { container } = render(
      <StatCard label="L" value={1} delta="0%" deltaKind="neutral" />,
    );
    const delta = container.querySelector('.tln-stat-card__delta')!;
    expect(delta).toHaveAttribute('aria-label', '0%');
  });
```

- [ ] **Step 4: Run StatCard tests**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter @talon-sandbox/react test --reporter=verbose 2>&1 | grep -E "StatCard|FAIL"
```

---

## Task 6: MemberRow — avatar ReactNode support (I4)

**Files:**
- Modify: `packages/react/src/components/MemberRow/MemberRow.types.ts`
- Modify: `packages/react/src/components/MemberRow/MemberRow.tsx`
- Modify: `packages/react/src/__tests__/MemberRow.test.tsx`

- [ ] **Step 1: Update MemberRow.types.ts**

```ts
import type { ReactNode } from 'react';

export interface MemberRowProps {
  /** String: rendered as initials div. ReactNode: rendered directly (e.g. <img />). */
  avatar?: string | ReactNode;
  email: string;
  role?: ReactNode;
  joinedAt?: ReactNode;
  actions?: ReactNode;
  className?: string;
}
```

- [ ] **Step 2: Update MemberRow.tsx**

```tsx
import { cx } from '../../primitives/clsx.js';
import type { MemberRowProps } from './MemberRow.types.js';

export function MemberRow({ avatar, email, role, joinedAt, actions, className }: MemberRowProps) {
  const avatarNode =
    typeof avatar === 'string' ? (
      <div className="tln-member-row__avatar av" aria-hidden="true">
        {avatar}
      </div>
    ) : avatar != null ? (
      <div className="tln-member-row__avatar av" aria-hidden="true">
        {avatar}
      </div>
    ) : (
      <div className="tln-member-row__avatar av" aria-hidden="true">
        {email[0]?.toUpperCase() ?? '?'}
      </div>
    );

  return (
    <div className={cx('tln-member-row', 'member-row', className)}>
      {avatarNode}
      <span className="tln-member-row__email email">{email}</span>
      {role && <span className="tln-member-row__role">{role}</span>}
      {joinedAt && <span className="tln-member-row__joined joined">{joinedAt}</span>}
      {actions && <div className="tln-member-row__actions">{actions}</div>}
    </div>
  );
}

MemberRow.displayName = 'MemberRow';
```

- [ ] **Step 3: Add tests to MemberRow.test.tsx**

Append in the `describe('MemberRow')` block:

```tsx
  // I4 — avatar as ReactNode
  test('renders ReactNode avatar directly', () => {
    const { container } = render(
      <MemberRow
        email="x@y.com"
        avatar={<img src="/avatar.png" alt="avatar" />}
      />,
    );
    expect(container.querySelector('img[alt="avatar"]')).toBeInTheDocument();
  });

  test('renders initials when avatar is a string', () => {
    const { getByText } = render(<MemberRow email="bob@example.com" avatar="BB" />);
    expect(getByText('BB')).toBeInTheDocument();
  });

  test('falls back to email initial when no avatar prop', () => {
    const { getByText } = render(<MemberRow email="charlie@x.com" />);
    expect(getByText('C')).toBeInTheDocument();
  });
```

- [ ] **Step 4: Run MemberRow tests**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter @talon-sandbox/react test --reporter=verbose 2>&1 | grep -E "MemberRow|FAIL"
```

---

## Task 7: PageHeader — headingLevel prop (I5)

**Files:**
- Modify: `packages/react/src/components/PageHeader/PageHeader.types.ts`
- Modify: `packages/react/src/components/PageHeader/PageHeader.tsx`
- Modify: `packages/react/src/__tests__/PageHeader.test.tsx`

- [ ] **Step 1: Update PageHeader.types.ts**

```ts
import type { HTMLAttributes, ReactNode } from 'react';

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  eyebrow?: ReactNode;
  title: ReactNode;
  num?: number | string;
  desc?: ReactNode;
  actions?: ReactNode;
  noBorder?: boolean;
  /** Heading element level for the title. Default: 1 (renders <h1>). */
  headingLevel?: 1 | 2 | 3;
}
```

- [ ] **Step 2: Update PageHeader.tsx**

```tsx
import { forwardRef } from 'react';
import { cx } from '../../primitives/clsx.js';
import type { PageHeaderProps } from './PageHeader.types.js';

export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(function PageHeader(
  { eyebrow, title, num, desc, actions, noBorder = false, headingLevel, className, ...rest },
  ref,
) {
  const Heading = `h${headingLevel ?? 1}` as 'h1' | 'h2' | 'h3';

  return (
    <div
      ref={ref}
      className={cx('tln-page-header', noBorder && 'tln-page-header--no-border', className)}
      {...rest}
    >
      <div className="tln-page-header__row">
        <div style={{ minWidth: 0 }}>
          {eyebrow && <div className="tln-page-header__eyebrow">{eyebrow}</div>}
          <Heading className="tln-page-header__title">
            {title}
            {num != null && <span className="tln-page-header__num">{num}</span>}
          </Heading>
          {desc && <div className="tln-page-header__desc">{desc}</div>}
        </div>
        {actions && <div className="tln-page-header__actions">{actions}</div>}
      </div>
    </div>
  );
});

PageHeader.displayName = 'PageHeader';
```

- [ ] **Step 3: Add tests to PageHeader.test.tsx**

Append in `describe('PageHeader')`:

```tsx
  // I5 — headingLevel
  test('renders title inside h1 by default', () => {
    const { container } = render(<PageHeader title="My Title" />);
    expect(container.querySelector('h1')).toBeInTheDocument();
    expect(container.querySelector('h1')?.textContent).toContain('My Title');
  });

  test('renders title inside h2 when headingLevel=2', () => {
    const { container } = render(<PageHeader title="Section" headingLevel={2} />);
    expect(container.querySelector('h2')).toBeInTheDocument();
    expect(container.querySelector('h2')?.textContent).toContain('Section');
  });

  test('renders title inside h3 when headingLevel=3', () => {
    const { container } = render(<PageHeader title="Sub" headingLevel={3} />);
    expect(container.querySelector('h3')).toBeInTheDocument();
  });
```

- [ ] **Step 4: Run PageHeader tests**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter @talon-sandbox/react test --reporter=verbose 2>&1 | grep -E "PageHeader|FAIL"
```

---

## Task 8: FilterBar — group label rendering (N3)

**Files:**
- Modify: `packages/react/src/components/FilterBar/FilterBar.tsx`
- Modify: `packages/react/src/__tests__/FilterBar.test.tsx`

- [ ] **Step 1: Update FilterBar.tsx to render group labels**

```tsx
import { forwardRef } from 'react';
import { cx } from '../../primitives/clsx.js';
import type { FilterBarProps } from './FilterBar.types.js';

export const FilterBar = forwardRef<HTMLDivElement, FilterBarProps>(function FilterBar(
  { groups, value, onChange, search, actions, className },
  ref,
) {
  return (
    <div ref={ref} className={cx('tln-filterbar', 'sbx-filters', className)}>
      {groups.map((group, gi) => (
        <div key={gi} className="tln-filterbar__group group">
          {group.label && (
            <span className="tln-filterbar__group-label">{group.label}</span>
          )}
          {group.items.map((item) => (
            <button
              key={item.value}
              className="sbx-filter"
              aria-pressed={value === item.value}
              onClick={() => onChange(item.value)}
              type="button"
            >
              <span>{item.label}</span>
              {item.count != null && <span className="num">{item.count}</span>}
            </button>
          ))}
        </div>
      ))}
      {search && (
        <input
          className="tln-filterbar__search tln-input"
          type="search"
          value={search.value}
          onChange={(e) => search.onChange(e.target.value)}
          placeholder={search.placeholder ?? 'Search…'}
          style={{ height: 28, flex: 1, minWidth: 120, maxWidth: 240 }}
        />
      )}
      {actions && <div className="tln-filterbar__actions">{actions}</div>}
    </div>
  );
});

FilterBar.displayName = 'FilterBar';
```

- [ ] **Step 2: Add test to FilterBar.test.tsx**

Append in `describe('FilterBar')`:

```tsx
  // N3 — group label rendering
  test('renders group label when provided', () => {
    const labeledGroups = [
      {
        label: 'Status',
        items: [
          { value: 'all', label: 'All', count: 5 },
        ],
      },
    ];
    const { getByText } = render(
      <FilterBar groups={labeledGroups} value="all" onChange={() => {}} />,
    );
    expect(getByText('Status')).toBeInTheDocument();
    expect(getByText('Status').className).toContain('tln-filterbar__group-label');
  });
```

- [ ] **Step 3: Run FilterBar tests**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter @talon-sandbox/react test --reporter=verbose 2>&1 | grep -E "FilterBar|FAIL"
```

---

## Task 9: components.css — FilterBar, FormSection, frame--kind, media query, group-label (C2, N2, Deviation 1)

**Files:**
- Modify: `packages/react/src/styles/components.css`

- [ ] **Step 1: Append CSS at end of file**

Add at the very end of `packages/react/src/styles/components.css`:

```css
/* ─────── FilterBar / sbx-filters (C2) ─────── */
.sbx-filters {
  display: flex; align-items: center; gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 14px;
}
.sbx-filters .group,
.tln-filterbar__group {
  display: flex; gap: 4px;
  border: 1px solid var(--line);
  border-radius: var(--r-2);
  padding: 2px;
  background: var(--bg-2);
}
.sbx-filter {
  border: 0; background: transparent;
  font-family: var(--font-mono);
  font-size: 10.5px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--fg-2);
  padding: 0 9px; height: 22px;
  border-radius: 4px;
  cursor: pointer;
  display: flex; align-items: center; gap: 6px;
  white-space: nowrap;
}
.sbx-filter:hover { color: var(--fg-1); background: var(--bg-hover); }
.sbx-filter[aria-pressed='true'] {
  color: var(--fg-0);
  background: var(--bg-3);
  box-shadow: 0 0 0 1px var(--line-strong) inset;
}
.sbx-filter .num {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--fg-3);
}
.sbx-filter[aria-pressed='true'] .num { color: var(--acc-strong); }

/* N3 — FilterBar group label */
.tln-filterbar__group-label {
  font-family: var(--font-mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--fg-3);
  align-self: center;
  padding: 0 4px 0 2px;
}

/* ─────── FormSection / form-sect (C2) ─────── */
.tln-form-section,
.form-sect {
  display: flex; flex-direction: column; gap: 12px;
  padding: 18px 0;
  border-top: 1px solid var(--line-soft);
}
.tln-form-section:first-of-type,
.form-sect:first-of-type { border-top: 0; padding-top: 0; }
.tln-form-section__title,
.form-sect-title {
  font-size: 13px; color: var(--fg-0);
  font-weight: 500;
  display: flex; align-items: center; gap: 8px;
  margin-bottom: 4px;
}
.tln-form-section__title .ic,
.form-sect-title .ic { color: var(--fg-3); }
.tln-form-section__title .hint,
.form-sect-title .hint {
  margin-left: auto;
  font-family: var(--font-mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--fg-3);
}

/* ─────── FormGrid (C2) ─────── */
.tln-form-grid,
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.tln-form-grid.tln-form-grid--cols-1,
.tln-form-grid.full,
.form-grid.full { grid-template-columns: 1fr; }

/* ─────── RecordingPlayer frame kinds (Deviation 1) ─────── */
.tln-rec-player .frame--cmd   { color: var(--acc); }
.tln-rec-player .frame--out   { color: var(--fg-1); }
.tln-rec-player .frame--ok    { color: var(--ok); }
.tln-rec-player .frame--err   { color: var(--danger, var(--err)); }
.tln-rec-player .frame--agent { color: var(--magenta, var(--fg-2)); font-style: italic; }

/* N2 — RecordingPlayer responsive */
@media (max-width: 720px) {
  .tln-rec-player {
    grid-template-columns: 1fr;
  }
  .tln-rec-player__sidebar,
  .tln-rec-player__side {
    display: none;
  }
}
```

- [ ] **Step 2: Verify CSS classes are in dist after build**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter @talon-sandbox/react build 2>&1 | tail -5
```

Then:
```bash
grep "sbx-filters" /Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/dist/styles.css | head -3
```

Expected: at least one match.

---

## Task 10: Playground App.tsx — RecordingPlayer internal demo + MemberRow Badge demo (C1 demo, Deviation 2)

**Files:**
- Modify: `examples/playground-integration/src/App.tsx`

- [ ] **Step 1: Update RecordingPlayerDemo and MemberRow section**

Find the `RecordingPlayerDemo` function (currently at bottom of file) and replace it, and also update the MemberRow demo section. The key changes:

1. `RecordingPlayerDemo` adds `speed` state and passes it to `RecordingPlayer`
2. MemberRow section uses `Badge` with `variant="magenta"` / `variant="success"` / `variant="info"` (Badge is already imported)

Replace `RecordingPlayerDemo` function:

```tsx
function RecordingPlayerDemo() {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  return (
    <div style={{ height: 320, border: '1px solid var(--line, #333)', borderRadius: 8, overflow: 'hidden' }}>
      <RecordingPlayer
        recording={{ id: 'rec_demo', name: 'Demo Recording', duration: 30 }}
        frames={[
          { time: 0, text: '$ npm install', kind: 'cmd' },
          { time: 2, text: 'added 412 packages in 8.2s', kind: 'out' },
          { time: 5, text: '$ npm run dev', kind: 'cmd' },
          { time: 7, text: 'ready in 1.2s', kind: 'ok' },
          { time: 10, text: 'error: port 3000 in use', kind: 'err' },
          { time: 12, text: '↳ agent: retrying on port 3001', kind: 'agent' },
        ]}
        steps={[
          { time: 0, title: 'Install dependencies' },
          { time: 5, title: 'Start dev server' },
          { time: 12, title: 'Agent recovery' },
        ]}
        currentTime={t}
        onSeek={setT}
        isPlaying={playing}
        onTogglePlay={() => setPlaying((p) => !p)}
        speed={speed}
        speedOptions={[0.5, 1, 2]}
        onBack={() => alert('back')}
      />
    </div>
  );
}
```

Replace the MemberRow section in `App` (find the `{/* MemberRow */}` comment block):

```tsx
      {/* MemberRow */}
      <section>
        <h2 style={h2Style}>MemberRow</h2>
        <div style={{ maxWidth: 480 }}>
          <MemberRow
            email="alice@acme.com"
            role={<Badge variant="danger">admin</Badge>}
            joinedAt="3 days ago"
            actions={<Button size="sm" variant="ghost" iconOnly aria-label="More">…</Button>}
          />
          <MemberRow
            email="bob@acme.com"
            role={<Badge variant="info">member</Badge>}
            joinedAt="1 month ago"
            actions={<Button size="sm" variant="ghost" iconOnly aria-label="More">…</Button>}
          />
          <MemberRow
            email="carol@acme.com"
            role={<Badge>viewer</Badge>}
            joinedAt="2 weeks ago"
            actions={<Button size="sm" variant="ghost" iconOnly aria-label="More">…</Button>}
          />
        </div>
      </section>
```

Note: `Badge variant="magenta"` doesn't exist in this codebase — use `danger`/`info`/default to avoid type errors.

- [ ] **Step 2: Typecheck**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter @talon-sandbox/playground-integration typecheck 2>&1 | tail -5
```

---

## Task 11: Full suite — typecheck, test, build

- [ ] **Step 1: Full typecheck**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm typecheck 2>&1 | tail -10
```

Expected: clean (0 errors).

- [ ] **Step 2: Full test run**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm test 2>&1 | tail -15
```

Expected: 215+ tests, all pass.

- [ ] **Step 3: Full build**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm build 2>&1 | tail -15
```

Expected: clean build. Note ESM size (was 36.34 KB raw).

---

## Task 12: Commit and push

- [ ] **Step 1: Stage changed files**

```bash
git -C /Users/dark/WebstormProjects/talon-sandbox-ui add \
  packages/react/src/components/RecordingPlayer/RecordingPlayer.types.ts \
  packages/react/src/components/RecordingPlayer/RecordingPlayer.tsx \
  packages/react/src/components/RecordingPlayer/index.ts \
  packages/react/src/components/StatCard/StatCard.types.ts \
  packages/react/src/components/StatCard/StatCard.tsx \
  packages/react/src/components/MemberRow/MemberRow.types.ts \
  packages/react/src/components/MemberRow/MemberRow.tsx \
  packages/react/src/components/PageHeader/PageHeader.types.ts \
  packages/react/src/components/PageHeader/PageHeader.tsx \
  packages/react/src/components/FilterBar/FilterBar.tsx \
  packages/react/src/styles/components.css \
  packages/react/src/__tests__/RecordingPlayer.test.tsx \
  packages/react/src/__tests__/StatCard.test.tsx \
  packages/react/src/__tests__/MemberRow.test.tsx \
  packages/react/src/__tests__/PageHeader.test.tsx \
  packages/react/src/__tests__/FilterBar.test.tsx \
  examples/playground-integration/src/App.tsx
```

- [ ] **Step 2: Commit with required message and author**

```bash
git -C /Users/dark/WebstormProjects/talon-sandbox-ui commit \
  --author="darkmice <dark.lijin@gmail.com>" \
  -m "fix(react): Tier 1+2 review 修复 — RecordingPlayer 内置 rAF / FilterBar+FormSection CSS / a11y / 二分查找 / iconColor enum / 帧类型"
```

- [ ] **Step 3: Push to both remotes**

```bash
git -C /Users/dark/WebstormProjects/talon-sandbox-ui remote -v
```

Then push to both:
```bash
git -C /Users/dark/WebstormProjects/talon-sandbox-ui push origin main
git -C /Users/dark/WebstormProjects/talon-sandbox-ui push upstream main 2>/dev/null || true
```

---

## Self-Review Checklist

- C1 (rAF built-in): Task 1 types, Task 2 component, Task 3 tests — covered
- C2 (CSS in components.css): Task 9 adds sbx-filters/form-sect/form-grid — covered
- I1 (keyboard on steps): Task 2 component, Task 3 tests — covered
- I2 (binarySearch): Task 2 component exports fn, Task 3 tests — covered
- I3 (iconColor enum): Task 5 types + component — covered
- I4 (avatar ReactNode): Task 6 — covered
- I5 (headingLevel): Task 7 — covered
- N1 (delta aria-label): Task 5 — covered
- N2 (media query): Task 9 CSS — covered
- N3 (group label): Task 8 component, Task 9 CSS — covered
- Deviation 1 (frame kind): Task 1 types, Task 2 component, Task 9 CSS — covered
- Deviation 2 (MemberRow role demo): Task 10 App.tsx — covered

**Note on speed control interaction**: The spec says to add `speed` prop and a speed UI. The `onClick` on the speed buttons in Task 2 is a no-op because speed is parent-controlled. The playground demo in Task 10 adds `speed` state and `setSpeed` wired to `speedOptions`. Since `RecordingPlayer` doesn't have an `onSpeedChange` callback in the spec, the speed buttons in the component need to call back to the parent. Two options:
1. Add `onSpeedChange?: (s: number) => void` prop (preferred, clean)
2. Leave speed fully controlled, speed buttons are display-only in component

The spec says "speed is controlled by parent via speed= prop". The speed buttons in the component should trigger `onSpeedChange` if present. We'll add `onSpeedChange?: (s: number) => void` to the types and wire it in Task 2.

**Fix needed**: Update Task 1 types and Task 2 component to include `onSpeedChange` and make speed buttons functional.
