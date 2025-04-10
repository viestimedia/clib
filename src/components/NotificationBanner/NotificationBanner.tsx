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

  // Fade out after 5 seconds
  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
    }, 5000);

    return () => clearTimeout(fadeOutTimer);
  }, []);

  // Remove after 10 seconds to not show it to the screen readers etc.
  useEffect(() => {
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 10000);

    return () => clearTimeout(removeTimer);
  }, []);

  if (!isVisible || (!title && !text)) {
    return null;
  }
  return (
    <div
      className={`${styles.container} ${fadeOut ? styles.fadeOut : ''}`}
      aria-live="polite"
    >
      {icon && <div className={styles.icon}>{icon}</div>}

      <div className={styles.textContainer}>
        {title && <div className={styles.title}>{title}</div>}
        {text && <div className={styles.text}>{text}</div>}
      </div>

      <Button
        variant={ButtonVariant.Transparent}
        size={ButtonSize.XS}
        onClick={() => {
          setIsVisible(false);
        }}
        icon={<CloseIcon />}
      />
    </div>
  );
};
