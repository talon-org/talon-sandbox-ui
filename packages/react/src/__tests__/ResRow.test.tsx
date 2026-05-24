import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { ResRow } from '../components/ResRow/index.js';

describe('ResRow', () => {
  test('renders label', () => {
    const { getByText } = render(<ResRow label="vCPU" used={1} max={4} />);
    expect(getByText('vCPU')).toBeInTheDocument();
  });

  test('renders used and max values', () => {
    const { getByText } = render(<ResRow label="CPU" used={75} max={100} />);
    expect(getByText('75')).toBeInTheDocument();
    expect(getByText('100')).toBeInTheDocument();
  });

  test('renders unit', () => {
    const { getByText } = render(<ResRow label="CPU" used={2} max={4} unit="cores" />);
    expect(getByText('cores')).toBeInTheDocument();
  });

  test('progress bar width reflects used/max ratio', () => {
    const { container } = render(<ResRow label="Mem" used={75} max={100} />);
    const fill = container.querySelector('.fill') as HTMLElement;
    expect(fill.style.width).toBe('75%');
  });

  test('clamps progress at 100% when used exceeds max', () => {
    const { container } = render(<ResRow label="Disk" used={150} max={100} />);
    const fill = container.querySelector('.fill') as HTMLElement;
    expect(fill.style.width).toBe('100%');
  });

  test('renders tln-res-row wrapper', () => {
    const { container } = render(<ResRow label="L" used={0} max={10} />);
    expect(container.querySelector('.tln-res-row')).toBeInTheDocument();
  });
});
