import styles from './Button.module.scss';
import { Button, ButtonVariant } from 'components/Button/Button';
import BookmarkIcon from 'assets/icons/bookmark.svg';

type Props = {
  onClick: () => void;
  isBookmarked: boolean;
};

export const BookmarkButton = ({ isBookmarked, onClick }: Props) => {
  return (
    <Button
      variant={ButtonVariant.Bookmark}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      icon={<BookmarkIcon />}
      className={isBookmarked ? styles.selected : ''}
    />
  );
};
