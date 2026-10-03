interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'accent';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({ children, variant = 'default', size = 'sm', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-surface-800 text-surface-300 border-surface-700',
    success: 'bg-success-500/15 text-success-500 border-success-500/20',
    warning: 'bg-warning-500/15 text-warning-500 border-warning-500/20',
    error: 'bg-error-500/15 text-error-500 border-error-500/20',
    info: 'bg-primary-500/15 text-primary-400 border-primary-500/20',
    accent: 'bg-accent-500/15 text-accent-500 border-accent-500/20',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  };

  return (
    <span className={`inline-flex items-center font-medium rounded-md border ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
}
