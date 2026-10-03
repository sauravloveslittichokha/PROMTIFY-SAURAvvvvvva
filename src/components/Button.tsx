import { type ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-950 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-500 focus:ring-primary-500 active:bg-primary-700',
    secondary: 'bg-surface-800 text-surface-100 hover:bg-surface-700 focus:ring-surface-500 border border-surface-700',
    outline: 'border border-surface-600 text-surface-200 hover:bg-surface-800 hover:border-surface-500 focus:ring-surface-500',
    ghost: 'text-surface-300 hover:text-surface-100 hover:bg-surface-800 focus:ring-surface-500',
    accent: 'bg-accent-500 text-surface-950 hover:bg-accent-400 focus:ring-accent-500 font-semibold',
    danger: 'bg-error-600 text-white hover:bg-error-500 focus:ring-error-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
