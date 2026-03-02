import { cn } from '@/lib/utils';

export default function LoadingSpinner({ className, size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const s = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-10 h-10' }[size];
  return (
    <div className={cn('inline-block', className)} role="status" aria-label="Loading">
      <div className={cn('rounded-full border-2 border-navy-200 border-t-teal-500 animate-spin', s)} />
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-navy-400 text-sm font-medium">Loading…</p>
      </div>
    </div>
  );
}
