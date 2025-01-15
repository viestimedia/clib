import classNames from 'classnames';
import styles from './Teaser.module.scss';
import { Heading, HeadingStyle } from 'components/Heading/Heading';
import { Link } from '..';

export enum TeaserType {
  ExtraLarge = 'extraLarge',
  Large = 'large',
  Compact = 'compact',
  Small = 'small',
  RelatedArticle = 'relatedArticle',
  RelatedAdArticle = 'relatedAdArticle',
  MostPopular = 'mostPopular',
  BackgroundImage = 'backgroundImage',
  Carousel = 'carousel',
  Medium = 'medium', // Used only in ilmoitusautomaatti
}

export const TeaserHeadingMap: Record<TeaserType, HeadingStyle> = {
  [TeaserType.ExtraLarge]: HeadingStyle.TeaserXL,
  [TeaserType.Large]: HeadingStyle.TeaserL,
  [TeaserType.Compact]: HeadingStyle.TeaserM,
  [TeaserType.RelatedArticle]: HeadingStyle.TeaserM,
  [TeaserType.RelatedAdArticle]: HeadingStyle.TeaserS,
  [TeaserType.Small]: HeadingStyle.TeaserXS,
  [TeaserType.MostPopular]: HeadingStyle.TeaserXS,
  [TeaserType.BackgroundImage]: HeadingStyle.TeaserXL,
  [TeaserType.Carousel]: HeadingStyle.TeaserS,
  [TeaserType.Medium]: HeadingStyle.Secondary,
};

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
  metadata?: React.ReactElement;
  tag?: React.ReactElement;
  date?: string;
  rankNumber?: number;
  teaserType?: TeaserType;
  className?: string;
};

export const Teaser = ({
  id,
  heading,
  subheading,
  category,
  text,
  linkUrl,
  image,
  topBanner,
  author,
  metadata,
  tag,
  date,
  rankNumber,
  teaserType = TeaserType.Compact,
  className = '',
}: Props) => {
  const moduleExtend = styles[className] ? true : false;
  const headingStyle = TeaserHeadingMap[teaserType];

  return (
    <div
      className={classNames(styles.teaserContainer, {
        [styles[teaserType]]: true,
        [styles.noImage]: Boolean(!image),
        [styles[className]]: moduleExtend,
        [className]: !moduleExtend,
      })}
    >
      <Link
        href={linkUrl}
        className={styles.teaserLink}
        id={`teaser-${id}`}
        data-analytics-name="teaser-link"
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
          {(metadata || date || tag) && (
            <div className={styles.metadata}>
              {date && <div className={styles.date}>{date}</div>}
              {tag && <div className={styles.tag}>{tag}</div>}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};
