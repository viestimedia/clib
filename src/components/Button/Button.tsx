import React from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';
import { Link } from 'utils/init';
import { Brand } from 'components/Link/Link';

export enum ButtonVariant {
  Primary = 'button',
  Secondary = 'secondaryButton',
  Sales = 'salesButton',
  Naked = 'nakedButton',
  Tertiary = 'tertiaryButton',
  Blend = 'blendButton',
  Delete = 'deleteButton',
  Reject = 'rejectButton',
}

export enum ButtonSize {
  S = 'small',
  M = 'medium',
  L = 'large',
}

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

  // Allow all props.
  // In remix, it's common for buttons to have names, values, etc.
  // Not to forget formAction. Typechecking for all of them doesn't serve much purpose since they're just strings.
  [buttonExtraProp: string]: any;
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
  ...buttonExtraProps
}: ButtonProps) => {
  console.log('Button logging 3!');
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
          {...buttonExtraProps}
        >
          {icon}
          {label && <span>{label}</span>}
          {children && children}
        </button>
      )}
    </>
  );
};
