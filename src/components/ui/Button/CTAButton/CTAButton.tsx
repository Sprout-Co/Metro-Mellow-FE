import React from 'react';
import Link from 'next/link';
import styles from './CTAButton.module.scss';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
    children: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    fullWidth?: boolean;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

const CTAButton: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'medium',
    href,
    type = 'button',
    disabled = false,
    fullWidth = false,
    className = '',
    onClick,
    ...props
}) => {
    const buttonClasses = [
        styles.button,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : '',
        className
    ].filter(Boolean).join(' ');

    if (href && !disabled) {
        return (
            <Link href={href} className={buttonClasses} onClick={onClick} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            className={buttonClasses}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default CTAButton;