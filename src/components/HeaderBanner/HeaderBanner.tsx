import styles from './HeaderBanner.module.scss';
import React from 'react';
import classNames from 'classnames';

type Props = {
  mainLogo: React.ReactElement;
  subLogo?: React.ReactElement;
  button?: React.ReactElement;
	type?: 'large' | 'compact';
  className?: string;
};

export const HeaderBanner = ({
	mainLogo,
  subLogo,
  button,
	type = 'large',
  className = '',
}: Props) => {
  const moduleExtend = styles[className] ? true : false;

  return (
    <div
      className={classNames(styles.bannerWrapper, styles[type], {
        [styles[className]]: moduleExtend,
        [className]: !moduleExtend,
      })}
    >
      <div className={styles.logoContainer}>
        <div className={`${styles.logo} ${styles.mainLogo}`}>{mainLogo}</div>
        {subLogo && (
          <div className={`${styles.logo} ${styles.subLogo}`}>{subLogo}</div>
        )}
      </div>
      {button && <div className={styles.button}>{button}</div>}
    </div>
  );
};
