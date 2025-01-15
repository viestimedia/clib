import styles from './Tag.module.scss';
import classNames from 'classnames';

type Props = {
  text: string;
  type?: TagType;
  className?: string;
};

export enum TagType {
  Plain = 'plain',
  Buying = 'buying',
  Selling = 'selling',
  Leasing = 'leasing',
  Premium = 'premium',
  PremiumPlain = 'premiumPlain',
}

/**
 * 3 ways to extend the tag:
 *
 * 1. Use the type prop. Each has their own css class.
 * 2. Use the className prop to select a subclass. This predates the TagType enum.
 * Please use the TagType if possible.
 * 3. Use a custom class name, bypassing CSS modules. This is useful with one off
 * tags in projects that use Tailwind, or just adding margins to other elements.
 */
export const Tag = ({ text, type = TagType.Plain, className = '' }: Props) => {
  const moduleExtend = styles[className] ? true : false;
  const hasTagCss = styles[type] ? true : false;

  return (
    <div
      className={classNames(styles.tag, {
        [styles[type]]: hasTagCss,
        [styles[className]]: moduleExtend,
        [className]: !moduleExtend,
      })}
    >
      <span>{text}</span>
    </div>
  );
};
