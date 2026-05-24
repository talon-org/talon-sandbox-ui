import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import { Button } from '../components/Button/Button.js';

describe('Button', () => {
  test('renders children', () => {
    render(<Button>OK</Button>);
    expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
  });

  test('default variant contains tln-btn base class', () => {
    render(<Button>OK</Button>);
    expect(screen.getByRole('button').className).toContain('tln-btn');
  });

  test('default size is md - no size modifier class', () => {
    render(<Button>OK</Button>);
    const cls = screen.getByRole('button').className;
    expect(cls).toContain('tln-btn');
    expect(cls).not.toContain('tln-btn-sm');
    expect(cls).not.toContain('tln-btn-lg');
  });

  test('primary variant adds tln-btn-primary class', () => {
    render(<Button variant="primary">OK</Button>);
    const cls = screen.getByRole('button').className;
    expect(cls).toContain('tln-btn');
    expect(cls).toContain('tln-btn-primary');
  });

  test('ghost variant adds tln-btn-ghost class', () => {
    render(<Button variant="ghost">OK</Button>);
    expect(screen.getByRole('button').className).toContain('tln-btn-ghost');
  });

  test('danger variant adds tln-btn-danger class', () => {
    render(<Button variant="danger">OK</Button>);
    expect(screen.getByRole('button').className).toContain('tln-btn-danger');
  });

  test('size sm adds tln-btn-sm class', () => {
    render(<Button size="sm">OK</Button>);
    expect(screen.getByRole('button').className).toContain('tln-btn-sm');
  });

  test('size lg adds tln-btn-lg class', () => {
    render(<Button size="lg">OK</Button>);
    expect(screen.getByRole('button').className).toContain('tln-btn-lg');
  });

  test('iconOnly adds tln-btn-icon class', () => {
    render(<Button iconOnly>+</Button>);
    expect(screen.getByRole('button').className).toContain('tln-btn-icon');
  });

  test('loading disables button and sets aria-busy', () => {
    render(<Button loading>OK</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('aria-busy', 'true');
  });

  test('disabled prop disables button', () => {
    render(<Button disabled>OK</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('onClick fires when clicked', async () => {
    const fn = vi.fn();
    render(<Button onClick={fn}>OK</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(fn).toHaveBeenCalledOnce();
  });

  test('onClick does not fire when disabled', async () => {
    const fn = vi.fn();
    render(<Button disabled onClick={fn}>OK</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(fn).not.toHaveBeenCalled();
  });

  test('kbd prop renders a kbd hint span', () => {
    render(<Button kbd="ctrl+k">Search</Button>);
    expect(screen.getByText('ctrl+k')).toBeInTheDocument();
  });

  test('forwardRef passes ref to the underlying button', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<Button ref={ref}>r</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  test('type defaults to button', () => {
    render(<Button>OK</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  test('custom className is appended', () => {
    render(<Button className="my-custom">OK</Button>);
    const cls = screen.getByRole('button').className;
    expect(cls).toContain('tln-btn');
    expect(cls).toContain('my-custom');
  });
});
