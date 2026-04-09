import { describe, expect, it } from 'vitest';

import { render } from '@testing-library/react';
import { Heading, HeadingStyle, TopicHeading } from './Heading';

describe('Heading', () => {
  const text = 'heading content text';

  it('Successfully renders heading text', () => {
    const wrapper = render(
      <Heading level="h1" style={HeadingStyle.Default} text={text} />
    );
    expect(wrapper.getByText(text)).toBeInTheDocument();
  });
});

describe('TopicHeading', () => {
  it('renders title with TeaserTopic heading', () => {
    const wrapper = render(<TopicHeading text="Article title" level="h2" />);
    expect(
      wrapper.getByRole('heading', { name: 'Article title' })
    ).toBeInTheDocument();
  });

  it('renders standalone topic when provided', () => {
    const wrapper = render(
      <TopicHeading topic="News" text="Article title" level="h2" />
    );
    expect(wrapper.getByText('News')).toBeInTheDocument();
    expect(
      wrapper.getByRole('heading', { name: 'Article title' })
    ).toBeInTheDocument();
  });
});
