import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { StatCard, StatCardGrid } from '../components/StatCard/index.js';

describe('StatCard', () => {
  test('renders value and label', () => {
    const { getByText } = render(<StatCard label="vCPU" value={12} />);
    expect(getByText('vCPU')).toBeInTheDocument();
    expect(getByText('12')).toBeInTheDocument();
  });

  test('renders unit', () => {
    const { getByText } = render(<StatCard label="L" value={42} unit="req/s" />);
    expect(getByText('req/s')).toBeInTheDocument();
  });

  test('applies delta--up class when deltaKind is up', () => {
    const { container } = render(
      <StatCard label="L" value={1} delta="+12%" deltaKind="up" />,
    );
    expect(container.querySelector('.tln-stat-card__delta--up')).toBeInTheDocument();
  });

  test('applies delta--down class when deltaKind is down', () => {
    const { container } = render(
      <StatCard label="L" value={1} delta="-5%" deltaKind="down" />,
    );
    expect(container.querySelector('.tln-stat-card__delta--down')).toBeInTheDocument();
  });

  test('applies delta--neutral class by default', () => {
    const { container } = render(<StatCard label="L" value={1} delta="0%" />);
    expect(container.querySelector('.tln-stat-card__delta--neutral')).toBeInTheDocument();
  });

  test('does not render delta element when delta prop absent', () => {
    const { container } = render(<StatCard label="L" value={1} />);
    expect(container.querySelector('.tln-stat-card__delta')).not.toBeInTheDocument();
  });

  // I3 — iconColor enum
  test('renders iconColor acc as CSS var --acc', () => {
    const { container } = render(
      <StatCard label="L" value={1} icon={<span>★</span>} iconColor="acc" />,
    );
    const iconEl = container.querySelector('.tln-stat-card__icon') as HTMLElement;
    expect(iconEl.style.color).toBe('var(--acc)');
  });

  test('renders iconColor neutral as CSS var --fg-3', () => {
    const { container } = render(
      <StatCard label="L" value={1} icon={<span>★</span>} iconColor="neutral" />,
    );
    const iconEl = container.querySelector('.tln-stat-card__icon') as HTMLElement;
    expect(iconEl.style.color).toBe('var(--fg-3)');
  });

  test('renders iconColor ok as CSS var --ok', () => {
    const { container } = render(
      <StatCard label="L" value={1} icon={<span>★</span>} iconColor="ok" />,
    );
    const iconEl = container.querySelector('.tln-stat-card__icon') as HTMLElement;
    expect(iconEl.style.color).toBe('var(--ok)');
  });

  test('renders iconColor warn as CSS var --warn', () => {
    const { container } = render(
      <StatCard label="L" value={1} icon={<span>★</span>} iconColor="warn" />,
    );
    const iconEl = container.querySelector('.tln-stat-card__icon') as HTMLElement;
    expect(iconEl.style.color).toBe('var(--warn)');
  });

  test('renders iconColor danger as CSS var --danger', () => {
    const { container } = render(
      <StatCard label="L" value={1} icon={<span>★</span>} iconColor="danger" />,
    );
    const iconEl = container.querySelector('.tln-stat-card__icon') as HTMLElement;
    expect(iconEl.style.color).toBe('var(--danger)');
  });

  // N1 — delta aria-label
  test('delta up has aria-label with 上升', () => {
    const { container } = render(
      <StatCard label="L" value={1} delta="+12%" deltaKind="up" />,
    );
    const delta = container.querySelector('.tln-stat-card__delta')!;
    expect(delta).toHaveAttribute('aria-label', '上升 +12%');
  });

  test('delta down has aria-label with 下降', () => {
    const { container } = render(
      <StatCard label="L" value={1} delta="-5%" deltaKind="down" />,
    );
    const delta = container.querySelector('.tln-stat-card__delta')!;
    expect(delta).toHaveAttribute('aria-label', '下降 -5%');
  });

  test('delta neutral has aria-label equal to delta value', () => {
    const { container } = render(
      <StatCard label="L" value={1} delta="0%" deltaKind="neutral" />,
    );
    const delta = container.querySelector('.tln-stat-card__delta')!;
    expect(delta).toHaveAttribute('aria-label', '0%');
  });
});

describe('StatCardGrid', () => {
  test('renders children', () => {
    const { getByText } = render(
      <StatCardGrid>
        <StatCard label="A" value={1} />
      </StatCardGrid>,
    );
    expect(getByText('A')).toBeInTheDocument();
  });

  test('adds cols modifier class', () => {
    const { container } = render(
      <StatCardGrid cols={2}>
        <StatCard label="A" value={1} />
      </StatCardGrid>,
    );
    expect(container.firstChild).toHaveClass('tln-stat-card-grid--cols-2');
  });
});
