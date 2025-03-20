import { useState, useRef, useEffect } from 'react';
import styles from './ImageCarousel.module.scss';
import { ImageElement, Image } from './Image';
import ArrowForwardIcon from 'assets/icons/arrow-forward.svg';
import ArrowBackIcon from 'assets/icons/arrow-back.svg';
import { Button, ButtonVariant, ButtonSize } from 'components/Button/Button';

type CarouselProps = {
  images: Image[];
  onImageClick?: (
    index: number,
    e: React.MouseEvent<Element> | React.KeyboardEvent<Element>
  ) => void;
};

export const ImageCarousel = ({ images, onImageClick }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const startX = useRef(0);
  const isDragging = useRef(false);
  const thumbnailsRef = useRef<HTMLDivElement | null>(null);

  const selectNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const selectPreviousImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const selectImage = (index: number) => {
    setCurrentIndex(index);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const endX = e.clientX;
    if (startX.current - endX > 50) {
      selectNextImage();
    } else if (endX - startX.current > 50) {
      selectPreviousImage();
    }
    isDragging.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const endX = e.changedTouches[0].clientX;
    if (startX.current - endX > 50) {
      selectNextImage();
    } else if (endX - startX.current > 50) {
      selectPreviousImage();
    }
    isDragging.current = false;
  };

  // Scroll to the selected thumbnail when the index changes to make selected thumbnail always visible
  useEffect(() => {
    const thumbnails = thumbnailsRef.current;
    if (thumbnails) {
      const selectedThumbnail = thumbnails.children[
        currentIndex
      ] as HTMLElement;
      const thumbnailsRect = thumbnails.getBoundingClientRect();
      const selectedRect = selectedThumbnail.getBoundingClientRect();

      const scrollOffset =
        selectedRect.left -
        thumbnailsRect.left -
        (thumbnailsRect.width - selectedRect.width) / 2;

      thumbnails.scrollTo({
        left: thumbnails.scrollLeft + scrollOffset,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  return (
    <>
      {images.length > 1 ? (
        <div className={styles.carousel}>
          <div className={styles.carouselMainImage}>
            {currentIndex > 0 && (
              <Button
                onClick={selectPreviousImage}
                variant={ButtonVariant.Primary}
                size={ButtonSize.M}
                icon={<ArrowBackIcon />}
                className={`${styles.arrow} ${styles.prevArrow}`}
              />
            )}
            <div
              className={styles.imageWrapper}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`${styles.image} ${
                    index === currentIndex ? styles.active : ''
                  }`}
                  role="button"
                  tabIndex={0}
                  onClick={(e) => onImageClick?.(index, e)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onImageClick?.(index, e);
                    }
                  }}
                >
                  <ImageElement image={image} showCaption={true} />
                </div>
              ))}
            </div>
            {currentIndex < images.length - 1 && (
              <Button
                onClick={selectNextImage}
                variant={ButtonVariant.Primary}
                size={ButtonSize.M}
                icon={<ArrowForwardIcon />}
                className={`${styles.arrow} ${styles.nextArrow}`}
              />
            )}
          </div>
          <div className={styles.thumbnails} ref={thumbnailsRef}>
            {images.map((image, index) => (
              <div
                key={index}
                className={`${styles.thumbnail} ${
                  index === currentIndex ? styles.selected : ''
                }`}
                onClick={() => selectImage(index)}
              >
                <ImageElement image={image} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          onClick={(e) => onImageClick?.(0, e)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onImageClick?.(0, e);
            }
          }}
        >
          <ImageElement image={images[0]} showCaption={true} />
        </div>
      )}
    </>
  );
};
