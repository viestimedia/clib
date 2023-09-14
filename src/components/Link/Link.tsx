import {
  AnchorProps,
  NextLinkComponentProps,
  RemixLinkType,
} from 'models/link';

export const AnchorComponent = (props: AnchorProps) => {
  const { children, ...rest } = props;
  return <a {...rest}>{children}</a>;
};

export const RemixLink =
  // What props need to be renamed/remapped between Next and Remix links
  (LinkComponent: RemixLinkType) => (props: NextLinkComponentProps) => {
    const { href, prefetch, children, openInNewTab, ...rest } = props;
    // type PrefetchBehavior = 'intent' | 'render' | 'none' | 'viewport';
    // NOTE: we don't support PrefetchBehavior in Remix yet, only intent
    // Next only has prefetch as a boolean, so we map it to intent or none
    const remixPrefetch = prefetch ? 'intent' : 'none';
    const target = openInNewTab ? '_blank' : undefined;
    const rel = openInNewTab ? 'noopener noreferrer' : undefined;
    return (
      <LinkComponent
        to={href}
        prefetch={remixPrefetch}
        target={target}
        rel={rel}
        {...rest}
      >
        {children}
      </LinkComponent>
    );
  };
