import React, { useEffect, useRef, useState } from 'react';
import styles from './TeaserCarousel.module.scss';
import ChevronLeftIcon from 'assets/icons/chevron-left.svg';
import ChevronRightIcon from 'assets/icons/chevron-right.svg';

type Props = {
  teasers: React.ReactElement[];
};

export const TeaserCarousel = ({ teasers }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkForScrollPosition = () => {
    const el = containerRef.current;
    if (!el) {
      return;
    }

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) {
      return;
    }

    el.addEventListener('scroll', checkForScrollPosition);
    window.addEventListener('resize', checkForScrollPosition);

    return () => {
      el.removeEventListener('scroll', checkForScrollPosition);
      window.removeEventListener('resize', checkForScrollPosition);
    };
  }, []);

  useEffect(() => {
    // Wait for DOM to render teasers
    const timeout = setTimeout(() => {
      checkForScrollPosition();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [teasers]);

  const scroll = (direction: 'left' | 'right') => {
    const el = containerRef.current;
    if (!el) {
      return;
    }

    const scrollAmount = el.clientWidth * 0.8; // Scroll by 80% of visible area
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.wrapper}>
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className={`${styles.arrow} ${styles.leftArrow}`}
          aria-label="Vieritä vasemmalle"
        >
          <ChevronLeftIcon />
        </button>
      )}
      <div
        className={`${styles.container} ${canScrollLeft ? styles.canScrollLeft : ''} ${canScrollRight ? styles.canScrollRight : ''} `}
        ref={containerRef}
      >
        {teasers.map((teaser, index) => (
          <div className={styles.teaserContainer} key={index}>
            {teaser}
          </div>
        ))}
      </div>
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className={`${styles.arrow} ${styles.rightArrow}`}
          aria-label="Vieritä oikealle"
        >
          <ChevronRightIcon />
        </button>
      )}
    </div>
  );
};
