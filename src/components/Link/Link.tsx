import { AnchorProps } from 'models/link';

export const AnchorComponent = (props: AnchorProps) => {
  const { children, ...rest } = props;
  return <a {...rest}>{children}</a>;
};
