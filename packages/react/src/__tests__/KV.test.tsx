import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import { KV } from '../components/KV/index.js';

describe('KV', () => {
  test('renders labels and values', () => {
    render(<KV items={[{ label: 'Region', value: 'us-east-1' }]} />);
    expect(screen.getByText('Region')).toBeInTheDocument();
    expect(screen.getByText('us-east-1')).toBeInTheDocument();
  });

  test('applies tln-kv class', () => {
    const { container } = render(<KV items={[{ label: 'k', value: 'v' }]} />);
    expect(container.firstChild).toHaveClass('tln-kv');
  });

  test('renders copy button when copyable', () => {
    render(<KV items={[{ label: 'k', value: 'v', copyable: true }]} />);
    expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument();
  });

  test('copy button writes to clipboard', async () => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
    render(<KV items={[{ label: 'k', value: 'hello', copyable: true }]} />);
    await userEvent.click(screen.getByRole('button', { name: /copy/i }));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello');
  });
});
