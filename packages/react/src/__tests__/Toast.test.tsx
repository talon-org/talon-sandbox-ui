import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { toast, ToastViewport } from '../components/Toast/index.js';

beforeEach(() => {
  toast.dismiss();
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('Toast', () => {
  test('ToastViewport renders with tln-toast-stack class', () => {
    render(<ToastViewport />);
    expect(document.querySelector('.tln-toast-stack')).toBeInTheDocument();
  });

  test('no tln-toast-viewport class (renamed to tln-toast-stack)', () => {
    render(<ToastViewport />);
    expect(document.querySelector('.tln-toast-viewport')).not.toBeInTheDocument();
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

  test('toast.dismiss(id) removes a specific toast', () => {
    render(<ToastViewport />);
    let id = '';
    act(() => { id = toast.success('bye'); });
    act(() => { toast.dismiss(id); });
    expect(screen.queryByText('bye')).not.toBeInTheDocument();
  });

  test('toast.dismiss() with no args clears all toasts', () => {
    render(<ToastViewport />);
    act(() => { toast.success('one'); toast.info('two'); });
    expect(screen.getByText('one')).toBeInTheDocument();
    act(() => { toast.dismiss(); });
    expect(screen.queryByText('one')).not.toBeInTheDocument();
    expect(screen.queryByText('two')).not.toBeInTheDocument();
  });

  test('toast.info shows message', () => {
    render(<ToastViewport />);
    act(() => { toast.info('FYI'); });
    expect(screen.getByText('FYI')).toBeInTheDocument();
  });

  test('hover pauses auto-dismiss: toast survives 3500ms while hovered', () => {
    render(<ToastViewport />);
    act(() => { toast.success('hover-me'); });
    const toastEl = document.querySelector('.tln-toast')!;
    fireEvent.mouseEnter(toastEl);
    act(() => { vi.advanceTimersByTime(3500); });
    expect(screen.getByText('hover-me')).toBeInTheDocument();
  });

  test('hover pause then resume: toast dismissed after mouseLeave + remaining time', () => {
    render(<ToastViewport />);
    act(() => { toast.success('resume-me'); });
    const toastEl = document.querySelector('.tln-toast')!;
    // Pause at 1000ms elapsed → 2500ms left
    act(() => { vi.advanceTimersByTime(1000); });
    fireEvent.mouseEnter(toastEl);
    act(() => { vi.advanceTimersByTime(3000); }); // still hovered, not dismissed
    expect(screen.getByText('resume-me')).toBeInTheDocument();
    fireEvent.mouseLeave(toastEl);
    // Now resume; should dismiss within remaining ~2500ms
    act(() => { vi.advanceTimersByTime(3000); });
    expect(screen.queryByText('resume-me')).not.toBeInTheDocument();
  });
});
