import classNames from 'classnames';
import styles from './Teaser.module.scss';
import { Heading, TopicHeading } from 'components/Heading/Heading';
import { Link } from '..';
import ClockIcon from 'assets/icons/clock.svg?react';
import { TeaserType, TeaserHeadingMap } from './Teaser.types';

export { TeaserType, TeaserHeadingMap };

type Props = {
  id: string;
  heading: string | React.ReactNode;
  subheading?: string;
  category?: string;
  text?: string;
  linkUrl: string;
  image?: React.ReactElement;
  topBanner?: React.ReactElement;
  author?: React.ReactElement;
  tag?: React.ReactElement;
  date?: string;
  duration?: string;
  rankNumber?: number;
  teaserType?: TeaserType;
  className?: string;
  buttons?: React.ReactElement[];
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

type TeaserMetadataProps = {
  date?: string;
  duration?: string;
  tag?: React.ReactElement;
};

const TeaserMetadata = ({ date, duration, tag }: TeaserMetadataProps) => {
  if (!date && !duration && !tag) {
    return null;
  }

  return (
    <div className={styles.metadata}>
      {date && <div className={styles.date}>{date}</div>}
      {duration && (
        <div className={styles.duration}>
          <ClockIcon /> {duration}
        </div>
      )}
      {tag && <div className={styles.tag}>{tag}</div>}
    </div>
  );
};

type TeaserTopicProps = {
  id: string;
  linkUrl: string;
  heading: string | React.ReactNode;
  category?: string;
  image?: React.ReactElement;
  tag?: React.ReactElement;
  date?: string;
  duration?: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

const TeaserTopic = ({
  id,
  linkUrl,
  heading,
  category,
  image,
  date,
  duration,
  tag,
  className = '',
  onClick,
}: TeaserTopicProps) => {
  const moduleExtend = styles[className] ? true : false;
  const rootClassName = classNames(styles.teaserContainer, {
    [styles[TeaserType.Topic]]: true,
    [styles.noImage]: Boolean(!image),
    [styles[className]]: moduleExtend,
    [className]: !moduleExtend,
  });

  return (
    <div className={rootClassName}>
      <Link
        href={linkUrl}
        className={styles.teaserLink}
        id={`teaser-${id}`}
        data-analytics-name="teaser-link"
        onClick={onClick}
      >
        {image && <div className={styles.articleImage}>{image}</div>}
        <div className={styles.articleInfo}>
          <div className={styles.heading}>
            <TopicHeading
              topic={category}
              text={heading}
              level="h2"
              className={className}
            />
          </div>
          <TeaserMetadata date={date} duration={duration} tag={tag} />
        </div>
      </Link>
    </div>
  );
};

const TeaserDefault = ({
  id,
  heading,
  subheading,
  category,
  text,
  linkUrl,
  image,
  topBanner,
  author,
  tag,
  date,
  duration,
  rankNumber,
  teaserType = TeaserType.Compact,
  buttons,
  className = '',
  onClick,
}: Props) => {
  const moduleExtend = styles[className] ? true : false;
  const containerClassName = classNames(styles.teaserContainer, {
    [styles[teaserType]]: true,
    [styles.noImage]: Boolean(!image),
    [styles.hasButtons]: Boolean(buttons),
    [styles[className]]: moduleExtend,
    [className]: !moduleExtend,
  });
  const headingStyle = TeaserHeadingMap[teaserType];

  return (
    <div className={containerClassName}>
      <Link
        href={linkUrl}
        className={styles.teaserLink}
        id={`teaser-${id}`}
        data-analytics-name="teaser-link"
        onClick={onClick}
      >
        {topBanner && <div className={styles.banner}>{topBanner}</div>}
        {image && <div className={styles.articleImage}>{image}</div>}
        {author && <div className={styles.authorContainer}>{author}</div>}
        {rankNumber && <div className={styles.rankNumber}>{rankNumber}</div>}
        <div className={styles.articleInfo}>
          <div className={styles.heading}>
            <Heading
              text={heading}
              category={category}
              style={headingStyle}
              level="h2"
              className={className}
            />
            {subheading && (
              <div className={styles.subheading}>{subheading}</div>
            )}
            {text && <div className={styles.text}>{text}</div>}
          </div>
          <TeaserMetadata date={date} duration={duration} tag={tag} />
        </div>
      </Link>
      {buttons && <div className={styles.buttons}>{buttons}</div>}
    </div>
  );
};

export const Teaser = (props: Props) => {
  const { teaserType, ...topicProps } = props;

  if (teaserType === TeaserType.Topic) {
    return <TeaserTopic {...topicProps} />;
  }

  return <TeaserDefault {...props} />;
};
