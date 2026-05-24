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
