import {
  FallbackLink,
  RemixLink,
  NextLink,
  NextLinkType,
  RemixLinkType,
} from 'components/Link/Link';

export let Link: RemixLinkType | NextLinkType = FallbackLink;
export type { NextLinkType, RemixLinkType };

/**
 * Initialize the component library before using any components.
 */
export function initializeComponentLibraryWithRemix() {
  return function ({ RemixLink: LinkComponent }: { RemixLink: RemixLinkType }) {
    Link = RemixLink(LinkComponent) as RemixLinkType;

    // This return exists only to help TS infer that Link is now a RemixLinkType.
    return 'remix';
  };
}

/**
 * Initialize the component library before using any components.
 */
export function initializeComponentLibraryWithNext() {
  return function ({ NextLink: LinkComponent }: { NextLink: NextLinkType }) {
    Link = NextLink(LinkComponent) as NextLinkType;

    // This return exists only to help TS infer that Link is now a NextLinkType.
    return 'next';
  };
}

// Re-export everything from invidual components.
// Use the component files to control what is exported.
export * from './AVPlayer/AVPlayer';
export * from './Datepicker';
export * from './Button/Button';
export * from './Spinner/Spinner';
export * from './HeaderBanner/HeaderBanner';
export * from './Heading/Heading';
export * from './Input/Input';
export * from './InputDatePicker/InputDatePicker';
export * from './InputMessage/InputMessage';
export * from './InputRadio/InputRadio';
export * from './InputCheckbox/InputCheckbox';
export * from './InputSelect/InputSelect';
export * from './InputTextarea/InputTextarea';
export * from './ListFooter/ListFooter';
export * from './ListHeading/ListHeading';
export * from './ListItem/ListItem';
export * from './Tabs/Tabs';
export * from './Tag/Tag';
export * from './Teaser/Teaser';
export * from './Footer/Footer';
export * from './ViestimediaFooter/ViestimediaFooter';
export * from './CookieSettingsLink/CookieSettingsLink';
export * from './WideWrapper/WideWrapper';
export * from './Image/Image';
export * from './Image/ImageCarousel';
export * from './Breadcrumb/Breadcrumb';
export * from './NotificationBanner/NotificationBanner';
export * from './Button/BookmarkButton';
