'use client';

import { useSession, signOut } from 'next-auth/react';
import { Bell, LogOut, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { getInitials } from '@/lib/utils';

interface AdminTopbarProps { title?: string; }

export default function AdminTopbar({ title }: AdminTopbarProps) {
  const { data: session } = useSession();
  const name = (session?.user as any)?.name ?? 'Admin';
  const email = (session?.user as any)?.email ?? '';
  const role = (session?.user as any)?.role ?? 'VIEWER';

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <div>
        {title && <h1 className="font-display text-lg text-navy-800 font-semibold">{title}</h1>}
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/"
          target="_blank"
          className="hidden sm:flex items-center gap-1.5 text-xs text-navy-500 hover:text-teal-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-teal-50"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          View Site
        </Link>

        <button className="relative p-2 rounded-xl text-navy-400 hover:bg-navy-50 hover:text-navy-700 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="flex items-center gap-2.5 pl-3 border-l border-navy-100">
          <div className="w-8 h-8 rounded-full bg-navy-gradient flex items-center justify-center">
            <span className="text-white text-xs font-bold">{getInitials(name)}</span>
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold text-navy-800 leading-tight">{name}</div>
            <div className="text-xs text-navy-400">{role.replace('_', ' ')}</div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="p-2 rounded-xl text-navy-400 hover:bg-red-50 hover:text-red-500 transition-colors"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
