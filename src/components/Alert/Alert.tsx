import styles from './Alert.module.scss';
import InfoIcon from 'assets/icons/info-icon.svg';
import WarningIcon from 'assets/icons/warn-icon.svg';
import ErrorIcon from 'assets/icons/error-icon.svg';
import HelpIcon from 'assets/icons/help-icon.svg';
import { ButtonVariant, ButtonSize } from 'components/Button/Button';
import { Button } from 'components/Button/Button';

export enum AlertType {
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
  Help = 'help',
}
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
