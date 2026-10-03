import { CheckCircle, XCircle, Info, X } from 'lucide-react';

interface ToastProps {
  toasts: Array<{ id: string; message: string; type: 'success' | 'error' | 'info' }>;
  onRemove: (id: string) => void;
}

export default function Toast({ toasts, onRemove }: ToastProps) {
  if (toasts.length === 0) return null;

  const icons = {
    success: <CheckCircle size={18} className="text-success-500" />,
    error: <XCircle size={18} className="text-error-500" />,
    info: <Info size={18} className="text-primary-400" />,
  };

  const borders = {
    success: 'border-l-success-500',
    error: 'border-l-error-500',
    info: 'border-l-primary-500',
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 max-w-sm">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 bg-surface-900 border border-surface-700 border-l-4 ${borders[toast.type]} rounded-lg shadow-xl animate-slide-in-right`}
        >
          {icons[toast.type]}
          <p className="flex-1 text-sm text-surface-200">{toast.message}</p>
          <button
            onClick={() => onRemove(toast.id)}
            className="p-0.5 text-surface-500 hover:text-surface-300 transition-colors cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
