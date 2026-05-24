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
});
