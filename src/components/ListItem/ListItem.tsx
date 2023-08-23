import styles from './ListItem.module.scss';
import parse from 'html-react-parser';

type Props = {
  heading: string;
  subheading?: string;
  linkUrl: string;
  date?: string;
  image?: React.ReactElement;
  tag?: React.ReactElement;
};

export const ListItem = ({
  heading,
  subheading,
  linkUrl,
  date,
  image,
  tag,
}: Props) => {
  return (
    <li className={`${styles.listItem} ${image ? styles.itemWithImage : ''}`}>
      <a href={linkUrl}>
        <div className={styles.heading}>
          {parse(heading)}
          {subheading && (
            <div className={styles.subheading}>{parse(subheading)}</div>
          )}
        </div>
        {image && <div className={styles.image}>{image}</div>}
        <div className={styles.metadata}>
          {date && <span className={styles.date}>{date}</span>} {tag}{' '}
        </div>
      </a>
    </li>
  );
};
