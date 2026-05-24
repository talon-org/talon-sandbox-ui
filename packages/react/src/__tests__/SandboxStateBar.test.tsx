import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { SandboxStateBar, DEFAULT_STATE_ORDER } from '../components/SandboxStateBar/index.js';
import type { StateCountMap } from '../components/SandboxStateBar/index.js';

describe('SandboxStateBar', () => {
  test('renders 0 segments when all counts are zero', () => {
    const { container } = render(<SandboxStateBar counts={{}} />);
    const track = container.querySelector('.tln-state-bar__track')!;
    expect(track.children.length).toBe(0);
  });

  test('renders N segments for N non-zero states', () => {
    const counts: StateCountMap = { running: 5, failed: 2, idle: 3 };
    const { container } = render(<SandboxStateBar counts={counts} />);
    const segments = container.querySelectorAll('.tln-state-bar__segment');
    expect(segments.length).toBe(3);
  });

  test('renders all 8 legend items regardless of counts', () => {
    const { container } = render(<SandboxStateBar counts={{ running: 10 }} />);
    const legendItems = container.querySelectorAll('.tln-state-bar__legend-item');
    expect(legendItems.length).toBe(DEFAULT_STATE_ORDER.length);
  });

  test('zero-count legend items have zero modifier class', () => {
    const { container } = render(<SandboxStateBar counts={{ running: 5 }} />);
    const zeroItems = container.querySelectorAll('.tln-state-bar__legend-count--zero');
    expect(zeroItems.length).toBe(DEFAULT_STATE_ORDER.length - 1);
  });

  test('segment count matches non-zero custom stateOrder', () => {
    const counts: StateCountMap = { running: 4, failed: 1 };
    const { container } = render(
      <SandboxStateBar counts={counts} stateOrder={['running', 'failed']} />
    );
    const segments = container.querySelectorAll('.tln-state-bar__segment');
    expect(segments.length).toBe(2);
  });

  test('has accessible track with role=img', () => {
    render(<SandboxStateBar counts={{ running: 3 }} />);
    expect(screen.getByRole('img', { name: /sandbox state distribution/i })).toBeInTheDocument();
  });

  test('renders "Running" in legend', () => {
    render(<SandboxStateBar counts={{ running: 5 }} />);
    expect(screen.getByText('Running')).toBeInTheDocument();
  });

  test('applies custom stateColors to segment background', () => {
    const { container } = render(
      <SandboxStateBar counts={{ running: 5 }} stateColors={{ running: 'hotpink' }} />
    );
    const seg = container.querySelector('.tln-state-bar__segment') as HTMLElement;
    expect(seg.style.background).toBe('hotpink');
  });
});
