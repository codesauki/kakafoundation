'use client';

import { useSession } from 'next-auth/react';
import { Bell, Search } from 'lucide-react';
import { getInitials } from '@/lib/utils';

export default function AdminHeader({ title }: { title?: string }) {
  const { data: session } = useSession();
  const name = session?.user?.name ?? 'Admin';

  return (
    <header className="bg-white border-b border-navy-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <div>
        {title && <h1 className="font-display text-xl text-navy-800 font-semibold">{title}</h1>}
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-xl text-navy-400 hover:bg-navy-50 hover:text-navy-700 transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2.5 pl-3 border-l border-navy-100">
          <div className="w-8 h-8 rounded-full bg-teal-gradient flex items-center justify-center">
            <span className="text-white text-xs font-bold">{getInitials(name)}</span>
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold text-navy-800">{name}</div>
            <div className="text-xs text-navy-400">{(session?.user as any)?.role ?? 'Admin'}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
