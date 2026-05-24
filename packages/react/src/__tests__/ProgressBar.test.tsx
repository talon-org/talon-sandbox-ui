import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { ProgressBar } from '../components/ProgressBar/index.js';

describe('ProgressBar', () => {
  test('renders deterministic progress bar', () => {
    const { container } = render(<ProgressBar value={50} />);
    expect(container.querySelector('.tln-progress')).toBeInTheDocument();
    const fill = container.querySelector('.fill') as HTMLElement;
    expect(fill.style.width).toBe('50%');
  });

  test('renders indeterminate bar with tln-progress-indet class', () => {
    const { container } = render(<ProgressBar indeterminate />);
    expect(container.querySelector('.tln-progress-indet')).toBeInTheDocument();
    expect(container.querySelector('.tln-progress')).not.toBeInTheDocument();
  });

  test('clamps value to 0-100 range', () => {
    const { container } = render(<ProgressBar value={150} />);
    const fill = container.querySelector('.fill') as HTMLElement;
    expect(fill.style.width).toBe('100%');
  });

  test('sets aria-valuenow', () => {
    const { container } = render(<ProgressBar value={30} />);
    expect(container.querySelector('[aria-valuenow]')).toHaveAttribute('aria-valuenow', '30');
  });
});
