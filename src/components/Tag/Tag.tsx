import styles from './Tag.module.scss';
import classNames from 'classnames';

type Props = {
  text: string;
  className?: string;
};

export const Tag = ({ text, className = '' }: Props) => {
  const moduleExtend = styles[className] ? true : false;

  return (
    <div
      className={classNames(styles.tag, {
        [styles[className]]: moduleExtend,
        [className]: !moduleExtend,
      })}
    >
      <span>{text}</span>
    </div>
  );
};
