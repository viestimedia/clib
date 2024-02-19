import styles from './InputSelect.module.scss';
import classNames from 'classnames';
import { InputMessage } from '..';

import { ReactElement } from 'react';

export interface InputOption {
  label?: string;
  value: string;
  id: string;
  selected?: boolean;
  children?: ReactElement;
  sortIndex?: number;
}

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

  const hasNoEmptyOption = !!options.find((option) => option.value === '');
  const renderedOptions = options.map((option) => {
    return (
      <option key={option.id} value={option.value}>
        {option.label}
      </option>
    );
  });

  if (!placeholder && hasNoEmptyOption) {
    console.warn(
      `Field ${name} has no empty option and no placeholder. This means the field can't be cleared.`
    );
  }

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
        {placeholder && ( // Always show placeholder if there's no empty option. Otherwise field can't be cleared.
          <option value="" hidden={hasNoEmptyOption}>
            {placeholder}
          </option>
        )}
        {renderedOptions}
      </select>

      <InputMessage
        text={message}
        id={messageId}
        type={messageType || 'error'}
      />
    </div>
  );
};
