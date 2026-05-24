import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Select } from '../components/Select/Select.js';

describe('Select', () => {
  test('renders with tln-select base class', () => {
    render(
      <Select data-testid="s">
        <option>A</option>
      </Select>,
    );
    expect(screen.getByTestId('s').className).toContain('tln-select');
  });

  test('size sm adds tln-select-sm class', () => {
    render(
      <Select data-testid="s" size="sm">
        <option>A</option>
      </Select>,
    );
    expect(screen.getByTestId('s').className).toContain('tln-select-sm');
  });

  test('invalid adds error class and aria-invalid', () => {
    render(
      <Select data-testid="s" invalid>
        <option>A</option>
      </Select>,
    );
    const el = screen.getByTestId('s');
    expect(el.className).toContain('error');
    expect(el).toHaveAttribute('aria-invalid', 'true');
  });

  test('forwardRef passes ref to the underlying select', () => {
    const ref = { current: null as HTMLSelectElement | null };
    render(
      <Select ref={ref}>
        <option>A</option>
      </Select>,
    );
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });
});
