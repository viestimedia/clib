import styles from './InputSelect.module.scss';
import { InputOption } from 'models/inputs';
import classNames from 'classnames';
import { InputMessage } from '..';

interface Props {
  name: string;
  title: string;
  id?: string;
  value?: string;
  defaultValue?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?(val: string): void;
  placeholder?: string;
  options: InputOption[];
  required?: boolean;
  className?: string;

  message?: string;
  messageType?: 'success' | 'error' | 'warning' | 'info';
  label?: string;
}

export const InputSelect = ({
  name,
  title,
  id,
  value,
  defaultValue,
  onChange,
  placeholder,
  options,
  required = false,
  className = '',

  message,
  messageType,
  label,
}: Props) => {
  const moduleExtend = styles[className] ? true : false;
  const messageId = message && name ? `${name}-message` : '';

  return (
    <div
      className={classNames(styles.label, {
        [styles[className]]: moduleExtend,
        [className]: !moduleExtend,
      })}
    >
      {label ? (
        <label htmlFor={name}>
          <span className={styles.labelText}>{label}</span>
          {required && <span className={styles.required}>*</span>}
        </label>
      ) : (
        <label className={styles.hidden}>{title}</label>
      )}
      <select
        name={name}
        title={title}
        id={id || name}
        className={styles.select}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        required={required}
      >
        {placeholder && (
          <option value="" hidden>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <InputMessage
        text={message}
        id={messageId}
        type={messageType || 'error'}
      />
    </div>
  );
};
