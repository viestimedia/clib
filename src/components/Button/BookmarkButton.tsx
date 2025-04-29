import styles from './Button.module.scss';
import {
  Button,
  ButtonSize,
  ButtonVariant,
  ButtonProps,
} from 'components/Button/Button';
import BookmarkIcon from 'assets/icons/bookmark.svg';

type Props = {
  isBookmarked: boolean;
} & ButtonProps;

export const BookmarkButton = ({ isBookmarked, onClick, ariaLabel }: Props) => {
  return (
    <Button
      variant={ButtonVariant.Bookmark}
      size={ButtonSize.XS}
      onClick={onClick}
      icon={<BookmarkIcon />}
      className={isBookmarked ? styles.selected : ''}
      ariaLabel={ariaLabel}
    />
  );
};
