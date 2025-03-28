'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Button.module.scss';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
    children: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    href?: string;
    fullWidth?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    ariaLabel?: string;
}

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    href,
    fullWidth = false,
    disabled = false,
    icon,
    iconPosition = 'left',
    onClick,
    type = 'button',
    className = '',
    ariaLabel,
}: ButtonProps) => {
    const buttonClasses = [
        styles.button,
        styles[`button--${variant}`],
        styles[`button--${size}`],
        fullWidth ? styles['button--full-width'] : '',
        icon ? styles['button--with-icon'] : '',
        icon && iconPosition === 'right' ? styles['button--icon-right'] : '',
        disabled ? styles['button--disabled'] : '',
        className
    ].filter(Boolean).join(' ');

    const content = (
        <>
            {icon && iconPosition === 'left' && <span className={styles['button__icon']}>{icon}</span>}
            <span className={styles['button__text']}>{children}</span>
            {icon && iconPosition === 'right' && <span className={styles['button__icon']}>{icon}</span>}
        </>
    );

    if (href && !disabled) {
        return (
            <Link
                href={href}
                className={buttonClasses}
                aria-label={ariaLabel}
            >
                {content}
            </Link>
        );
    }

    return (
        <button
            type={type}
            className={buttonClasses}
            disabled={disabled}
            onClick={onClick}
            aria-label={ariaLabel}
        >
            {content}
        </button>
    );
};

export default Button;