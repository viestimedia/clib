import styles from './ListFooter.module.scss';
import { Button, ButtonVariant } from '..';

type Props = {
  text: string;
  linkUrl: string;
};

export const ListFooter = ({ text, linkUrl }: Props) => {
  return (
    <div className={styles.listFooter}>
      <Button label={text} variant={ButtonVariant.Tertiary} linkUrl={linkUrl} />
    </div>
  );
};
