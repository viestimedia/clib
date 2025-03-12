import { useState } from 'react';
import styles from './Image.module.scss';

export type Image = {
  srcSet: string; // Used in small screens
  source: string; // Used in large screens
  width?: number;
  height?: number;
  alt?: string;
  caption?: string;
  credit?: string;
};

type Props = {
  image: Image;
  showCaption?: boolean;
};

export const ImageElement = ({ image, showCaption = false }: Props) => {
  const [imageError, setImageError] = useState<boolean>(false);

  return (
    <div className={styles.imageContainer}>
      <picture>
        <source media="(max-width: 827px)" srcSet={image.srcSet} />
        <img
          src={image.source}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
            setImageError(true);
          }}
          // If there's no alt text available -> mark the image as decorative by using an empty string
          alt={image.alt || ''}
          {...(image.width && { width: image.width })}
          {...(image.height && { height: image.height })}
        />
      </picture>

      {showCaption && !imageError && (image.caption || image.credit) && (
        <>
          <div className={styles.captionContainer}>
            {image.caption && (
              <span className={styles.caption}>{image.caption}</span>
            )}
            {image.credit && (
              <span className={styles.credit}>Kuva: {image.credit}</span>
            )}
          </div>
        </>
      )}
    </div>
  );
};
