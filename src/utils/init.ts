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
      linkComponent: NextLinkType;
      variation: 'next';
    }
  | {
      linkComponent: RemixLinkType;
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
  const { variation, linkComponent } = options;

  /**
   * Wrap framework spesific link components
   * with our own wrappers for a more unified API.
   */
  switch (variation) {
    case 'remix':
      Link = RemixLink(linkComponent);
      break;
    case 'next':
      Link = NextLink(linkComponent);
      break;
    default:
      throw new Error('Invalid variation');
  }
}
