import React from 'react';
import styles from './FooterMainMenu.module.scss';
import { Link } from 'utils/init';

export type MainFooterProps = {
  columns: React.ReactNode;
};

export const FooterMainMenu = ({ columns }: MainFooterProps) => {
  return (
    <div>
      <div className={styles.columns}>
        {columns}
        {/* {mainMenu.map((item: Navigation) => (
          <MenuBlock key={item.title} content={item} />
        ))} */}
      </div>
      <div className={styles.responsibleJournalism}>
        <div className={styles.companyInfo}>
          <Link
            href="https://viestimedia.fi/"
            className={styles.navLink}
            openInNewTab={true}
          >
            Viestimedia Oy
          </Link>
        </div>
      </div>
    </div>
  );
};
