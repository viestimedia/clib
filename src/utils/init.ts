import { AnchorComponent } from 'components/Link/Link';
import { AnchorProps, LinkType } from 'models/link';

type Options = {
  linkComponent: LinkType;
};

export let Link: LinkType | ((props: AnchorProps) => JSX.Element) =
  AnchorComponent;

export const initializeComponentLibrary = (options: Options) => {
  console.log('initializeComponentLibrary', options.linkComponent);

  Link = options.linkComponent;
};
