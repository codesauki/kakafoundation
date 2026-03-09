'use client';

import { useEffect, useState } from 'react';
import { Save, Key, Database, Globe, Shield, ToggleLeft, ToggleRight } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function SettingsManager({ session }: { session: any }) {
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwLoading, setPwLoading] = useState(false);
  const [pwMessage, setPwMessage] = useState('');
  
  // Scholarship toggle state
  const [scholarshipsEnabled, setScholarshipsEnabled] = useState(true);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsMessage, setSettingsMessage] = useState('');

  // Load current settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await fetch('/api/admin/settings?key=scholarships_enabled');
        if (res.ok) {
          const data = await res.json();
          setScholarshipsEnabled(data.value === 'true');
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    };
    loadSettings();
  }, []);

  const changePassword = async () => {
    if (newPw !== confirmPw) { setPwMessage('New passwords do not match.'); return; }
    if (newPw.length < 8) { setPwMessage('Password must be at least 8 characters.'); return; }
    setPwLoading(true); setPwMessage('');
    try {
      const res = await fetch('/api/admin/staff', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: (session?.user as any)?.id, password: newPw }),
      });
      if (!res.ok) throw new Error('Failed to update password');
      setPwMessage('✓ Password updated. Please sign in again.');
      setCurrentPw(''); setNewPw(''); setConfirmPw('');
      setTimeout(() => signOut({ callbackUrl: '/login' }), 2000);
    } catch (e: any) { setPwMessage(e.message); }
    finally { setPwLoading(false); }
  };

  const updateScholarshipSettings = async () => {
    setSettingsLoading(true);
    setSettingsMessage('');
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'scholarships_enabled',
          value: scholarshipsEnabled.toString(),
          description: 'Controls whether scholarship applications are enabled across the website',
        }),
      });
      if (!res.ok) throw new Error('Failed to update settings');
      setSettingsMessage('✓ Scholarship settings updated successfully.');
    } catch (e: any) {
      setSettingsMessage(e.message);
    } finally {
      setSettingsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl text-navy-800">Settings</h1>
        <p className="text-navy-400 text-sm mt-1">Account settings and system configuration</p>
      </div>

      {/* Account info */}
      <div className="admin-card p-6 mb-6">
        <div className="flex items-center gap-3 mb-5 pb-2 border-b border-navy-100">
          <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
            <Shield className="w-4 h-4 text-teal-600" />
          </div>
          <h2 className="font-display text-lg text-navy-800">Your Account</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-navy-50 rounded-xl">
            <div className="text-xs text-navy-400 mb-1">Name</div>
            <div className="font-medium text-navy-800">{session?.user?.name}</div>
          </div>
          <div className="p-4 bg-navy-50 rounded-xl">
            <div className="text-xs text-navy-400 mb-1">Email</div>
            <div className="font-medium text-navy-800">{session?.user?.email}</div>
          </div>
          <div className="p-4 bg-navy-50 rounded-xl">
            <div className="text-xs text-navy-400 mb-1">Role</div>
            <div className="font-medium text-navy-800">{(session?.user as any)?.role}</div>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="admin-card p-6 mb-6">
        <div className="flex items-center gap-3 mb-5 pb-2 border-b border-navy-100">
          <div className="w-8 h-8 rounded-lg bg-gold-50 flex items-center justify-center">
            <Key className="w-4 h-4 text-gold-600" />
          </div>
          <h2 className="font-display text-lg text-navy-800">Change Password</h2>
        </div>
        {pwMessage && (
          <div className={`p-3 rounded-xl text-sm mb-4 ${pwMessage.startsWith('✓') ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
            {pwMessage}
          </div>
        )}
        <div className="space-y-4">
          <div>
            <label className="label">New Password</label>
            <input type="password" className="input" value={newPw} onChange={(e) => setNewPw(e.target.value)} placeholder="Minimum 8 characters" />
          </div>
          <div>
            <label className="label">Confirm New Password</label>
            <input type="password" className="input" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} placeholder="Re-enter new password" />
          </div>
          <button onClick={changePassword} disabled={pwLoading || !newPw || !confirmPw} className="btn-primary">
            <Key className="w-4 h-4" /> {pwLoading ? 'Updating…' : 'Update Password'}
          </button>
        </div>
      {/* Scholarship Applications Toggle */}
      <div className="admin-card p-6 mb-6">
        <div className="flex items-center gap-3 mb-5 pb-2 border-b border-navy-100">
          <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
            <Globe className="w-4 h-4 text-teal-600" />
          </div>
          <h2 className="font-display text-lg text-navy-800">Scholarship Applications</h2>
        </div>
        {settingsMessage && (
          <div className={`p-3 rounded-xl text-sm mb-4 ${settingsMessage.startsWith('✓') ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
            {settingsMessage}
          </div>
        )}
        <div className="flex items-center justify-between p-4 bg-navy-50 rounded-xl mb-4">
          <div>
            <div className="font-medium text-navy-800">Enable Scholarship Applications</div>
            <div className="text-sm text-navy-500 mt-1">
              When disabled, all apply buttons and scholarship links will be hidden across the website
            </div>
          </div>
          <button
            onClick={() => setScholarshipsEnabled(!scholarshipsEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              scholarshipsEnabled ? 'bg-teal-600' : 'bg-navy-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                scholarshipsEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        <button
          onClick={updateScholarshipSettings}
          disabled={settingsLoading}
          className="btn-primary"
        >
          <Save className="w-4 h-4" /> {settingsLoading ? 'Saving…' : 'Save Settings'}
        </button>
      </div>
      <div className="admin-card p-6">
        <div className="flex items-center gap-3 mb-5 pb-2 border-b border-navy-100">
          <div className="w-8 h-8 rounded-lg bg-navy-50 flex items-center justify-center">
            <Database className="w-4 h-4 text-navy-500" />
          </div>
          <h2 className="font-display text-lg text-navy-800">System Information</h2>
        </div>
        <div className="space-y-3">
          {[
            ['Platform', 'Next.js 14 (App Router)'],
            ['Database', 'PostgreSQL via Prisma ORM'],
            ['File Storage', 'Cloudinary CDN'],
            ['Authentication', 'NextAuth.js (JWT)'],
            ['Version', 'KNF Admin v1.0.0'],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between py-2 border-b border-navy-50 last:border-0">
              <span className="text-navy-400 text-sm">{label}</span>
              <span className="text-navy-700 text-sm font-medium">{value}</span>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <button onClick={() => signOut({ callbackUrl: '/login' })} className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors">
            Sign out of all sessions →
          </button>
        </div>
      </div>
    </div>
  );
}
