import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Textarea } from '../components/Textarea/Textarea.js';

describe('Textarea', () => {
  test('renders with tln-textarea base class', () => {
    render(<Textarea data-testid="t" />);
    expect(screen.getByTestId('t').className).toContain('tln-textarea');
  });

  test('invalid adds error class and aria-invalid', () => {
    render(<Textarea data-testid="t" invalid />);
    const el = screen.getByTestId('t');
    expect(el.className).toContain('error');
    expect(el).toHaveAttribute('aria-invalid', 'true');
  });

  test('rows prop is passed through', () => {
    render(<Textarea data-testid="t" rows={6} />);
    expect(screen.getByTestId('t')).toHaveAttribute('rows', '6');
  });

  test('forwardRef passes ref to the underlying textarea', () => {
    const ref = { current: null as HTMLTextAreaElement | null };
    render(<Textarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });
});
