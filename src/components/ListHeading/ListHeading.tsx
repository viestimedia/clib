import styles from './ListHeading.module.scss';
import classNames from 'classnames';

type Props = {
  text: string;
  type?: ListHeadingType;
  className?: string;
  button?: React.ReactNode;
};

export enum ListHeadingType {
  Default = 'default',
  NewsLarge = 'newsLarge',
  NewsSmall = 'newsSmall',
  AdLarge = 'adLarge',
  AdSmall = 'adSmall',
}

export const ListHeading = ({
  text,
  type = ListHeadingType.Default,
  className = '',
  button,
}: Props) => {
  const moduleExtend = styles[className] ? true : false;

  return (
    <div
      className={classNames(styles.heading, styles[type], {
        [styles[className]]: moduleExtend,
        [className]: !moduleExtend,
      })}
    >
      {text}
      {button}
    </div>
  );
};
