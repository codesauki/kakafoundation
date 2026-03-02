import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return format(new Date(date), 'MMMM d, yyyy');
}

export function formatDateShort(date: string | Date): string {
  return format(new Date(date), 'MMM d, yyyy');
}

export function timeAgo(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}

export function truncate(str: string, n: number): string {
  return str.length > n ? str.slice(0, n - 1) + '…' : str;
}

export function getInitials(name: string): string {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
}

export const STATUS_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  PENDING:      { bg: 'bg-amber-50',  text: 'text-amber-700',  dot: 'bg-amber-400' },
  UNDER_REVIEW: { bg: 'bg-blue-50',   text: 'text-blue-700',   dot: 'bg-blue-400' },
  APPROVED:     { bg: 'bg-green-50',  text: 'text-green-700',  dot: 'bg-green-400' },
  REJECTED:     { bg: 'bg-red-50',    text: 'text-red-700',    dot: 'bg-red-400' },
  SPONSORED:    { bg: 'bg-teal-50',   text: 'text-teal-700',   dot: 'bg-teal-400' },
};

export const STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pending', UNDER_REVIEW: 'Under Review',
  APPROVED: 'Approved', REJECTED: 'Rejected', SPONSORED: 'Sponsored',
};
