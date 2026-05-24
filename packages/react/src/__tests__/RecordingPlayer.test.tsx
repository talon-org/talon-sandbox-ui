import { render, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { RecordingPlayer } from '../components/RecordingPlayer/index.js';
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
});
