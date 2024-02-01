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

type Props = {
  footer: {
    top: TopFooterProps;
    main: MainFooterProps;
    bottom: BottomFooterProps;
  };
  name?: string;
  noBorder?: boolean;
};

export const Footer = ({ footer, name = 'Viestimedia Oy' }: Props) => {
  return (
    <footer className={styles.container} id="footer">
      <div className={`${styles.wrapper} ${styles.topWrapper}`}>
        <div className={styles.innerContent}>
          <FooterTop {...footer.top} />
        </div>
      </div>
      <div
        className={`${styles.wrapper} ${
          footer.main.columns ? styles.columnWrapper : ''
        }`}
      >
        <div className={styles.innerContent}>
          <FooterMainMenu {...footer.main} />
        </div>
      </div>
      <div className={`${styles.wrapper} ${styles.bottomWrapper}`}>
        <div className={styles.innerContent}>
          <FooterBottom {...footer.bottom} paperName={name} />
        </div>
      </div>
    </footer>
  );
};
