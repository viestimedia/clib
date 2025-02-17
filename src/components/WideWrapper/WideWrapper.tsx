import styles from './WideWrapper.module.scss';
import { PropsWithChildren } from 'react';
import classNames from 'classnames';

type Props = {
  className?: string;
};

export const WideWrapper = ({
  children,
  className = '',
}: PropsWithChildren<Props>) => {
  const moduleExtend = styles[className] ? true : false;

  return (
    <div
      className={classNames(styles.rowWrapper, {
        [styles[className]]: moduleExtend,
        [className]: !moduleExtend,
      })}
    >
      <div className={styles.innerContent}>{children}</div>
    </div>
  );
};
