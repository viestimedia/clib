import styles from './Heading.module.scss';
import parse from 'html-react-parser';
import { HeadingStyle, HeadingLevel } from 'models/heading';

interface HeadingProps {
  text: string;
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
  className,
}: HeadingProps) => {
  const HeadingTag = level;
  return (
    <HeadingTag
      id={id}
      className={`${styles.heading} ${styles[style]} ${
        italic ? styles.italic : ''
      } ${className ? className : ''}`}
    >
      {parse(text)}
    </HeadingTag>
  );
};
