import {
  FallbackLink,
  RemixLink,
  NextLink,
  LinkType,
  NextLinkType,
  RemixLinkType,
} from 'components/Link/Link';

type Options =
  | {
      // linkComponent: NextLinkType;
      variation: 'next';
    }
  | {
      // linkComponent: RemixLinkType;
      variation: 'remix';
    };

export let Link: LinkType = FallbackLink;

/**
 * Initialize the component library before using any components.
 *
 * @example import NextLink from 'next/link';
 * @example initializeComponentLibrary({ linkComponent: NextLink, variation: 'next' });
 */
export function initializeComponentLibrary(options: Options) {
  const { variation } = options;

  function remixInitializer() {
    return function (Component: RemixLinkType) {
      Link = RemixLink(Component);
    };
  }

  function nextInitializer() {
    return function (Component: NextLinkType) {
      Link = NextLink(Component);
    };
  }

  /**
   * Wrap framework spesific link components
   * with our own wrappers for a more unified API.
   */
  switch (variation) {
    case 'remix':
      return remixInitializer();
    case 'next':
      return nextInitializer();
    default:
      throw new Error('Invalid variation');
  }
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

export type { NextLinkType, RemixLinkType, LinkType };
