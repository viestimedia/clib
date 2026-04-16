import { HeadingStyle } from 'components/Heading/Heading';

export enum TeaserType {
  ExtraLarge = 'extraLarge',
  Large = 'large',
  Compact = 'compact',
  Small = 'small',
  RelatedArticle = 'relatedArticle',
  RelatedAdArticle = 'relatedAdArticle',
  MostPopular = 'mostPopular',
  BackgroundImage = 'backgroundImage',
  Topic = 'topic',
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
  [TeaserType.Topic]: HeadingStyle.TeaserTopic,
  [TeaserType.Carousel]: HeadingStyle.TeaserXS,
  [TeaserType.Machine]: HeadingStyle.TeaserXS,
  [TeaserType.Medium]: HeadingStyle.Secondary,
};
