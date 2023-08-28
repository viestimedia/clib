import styles from './ListItem.module.scss';
import parse from 'html-react-parser';
import classNames from 'classnames';

type Props = {
  heading: string;
  subheading?: string;
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
      <a href={linkUrl}>
        <div className={styles.heading}>
          {parse(heading)}
          {subheading && (
            <div className={styles.subheading}>{parse(subheading)}</div>
          )}
        </div>
        {image && <div className={styles.image}>{image}</div>}
        <div className={styles.metadata}>
          {date && <span className={styles.date}>{date}</span>}
          {tag}
        </div>
      </a>
    </li>
  );
};
