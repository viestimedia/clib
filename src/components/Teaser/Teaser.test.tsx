import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Teaser, TeaserType } from './Teaser';

describe('Teaser', () => {
  it('keeps the image when it loads successfully', () => {
    const { container } = render(
      <Teaser
        id="1"
        heading="Test heading"
        linkUrl="/test"
        teaserType={TeaserType.Carousel}
        image={<img src="https://example.com/ok.jpg" alt="" />}
      />
    );

    expect(container.querySelector('img')).toBeInTheDocument();
    expect(container.firstChild).not.toHaveClass('vmTeaser__noImage');
  });

  it('removes the image and falls back to noImage styling when it fails to load', () => {
    const { container } = render(
      <Teaser
        id="2"
        heading="Test heading"
        linkUrl="/test"
        teaserType={TeaserType.Carousel}
        image={<img src="https://example.com/broken.jpg" alt="" />}
      />
    );

    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();

    // The 'error' event on <img> doesn't bubble — this only passes if
    // Teaser is listening on the capture phase (onErrorCapture), not the
    // bubble phase (onError), which is the whole point of the fix.
    fireEvent.error(img!);

    expect(container.querySelector('img')).not.toBeInTheDocument();
    expect(screen.getByText('Test heading')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('vmTeaser__noImage');
  });

  it('falls back to noImage styling on image error for TeaserType.Topic too', () => {
    const { container } = render(
      <Teaser
        id="3"
        heading="Topic heading"
        linkUrl="/test"
        teaserType={TeaserType.Topic}
        image={<img src="https://example.com/broken.jpg" alt="" />}
      />
    );

    fireEvent.error(container.querySelector('img')!);

    expect(container.querySelector('img')).not.toBeInTheDocument();
    expect(container.firstChild).toHaveClass('vmTeaser__noImage');
  });

  it('renders without an image as noImage from the start', () => {
    const { container } = render(
      <Teaser
        id="4"
        heading="Test heading"
        linkUrl="/test"
        teaserType={TeaserType.Carousel}
      />
    );

    expect(container.querySelector('img')).not.toBeInTheDocument();
    expect(container.firstChild).toHaveClass('vmTeaser__noImage');
  });
});
