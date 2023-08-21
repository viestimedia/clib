import React from 'react';
import styles from './Input.module.scss';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { InputMessage } from 'components/InputMessage/InputMessage';

interface Props
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    'onChange' // We are using a custom type of onChange
  > {
  label: string;
  onChange(value: string | number): void;
  message?: string;
  messageType?: 'success' | 'error' | 'warning' | 'info';
  icon?: React.FC;
  iconButton?: ReactElement;
  autoFocus?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, Props>(({
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
  className,
  value,
  maxLength,
  autoComplete,
  defaultValue,
  autoFocus = false
}, ref) => {
	console.log(className)
  const cn = `${styles.field} ${className ? styles[className] : ''} ${
    message ? styles.hasMessage : ''
  }`;

	const messageId = message && name ? `${name}-message` : '';
  return (
    <div>
      <label htmlFor={name}>
        <span className={styles.label}>{label}</span>
        {required && <span className={styles.required}>*</span>}
      </label>
      <div className={cn}>
        {icon && React.createElement(icon)}
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
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
          required={required}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
					onClick={onClick}
        />
        {iconButton}
      </div>

      <InputMessage text={message} id={messageId} type={messageType} />
    </div>
  );
});