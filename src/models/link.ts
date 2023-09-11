import { UrlObject } from 'url';
import { Brand } from './brand';
import { PropsWithChildren } from 'react';

type Url = string | UrlObject;
type LinkProps = {
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

// TODO: Accept Remix type of link component as well
export type LinkType = (props: PropsWithChildren<LinkProps>) => JSX.Element;

export type AnchorProps = JSX.IntrinsicElements['a'];
