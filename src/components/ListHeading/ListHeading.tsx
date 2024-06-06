import { Heading, HeadingStyle } from 'components/Heading/Heading';
import styles from './ListHeading.module.scss';
import classNames from 'classnames';


type Props = {
  text: string;
  className?: string;
};

export const ListHeading = ({ text, className = '' }: Props) => {
  const moduleExtend = styles[className] ? true : false;

  return (
    <div
      className={classNames(styles.listHeading, {
        [styles[className]]: moduleExtend,
        [className]: !moduleExtend,
      })}
    >
      <Heading text={text} style={HeadingStyle.Secondary} level="h2" />
    </div>
  );
};
