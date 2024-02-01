import React from 'react';
import styles from './FooterMainMenu.module.scss';

export type MainFooterProps = {
  infoTexts?: string[];
  columns?: React.ReactNode;
  children?: React.ReactNode;
};

export const FooterMainMenu = ({ infoTexts, columns, children }: MainFooterProps) => {
  return (
    <div>
      {infoTexts?.map((text, index) => (
        <div key={index} className={styles.row}>
          {text}
        </div>
      ))}
      {columns && <div className={styles.columns}>{columns}</div>}
      {children && (
        <div className={styles.responsibleJournalism}>
          <div className={styles.companyInfo}>{children}</div>
        </div>
      )}
    </div>
  );
};
