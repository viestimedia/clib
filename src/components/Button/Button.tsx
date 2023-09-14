import React from 'react';
import styles from './Button.module.scss';
import { ButtonVariant, ButtonSize } from 'models/button';
import classNames from 'classnames';
import { Link } from 'utils/init';
import { Brand } from 'models/brand';

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
  brand?: Brand;
  openInNewTab?: boolean;
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
	brand,
	openInNewTab,
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
        <Link
          href={linkUrl}
          id={id}
          aria-label={ariaLabel}
          className={cn}
          brand={brand}
          openInNewTab={openInNewTab}
        >
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
