import React from 'react';
import styles from './Button.module.scss';
import { ButtonVariant, ButtonSize } from 'models/button';
import classNames from 'classnames';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label?: string;
  linkUrl?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  outline?: boolean;
  ariaLabel?: string;
  extraClass?: string;
}

export const Button = ({
  label,
  linkUrl,
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
  className = '',
}: ButtonProps) => {
  if (!label && !icon) {
    console.error('A Button needs a label or an icon!');
    return null;
	}
	
	const moduleExtend = styles[className] ? true : false;
	const cn = classNames(styles[variant], styles[size], {
    [styles['withIcon']]: Boolean(icon),
    [styles['noLabel']]: Boolean(!label),
    [styles['noOutline']]: Boolean(!outline),
    [styles[className]]: moduleExtend,
    [className]: !moduleExtend,
  });

  return (
    <>
      {linkUrl ? (
        <a href={linkUrl} id={id} aria-label={ariaLabel} className={cn}>
          {icon}
          {label && <span>{label}</span>}
          {children && children}
        </Link>
      ) : (
        <button
          id={id}
          aria-label={ariaLabel}
          className={cn}
          onClick={onClick}
          disabled={disabled}
          type={type}
        >
          {icon}
          {label && <span>{label}</span>}
          {children && children}
        </button>
      )}
    </>
  );
};
