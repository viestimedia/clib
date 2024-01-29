import styles from './Spinner.module.scss';
import classNames from 'classnames';

export const Spinner = ({ className = '' }) => {
  const moduleExtend = styles[className] ? true : false;
  const cn = classNames(styles.wrapper, {
    [styles[className]]: moduleExtend,
    [className]: !moduleExtend,
  });

  return (
    <div className={cn}>
      <div className={styles.spinner}></div>
    </div>
  );
};
