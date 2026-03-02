'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, ShieldCheck, Shield, User, X, Eye, EyeOff } from 'lucide-react';
import { formatDateShort, getInitials } from '@/lib/utils';

interface StaffMember { id: string; name: string; email: string; role: string; isActive: boolean; lastLogin?: string; createdAt: string; }

const BLANK = { name: '', email: '', password: '', role: 'EDITOR', isActive: true };

export default function StaffManager({ session }: { session: any }) {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<typeof BLANK | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [showPw, setShowPw] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const isSuperAdmin = (session?.user as any)?.role === 'SUPER_ADMIN';

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/staff');
      if (res.ok) setStaff(await res.json());
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setModal({ ...BLANK }); setEditId(null); setError(''); };
  const openEdit = (s: StaffMember) => { setModal({ name: s.name, email: s.email, password: '', role: s.role, isActive: s.isActive }); setEditId(s.id); setError(''); };

  const save = async () => {
    if (!modal?.name || !modal?.email) { setError('Name and email are required'); return; }
    if (!editId && !modal.password) { setError('Password is required for new accounts'); return; }
    setSaving(true); setError('');
    try {
      const body = editId ? { id: editId, ...modal } : modal;
      const res = await fetch('/api/admin/staff', {
        method: editId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? 'Failed');
      setModal(null); load();
    } catch (e: any) { setError(e.message); }
    finally { setSaving(false); }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this staff account permanently?')) return;
    await fetch('/api/admin/staff', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    load();
  };

  const toggleActive = async (s: StaffMember) => {
    await fetch('/api/admin/staff', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: s.id, isActive: !s.isActive }) });
    load();
  };

  if (!isSuperAdmin) return (
    <div className="text-center py-16">
      <ShieldCheck className="w-12 h-12 text-navy-300 mx-auto mb-4" />
      <p className="text-navy-500 font-display text-lg">Super Admin access required</p>
      <p className="text-navy-400 text-sm mt-2">Only Super Administrators can manage staff accounts.</p>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl text-navy-800">Staff Accounts</h1>
          <p className="text-navy-400 text-sm mt-1">{staff.length} admin users</p>
        </div>
        <button onClick={openNew} className="btn-primary"><Plus className="w-4 h-4" /> Add Staff</button>
      </div>

      {/* Modal */}
      {modal !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-navy-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-lg text-navy-800">{editId ? 'Edit Staff Member' : 'Add New Staff'}</h2>
              <button onClick={() => setModal(null)}><X className="w-5 h-5 text-navy-400" /></button>
            </div>
            {error && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm mb-4">{error}</div>}
            <div className="space-y-4">
              <div>
                <label className="label">Full Name</label>
                <input className="input" value={modal.name} onChange={(e) => setModal({ ...modal, name: e.target.value })} placeholder="Staff member name" />
              </div>
              <div>
                <label className="label">Email Address</label>
                <input type="email" className="input" value={modal.email} onChange={(e) => setModal({ ...modal, email: e.target.value })} placeholder="email@example.com" />
              </div>
              <div>
                <label className="label">{editId ? 'New Password (leave blank to keep current)' : 'Password'}</label>
                <div className="relative">
                  <input type={showPw ? 'text' : 'password'} className="input pr-10" value={modal.password} onChange={(e) => setModal({ ...modal, password: e.target.value })} placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-300">
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="label">Role</label>
                <select className="select" value={modal.role} onChange={(e) => setModal({ ...modal, role: e.target.value })}>
                  <option value="EDITOR">Editor — can view and manage applications, news</option>
                  <option value="VIEWER">Viewer — read-only access</option>
                  <option value="SUPER_ADMIN">Super Admin — full access</option>
                </select>
              </div>
              {editId && (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={modal.isActive} onChange={(e) => setModal({ ...modal, isActive: e.target.checked })} className="w-4 h-4 accent-teal-500" />
                  <span className="text-sm text-navy-700 font-medium">Account Active</span>
                </label>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={save} disabled={saving} className="btn-primary flex-1 justify-center">
                {saving ? 'Saving…' : editId ? 'Update' : 'Create Account'}
              </button>
              <button onClick={() => setModal(null)} className="btn-outline">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="admin-card overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12"><div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-navy-50 text-left">
                {['Staff Member', 'Role', 'Status', 'Last Login', 'Created', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-xs font-bold text-navy-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-50">
              {staff.map((s) => (
                <tr key={s.id} className="admin-table-row">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-navy-gradient flex items-center justify-center shrink-0">
                        <span className="text-gold-400 font-bold text-xs">{getInitials(s.name)}</span>
                      </div>
                      <div>
                        <div className="font-medium text-navy-800 text-sm">{s.name}</div>
                        <div className="text-navy-400 text-xs">{s.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`badge text-xs ${s.role === 'SUPER_ADMIN' ? 'bg-purple-50 text-purple-700 border border-purple-200' : s.role === 'EDITOR' ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'bg-navy-50 text-navy-700 border border-navy-200'}`}>
                      {s.role === 'SUPER_ADMIN' ? '🔒 Super Admin' : s.role === 'EDITOR' ? '✏️ Editor' : '👁️ Viewer'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`badge ${s.isActive ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                      {s.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-navy-400">{s.lastLogin ? formatDateShort(s.lastLogin) : 'Never'}</td>
                  <td className="px-4 py-3 text-sm text-navy-400">{formatDateShort(s.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg hover:bg-teal-50 text-navy-400 hover:text-teal-600 transition-colors"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => toggleActive(s)} className="p-1.5 rounded-lg hover:bg-amber-50 text-navy-400 hover:text-amber-600 transition-colors" title={s.isActive ? 'Deactivate' : 'Activate'}>
                        {s.isActive ? <User className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                      </button>
                      <button onClick={() => remove(s.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-navy-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
