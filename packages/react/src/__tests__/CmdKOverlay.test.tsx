import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { CmdKOverlay } from '../components/CmdKOverlay/index.js';
import type { CmdKItem } from '../components/CmdKOverlay/index.js';

const items: CmdKItem[] = [
  { group: 'Navigation', name: 'Dashboard', hint: 'g d', kbd: 'G D', action: vi.fn() },
  { group: 'Navigation', name: 'Sandboxes', action: vi.fn() },
  { group: 'Actions', name: 'New Sandbox', action: vi.fn() },
];

describe('CmdKOverlay', () => {
  test('renders nothing when closed', () => {
    const { container } = render(
      <CmdKOverlay open={false} onClose={vi.fn()} items={items} />
    );
    expect(container.querySelector('.tln-cmdk-back')).not.toBeInTheDocument();
  });

  test('renders items when open', () => {
    render(<CmdKOverlay open onClose={vi.fn()} items={items} />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('New Sandbox')).toBeInTheDocument();
  });

  test('filters items on query input', () => {
    render(<CmdKOverlay open onClose={vi.fn()} items={items} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'dash' } });
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.queryByText('Sandboxes')).not.toBeInTheDocument();
  });

  test('shows empty state when no results', () => {
    render(<CmdKOverlay open onClose={vi.fn()} items={items} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'zzznomatch' } });
    expect(screen.getByText(/No results/i)).toBeInTheDocument();
  });

  test('Escape key calls onClose', () => {
    const onClose = vi.fn();
    render(<CmdKOverlay open onClose={onClose} items={items} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  test('ArrowDown moves active index and Enter triggers action', () => {
    const action0 = vi.fn();
    const action1 = vi.fn();
    const onClose = vi.fn();
    const testItems: CmdKItem[] = [
      { group: 'A', name: 'First', action: action0 },
      { group: 'A', name: 'Second', action: action1 },
    ];
    render(<CmdKOverlay open onClose={onClose} items={testItems} />);
    fireEvent.keyDown(document, { key: 'ArrowDown' });
    fireEvent.keyDown(document, { key: 'Enter' });
    expect(action1).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  test('clicking backdrop calls onClose', () => {
    const onClose = vi.fn();
    render(<CmdKOverlay open onClose={onClose} items={items} />);
    fireEvent.click(document.querySelector('.tln-cmdk-back')!);
    expect(onClose).toHaveBeenCalled();
  });

  test('clicking an item calls action and onClose', () => {
    const action = vi.fn();
    const onClose = vi.fn();
    render(<CmdKOverlay open onClose={onClose} items={[{ group: 'G', name: 'Go', action }]} />);
    fireEvent.click(screen.getByText('Go'));
    expect(action).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  test('has role=dialog with aria-modal', () => {
    render(<CmdKOverlay open onClose={vi.fn()} items={items} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  test('groups items by group name', () => {
    render(<CmdKOverlay open onClose={vi.fn()} items={items} />);
    expect(screen.getByText('Navigation')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  test('ArrowDown on empty filtered list does not set activeIdx to -1', () => {
    const { rerender } = render(<CmdKOverlay open onClose={vi.fn()} items={items} />);
    // Filter to empty
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'zzznomatch' } });
    // ArrowDown should not crash or produce -1
    fireEvent.keyDown(document, { key: 'ArrowDown' });
    // No option should show as selected (empty list renders no options)
    expect(document.querySelectorAll('[aria-selected="true"]').length).toBe(0);
    rerender(<CmdKOverlay open onClose={vi.fn()} items={items} />);
  });

  test('input has aria-controls pointing to listbox id', () => {
    render(<CmdKOverlay open onClose={vi.fn()} items={items} />);
    const input = screen.getByRole('combobox');
    const controlsId = input.getAttribute('aria-controls');
    expect(controlsId).toBeTruthy();
    expect(document.getElementById(controlsId!)).toBeInTheDocument();
  });

  test('input aria-activedescendant matches active option id', () => {
    render(<CmdKOverlay open onClose={vi.fn()} items={items} />);
    const input = screen.getByRole('combobox');
    const activeDescId = input.getAttribute('aria-activedescendant');
    expect(activeDescId).toBeTruthy();
    expect(document.getElementById(activeDescId!)).toBeInTheDocument();
    expect(document.getElementById(activeDescId!)).toHaveAttribute('aria-selected', 'true');
  });
});
