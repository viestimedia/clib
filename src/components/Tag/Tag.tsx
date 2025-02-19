import styles from './Tag.module.scss';
import classNames from 'classnames';
import CloseIcon from 'assets/icons/close.svg';

type Props = {
  text: string;
  type?: TagType;
  className?: string;
  onClose?: () => void;
};

export enum TagType {
  Plain = 'plain',
  Buying = 'buying',
  Selling = 'selling',
  Leasing = 'leasing',
  Premium = 'premium',
  PremiumPlain = 'premiumPlain',
  Primary = 'primary',
  Outline = 'outline',
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
export const Tag = ({
  text,
  type = TagType.Plain,
  className = '',
  onClose,
}: Props) => {
  const moduleExtend = styles[className] ? true : false;
  const hasTagCss = styles[type] ? true : false;

  return (
    <div
      className={classNames(styles.tag, {
        [styles[type]]: hasTagCss,
        [styles[className]]: moduleExtend,
        [className]: !moduleExtend,
        [styles.closeable]: !!onClose,
      })}
    >
      <span>{text}</span>
      {onClose && (
        <button onClick={onClose} className={styles.closeButton}>
          <CloseIcon />
        </button>
      )}
    </div>
  );
};
