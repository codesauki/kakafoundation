'use client';

import { useState, useEffect } from 'react';
import { Save, Globe, Bell, Mail, Phone, MapPin, Twitter, Facebook, Instagram } from 'lucide-react';

interface Settings { [key: string]: string; }

const SECTIONS = [
  {
    title: 'Application Portal',
    icon: Globe,
    keys: [
      { key: 'applications_open', label: 'Applications Open?', type: 'toggle' },
      { key: 'cycle_name', label: 'Current Cycle Name', placeholder: '2026 Scholarship Cycle' },
      { key: 'cycle_deadline', label: 'Application Deadline', placeholder: 'June 30, 2026' },
      { key: 'max_applications', label: 'Maximum Slots', placeholder: '10000' },
      { key: 'announcement', label: 'Homepage Announcement Banner', placeholder: 'Applications are now open for the 2026 cycle…', multiline: true },
    ],
  },
  {
    title: 'Contact Information',
    icon: Mail,
    keys: [
      { key: 'contact_email', label: 'Contact Email', placeholder: 'info@kowanamunejoundation.org' },
      { key: 'contact_phone', label: 'Contact Phone', placeholder: '+234 800 KNF HELP' },
      { key: 'contact_address', label: 'Office Address', placeholder: 'Abuja, FCT, Nigeria', multiline: true },
    ],
  },
  {
    title: 'Social Media',
    icon: Twitter,
    keys: [
      { key: 'social_twitter', label: 'Twitter / X URL', placeholder: 'https://twitter.com/KowaNamuNe' },
      { key: 'social_facebook', label: 'Facebook URL', placeholder: 'https://facebook.com/KowaNamuNeFoundation' },
      { key: 'social_instagram', label: 'Instagram URL', placeholder: 'https://instagram.com/KowaNamuNe' },
    ],
  },
  {
    title: 'Notifications',
    icon: Bell,
    keys: [
      { key: 'notify_email', label: 'Admin Notification Email', placeholder: 'admin@kowanamunejoundation.org' },
      { key: 'auto_reply_message', label: 'Auto-Reply Message (sent to applicants)', placeholder: 'Thank you for applying…', multiline: true },
    ],
  },
];

export default function ContentManager() {
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/content').then((r) => r.json()).then(setSettings).finally(() => setLoading(false));
  }, []);

  const set = (key: string, value: string) => setSettings((prev) => ({ ...prev, [key]: value }));

  const save = async () => {
    setSaving(true); setError(''); setSaved(false);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error('Save failed');
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e: any) { setError(e.message); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl text-navy-800">Site Content & Settings</h1>
          <p className="text-navy-400 text-sm mt-1">Control what appears on the public website</p>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary">
          <Save className="w-4 h-4" />
          {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save All'}
        </button>
      </div>

      {error && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm mb-5">{error}</div>}
      {saved && <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm mb-5">✓ Settings saved successfully.</div>}

      <div className="space-y-6">
        {SECTIONS.map(({ title, icon: Icon, keys }) => (
          <div key={title} className="admin-card p-6">
            <div className="flex items-center gap-3 mb-5 pb-2 border-b border-navy-100">
              <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
                <Icon className="w-4 h-4 text-teal-600" />
              </div>
              <h2 className="font-display text-lg text-navy-800">{title}</h2>
            </div>
            <div className="space-y-4">
              {keys.map(({ key, label, placeholder, type, multiline }) => (
                <div key={key}>
                  <label className="label">{label}</label>
                  {type === 'toggle' ? (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => set(key, settings[key] === 'true' ? 'false' : 'true')}
                        className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${settings[key] === 'true' ? 'bg-teal-500' : 'bg-navy-200'}`}
                      >
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${settings[key] === 'true' ? 'translate-x-7' : 'translate-x-1'}`} />
                      </button>
                      <span className={`text-sm font-medium ${settings[key] === 'true' ? 'text-teal-700' : 'text-navy-400'}`}>
                        {settings[key] === 'true' ? 'Open — Students can apply' : 'Closed — Applications are paused'}
                      </span>
                    </div>
                  ) : multiline ? (
                    <textarea className="textarea" rows={3} value={settings[key] ?? ''} onChange={(e) => set(key, e.target.value)} placeholder={placeholder} />
                  ) : (
                    <input className="input" value={settings[key] ?? ''} onChange={(e) => set(key, e.target.value)} placeholder={placeholder} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <button onClick={save} disabled={saving} className="btn-primary">
          <Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
}
