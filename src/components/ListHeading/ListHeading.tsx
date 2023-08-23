import { HeadingStyle } from 'models/heading';
import { Heading } from '..';
import styles from './ListHeading.module.scss';

type Props = {
  text: string;
};

export const ListHeading = ({
  text
}: Props) => {
  return (
    <div className={styles.listHeading}>
      <Heading text={text} style={HeadingStyle.Secondary} level="h2" />
    </div>
  );
};
