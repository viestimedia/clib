import { describe, expect, it } from 'vitest';

import { render } from '@testing-library/react';
import { CategoryHeading, Heading, HeadingStyle } from './Heading';

describe('Heading', () => {
  const text = 'heading content text';

  it('Successfully renders heading text', () => {
    const wrapper = render(
      <Heading level="h1" style={HeadingStyle.Default} text={text} />
    );
    expect(wrapper.getByText(text)).toBeInTheDocument();
  });
});

describe('CategoryHeading', () => {
  it('renders title with TeaserCategoryLatest heading', () => {
    const wrapper = render(<CategoryHeading text="Article title" level="h2" />);
    expect(
      wrapper.getByRole('heading', { name: 'Article title' })
    ).toBeInTheDocument();
  });

  it('renders standalone category when provided', () => {
    const wrapper = render(
      <CategoryHeading category="News" text="Article title" level="h2" />
    );
    expect(wrapper.getByText('News')).toBeInTheDocument();
    expect(
      wrapper.getByRole('heading', { name: 'Article title' })
    ).toBeInTheDocument();
  });
});
