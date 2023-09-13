import classNames from 'classnames';
import styles from './Teaser.module.scss';
import { Heading } from 'components/Heading/Heading';
import { HeadingStyle } from 'models/heading';
import { TeaserType } from 'models/type';
import { Link } from 'utils/init';

type Props = {
  id: string;
  heading: string | React.ReactNode;
  subheading?: string;
  linkUrl: string;
  image?: React.ReactElement;
  topBanner?: React.ReactElement;
  author?: React.ReactElement;
  metadata?: React.ReactElement;
  tag?: React.ReactElement;
  teaserType?: TeaserType;
  className?: string;
};

export const Teaser = ({
  id,
  heading,
  subheading,
  linkUrl,
  image,
  topBanner,
  author,
  metadata,
  tag,
  teaserType = TeaserType.Compact,
  className = '',
}: Props) => {
  const moduleExtend = styles[className] ? true : false;
  const headingStyle =
    teaserType === TeaserType.Compact || teaserType === TeaserType.Medium
      ? HeadingStyle.Secondary
      : HeadingStyle.Small;

  return (
    <div
      className={classNames(styles.teaserContainer, {
        [styles[teaserType]]: true,
        [styles.noImage]: Boolean(!image),
        [styles[className]]: moduleExtend,
        [className]: !moduleExtend,
      })}
    >
      <Link href={linkUrl} className={styles.teaserLink} id={`teaser-${id}`}>
        {topBanner && <div className={styles.banner}>{topBanner}</div>}
        {image && <div className={styles.articleImage}>{image}</div>}
        {author && <div className={styles.authorContainer}>{author}</div>}
        <div className={styles.articleInfo}>
          <div className={styles.heading}>
            <Heading
              text={heading}
              style={headingStyle}
              level="h2"
              className={className}
            />
            {subheading && (
              <div className={styles.subheading}>{subheading}</div>
            )}
          </div>
          {tag && <div className={styles.tag}>{tag}</div>}
        </div>
      </Link>
      <div className={styles.metadata}>{metadata}</div>
    </div>
  );
};
