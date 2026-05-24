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
});
