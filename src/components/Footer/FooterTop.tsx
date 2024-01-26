import React from 'react';
import styles from './FooterTop.module.scss';
import { Brand } from 'components/Link/Link';
// import { Logo } from 'components/logo/Logo';
// import { Link } from 'components/link/Link';
// import MailIcon from 'assets/icons/mail.svg';
// import FacebookIcon from 'assets/icons/facebook.svg';
// import XIcon from 'assets/icons/x.svg';
// import YoutubeIcon from 'assets/icons/youtube.svg';
// import InstagramIcon from 'assets/icons/instagram.svg';
// import LinkedInIcon from 'assets/icons/linkedIn.svg';
// import { Button, ButtonSize, ButtonVariant } from '@viestimedia/clib';
// import { FooterContent } from 'models/structure';
// import { SocialMediaIcon } from 'components/socialMediaIcon/SocialMediaIcon';
// import { Brand } from 'models/contentApi';

export type TopFooterProps = {
  actions: React.ReactNode;
  logo: React.ReactNode;
  brand: Brand;
};

export const FooterTop = ({ actions, logo }: TopFooterProps) => {
  // const footerLinks = footer.footerLinks || {};

  // const {
  //   newsletterUrl,
  //   facebookUrl,
  //   twitterUrl,
  //   youtubeUrl,
  //   instagramUrl,
  //   linkedInUrl,
  //   orderButtonUrl,
  // } = footerLinks;

  return (
    <div className={styles.topRow}>
      <div className={styles.logo}>
        {logo}
        {/* <Logo brand={brand} placement="footer" /> */}
      </div>
      <div className={styles.actions}>
        {actions}
        {/* {newsletterUrl && (
          <Link href={newsletterUrl} className={styles.newsletters}>
            <span>Tilaa uutiskirje</span>
            <MailIcon />
          </Link>
        )}
        <div className={styles.social}>
          <span>Seuraa</span>
          <SocialMediaIcon
            link={facebookUrl}
            icon={FacebookIcon}
            ariaLabel="Facebook"
          />
          <SocialMediaIcon link={twitterUrl} icon={XIcon} ariaLabel="X" />
          <SocialMediaIcon
            link={youtubeUrl}
            icon={YoutubeIcon}
            ariaLabel="YouTube"
          />
          <SocialMediaIcon
            link={instagramUrl}
            icon={InstagramIcon}
            ariaLabel="Instagram"
          />
          <SocialMediaIcon
            link={linkedInUrl}
            icon={LinkedInIcon}
            ariaLabel="LinkedIn"
          />
        </div>
        {orderButtonUrl && (
          <div className={styles.orderButton}>
            <Button
              id="cta-footer-tilaa"
              linkUrl={orderButtonUrl}
              label="Tilaa"
              variant={ButtonVariant.Sales}
              size={ButtonSize.S}
            />
          </div>
        )} */}
      </div>
    </div>
  );
};
