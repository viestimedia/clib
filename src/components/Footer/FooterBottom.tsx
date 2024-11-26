import React from 'react';
import styles from './FooterBottom.module.scss';
import { Link } from '..';
import { Brand } from 'components/Link/Link';
// import { Link } from 'components/link/Link';
// import { FooterContent } from 'models/structure';
// import { CookieSettingsLink } from '../cookieConsent/CookieSettingsLink';

export type BottomFooterProps = {
  // footer: FooterContent;
  menu: {
    title: string;
    url: string;
    openInNewTab?: boolean;
    brand: Brand;
  }[];
  paperName: string;
  children: React.ReactNode;
};

export const FooterBottom = ({
  menu,
  paperName,
  children,
}: BottomFooterProps) => {
  return (
    <div className={styles.bottomRow}>
      <div className={styles.bottomLinks}>
        {menu.map((link) => (
          <Link
            key={link.title}
            href={link.url}
            className={styles.bottomLink}
            openInNewTab={link.openInNewTab || false}
            brand={link.brand}
          >
            {link.title}
          </Link>
        ))}
        {children}
      </div>
      <div>© {paperName}</div>
    </div>
  );
};
