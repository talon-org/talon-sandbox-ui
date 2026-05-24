import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { Drawer } from '../components/Drawer/index.js';

describe('Drawer', () => {
  test('renders nothing when closed', () => {
    const { container } = render(<Drawer open={false} onClose={vi.fn()}>x</Drawer>);
    expect(container.querySelector('.tln-drawer')).not.toBeInTheDocument();
  });

  test('renders content when open', () => {
    render(<Drawer open onClose={vi.fn()}>drawer body</Drawer>);
    expect(screen.getByText('drawer body')).toBeInTheDocument();
  });

  test('calls onClose when backdrop clicked', () => {
    const onClose = vi.fn();
    render(<Drawer open onClose={onClose}>x</Drawer>);
    fireEvent.click(document.querySelector('.tln-drawer-backdrop')!);
    expect(onClose).toHaveBeenCalled();
  });

  test('calls onClose when close button clicked', () => {
    const onClose = vi.fn();
    render(<Drawer open onClose={onClose}>x</Drawer>);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalled();
  });

  test('calls onClose on Escape', () => {
    const onClose = vi.fn();
    render(<Drawer open onClose={onClose}>x</Drawer>);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  test('applies tln-drawer class', () => {
    render(<Drawer open onClose={vi.fn()}>x</Drawer>);
    expect(document.querySelector('.tln-drawer')).toBeInTheDocument();
  });

  test('renders title when provided', () => {
    render(<Drawer open onClose={vi.fn()} title="My Drawer">x</Drawer>);
    expect(screen.getByText('My Drawer')).toBeInTheDocument();
  });

  test('aria-labelledby points to title element', () => {
    render(<Drawer open onClose={vi.fn()} title="Labeled Drawer">x</Drawer>);
    const dialog = screen.getByRole('dialog');
    const labelId = dialog.getAttribute('aria-labelledby');
    expect(labelId).toBeTruthy();
    const titleEl = document.getElementById(labelId!);
    expect(titleEl?.textContent).toBe('Labeled Drawer');
  });

  test('focus enters drawer when opened', () => {
    render(<Drawer open onClose={vi.fn()} title="D"><button>inside</button></Drawer>);
    const dialog = screen.getByRole('dialog');
    expect(dialog.contains(document.activeElement)).toBe(true);
  });

  test('focus is restored to trigger element when drawer closes', () => {
    const trigger = document.createElement('button');
    trigger.textContent = 'Open Drawer';
    document.body.appendChild(trigger);
    trigger.focus();

    const { rerender } = render(<Drawer open onClose={vi.fn()} title="D">x</Drawer>);
    rerender(<Drawer open={false} onClose={vi.fn()} title="D">x</Drawer>);
    expect(document.activeElement).toBe(trigger);

    document.body.removeChild(trigger);
  });
});
