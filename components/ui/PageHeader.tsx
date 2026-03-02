import { cn } from '@/lib/utils';

interface PageHeaderProps {
  tag?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  dark?: boolean;
  centered?: boolean;
  className?: string;
}

export default function PageHeader({
  tag,
  title,
  titleHighlight,
  subtitle,
  dark = false,
  centered = true,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn(centered && 'text-center', className)}>
      {tag && (
        <div className={cn('inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5', dark ? 'bg-white/10 text-gold-300 border border-white/20' : 'bg-gold-50 text-gold-700 border border-gold-200')}>
          {tag}
        </div>
      )}
      <h1 className={cn('font-display text-4xl sm:text-5xl lg:text-6xl leading-tight mb-5', dark ? 'text-white' : 'text-navy-800')}>
        {title}
        {titleHighlight && (
          <>
            {' '}
            <span className={dark ? 'text-gold-300' : 'text-gradient-teal'}>{titleHighlight}</span>
          </>
        )}
      </h1>
      {subtitle && (
        <p className={cn('text-lg leading-relaxed', centered && 'max-w-2xl mx-auto', dark ? 'text-white/75' : 'text-navy-500')}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
