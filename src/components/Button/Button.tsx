import React from 'react';
import styles from './Button.module.scss';
import { ButtonVariant, ButtonSize } from 'models/button';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.FC;
  outline?: boolean;
  ariaLabel?: string;
  extraClass?: string;
}

export const Button = ({
  label,
  variant = ButtonVariant.Primary,
  size = ButtonSize.M,
  disabled = false,
  icon,
  onClick,
  id,
  outline = true,
  ariaLabel,
  type,
  children,
  className: extraClassName,
}: ButtonProps) => {
  if (!label && !icon) {
    console.error('A Button needs a label or an icon!');
    return null;
  }
  const className = `${styles[variant]} ${styles[size]} ${
    icon ? styles['withIcon'] : ''
  } ${label ? '' : styles['noLabel']} ${
    outline ? '' : styles['noOutline']
  } ${extraClassName}`;

  return (
    <button
      id={id}
      aria-label={ariaLabel}
      className={className}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {icon && React.createElement(icon)}
      {label && <span>{label}</span>}
      {children && children}
    </button>
  );
};
