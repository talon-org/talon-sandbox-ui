import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { PageHeader } from '../components/PageHeader/index.js';

describe('PageHeader', () => {
  test('renders title', () => {
    const { getByText } = render(<PageHeader title="My Title" />);
    expect(getByText('My Title')).toBeInTheDocument();
  });

  test('renders eyebrow when provided', () => {
    const { getByText } = render(<PageHeader title="T" eyebrow="SANDBOXES" />);
    expect(getByText('SANDBOXES')).toBeInTheDocument();
  });

  test('renders num badge when provided', () => {
    const { getByText } = render(<PageHeader title="T" num={42} />);
    expect(getByText('42')).toBeInTheDocument();
  });

  test('renders actions slot', () => {
    const { getByText } = render(
      <PageHeader title="T" actions={<button>New</button>} />,
    );
    expect(getByText('New')).toBeInTheDocument();
  });

  test('applies no-border modifier class', () => {
    const { container } = render(<PageHeader title="T" noBorder />);
    expect(container.firstChild).toHaveClass('tln-page-header--no-border');
  });
});
