import { UrlObject } from 'url';
// import { Brand } from './brand';
import { HTMLAttributeAnchorTarget, PropsWithChildren } from 'react';

export enum Brand {
  MT = 'mt',
  KV = 'kv',
  VM = 'vm',
}

type Url = string | UrlObject;
type NextLinkProps = {
  href?: Url;
  as?: Url;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;

  /**
   * Next.js supports only 'intent' and 'none',
   * so we map all values except 'none' to 'intent'.
   */
  prefetch?: PrefetchBehavior;
  locale?: string | false;
} & {
  id?: string;
  className?: string;
  openInNewTab?: boolean;
  brand?: Brand;
  ariaLabel?: string;
  tabIndex?: number;

  /**
   * This prop is defined here because our implementation
   * turns openInNewTab into target and rel. Don't use it.
   *
   * @note Use `openInNewTab` instead
   */
  target?: HTMLAttributeAnchorTarget;
  rel?: string;
};

// Not actual Next's Link props but more like vm-web Link component props
export type NextLinkComponentProps = PropsWithChildren<NextLinkProps>;

type PrefetchBehavior = 'intent' | 'render' | 'none' | 'viewport';

/**
 * This might not be 100% accurate, but it's very similar
 * to what the actual type is in Remix, which uses
 * LinkProps from react-router that extends HTMLAnchorElement.
 *
 * Rest of the props implemented with
 * https://remix.run/docs/ja/main/components/link.
 */
export interface RemixLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to?: Url;

  /**
   * This might change in the future
   *
   * https://remix.run/docs/ja/main/guides/lazy-route-discovery
   */
  discover?: 'render' | 'none';
  prefetch?: PrefetchBehavior;
  preventScrollReset?: boolean;
  relative?: 'route' | 'path';
  reloadDocument?: boolean;
  replace?: boolean;
  state?: any; // Access with useLocation().state
  viewTransition?: boolean;

  // Custom props to handle openInNewTab,
  // similarly to how we do it with NextLink
  openInNewTab?: boolean;
  href?: Url;
}

export type RemixLinkComponentProps = PropsWithChildren<RemixLinkProps>;

// Somewhat like next/link props, but not fully
// This is somewhat confusing, because of the naming here
type NextLinkPropsLike = Omit<NextLinkComponentProps, 'prefetch'> & {
  prefetch?: boolean;
};
export type NextLinkType = (props: NextLinkPropsLike) => JSX.Element;
export type RemixLinkType = (props: RemixLinkComponentProps) => JSX.Element;

/**
 * Standard <a> element that's used as a fallback
 * if the components are used BEFORE initializing
 * the library.
 *
 * If this is used, you've not initialized the library
 * correctly.
 */
export const FallbackLink = (props: any) => {
  const { children, ...rest } = props;

  console.error('Used default anchor tag, is clib initialized properly?');

  return <a {...rest}>{children}</a>;
};

/**
 * Used for normal <a> elements, which in turn
 * are used for external links, anchor links,
 * and links that open in a new tab.
 */
const NormalLink = ({
  children,
  href,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: React.ReactNode;
}) => {
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
};

/**
 * Remix is based on react-router, which handles
 * some things automatically, compared to Next.
 * We don't have to handle anchor links or external
 * links separately.
 */
export const RemixLink =
  (LinkComponent: RemixLinkType) => (props: RemixLinkComponentProps) => {
    /**
     * @note `to` is not destructured INTENTIONALLY.
     * If `href` is set, it will be used as `to`.
     * If `to` is set, it will be used as `to`,
     * as it's spread onto the LinkComponent.
     *
     * Same with rel and target.
     *
     * openInNewTab is destructured to avoid passing it to the LinkComponent.
     * It's used in getTargetAndRel, which uses the full props.
     */
    const { href, prefetch, children, openInNewTab, ...rest } = props;
    const { target, rel } = getTargetAndRel(props);

    /**
     * @note We don't support PrefetchBehavior in Remix yet,
     * only intent. Next only has prefetch as a boolean,
     * so we map it to intent or none.
     */
    const remixPrefetch = prefetch ? 'intent' : 'none';

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

/**
 * RemixLink is... "closer to the metal" than NextLink
 * and we have to handle certain things manually here.
 */
export const NextLink =
  (LinkComponent: NextLinkType) => (props: NextLinkComponentProps) => {
    const { href, children, openInNewTab, prefetch: pf, ...rest } = props;
    const { target, rel } = getTargetAndRel(props);
    const hrefStr = href ? href.toString() : '';

    if (openInNewTab) {
      // Note that this includes things like `aria-label`
      // that might be set in the props.
      return (
        <NormalLink href={hrefStr} target={target} rel={rel} {...rest}>
          {children}
        </NormalLink>
      );
    }

    if (hrefStr.startsWith('#')) {
      <a href={hrefStr} aria-hidden="false" {...rest}>
        {children}
      </a>;
    }

    const prefetch: boolean = pf === 'intent';

    return (
      <LinkComponent
        href={href}
        target={target}
        rel={rel}
        prefetch={prefetch}
        {...rest}
      >
        {children}
      </LinkComponent>
    );
  };

function getTargetAndRel(
  props: NextLinkComponentProps | RemixLinkComponentProps
) {
  const { openInNewTab, target, rel } = props;

  if (openInNewTab) {
    return {
      target: '_blank',
      // If rel is provided, use it.
      rel: rel || 'noopener noreferrer',
    };
  }

  return {
    target,
    rel,
  };
}
