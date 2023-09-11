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
  (LinkComponent: RemixLinkType) => (props: NextLinkComponentProps) => {
    // What props need to be renamed/remapped between Next and Remix links
    const { href, children, ...rest } = props;
    return (
      <LinkComponent to={href} {...rest}>
        {children}
      </LinkComponent>
    );
  };
