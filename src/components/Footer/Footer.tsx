import styles from './Footer.module.scss';
// import { FooterContent } from 'models/structure';
import { FooterTop, TopFooterProps } from 'components/Footer/FooterTop';
import {
  FooterBottom,
  BottomFooterProps,
} from 'components/Footer/FooterBottom';
import {
  FooterMainMenu,
  MainFooterProps,
} from 'components/Footer/FooterMainMenu';
import { Brand } from 'components/Link/Link';

type Props = {
  brand: Brand;
  footer: {
    top: TopFooterProps;
    main: MainFooterProps;
    bottom: BottomFooterProps;
  };
  name?: string;
};

export const Footer = ({ brand, footer, name = 'Viestimedia Oy' }: Props) => {
  return (
    <footer className={styles.container} id="footer">
      <div className={styles.wrapper}>
        <div className={styles.innerContent}>
          <FooterTop {...footer.top} brand={brand} />
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.innerContent}>
          <FooterMainMenu {...footer.main} />
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.innerContent}>
          <FooterBottom {...footer.bottom} paperName={name} />
        </div>
      </div>
    </footer>
  );
};
