import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { Dialog } from '../components/Dialog/index.js';

describe('Dialog', () => {
  test('renders nothing when closed', () => {
    const { container } = render(<Dialog open={false} onClose={vi.fn()} title="T">body</Dialog>);
    expect(container.querySelector('.tln-dialog-backdrop')).not.toBeInTheDocument();
  });

  test('renders content when open', () => {
    render(<Dialog open onClose={vi.fn()} title="My Dialog">dialog body</Dialog>);
    expect(screen.getByText('dialog body')).toBeInTheDocument();
    expect(screen.getByText('My Dialog')).toBeInTheDocument();
  });

  test('calls onClose when close button clicked', () => {
    const onClose = vi.fn();
    render(<Dialog open onClose={onClose} title="T">x</Dialog>);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalled();
  });

  test('calls onClose when backdrop clicked', () => {
    const onClose = vi.fn();
    render(<Dialog open onClose={onClose} title="T">x</Dialog>);
    fireEvent.click(document.querySelector('.tln-dialog-backdrop')!);
    expect(onClose).toHaveBeenCalled();
  });

  test('calls onClose on Escape keydown', () => {
    const onClose = vi.fn();
    render(<Dialog open onClose={onClose} title="T">x</Dialog>);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  test('has role=dialog', () => {
    render(<Dialog open onClose={vi.fn()} title="T">x</Dialog>);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('aria-modal is on the dialog div, not the backdrop', () => {
    render(<Dialog open onClose={vi.fn()} title="T">x</Dialog>);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    const backdrop = document.querySelector('.tln-dialog-backdrop')!;
    expect(backdrop).not.toHaveAttribute('aria-modal');
  });

  test('dialog has aria-labelledby pointing to title element', () => {
    render(<Dialog open onClose={vi.fn()} title="Labeled Dialog">x</Dialog>);
    const dialog = screen.getByRole('dialog');
    const labelledById = dialog.getAttribute('aria-labelledby');
    expect(labelledById).toBeTruthy();
    const titleEl = document.getElementById(labelledById!);
    expect(titleEl).toBeInTheDocument();
    expect(titleEl!.textContent).toBe('Labeled Dialog');
  });

  test('two concurrent Dialogs have different aria-labelledby ids', () => {
    render(
      <>
        <Dialog open onClose={vi.fn()} title="Dialog One">a</Dialog>
        <Dialog open onClose={vi.fn()} title="Dialog Two">b</Dialog>
      </>
    );
    const dialogs = screen.getAllByRole('dialog');
    expect(dialogs).toHaveLength(2);
    const id1 = dialogs[0]!.getAttribute('aria-labelledby');
    const id2 = dialogs[1]!.getAttribute('aria-labelledby');
    expect(id1).not.toBe(id2);
  });

  test('renders footer slot when provided', () => {
    render(
      <Dialog open onClose={vi.fn()} title="T" footer={<button>Confirm</button>}>x</Dialog>
    );
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
  });

  test('focus is restored to trigger element when dialog closes', () => {
    const trigger = document.createElement('button');
    trigger.textContent = 'Open';
    document.body.appendChild(trigger);
    trigger.focus();

    const { rerender } = render(<Dialog open onClose={vi.fn()} title="T">x</Dialog>);
    // While dialog is open, focus should be inside
    const dialog = screen.getByRole('dialog');
    expect(dialog.contains(document.activeElement)).toBe(true);

    // Close the dialog
    rerender(<Dialog open={false} onClose={vi.fn()} title="T">x</Dialog>);
    expect(document.activeElement).toBe(trigger);

    document.body.removeChild(trigger);
  });
});
