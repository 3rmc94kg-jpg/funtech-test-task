import Link from 'next/link';
import styles from './Button.module.scss';
import type { ButtonProps } from '@/shared/types';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  href,
  className = '',
  type = 'button',
  icon,
}) => {
  const variantClass = variant === 'outline-accent' ? styles['outline-accent'] : styles[variant];
  const classNames = [
    styles.button,
    variantClass,
    styles[size],
    className,
  ].filter(Boolean).join(' ');

  if (href) {
    return (
      <Link href={href} className={classNames}>
        {icon && <span className={styles.icon}>{icon}</span>}
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
};