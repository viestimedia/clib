import styles from './ListItem.module.scss';
import classNames from 'classnames';
import React from 'react';
import { Link } from 'utils/init';

type Props = {
  heading: string | React.ReactNode;
  subheading?: string | React.ReactNode;
  linkUrl: string;
  date?: string;
  image?: React.ReactElement;
  tag?: React.ReactElement;
  type?: ItemType;
  className?: string;
  id?: string;
};

export enum ItemType {
  ImageItem = 'imageItem',
  TagItem = 'tagItem',
}

export const ListItem = ({
  heading,
  subheading,
  linkUrl,
  date,
  image,
  tag,
  type = ItemType.ImageItem,
  className = '',
  id,
}: Props) => {
  const moduleExtend = styles[className] ? true : false;

  return (
    <li
      className={classNames(styles.listItem, styles[type], {
        [styles.itemWithImage]: Boolean(image),
        [styles[className]]: moduleExtend,
        [className]: !moduleExtend,
      })}
    >
      <Link href={linkUrl} id={id ? `listItem-${id}` : undefined}>
        <div className={styles.heading}>
          <div className={styles.mainHeading}>{heading}</div>
          {subheading && <div className={styles.subheading}>{subheading}</div>}
        </div>

        {type === ItemType.ImageItem && (
          <>
            {image && <div className={styles.image}>{image}</div>}
            <div className={styles.metadata}>
              {date && <span className={styles.date}>{date}</span>}
              {tag}
            </div>
          </>
        )}

        {type === ItemType.TagItem && tag && (
          <div className={styles.tag}>{tag}</div>
        )}
      </Link>
    </li>
  );
};
