import { render, screen, fireEvent } from '@testing-library/react';
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

  // I5 — keyboard navigation
  test('ArrowRight selects the next option', () => {
    const fn = vi.fn();
    const { container } = render(<Segmented value="a" onChange={fn} options={opts} />);
    fireEvent.keyDown(container.firstElementChild!, { key: 'ArrowRight' });
    expect(fn).toHaveBeenCalledWith('b');
  });

  test('ArrowLeft selects the previous option (wraps around)', () => {
    const fn = vi.fn();
    const { container } = render(<Segmented value="a" onChange={fn} options={opts} />);
    fireEvent.keyDown(container.firstElementChild!, { key: 'ArrowLeft' });
    expect(fn).toHaveBeenCalledWith('c');
  });

  test('Home selects the first option', () => {
    const fn = vi.fn();
    const { container } = render(<Segmented value="c" onChange={fn} options={opts} />);
    fireEvent.keyDown(container.firstElementChild!, { key: 'Home' });
    expect(fn).toHaveBeenCalledWith('a');
  });

  test('End selects the last option', () => {
    const fn = vi.fn();
    const { container } = render(<Segmented value="a" onChange={fn} options={opts} />);
    fireEvent.keyDown(container.firstElementChild!, { key: 'End' });
    expect(fn).toHaveBeenCalledWith('c');
  });

  // I6 — disabled
  test('disabled prop adds tln-seg-disabled class and disables all buttons', () => {
    const { container } = render(<Segmented value="a" options={opts} disabled />);
    const group = container.firstElementChild as HTMLElement;
    expect(group.classList.contains('tln-seg-disabled')).toBe(true);
    screen.getAllByRole('button').forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });

  test('option-level disabled disables only that button', () => {
    const disabledOpts = [
      { value: 'a', label: 'Alpha' },
      { value: 'b', label: 'Beta', disabled: true },
      { value: 'c', label: 'Gamma' },
    ];
    render(<Segmented value="a" options={disabledOpts} />);
    expect(screen.getByRole('button', { name: 'Beta' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Alpha' })).not.toBeDisabled();
  });

  // I10 — forwardRef
  test('forwardRef passes ref to outer div', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Segmented ref={ref} value="a" options={opts} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
