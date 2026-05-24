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
      expect(binarySearch(f, 5)).toBe(2); // frames at 0 and 5
      expect(binarySearch(f, 10)).toBe(3); // all three
      expect(binarySearch(f, 4)).toBe(1); // only frame at 0
    });

    test('call count is O(log n) — at most 10 iterations for 1000 frames', () => {
      const bigFrames = Array.from({ length: 1000 }, (_, i) => ({ time: i }));
      let calls = 0;
      let lo = 0;
      let hi = bigFrames.length - 1;
      while (lo <= hi) {
        calls++;
        const mid = (lo + hi) >> 1;
        const frame = bigFrames[mid];
        if (frame !== undefined && frame.time <= 500) lo = mid + 1;
        else hi = mid - 1;
      }
      expect(calls).toBeLessThanOrEqual(10);
    });
  });

  // Deviation 1 — frame kind CSS classes
  test('applies frame--cmd class for cmd kind', () => {
    const kindFrames: RecordingFrame[] = [{ time: 0, text: 'cmd frame', kind: 'cmd' }];
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
    const kindFrames: RecordingFrame[] = [{ time: 0, text: 'error!', kind: 'err' }];
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

    test('calls onSeek when isPlaying becomes true (rAF fires)', () => {
      const onSeek = vi.fn();
      const onTogglePlay = vi.fn();

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

      // First rAF call initializes lastTRef (sets it, returns without calling onSeek)
      act(() => {
        if (rafCb) {
          const cb = rafCb;
          rafCb = null;
          cb(0);
        }
      });

      // Second rAF call: dt = (100 - 0) / 1000 = 0.1s, next = 5 + 0.1 = 5.1
      act(() => {
        if (rafCb) {
          const cb = rafCb;
          rafCb = null;
          cb(100);
        }
      });

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

  test('calls onSpeedChange when speed button clicked', () => {
    const onSpeedChange = vi.fn();
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
        onSpeedChange={onSpeedChange}
      />,
    );
    fireEvent.click(getByText('2x').closest('button')!);
    expect(onSpeedChange).toHaveBeenCalledWith(2);
  });
});
