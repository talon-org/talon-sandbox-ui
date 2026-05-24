import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { FormSection, FormGrid } from '../components/FormSection/index.js';

describe('FormSection', () => {
  test('renders title', () => {
    const { getByText } = render(
      <FormSection title="Image">
        <input />
      </FormSection>,
    );
    expect(getByText('Image')).toBeInTheDocument();
  });

  test('renders hint when provided', () => {
    const { getByText } = render(
      <FormSection title="T" hint="optional">
        <input />
      </FormSection>,
    );
    expect(getByText('optional')).toBeInTheDocument();
  });

  test('renders children', () => {
    const { getByPlaceholderText } = render(
      <FormSection title="T">
        <input placeholder="my-input" />
      </FormSection>,
    );
    expect(getByPlaceholderText('my-input')).toBeInTheDocument();
  });

  test('applies tln-form-section class', () => {
    const { container } = render(
      <FormSection title="T">
        <span />
      </FormSection>,
    );
    expect(container.querySelector('.tln-form-section')).toBeInTheDocument();
  });

  test('renders icon when provided', () => {
    const { getByText } = render(
      <FormSection title="T" icon={<span>★</span>}>
        <span />
      </FormSection>,
    );
    expect(getByText('★')).toBeInTheDocument();
  });
});

describe('FormGrid', () => {
  test('renders children', () => {
    const { getByText } = render(
      <FormGrid>
        <span>child</span>
      </FormGrid>,
    );
    expect(getByText('child')).toBeInTheDocument();
  });

  test('applies full class when cols=1', () => {
    const { container } = render(
      <FormGrid cols={1}>
        <span />
      </FormGrid>,
    );
    expect(container.firstChild).toHaveClass('full');
  });
});
