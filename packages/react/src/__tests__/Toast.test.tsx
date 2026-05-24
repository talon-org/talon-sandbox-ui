import { render, screen, act } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { toast, ToastViewport } from '../components/Toast/index.js';

beforeEach(() => {
  toast.dismiss('all');
});

describe('Toast', () => {
  test('ToastViewport renders without crashing', () => {
    render(<ToastViewport />);
    // createPortal renders into document.body, not container
    expect(document.querySelector('.tln-toast-viewport')).toBeInTheDocument();
  });

  test('toast.success shows a message', () => {
    render(<ToastViewport />);
    act(() => { toast.success('It worked'); });
    expect(screen.getByText('It worked')).toBeInTheDocument();
  });

  test('toast.error shows message with err class', () => {
    render(<ToastViewport />);
    act(() => { toast.error('Oops'); });
    expect(screen.getByText('Oops')).toBeInTheDocument();
    expect(document.querySelector('.tln-toast.err')).toBeInTheDocument();
  });

  test('toast.dismiss removes a specific toast', () => {
    render(<ToastViewport />);
    let id = '';
    act(() => { id = toast.success('bye'); });
    act(() => { toast.dismiss(id); });
    expect(screen.queryByText('bye')).not.toBeInTheDocument();
  });

  test('toast.info shows message', () => {
    render(<ToastViewport />);
    act(() => { toast.info('FYI'); });
    expect(screen.getByText('FYI')).toBeInTheDocument();
  });
});
