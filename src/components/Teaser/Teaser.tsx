import classNames from 'classnames';
import styles from './Teaser.module.scss';
import { Heading, HeadingStyle } from 'components/Heading/Heading';
import { Link } from '..';
import ClockIcon from 'assets/icons/clock.svg?react';

export enum TeaserType {
  ExtraLarge = 'extraLarge',
  Large = 'large',
  Compact = 'compact',
  Small = 'small',
  RelatedArticle = 'relatedArticle',
  RelatedAdArticle = 'relatedAdArticle',
  MostPopular = 'mostPopular',
  BackgroundImage = 'backgroundImage',
  CategoryLatest = 'categoryLatest',
  Carousel = 'carousel',
  Machine = 'machine',
  Medium = 'medium', // Used only in ilmoitusautomaatti
}

export const TeaserHeadingMap: Record<TeaserType, HeadingStyle> = {
  [TeaserType.ExtraLarge]: HeadingStyle.TeaserXL,
  [TeaserType.Large]: HeadingStyle.TeaserL,
  [TeaserType.Compact]: HeadingStyle.TeaserM,
  [TeaserType.RelatedArticle]: HeadingStyle.TeaserM,
  [TeaserType.RelatedAdArticle]: HeadingStyle.TeaserM,
  [TeaserType.Small]: HeadingStyle.TeaserXS,
  [TeaserType.MostPopular]: HeadingStyle.TeaserXS,
  [TeaserType.BackgroundImage]: HeadingStyle.TeaserXL,
  [TeaserType.CategoryLatest]: HeadingStyle.TeaserXL,
  [TeaserType.Carousel]: HeadingStyle.TeaserXS,
  [TeaserType.Machine]: HeadingStyle.TeaserXS,
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

type TeaserCategoryLatestProps = {
  id: string;
  linkUrl: string;
  heading: string | React.ReactNode;
  subheading?: string;
  category?: string;
  text?: string;
  image?: React.ReactElement;
  topBanner?: React.ReactElement;
  author?: React.ReactElement;
  tag?: React.ReactElement;
  date?: string;
  duration?: string;
  rankNumber?: number;
  buttons?: React.ReactElement[];
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

const TeaserCategoryLatest = ({
  id,
  linkUrl,
  heading,
  subheading,
  category,
  text,
  image,
  topBanner,
  author,
  rankNumber,
  date,
  duration,
  tag,
  buttons,
  className = '',
  onClick,
}: TeaserCategoryLatestProps) => {
  const headingStyle = TeaserHeadingMap[TeaserType.CategoryLatest];
  const moduleExtend = styles[className] ? true : false;
  const rootClassName = classNames(styles.teaserContainer, {
    [styles[TeaserType.CategoryLatest]]: true,
    [styles.noImage]: Boolean(!image),
    [styles.hasButtons]: Boolean(buttons),
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
        {topBanner && <div className={styles.banner}>{topBanner}</div>}
        {image && <div className={styles.articleImage}>{image}</div>}
        {author && <div className={styles.authorContainer}>{author}</div>}
        {rankNumber && <div className={styles.rankNumber}>{rankNumber}</div>}
        <div className={styles.articleInfo}>
          <div className={styles.heading}>
            {category && (
              <div
                className={classNames(styles.standaloneCategory, {
                  [styles[className]]: moduleExtend,
                  [className]: Boolean(className) && !moduleExtend,
                })}
              >
                {category}
              </div>
            )}
            <Heading
              text={heading}
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
  const defaultContainerClassName = classNames(styles.teaserContainer, {
    [styles[teaserType]]: true,
    [styles.noImage]: Boolean(!image),
    [styles.hasButtons]: Boolean(buttons),
    [styles[className]]: moduleExtend,
    [className]: !moduleExtend,
  });

  if (teaserType === TeaserType.CategoryLatest) {
    return (
      <TeaserCategoryLatest
        id={id}
        linkUrl={linkUrl}
        heading={heading}
        subheading={subheading}
        category={category}
        text={text}
        image={image}
        topBanner={topBanner}
        author={author}
        rankNumber={rankNumber}
        date={date}
        duration={duration}
        tag={tag}
        buttons={buttons}
        className={className}
        onClick={onClick}
      />
    );
  }

  const headingStyle = TeaserHeadingMap[teaserType];

  return (
    <div className={defaultContainerClassName}>
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
