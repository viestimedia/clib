import { AnchorComponent, RemixLink } from 'components/Link/Link';
import {
  AnchorProps,
  LinkType,
  NextLinkType,
  RemixLinkType,
} from 'models/link';

type Options =
  | {
      linkComponent: NextLinkType;
      variation: 'next';
    }
  | {
      linkComponent: RemixLinkType;
      variation: 'remix';
    };

export let Link: LinkType | ((props: AnchorProps) => JSX.Element) =
  AnchorComponent;

export const initializeComponentLibrary = (options: Options) => {
  const { variation, linkComponent } = options;

  switch (variation) {
    case 'remix':
      // A link component that maps Next.js type of props to Remix type of props
      Link = RemixLink(linkComponent);
      break;
    case 'next':
      // Next.js type of link props used
      Link = options.linkComponent;
      break;
    default:
      throw new Error('Invalid variation');
  }
};
