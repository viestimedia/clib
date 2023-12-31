import { describe, expect, it } from 'vitest';

import { render } from '@testing-library/react';
import { Heading, HeadingStyle } from './Heading';

describe('Heading', () => {
  const text = 'heading content text';

  it('Successfully renders heading text', () => {
    const wrapper = render(
      <Heading level="h1" style={HeadingStyle.Default} text={text} />
    );
    expect(wrapper.getByText(text)).toBeInTheDocument();
  });
});
