import styles from './InputMessage.module.scss';
import SuccessIcon from 'assets/icons/check-circle-filled.svg';
import WarningIcon from '/src/assets/icons/warning-circle-filled.svg';
import ErrorIcon from '/src/assets/icons/error-circle-filled.svg';

type Props = {
  text?: string;
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
};

export const InputMessage = ({ text, id, type }: Props) => {
  let Icon = SuccessIcon;
  if (type === 'error') Icon = ErrorIcon;
  if (type === 'warning') Icon = WarningIcon;

  return text ? (
    <div id={id} className={styles[type]}>
      {type !== 'info' && <Icon />}
      <span>{text}</span>
    </div>
  ) : null;
};
