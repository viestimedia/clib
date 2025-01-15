import styles from './Heading.module.scss';
import classNames from 'classnames';

export enum HeadingStyle {
  ExtraLarge = 'extraLarge',
  Large = 'large',
  Default = 'default',
  Small = 'small',
  Tiny = 'tiny',
  Secondary = 'secondary',
  Subheading = 'subheading',
  TeaserXL = 'teaserXl',
  TeaserL = 'teaserL',
  TeaserM = 'teaserM',
  TeaserS = 'teaserS',
  TeaserXS = 'teaserXs',
  ArticleHeading = 'articleHeading',
  ArticleSubheading = 'articleSubheading',
}

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingProps {
  text: string | React.ReactNode;
  category?: string;
  style: HeadingStyle;
  level: HeadingLevel;
  italic?: boolean;
  id?: string;
  className?: string;
  extraClassName?: string;
}

export const Heading = ({
  text,
  category,
  level,
  style,
  italic,
  id,
  className = '',
  extraClassName = '',
}: HeadingProps) => {
  const moduleExtend = styles[className] ? true : false;
  const extraModuleExtend = styles[extraClassName] ? true : false;
  const HeadingTag = level;
  return (
    <HeadingTag
      id={id}
      className={classNames(styles.heading, styles[style], {
        [styles.italic]: Boolean(italic),
        [styles[className]]: moduleExtend,
        [className]: !moduleExtend,
        [styles[extraClassName]]: extraModuleExtend,
        [extraClassName]: extraClassName,
      })}
    >
      {category && (
        <>
          <span className={styles.category}>
            {category}
            <span className={styles.divider}> | </span>
          </span>
        </>
      )}
      {text}
    </HeadingTag>
  );
};
