interface ProgressBarProps {
  progress: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  showLabel?: boolean;
  className?: string;
}

export default function ProgressBar({
  progress,
  size = 'md',
  color,
  showLabel = false,
  className = '',
}: ProgressBarProps) {
  const sizes = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`flex-1 bg-surface-800 rounded-full overflow-hidden ${sizes[size]}`}>
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${clampedProgress}%`,
            backgroundColor: color || (clampedProgress === 100 ? 'var(--color-success-500)' : 'var(--color-primary-500)'),
          }}
        />
      </div>
      {showLabel && (
        <span className="text-sm font-medium text-surface-400 tabular-nums min-w-[3ch] text-right">
          {clampedProgress}%
        </span>
      )}
    </div>
  );
}
