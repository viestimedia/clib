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
  className?: string;
};

export const ListItem = ({
  heading,
  subheading,
  linkUrl,
  date,
  image,
  tag,
  className = '',
}: Props) => {
  const moduleExtend = styles[className] ? true : false;

  return (
    <li
      className={classNames(styles.listItem, {
        [styles.itemWithImage]: Boolean(image),
        [styles[className]]: moduleExtend,
        [className]: !moduleExtend,
      })}
    >
      <Link href={linkUrl}>
        <div className={styles.heading}>
          {heading}
          {subheading && <div className={styles.subheading}>{subheading}</div>}
        </div>
        {image && <div className={styles.image}>{image}</div>}
        <div className={styles.metadata}>
          {date && <span className={styles.date}>{date}</span>}
          {tag}
        </div>
      </Link>
    </li>
  );
};
