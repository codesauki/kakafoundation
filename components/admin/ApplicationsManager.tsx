'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Search, Filter, Download, Eye, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import AdminHeader from './AdminHeader';
import StatusBadge from '@/components/ui/StatusBadge';
import { formatDateShort } from '@/lib/utils';
import { NIGERIA_STATES } from '@/data/nigeria-geo';

const STATUSES = ['', 'PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'SPONSORED'];
const EXAM_TYPES = ['', 'JAMB', 'WAEC', 'NECO'];

export default function ApplicationsManager() {
  const [apps, setApps] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [state, setState] = useState('');

  const fetchApps = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: '25' });
    if (search) params.set('search', search);
    if (status) params.set('status', status);
    if (state) params.set('state', state);
    try {
      const res = await fetch(`/api/applications?${params}`);
      const data = await res.json();
      setApps(data.applications ?? []);
      setTotal(data.total ?? 0);
      setPages(data.pages ?? 1);
    } catch { /* ignore */ }
    setLoading(false);
  }, [page, search, status, state]);

  useEffect(() => { fetchApps(); }, [fetchApps]);

  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); setPage(1); fetchApps(); };

  const exportCSV = async () => {
    const res = await fetch('/api/applications?limit=9999&export=csv');
    const data = await res.json();
    const rows = data.applications ?? [];
    const headers = ['Ref Number','First Name','Last Name','State','LGA','Phone','Class','Exams','Year','Status','Applied On'];
    const csv = [headers, ...rows.map((r: any) => [
      r.refNumber, r.firstName, r.lastName, r.state, r.lga, r.phone, r.classLevel,
      Array.isArray(r.examTypes) ? r.examTypes.join('/') : r.examTypes,
      r.examYear, r.status, new Date(r.createdAt).toLocaleDateString()
    ])].map((row) => row.map((v: any) => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'knf-applications.csv'; a.click();
  };

  return (
    <div className="flex-1">
      <AdminHeader title="Applications" />
      <div className="p-6 space-y-5">

        {/* Controls */}
        <div className="admin-card">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <form onSubmit={handleSearch} className="flex gap-2 flex-1 max-w-lg">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-300" />
                <input
                  value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, phone, ref number..."
                  className="input pl-9 py-2 text-sm"
                />
              </div>
              <button type="submit" className="btn-primary py-2 px-4 text-sm">Search</button>
            </form>

            <div className="flex gap-2 shrink-0">
              <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}
                className="select text-sm py-2 px-3 w-36">
                <option value="">All Statuses</option>
                {STATUSES.slice(1).map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
              </select>
              <select value={state} onChange={(e) => { setState(e.target.value); setPage(1); }}
                className="select text-sm py-2 px-3 w-36">
                <option value="">All States</option>
                {NIGERIA_STATES.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
              </select>
              <button onClick={exportCSV} className="btn-ghost py-2 px-3 text-sm border border-navy-200">
                <Download className="w-4 h-4" /> CSV
              </button>
              <button onClick={fetchApps} className="btn-ghost py-2 px-3">
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-navy-50 text-sm text-navy-400">
            <span className="font-semibold text-navy-700">{total.toLocaleString()}</span> total applications
            {(search || status || state) && (
              <button onClick={() => { setSearch(''); setStatus(''); setState(''); setPage(1); }}
                className="text-teal-600 hover:text-teal-700 text-xs font-medium">
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="admin-card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-navy-50 text-left">
                  {['Ref #', 'Applicant', 'Location', 'Exams', 'Class', 'Applied', 'Status', ''].map((h) => (
                    <th key={h} className="px-4 py-3 text-xs font-bold text-navy-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <tr key={i} className="border-t border-navy-50">
                      {Array.from({ length: 8 }).map((_, j) => (
                        <td key={j} className="px-4 py-3"><div className="skeleton h-4 w-full rounded" /></td>
                      ))}
                    </tr>
                  ))
                ) : apps.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-16 text-center text-navy-400">
                      <div className="text-4xl mb-3">📭</div>
                      <div className="font-medium">No applications found</div>
                      <div className="text-sm mt-1">Try adjusting your search or filters</div>
                    </td>
                  </tr>
                ) : (
                  apps.map((app) => (
                    <tr key={app.id} className="admin-table-row">
                      <td className="px-4 py-3 text-xs font-mono text-navy-500 whitespace-nowrap">{app.refNumber?.slice(0, 12)}…</td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-navy-800 text-sm">{app.firstName} {app.lastName}</div>
                        <div className="text-navy-400 text-xs">{app.phone}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-navy-700">{app.state}</div>
                        <div className="text-navy-400 text-xs">{app.lga}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1 flex-wrap">
                          {(Array.isArray(app.examTypes) ? app.examTypes : [app.examTypes]).map((t: string) => (
                            <span key={t} className="px-2 py-0.5 bg-teal-50 text-teal-700 text-xs rounded-full font-medium">{t}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-navy-600 whitespace-nowrap">{app.classLevel}</td>
                      <td className="px-4 py-3 text-xs text-navy-400 whitespace-nowrap">{formatDateShort(app.createdAt)}</td>
                      <td className="px-4 py-3"><StatusBadge status={app.status} /></td>
                      <td className="px-4 py-3">
                        <Link href={`/admin/applications/${app.id}`}
                          className="p-1.5 rounded-lg text-navy-400 hover:bg-teal-50 hover:text-teal-600 transition-colors inline-block">
                          <Eye className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-navy-50">
              <div className="text-xs text-navy-400">Page {page} of {pages}</div>
              <div className="flex gap-2">
                <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}
                  className="p-1.5 rounded-lg border border-navy-200 text-navy-600 disabled:opacity-40 hover:bg-navy-50 transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={() => setPage((p) => Math.min(p + 1, pages))} disabled={page === pages}
                  className="p-1.5 rounded-lg border border-navy-200 text-navy-600 disabled:opacity-40 hover:bg-navy-50 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
