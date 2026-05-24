import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Input } from '../components/Input/Input.js';

describe('Input', () => {
  test('renders with tln-input base class', () => {
    render(<Input data-testid="i" />);
    expect(screen.getByTestId('i').className).toContain('tln-input');
  });

  test('size lg adds tln-input-lg class', () => {
    render(<Input data-testid="i" size="lg" />);
    expect(screen.getByTestId('i').className).toContain('tln-input-lg');
  });

  test('invalid adds error class and aria-invalid', () => {
    render(<Input data-testid="i" invalid />);
    const el = screen.getByTestId('i');
    expect(el.className).toContain('error');
    expect(el).toHaveAttribute('aria-invalid', 'true');
  });

  test('not-invalid outputs aria-invalid=false', () => {
    render(<Input data-testid="i" />);
    expect(screen.getByTestId('i')).toHaveAttribute('aria-invalid', 'false');
  });

  test('with prefix wraps in tln-input-wrap', () => {
    render(<Input data-testid="i" prefix={<span>@</span>} />);
    const input = screen.getByTestId('i');
    expect(input.closest('.tln-input-wrap')).toBeInTheDocument();
  });

  test('forwardRef passes ref to the underlying input', () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  // C2 — className lands on outermost element
  test('className with prefix/suffix goes to the wrap div, not the inner input', () => {
    const { container } = render(
      <Input data-testid="i" prefix={<span>@</span>} className="w-full" />,
    );
    const wrap = container.firstElementChild as HTMLElement;
    expect(wrap.classList.contains('tln-input-wrap')).toBe(true);
    expect(wrap.classList.contains('w-full')).toBe(true);
    expect(screen.getByTestId('i').className).not.toContain('w-full');
  });

  test('className without prefix/suffix goes directly to the input', () => {
    render(<Input data-testid="i" className="my-input" />);
    expect(screen.getByTestId('i').className).toContain('my-input');
  });

  // I4 — mono prop
  test('mono prop adds mono class to the input', () => {
    render(<Input data-testid="i" mono />);
    expect(screen.getByTestId('i').className).toContain('mono');
  });
});
