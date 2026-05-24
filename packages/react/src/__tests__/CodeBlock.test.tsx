import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { CodeBlock } from '../components/CodeBlock/index.js';

// jsdom has no clipboard — define once on global navigator
const clipboardMock = { writeText: vi.fn() };
Object.defineProperty(globalThis.navigator, 'clipboard', {
  value: clipboardMock,
  writable: false,
  configurable: true,
});

async function clickCopy() {
  await act(async () => { fireEvent.click(screen.getByRole('button', { name: /copy/i })); });
}

beforeEach(() => {
  clipboardMock.writeText.mockReset();
});

afterEach(() => {
  vi.useRealTimers();
});

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

  test('copy button shows "Copy" initially', () => {
    clipboardMock.writeText.mockResolvedValue(undefined);
    render(<CodeBlock copyable>hello</CodeBlock>);
    expect(screen.getByRole('button', { name: /copy/i }).textContent).toBe('Copy');
  });

  test('copy button shows "Copied" after successful copy', async () => {
    clipboardMock.writeText.mockResolvedValue(undefined);
    render(<CodeBlock copyable>hello world</CodeBlock>);
    await clickCopy();
    expect(clipboardMock.writeText).toHaveBeenCalledWith('hello world');
    expect(screen.getByRole('button').textContent).toBe('Copied');
  });

  test('copy button reverts to "Copy" after 1500ms', async () => {
    clipboardMock.writeText.mockResolvedValue(undefined);
    render(<CodeBlock copyable>hello</CodeBlock>);
    await clickCopy();
    expect(screen.getByRole('button').textContent).toBe('Copied');
    await waitFor(
      () => expect(screen.getByRole('button').textContent).toBe('Copy'),
      { timeout: 2000 },
    );
  });

  test('copy button shows "Failed" on clipboard error', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    clipboardMock.writeText.mockRejectedValue(new Error('no perm'));
    render(<CodeBlock copyable>err</CodeBlock>);
    await clickCopy();
    expect(screen.getByRole('button').textContent).toBe('Failed');
    warnSpy.mockRestore();
  });
});
