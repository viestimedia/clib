import React from 'react';
import styles from './FooterTop.module.scss';

export type TopFooterProps = {
  actions: React.ReactNode;
  logo: React.ReactNode;
};

export const FooterTop = ({ actions, logo }: TopFooterProps) => {
  return (
    <div className={styles.topRow}>
      <div className={styles.logo}>
        {logo}
      </div>
      <div>
        {actions}
      </div>
    </div>
  );
};
