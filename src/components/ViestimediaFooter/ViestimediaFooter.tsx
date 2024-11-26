import styles from './ViestimediaFooter.module.scss';
import { Brand } from 'components/Link/Link';
import { Link } from '..';
import { Footer } from '../Footer/Footer';
import ViestimediaLogo from 'assets/viestimedia-logo.svg';
import { CookieSettingsLink } from '..';

export type Props = {
  seoText?: string;
};

export const ViestimediaFooter = ({ seoText }: Props) => {
  return (
    <Footer
      footer={{
        top: {
          logo: (
            <div className={styles.viestimediaLogo}>
              <ViestimediaLogo />
            </div>
          ),
          actions: (
            <Link
              href="https://viestimedia.fi/asiakaspalvelu/asiakaspalvelun-yhteystiedot/"
              openInNewTab={true}
              className={styles.customerServiceLink}
            >
              Asiakaspalvelu
            </Link>
          ),
        },
        main: {
          infoTexts: [
            'Puh. 020 413 2277 ma-pe klo 8-21, hinta mpm/pvm',
            ...(seoText ? [seoText] : []),
          ],
        },
        bottom: {
          paperName: 'Viestimedia Oy',
          menu: [
            {
              title: 'Käyttöehdot',
              url: 'https://www.viestimedia.fi/kayttoehdot/',
              openInNewTab: true,
              brand: Brand.VM,
            },
            {
              title: 'Tilausehdot',
              url: 'https://www.viestimedia.fi/tilausehdot/',
              openInNewTab: true,
              brand: Brand.VM,
            },
            {
              title: 'Myyntiehdot',
              url: 'https://viestimedia.fi/verkkomainonnan-myyntiehdot/',
              openInNewTab: true,
              brand: Brand.VM,
            },
            {
              title: 'Tietosuoja',
              url: 'https://www.viestimedia.fi/tietosuoja/',
              openInNewTab: true,
              brand: Brand.VM,
            },
            {
              title: 'Evästeet',
              url: 'https://www.viestimedia.fi/evasteet/',
              openInNewTab: true,
              brand: Brand.VM,
            },
          ],
          children: <CookieSettingsLink />,
        },
      }}
    />
  );
};
