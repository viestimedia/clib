import React from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';
import { Link } from '..';
import { Brand } from 'components/Link/Link';
import { Spinner } from 'components/Spinner/Spinner';

export enum ButtonVariant {
  Primary = 'primary',
  PrimaryLight = 'primaryLight',
  Secondary = 'secondary',
  SecondaryBold = 'secondaryBold',
  Transparent = 'transparent',
  Outline = 'outline',
  OutlineBold = 'outlineBold',
  Sales = 'sales',
  Naked = 'naked', // button without button styles or paddings
  Success = 'success',
  Alert = 'alert',
  Bookmark = 'bookmark', // icon only button with special hover styles

  // Used only with old (before 2025) Design System
  Tertiary = 'tertiary',
  Blend = 'blend',
  Delete = 'delete',
  Reject = 'reject',
}

export enum ButtonSize {
  XS = 'extraSmall',
  S = 'small',
  M = 'medium',
  // Used only with old (before 2025) Design System
  L = 'large',
}

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label?: string;
  linkUrl?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  outline?: boolean;
  ariaLabel?: string;
  brand?: Brand;
  openInNewTab?: boolean;
  extraClass?: string;
  isLoading?: boolean;
  dataAttr?: { [key: `data-${string}`]: string };

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
  iconPosition = 'left',
  onClick,
  id,
  outline = true,
  ariaLabel,
  brand,
  openInNewTab,
  type,
  children,
  className = '',
  isLoading = false,
  dataAttr,
  ...buttonExtraProps
}: ButtonProps) => {
  if (!label && !icon) {
    console.error('A Button needs a label or an icon!');
    return null;
  }

  const moduleExtend = styles[className] ? true : false;
  const cn = classNames(styles.button, styles[variant], styles[size], {
    [styles['withIcon']]: Boolean(icon),
    [styles['iconLeft']]: Boolean(icon && iconPosition === 'left'),
    [styles['iconRight']]: Boolean(icon && iconPosition === 'right'),
    [styles['noLabel']]: Boolean(!label),
    [styles['noOutline']]: Boolean(!outline),
    [styles['isLoading']]: Boolean(isLoading),
    [styles[className]]: moduleExtend,
    [className]: !moduleExtend,
  });

  const ButtonContent = () => (
    <>
      {iconPosition === 'left' && icon}
      {label && <span>{label}</span>}
      {children && children}
      {iconPosition === 'right' && icon}
      {isLoading && (
        <div className={styles.progress}>
          <Spinner
            className={variant === ButtonVariant.Primary ? 'light' : ''}
          />
        </div>
      )}
    </>
  );

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
          {...dataAttr}
        >
          <ButtonContent />
        </Link>
      ) : (
        <>
          <button
            id={id}
            aria-label={ariaLabel}
            className={cn}
            onClick={onClick}
            disabled={disabled}
            type={type}
            {...dataAttr}
            {...buttonExtraProps}
          >
            <ButtonContent />
          </button>
        </>
      )}
    </>
  );
};
