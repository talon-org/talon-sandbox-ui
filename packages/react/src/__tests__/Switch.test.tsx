import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import { Switch } from '../components/Switch/Switch.js';

describe('Switch', () => {
  test('renders with tln-switch base class and role=switch', () => {
    render(<Switch />);
    const el = screen.getByRole('switch');
    expect(el.className).toContain('tln-switch');
  });

  test('checked=true sets aria-checked=true', () => {
    render(<Switch checked />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  test('checked=false sets aria-checked=false', () => {
    render(<Switch checked={false} />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  test('calls onChange when clicked', async () => {
    const fn = vi.fn();
    render(<Switch checked={false} onChange={fn} />);
    await userEvent.click(screen.getByRole('switch'));
    expect(fn).toHaveBeenCalledWith(true);
  });

  test('disabled prevents onChange from firing', async () => {
    const fn = vi.fn();
    render(<Switch disabled onChange={fn} />);
    await userEvent.click(screen.getByRole('switch'));
    expect(fn).not.toHaveBeenCalled();
  });
});
