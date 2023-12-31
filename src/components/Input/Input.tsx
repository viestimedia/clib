import React from 'react';
import styles from './Input.module.scss';
import { InputMessage } from 'components/InputMessage/InputMessage';
import classNames from 'classnames';

interface Props
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    'onChange' // We are using a custom type of onChange
  > {
  label?: string;
  onChange?(value: string | number): void;
  message?: string;
  messageType?: 'success' | 'error' | 'warning' | 'info';
  icon?: React.ReactNode;
  iconButton?: React.ReactElement;
  autoFocus?: boolean;
  datalist?: string[];
}

export const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      name,
      type = 'text',
      placeholder,
      message,
      messageType = 'error',
      icon,
      iconButton,
      required,
      onChange,
      onClick,
      onFocus,
      onBlur,
      onKeyUp,
      onKeyDown,
      className = '',
      value,
      maxLength,
      autoComplete,
      defaultValue,
      autoFocus = false,
      datalist,
    },
    ref
  ) => {
    const moduleExtend = styles[className] ? true : false;
    const messageId = message && name ? `${name}-message` : '';

    return (
      <div>
        {label && (
          <label htmlFor={name}>
            <span className={styles.label}>{label}</span>
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <div
          className={classNames(styles.field, {
            [styles.hasMessage]: Boolean(message),
            [styles[className]]: moduleExtend,
            [className]: !moduleExtend,
          })}
        >
          {icon}
          <input
            ref={ref}
            className={`${styles.fieldInput} ${icon ? styles.withIcon : ''}`}
            name={name}
            id={name}
            type={type}
            placeholder={placeholder}
            autoFocus={autoFocus} // eslint-disable-line jsx-a11y/no-autofocus -- Don't use this unless you have a good reason, like a search field on the search page.
            aria-describedby={message ? `${messageId}` : undefined}
            value={value}
            onChange={onChange ? (e) => onChange(e.target.value) : undefined}
            maxLength={maxLength}
            required={required}
            autoComplete={autoComplete}
            defaultValue={defaultValue}
            onClick={onClick}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            list={datalist ? `${name}-datalist` : undefined}
          />
          {iconButton}

          {datalist && (
            <datalist id={`${name}-datalist`}>
              {datalist.map((item) => (
                <option key={item} value={item} />
              ))}
            </datalist>
          )}
        </div>

        <InputMessage text={message} id={messageId} type={messageType} />
      </div>
    );
  }
);
