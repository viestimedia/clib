import { UrlObject } from 'url';
import { Brand } from './brand';
import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

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

export type LinkComponentProps =
  | NextLinkComponentProps
  | RemixLinkComponentProps;

export type NextLinkType = (props: NextLinkComponentProps) => JSX.Element;
export type RemixLinkType = (props: RemixLinkComponentProps) => JSX.Element;
export type LinkType = NextLinkType;

export type AnchorProps = ComponentPropsWithoutRef<'a'>;
