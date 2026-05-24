import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Badge, StatusBadge } from '../components/Badge/index.js';

describe('Badge', () => {
  test('renders children', () => {
    render(<Badge>running</Badge>);
    expect(screen.getByText('running')).toBeInTheDocument();
  });

  test('applies tln-badge base class', () => {
    const { container } = render(<Badge>x</Badge>);
    expect(container.firstChild).toHaveClass('tln-badge');
  });

  test('success variant applies ok class', () => {
    const { container } = render(<Badge variant="success">ok</Badge>);
    expect(container.firstChild).toHaveClass('ok');
  });

  test('danger variant applies err class', () => {
    const { container } = render(<Badge variant="danger">err</Badge>);
    expect(container.firstChild).toHaveClass('err');
  });

  test('dot prop renders dot span', () => {
    const { container } = render(<Badge dot>x</Badge>);
    expect(container.querySelector('.dot')).toBeInTheDocument();
  });

  test('no dot by default', () => {
    const { container } = render(<Badge>x</Badge>);
    expect(container.querySelector('.dot')).not.toBeInTheDocument();
  });

  test('magenta variant applies magenta class', () => {
    const { container } = render(<Badge variant="magenta">m</Badge>);
    expect(container.firstChild).toHaveClass('magenta');
  });

  test('teal variant applies teal class', () => {
    const { container } = render(<Badge variant="teal">t</Badge>);
    expect(container.firstChild).toHaveClass('teal');
  });
});

describe('StatusBadge', () => {
  test('running status shows ok class', () => {
    const { container } = render(<StatusBadge status="running">running</StatusBadge>);
    expect(container.firstChild).toHaveClass('ok');
  });

  test('error status shows err class', () => {
    const { container } = render(<StatusBadge status="error">err</StatusBadge>);
    expect(container.firstChild).toHaveClass('err');
  });

  test('has dot by default', () => {
    const { container } = render(<StatusBadge status="running">x</StatusBadge>);
    expect(container.querySelector('.dot')).toBeInTheDocument();
  });
});
