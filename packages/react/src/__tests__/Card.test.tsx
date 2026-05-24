import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Card, Panel } from '../components/Card/index.js';

describe('Card', () => {
  test('renders children inside card body', () => {
    render(<Card>body</Card>);
    expect(screen.getByText('body')).toBeInTheDocument();
  });

  test('applies tln-card base class', () => {
    const { container } = render(<Card>x</Card>);
    expect(container.firstChild).toHaveClass('tln-card');
  });

  test('renders header when title provided', () => {
    render(<Card title="My Card">x</Card>);
    expect(screen.getByText('My Card')).toBeInTheDocument();
  });

  test('renders footer when footer provided', () => {
    render(<Card footer={<span>foot</span>}>x</Card>);
    expect(screen.getByText('foot')).toBeInTheDocument();
  });

  test('Panel is an alias for Card', () => {
    const { container } = render(<Panel>x</Panel>);
    expect(container.firstChild).toHaveClass('tln-card');
  });
});
