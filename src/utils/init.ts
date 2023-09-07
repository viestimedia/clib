import { Component, PropsWithChildren } from 'react';
import { UrlObject } from 'url';

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
};

// TODO: Accept Remix type of link component as well
type LinkType = (props: PropsWithChildren<LinkProps>) => JSX.Element;

export let LinkComponent: LinkType | undefined;

type Options = {
  linkComponent: LinkType;
};

export const initializeComponentLibrary = (options: Options) => {
  console.log('initializeComponentLibrary', options.linkComponent);

  LinkComponent = options.linkComponent;
};
