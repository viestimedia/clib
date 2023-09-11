import { HeadingStyle } from 'models/heading';
import { Heading } from 'components/Heading/Heading';
import styles from './ListHeading.module.scss';

type Props = {
  text: string;
  className?: string;
};

export const ListHeading = ({ text, className }: Props) => {
  return (
    <div className={`${styles.listHeading} ${className ? className : ''}`}>
      <Heading text={text} style={HeadingStyle.Secondary} level="h2" />
    </div>
  );
};
