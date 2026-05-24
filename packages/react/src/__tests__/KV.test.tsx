import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { KV } from '../components/KV/index.js';

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
    clipboardMock.writeText.mockResolvedValue(undefined);
    render(<KV items={[{ label: 'k', value: 'hello', copyable: true }]} />);
    await clickCopy();
    expect(clipboardMock.writeText).toHaveBeenCalledWith('hello');
  });

  test('copy button shows "Copy" initially', () => {
    clipboardMock.writeText.mockResolvedValue(undefined);
    render(<KV items={[{ label: 'k', value: 'v', copyable: true }]} />);
    expect(screen.getByRole('button').textContent).toBe('Copy');
  });

  test('copy button shows "Copied" after successful copy', async () => {
    clipboardMock.writeText.mockResolvedValue(undefined);
    render(<KV items={[{ label: 'k', value: 'v', copyable: true }]} />);
    await clickCopy();
    expect(screen.getByRole('button').textContent).toBe('Copied');
  });

  test('copy button reverts to "Copy" after 1500ms', async () => {
    clipboardMock.writeText.mockResolvedValue(undefined);
    render(<KV items={[{ label: 'k', value: 'v', copyable: true }]} />);
    await clickCopy();
    expect(screen.getByRole('button').textContent).toBe('Copied');
    await waitFor(
      () => expect(screen.getByRole('button').textContent).toBe('Copy'),
      { timeout: 2000 },
    );
  });

  test('copy button shows "Failed" when clipboard throws', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    clipboardMock.writeText.mockRejectedValue(new Error('denied'));
    render(<KV items={[{ label: 'k', value: 'v', copyable: true }]} />);
    await clickCopy();
    expect(screen.getByRole('button').textContent).toBe('Failed');
    warnSpy.mockRestore();
  });
});
