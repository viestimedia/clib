import styles from './ListItem.module.scss';
import classNames from 'classnames';
import React from 'react';
import { Link } from '..';

type Props = {
  heading: string | React.ReactNode;
  subheading?: string | React.ReactNode;
  linkUrl: string;
  date?: string;
  image?: React.ReactElement;
  tag?: React.ReactElement;
  type?: ListItemType;
  className?: string;
  id?: string;
};

export enum ListItemType {
  Default = 'default',
  HorseAdItem = 'horseAdItem',
  JobAdItem = 'jobAdItem',
}

export const ListItem = ({
  heading,
  subheading,
  linkUrl,
  date,
  image,
  tag,
  type = ListItemType.Default,
  className = '',
  id,
}: Props) => {
  const moduleExtend = styles[className] ? true : false;
  const isAdItem = type === ListItemType.HorseAdItem || type === ListItemType.JobAdItem; 

  return (
    <li
      className={classNames(styles.listItem, styles[type], {
        [styles.itemWithImage]: Boolean(image),
        [styles[className]]: moduleExtend,
        [className]: !moduleExtend,
      })}
    >
      <Link href={linkUrl} id={id ? `listItem-${id}` : undefined}>
        {isAdItem && tag && <div className={styles.tag}>{tag}</div>}{' '}

        <div className={styles.heading}>
          <div className={styles.mainHeading}>{heading}</div>
          {subheading && <div className={styles.subheading}>{subheading}</div>}
        </div>

        {type === ListItemType.Default && (
          <>
            {image && <div className={styles.image}>{image}</div>}
            <div className={styles.metadata}>
              {date && <span className={styles.date}>{date}</span>}
              {tag}
            </div>
          </>
        )}
      </Link>
    </li>
  );
};
