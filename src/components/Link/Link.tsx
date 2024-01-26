import { UrlObject } from 'url';
// import { Brand } from './brand';
import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

export enum Brand {
  MT = 'mt',
  KV = 'kv',
  VM = 'vm',
}

type Url = string | UrlObject;
type NextLinkProps = {
  href: Url;
  as?: Url;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  prefetch?: boolean;
  locale?: string | false;
} & {
  id?: string;
  className?: string;
  openInNewTab?: boolean;
  brand?: Brand;
  ariaLabel?: string;
  tabIndex?: number;
};

// Not actual Next's Link props but more like vm-web Link component props
export type NextLinkComponentProps = PropsWithChildren<NextLinkProps>;

type PrefetchBehavior = 'intent' | 'render' | 'none' | 'viewport';

// Not a perfect representation of Remix's LinkProps, but good enough for now
export interface RemixLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: Url;
  prefetch?: PrefetchBehavior;
}

export type RemixLinkComponentProps = PropsWithChildren<RemixLinkProps>;
export type NextLinkType = (props: NextLinkComponentProps) => JSX.Element;
export type RemixLinkType = (props: RemixLinkComponentProps) => JSX.Element;
export type LinkType = NextLinkType;
export type AnchorProps = ComponentPropsWithoutRef<'a'>;

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
