import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { TweaksPanel } from '../components/TweaksPanel/index.js';

const defaultProps = {
  theme: 'ink' as const,
  mode: 'dark' as const,
  density: 'standard' as const,
  font: 'geist' as const,
  lang: 'en' as const,
  onSet: vi.fn(),
};

describe('TweaksPanel', () => {
  test('renders body when open by default', () => {
    render(<TweaksPanel {...defaultProps} />);
    expect(screen.getByText('Theme')).toBeInTheDocument();
    expect(screen.getByText('Mode')).toBeInTheDocument();
  });

  test('collapses body on head click', () => {
    render(<TweaksPanel {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /tweaks/i }));
    expect(screen.queryByText('Theme')).not.toBeInTheDocument();
  });

  test('calls onSet when a theme swatch is clicked', () => {
    const onSet = vi.fn();
    render(<TweaksPanel {...defaultProps} onSet={onSet} />);
    fireEvent.click(screen.getByTitle('Onyx'));
    expect(onSet).toHaveBeenCalledWith('theme', 'onyx');
  });

  test('active theme swatch has aria-pressed=true', () => {
    render(<TweaksPanel {...defaultProps} theme="ink" />);
    const inkSwatch = screen.getByTitle('Ink');
    expect(inkSwatch).toHaveAttribute('aria-pressed', 'true');
  });

  test('inactive theme swatch has aria-pressed=false', () => {
    render(<TweaksPanel {...defaultProps} theme="ink" />);
    const onyxSwatch = screen.getByTitle('Onyx');
    expect(onyxSwatch).toHaveAttribute('aria-pressed', 'false');
  });

  test('calls onSet when mode segmented changes', () => {
    const onSet = vi.fn();
    render(<TweaksPanel {...defaultProps} onSet={onSet} />);
    fireEvent.click(screen.getByText('Light'));
    expect(onSet).toHaveBeenCalledWith('mode', 'light');
  });

  test('calls onSet when lang changes', () => {
    const onSet = vi.fn();
    render(<TweaksPanel {...defaultProps} onSet={onSet} />);
    fireEvent.click(screen.getByText('中文'));
    expect(onSet).toHaveBeenCalledWith('lang', 'zh');
  });

  test('head button has aria-expanded=true when open', () => {
    render(<TweaksPanel {...defaultProps} />);
    expect(screen.getByRole('button', { name: /tweaks/i })).toHaveAttribute('aria-expanded', 'true');
  });

  test('head button has aria-expanded=false after collapse', () => {
    render(<TweaksPanel {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /tweaks/i }));
    expect(screen.getByRole('button', { name: /tweaks/i })).toHaveAttribute('aria-expanded', 'false');
  });

  test('head button has no aria-controls attribute', () => {
    render(<TweaksPanel {...defaultProps} />);
    expect(screen.getByRole('button', { name: /tweaks/i })).not.toHaveAttribute('aria-controls');
  });

  test('defaultOpen=false starts collapsed', () => {
    render(<TweaksPanel {...defaultProps} defaultOpen={false} />);
    expect(screen.queryByText('Theme')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /tweaks/i })).toHaveAttribute('aria-expanded', 'false');
  });
});
