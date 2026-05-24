import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import { Segmented } from '../components/Segmented/Segmented.js';

const opts = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma' },
];

describe('Segmented', () => {
  test('renders with tln-seg base class', () => {
    const { container } = render(<Segmented value="a" options={opts} />);
    expect(container.firstElementChild?.className).toContain('tln-seg');
  });

  test('active option has aria-pressed=true', () => {
    render(<Segmented value="b" options={opts} />);
    expect(screen.getByRole('button', { name: 'Beta' })).toHaveAttribute('aria-pressed', 'true');
  });

  test('inactive options have aria-pressed=false', () => {
    render(<Segmented value="b" options={opts} />);
    expect(screen.getByRole('button', { name: 'Alpha' })).toHaveAttribute('aria-pressed', 'false');
  });

  test('calls onChange with the selected value', async () => {
    const fn = vi.fn();
    render(<Segmented value="a" onChange={fn} options={opts} />);
    await userEvent.click(screen.getByRole('button', { name: 'Gamma' }));
    expect(fn).toHaveBeenCalledWith('c');
  });
});
