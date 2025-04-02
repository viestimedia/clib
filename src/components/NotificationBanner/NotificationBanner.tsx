import { useEffect, useState } from 'react';
import styles from './NotificationBanner.module.scss';
import { Button } from 'components/Button/Button';
import { ButtonSize } from 'components/Button/Button';
import { ButtonVariant } from 'components/Button/Button';
import CloseIcon from 'assets/icons/close-black.svg';
type Props = {
  text: string;
  icon?: React.ReactNode;
};

export const NotificationBanner = ({ text, icon }: Props) => {
  const [isVisible, setIsVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`${styles.container} ${fadeOut ? styles.fadeOut : ''}`}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <div className={styles.text}>{text}</div>
      <Button
        variant={ButtonVariant.Transparent}
        size={ButtonSize.XS}
        onClick={() => setIsVisible(false)}
        icon={<CloseIcon />}
      />
    </div>
  );
};
