import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import { CodeBlock } from '../components/CodeBlock/index.js';

describe('CodeBlock', () => {
  test('renders code content', () => {
    render(<CodeBlock>const x = 1</CodeBlock>);
    expect(screen.getByText('const x = 1')).toBeInTheDocument();
  });

  test('applies tln-code class to pre', () => {
    const { container } = render(<CodeBlock>x</CodeBlock>);
    expect(container.querySelector('pre.tln-code')).toBeInTheDocument();
  });

  test('renders copy button when copyable', () => {
    render(<CodeBlock copyable>x</CodeBlock>);
    expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument();
  });

  test('no copy button by default', () => {
    render(<CodeBlock>x</CodeBlock>);
    expect(screen.queryByRole('button', { name: /copy/i })).not.toBeInTheDocument();
  });

  test('copy button writes to clipboard', async () => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
    render(<CodeBlock copyable>hello world</CodeBlock>);
    await userEvent.click(screen.getByRole('button', { name: /copy/i }));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello world');
  });
});
