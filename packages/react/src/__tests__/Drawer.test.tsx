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
});
