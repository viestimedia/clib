import { useEffect, useState } from 'react';
import styles from './NotificationBanner.module.scss';
import { Button } from 'components/Button/Button';
import { ButtonSize } from 'components/Button/Button';
import { ButtonVariant } from 'components/Button/Button';
import CloseIcon from 'assets/icons/close-black.svg';
type Props = {
  title?: string;
  text?: React.ReactNode;
  icon?: React.ReactNode;
};

export const NotificationBanner = ({ title, text, icon }: Props) => {
  const [isVisible, setIsVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible || (!title && !text)) {
    return null;
  }

  return (
    <div className={`${styles.container} ${fadeOut ? styles.fadeOut : ''}`}>
      {icon && <div className={styles.icon}>{icon}</div>}

      <div className={styles.textContainer}>
        {title && <div className={styles.title}>{title}</div>}
        {text && <div className={styles.text}>{text}</div>}
      </div>

      <Button
        variant={ButtonVariant.Transparent}
        size={ButtonSize.XS}
        onClick={() => setIsVisible(false)}
        icon={<CloseIcon />}
      />
    </div>
  );
};
