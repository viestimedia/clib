import styles from './Heading.module.scss';
import { HeadingStyle, HeadingLevel } from 'models/heading';
import classNames from 'classnames';

interface HeadingProps {
  text: string | React.ReactNode;
  style: HeadingStyle;
  level: HeadingLevel;
  italic?: boolean;
  id?: string;
  className?: string;
}

export const Heading = ({
  text,
  level,
  style,
  italic,
  id,
  className = '',
}: HeadingProps) => {
  const moduleExtend = styles[className] ? true : false;
  const HeadingTag = level;
  return (
    <HeadingTag
      id={id}
      className={classNames(styles.heading, styles[style], {
        [styles.italic]: Boolean(italic),
        [styles[className]]: moduleExtend,
        [className]: !moduleExtend,
      })}
    >
      {text}
    </HeadingTag>
  );
};
