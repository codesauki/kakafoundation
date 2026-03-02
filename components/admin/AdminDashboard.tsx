'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Users, FileText, CheckCircle, XCircle, Clock, Star, TrendingUp, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import StatusBadge from '@/components/ui/StatusBadge';
import { formatDateShort } from '@/lib/utils';

const PIE_COLORS = ['#0D7A8A', '#C49A2C', '#0B1C2E', '#16a34a', '#dc2626'];

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then((d) => { setStats(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-64 skeleton rounded-xl" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-28 skeleton rounded-2xl" />)}
        </div>
      </div>
    );
  }

  const overview = stats?.overview ?? {};
  const STAT_CARDS = [
    { label: 'Total Applications', value: overview.total ?? 0, icon: FileText, color: 'navy', change: `+${overview.today ?? 0} today` },
    { label: 'Pending Review', value: overview.pending ?? 0, icon: Clock, color: 'amber', change: `${overview.underReview ?? 0} under review` },
    { label: 'Approved', value: overview.approved ?? 0, icon: CheckCircle, color: 'green', change: `${overview.sponsored ?? 0} sponsored` },
    { label: 'Rejected', value: overview.rejected ?? 0, icon: XCircle, color: 'red', change: 'Reviewed and declined' },
  ];

  const colorMap: Record<string, string> = {
    navy: 'bg-navy-50 text-navy-600',
    amber: 'bg-amber-50 text-amber-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-navy-800 font-semibold">Dashboard</h1>
          <p className="text-navy-400 text-sm mt-0.5">Foundation overview and real-time statistics</p>
        </div>
        <Link href="/admin/applications" className="btn-primary text-sm px-4 py-2">
          View Applications <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map(({ label, value, icon: Icon, color, change }) => (
          <div key={label} className="admin-stat-card">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs text-navy-400 font-medium">{change}</span>
            </div>
            <div className="font-display text-3xl font-bold text-navy-800 mb-1">{value.toLocaleString()}</div>
            <div className="text-sm text-navy-500">{label}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weekly trend */}
        <div className="lg:col-span-2 admin-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-navy-800">Applications This Week</h3>
              <p className="text-navy-400 text-xs mt-0.5">Daily submission counts</p>
            </div>
            <TrendingUp className="w-5 h-5 text-teal-500" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={stats?.weekly ?? []} barSize={28}>
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6B7280' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6B7280' }} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', padding: '8px 12px' }}
                labelStyle={{ fontWeight: 600, color: '#0B1C2E' }}
              />
              <Bar dataKey="count" fill="#0D7A8A" radius={[6, 6, 0, 0]} name="Applications" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Exam type pie */}
        <div className="admin-card">
          <h3 className="font-semibold text-navy-800 mb-6">By Exam Type</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={stats?.byExam ?? []} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
                dataKey="value" nameKey="name" paddingAngle={3}>
                {(stats?.byExam ?? []).map((_: any, i: number) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2 flex-wrap">
            {(stats?.byExam ?? []).map((e: any, i: number) => (
              <div key={e.name} className="flex items-center gap-1.5 text-xs text-navy-600">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                {e.name}: <strong>{e.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top states + Recent applications */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top states */}
        <div className="admin-card">
          <h3 className="font-semibold text-navy-800 mb-4">Top States by Applications</h3>
          <div className="space-y-2.5">
            {(stats?.byState ?? []).slice(0, 8).map((s: any, i: number) => {
              const max = stats?.byState?.[0]?.count ?? 1;
              const pct = Math.round((s.count / max) * 100);
              return (
                <div key={s.state} className="flex items-center gap-3">
                  <span className="text-xs text-navy-400 w-5 text-right">{i + 1}</span>
                  <span className="text-sm text-navy-700 w-32 truncate font-medium">{s.state}</span>
                  <div className="flex-1 h-2 bg-navy-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-gradient rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs font-bold text-navy-600 w-8 text-right">{s.count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent applications */}
        <div className="admin-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-navy-800">Recent Applications</h3>
            <Link href="/admin/applications" className="text-teal-600 text-xs font-semibold hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {(stats?.recentApplications ?? []).map((app: any) => (
              <Link key={app.id} href={`/admin/applications/${app.id}`}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-navy-gradient flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {app.firstName?.[0]}{app.lastName?.[0]}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-navy-800 group-hover:text-teal-700 transition-colors">
                      {app.firstName} {app.lastName}
                    </div>
                    <div className="text-xs text-navy-400">{app.state} · {formatDateShort(app.createdAt)}</div>
                  </div>
                </div>
                <StatusBadge status={app.status} />
              </Link>
            ))}
            {!stats?.recentApplications?.length && (
              <p className="text-center text-navy-400 text-sm py-6">No applications yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { href: '/admin/news-admin', icon: '📰', label: 'Publish News Article', desc: 'Add new story or update' },
          { href: '/admin/founder-admin', icon: '👤', label: 'Update Founder Profile', desc: 'Edit biography & photo' },
          { href: '/admin/content', icon: '⚙️', label: 'Manage Site Settings', desc: 'Applications open/closed' },
        ].map((q) => (
          <Link key={q.href} href={q.href}
            className="admin-card hover:shadow-card-hover transition-all duration-300 flex items-center gap-4 p-4">
            <span className="text-2xl">{q.icon}</span>
            <div>
              <div className="font-semibold text-navy-800 text-sm">{q.label}</div>
              <div className="text-navy-400 text-xs">{q.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
