import styles from './Alert.module.scss';
import InfoIcon from 'assets/icons/info-icon.svg?react';
import WarningIcon from 'assets/icons/warn-icon.svg?react';
import ErrorIcon from 'assets/icons/error-icon.svg?react';
import HelpIcon from 'assets/icons/help-icon.svg?react';
import { ButtonVariant, ButtonSize } from 'components/Button/Button';
import { Button } from 'components/Button/Button';
import { AlertType } from './Alert.types';

export { AlertType };
type Props = {
  type: AlertType;
  text: string;
  buttonText?: string;
  buttonLink?: string;
};

export const Alert = ({ type, text, buttonText, buttonLink }: Props) => {
  return (
    <div className={`${styles.container} ${styles[type]}`}>
      <div className={styles.icon}>
        {type === AlertType.Info && <InfoIcon />}
        {type === AlertType.Warning && <WarningIcon />}
        {type === AlertType.Error && <ErrorIcon />}
        {type === AlertType.Help && <HelpIcon />}
      </div>

      <div className={styles.text}>{text}</div>

      {buttonText && buttonLink && (
        <div className={styles.button}>
          <Button
            label={buttonText}
            linkUrl={buttonLink}
            variant={ButtonVariant.Primary}
            size={ButtonSize.S}
          />
        </div>
      )}
    </div>
  );
};
