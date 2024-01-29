import React from 'react';
import styles from './FooterMainMenu.module.scss';
import { Link } from 'utils/init';

export type MainFooterProps = {
  columns: React.ReactNode;
  children?: React.ReactNode;
};

export const FooterMainMenu = ({ columns, children }: MainFooterProps) => {
  return (
    <div>
      <div className={styles.columns}>{columns}</div>
      <div className={styles.responsibleJournalism}>
        <div className={styles.companyInfo}>
          {children ? (
            children
          ) : (
            <Link
              href="https://viestimedia.fi/"
              className={styles.navLink}
              openInNewTab={true}
            >
              Viestimedia Oy
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
