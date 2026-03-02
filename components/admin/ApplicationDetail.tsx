'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Phone, MapPin, BookOpen, MessageSquare, Check, X, Eye, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import AdminHeader from './AdminHeader';
import StatusBadge from '@/components/ui/StatusBadge';
import { formatDate } from '@/lib/utils';

export default function ApplicationDetail({ id }: { id: string }) {
  const router = useRouter();
  const [app, setApp] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notes, setNotes] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/applications/${id}`)
      .then((r) => r.json())
      .then((d) => { setApp(d); setNotes(d.adminNotes ?? ''); setNewStatus(d.status); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const updateStatus = async () => {
    setSaving(true); setError('');
    try {
      const res = await fetch(`/api/applications/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, adminNotes: notes }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Update failed');
      setApp((prev: any) => ({ ...prev, status: newStatus, adminNotes: notes }));
      router.refresh();
    } catch (e: any) { setError(e.message); }
    setSaving(false);
  };

  if (loading) return (
    <div className="flex-1">
      <AdminHeader title="Application Detail" />
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 rounded-full border-2 border-navy-200 border-t-teal-500 animate-spin" />
      </div>
    </div>
  );

  if (!app) return (
    <div className="flex-1">
      <AdminHeader title="Application Not Found" />
      <div className="p-6 text-center py-20">
        <div className="text-5xl mb-3">❓</div>
        <div className="text-navy-600 mb-4">Application not found or you don't have permission to view it.</div>
        <Link href="/admin/applications" className="btn-primary">Back to Applications</Link>
      </div>
    </div>
  );

  const fullName = `${app.firstName} ${app.middleName ?? ''} ${app.lastName}`.trim();

  return (
    <div className="flex-1">
      <AdminHeader title="Application Review" />
      <div className="p-6 space-y-5">

        {/* Back + title */}
        <div className="flex items-center justify-between">
          <Link href="/admin/applications" className="flex items-center gap-2 text-sm text-navy-500 hover:text-navy-800 transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Applications
          </Link>
          <StatusBadge status={app.status} />
        </div>

        {/* Header card */}
        <div className="admin-card">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-navy-gradient flex items-center justify-center shrink-0">
              {app.photoUrl ? (
                <img src={app.photoUrl} alt={fullName} className="w-16 h-16 rounded-2xl object-cover" />
              ) : (
                <span className="text-white font-display font-bold text-2xl">
                  {app.firstName[0]}{app.lastName[0]}
                </span>
              )}
            </div>
            <div className="flex-1">
              <h2 className="font-display text-2xl text-navy-800 font-semibold">{fullName}</h2>
              <div className="text-navy-500 text-sm mt-1">
                Ref: <code className="bg-navy-50 px-2 py-0.5 rounded text-xs font-mono">{app.refNumber}</code>
                <span className="mx-2">·</span>
                Applied {formatDate(app.createdAt)}
              </div>
            </div>
            <div className="flex gap-2">
              <a href={`tel:${app.phone}`} className="btn-ghost py-2 px-3 text-sm">
                <Phone className="w-4 h-4" /> Call
              </a>
              {app.photoUrl && (
                <a href={app.photoUrl} target="_blank" rel="noreferrer" className="btn-ghost py-2 px-3 text-sm">
                  <Eye className="w-4 h-4" /> Photo
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Main info */}
          <div className="lg:col-span-2 space-y-5">

            {/* Personal */}
            <div className="admin-card">
              <h3 className="font-semibold text-navy-800 mb-4 flex items-center gap-2 pb-3 border-b border-navy-50">
                <span className="text-xl">👤</span> Personal Information
              </h3>
              <dl className="grid sm:grid-cols-2 gap-4">
                {[
                  ['Full Name', fullName],
                  ['Date of Birth', formatDate(app.dateOfBirth)],
                  ['Gender', app.gender],
                  ['Phone', app.phone],
                  app.guardianName && ['Guardian Name', app.guardianName],
                  app.guardianPhone && ['Guardian Phone', app.guardianPhone],
                ].filter(Boolean).map(([label, value]) => (
                  <div key={label as string}>
                    <dt className="text-xs font-semibold text-navy-400 uppercase tracking-wide mb-0.5">{label as string}</dt>
                    <dd className="text-sm text-navy-700 font-medium">{value as string}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Location */}
            <div className="admin-card">
              <h3 className="font-semibold text-navy-800 mb-4 flex items-center gap-2 pb-3 border-b border-navy-50">
                <MapPin className="w-4 h-4 text-teal-500" /> Location
              </h3>
              <dl className="grid sm:grid-cols-2 gap-4">
                {[
                  ['State', app.state], ['LGA', app.lga], ['Ward', app.ward], ['Address', app.address],
                ].map(([label, value]) => (
                  <div key={label} className={label === 'Address' ? 'sm:col-span-2' : ''}>
                    <dt className="text-xs font-semibold text-navy-400 uppercase tracking-wide mb-0.5">{label}</dt>
                    <dd className="text-sm text-navy-700 font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Education */}
            <div className="admin-card">
              <h3 className="font-semibold text-navy-800 mb-4 flex items-center gap-2 pb-3 border-b border-navy-50">
                <BookOpen className="w-4 h-4 text-teal-500" /> Education
              </h3>
              <dl className="grid sm:grid-cols-2 gap-4">
                {[
                  ['School Name', app.schoolName],
                  ['School Location', `${app.schoolLga}, ${app.schoolState}`],
                  ['Class / Level', app.classLevel],
                  ['Exam Year', app.examYear],
                  ['Previous Attempts', app.prevAttempts],
                  ['Examinations Applied', (Array.isArray(app.examTypes) ? app.examTypes : [app.examTypes]).join(', ')],
                ].map(([label, value]) => (
                  <div key={label as string}>
                    <dt className="text-xs font-semibold text-navy-400 uppercase tracking-wide mb-0.5">{label as string}</dt>
                    <dd className="text-sm text-navy-700 font-medium">{String(value)}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Statement */}
            <div className="admin-card">
              <h3 className="font-semibold text-navy-800 mb-4 flex items-center gap-2 pb-3 border-b border-navy-50">
                <MessageSquare className="w-4 h-4 text-teal-500" /> Personal Statement
              </h3>
              <blockquote className="bg-cream-100 border-l-4 border-teal-400 p-4 rounded-r-xl text-navy-600 text-sm leading-relaxed italic">
                "{app.statement}"
              </blockquote>
            </div>
          </div>

          {/* Review panel */}
          <div className="space-y-5">
            <div className="admin-card">
              <h3 className="font-semibold text-navy-800 mb-4 pb-3 border-b border-navy-50">Review & Decision</h3>

              <div className="mb-4">
                <label className="label text-xs">Update Status</label>
                <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="select text-sm">
                  {['PENDING','UNDER_REVIEW','APPROVED','REJECTED','SPONSORED'].map((s) => (
                    <option key={s} value={s}>{s.replace('_', ' ')}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="label text-xs">Admin Notes</label>
                <textarea
                  value={notes} onChange={(e) => setNotes(e.target.value)}
                  placeholder="Internal notes about this application..."
                  className="textarea text-sm min-h-[100px]"
                  rows={4}
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm mb-4">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { setNewStatus('APPROVED'); setTimeout(updateStatus, 0); }}
                  disabled={saving}
                  className="flex items-center justify-center gap-2 py-2.5 bg-green-50 text-green-700 border border-green-200 rounded-xl text-sm font-semibold hover:bg-green-100 transition-colors disabled:opacity-50"
                >
                  <Check className="w-4 h-4" /> Approve
                </button>
                <button
                  onClick={() => { setNewStatus('REJECTED'); setTimeout(updateStatus, 0); }}
                  disabled={saving}
                  className="flex items-center justify-center gap-2 py-2.5 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm font-semibold hover:bg-red-100 transition-colors disabled:opacity-50"
                >
                  <X className="w-4 h-4" /> Reject
                </button>
              </div>

              <button onClick={updateStatus} disabled={saving}
                className="mt-3 btn-primary w-full justify-center text-sm py-2.5 disabled:opacity-50">
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </div>

            {/* Timeline */}
            <div className="admin-card">
              <h3 className="font-semibold text-navy-800 mb-4 pb-3 border-b border-navy-50">Timeline</h3>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                  <div>
                    <div className="font-medium text-navy-700">Application Submitted</div>
                    <div className="text-navy-400 text-xs">{formatDate(app.createdAt)}</div>
                  </div>
                </div>
                {app.reviewedAt && (
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-gold-500 mt-1.5 shrink-0" />
                    <div>
                      <div className="font-medium text-navy-700">Reviewed</div>
                      <div className="text-navy-400 text-xs">{formatDate(app.reviewedAt)}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
