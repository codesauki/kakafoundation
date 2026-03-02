import { cn, STATUS_COLORS, STATUS_LABELS } from '@/lib/utils';

export default function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_COLORS[status] ?? STATUS_COLORS.PENDING;
  return (
    <span className={cn('badge', cfg.bg, cfg.text, 'border border-current/20')}>
      <span className={cn('w-1.5 h-1.5 rounded-full', cfg.dot)} />
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}
