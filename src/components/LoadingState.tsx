import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <Loader2 size={32} className="text-primary-500 animate-spin mb-4" />
      <p className="text-sm text-surface-400">{message}</p>
    </div>
  );
}
