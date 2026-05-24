import { render, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { TerminalChrome } from '../components/TerminalChrome/index.js';

describe('TerminalChrome', () => {
  test('renders sandbox id', () => {
    const { getAllByText } = render(
      <TerminalChrome sandbox={{ id: 'sb-abc123' }}>
        <div>term</div>
      </TerminalChrome>,
    );
    expect(getAllByText('sb-abc123').length).toBeGreaterThan(0);
  });

  test('calls onBack when back button clicked', () => {
    const onBack = vi.fn();
    const { getByRole } = render(
      <TerminalChrome sandbox={{ id: 'sb-1' }} onBack={onBack}>
        <div />
      </TerminalChrome>,
    );
    fireEvent.click(getByRole('button', { name: /sb-1/ }));
    expect(onBack).toHaveBeenCalledOnce();
  });

  test('applies on class to rec-btn when recording=true', () => {
    const { container } = render(
      <TerminalChrome sandbox={{ id: 'sb-1' }} recording onToggleRecord={() => {}}>
        <div />
      </TerminalChrome>,
    );
    expect(container.querySelector('.tln-term-chrome__rec-btn.on')).toBeInTheDocument();
  });

  test('does not show rec button without onToggleRecord', () => {
    const { container } = render(
      <TerminalChrome sandbox={{ id: 'sb-1' }}>
        <div />
      </TerminalChrome>,
    );
    expect(container.querySelector('.tln-term-chrome__rec-btn')).not.toBeInTheDocument();
  });

  test('renders children', () => {
    const { getByText } = render(
      <TerminalChrome sandbox={{ id: 'sb-1' }}>
        <div>xterm-mount</div>
      </TerminalChrome>,
    );
    expect(getByText('xterm-mount')).toBeInTheDocument();
  });

  test('renders bottomStatus when provided', () => {
    const { getByText } = render(
      <TerminalChrome sandbox={{ id: 'sb-1' }} bottomStatus={<span>80×24</span>}>
        <div />
      </TerminalChrome>,
    );
    expect(getByText('80×24')).toBeInTheDocument();
  });
});
