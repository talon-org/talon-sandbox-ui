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

  // I5 — headingLevel
  test('renders title inside h1 by default', () => {
    const { container } = render(<PageHeader title="My Title" />);
    expect(container.querySelector('h1')).toBeInTheDocument();
    expect(container.querySelector('h1')?.textContent).toContain('My Title');
  });

  test('renders title inside h2 when headingLevel=2', () => {
    const { container } = render(<PageHeader title="Section" headingLevel={2} />);
    expect(container.querySelector('h2')).toBeInTheDocument();
    expect(container.querySelector('h2')?.textContent).toContain('Section');
  });

  test('renders title inside h3 when headingLevel=3', () => {
    const { container } = render(<PageHeader title="Sub" headingLevel={3} />);
    expect(container.querySelector('h3')).toBeInTheDocument();
  });
});
