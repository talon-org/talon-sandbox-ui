import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { EmptyState } from '../components/EmptyState/index.js';

describe('EmptyState', () => {
  test('renders title', () => {
    render(<EmptyState title="No sandboxes yet" />);
    expect(screen.getByText('No sandboxes yet')).toBeInTheDocument();
  });

  test('applies tln-empty class', () => {
    const { container } = render(<EmptyState title="Empty" />);
    expect(container.firstChild).toHaveClass('tln-empty');
  });

  test('renders description when provided', () => {
    render(<EmptyState title="Empty" description="Create one to start" />);
    expect(screen.getByText('Create one to start')).toBeInTheDocument();
  });

  test('renders icon when provided', () => {
    render(<EmptyState title="t" icon={<span data-testid="ic">ic</span>} />);
    expect(screen.getByTestId('ic')).toBeInTheDocument();
  });

  test('renders action when provided', () => {
    render(<EmptyState title="t" action={<button>Create</button>} />);
    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
  });
});
