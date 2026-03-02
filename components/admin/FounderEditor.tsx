'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Upload } from 'lucide-react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface Achievement { id?: string; year: string; title: string; description?: string; order?: number; }
interface FounderData {
  name: string; title: string; subtitle: string; bio: string; vision: string; quote: string;
  photoUrl: string; email: string; phone: string;
  twitterUrl: string; facebookUrl: string; instagramUrl: string;
  achievements: Achievement[];
}

const DEFAULT: FounderData = {
  name: 'Hon. Abdulazeez Kaka', title: 'Founder & Chairman', subtitle: 'Chairman, APC Youth Stakeholders Forum',
  bio: '', vision: '', quote: 'When we lift one, we lift all. Come with us — there is room for everyone.',
  photoUrl: '', email: '', phone: '', twitterUrl: '', facebookUrl: '', instagramUrl: '', achievements: [],
};

export default function FounderEditor() {
  const [data, setData] = useState<FounderData>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/founder').then((r) => r.json()).then((d) => {
      if (d) setData({ ...DEFAULT, ...d, achievements: d.achievements ?? [] });
    }).finally(() => setLoading(false));
  }, []);

  const set = (key: keyof FounderData, val: any) => setData((prev) => ({ ...prev, [key]: val }));

  const setAchievement = (i: number, key: keyof Achievement, val: string) => {
    const updated = [...data.achievements];
    updated[i] = { ...updated[i], [key]: val };
    set('achievements', updated);
  };

  const addAchievement = () => set('achievements', [...data.achievements, { year: '', title: '', description: '' }]);
  const removeAchievement = (i: number) => set('achievements', data.achievements.filter((_, idx) => idx !== i));

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'founder');
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const { url } = await res.json();
      set('photoUrl', url);
    } finally { setUploading(false); }
  };

  const save = async () => {
    setSaving(true); setError(''); setSaved(false);
    try {
      const res = await fetch('/api/founder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e: any) { setError(e.message); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="flex justify-center py-16"><LoadingSpinner size="lg" /></div>;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl text-navy-800">Founder Profile</h1>
          <p className="text-navy-400 text-sm mt-1">Edit Hon. Abdulazeez Kaka's profile visible on the public site</p>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary">
          <Save className="w-4 h-4" />
          {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
        </button>
      </div>

      {error && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm mb-5">{error}</div>}
      {saved && <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm mb-5">✓ Profile saved successfully.</div>}

      {/* Basic Info */}
      <div className="admin-card p-6 mb-6">
        <h2 className="font-display text-lg text-navy-800 mb-5 pb-2 border-b border-navy-100">Basic Information</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {([
            ['name', 'Full Name', 'Hon. Abdulazeez Kaka'],
            ['title', 'Title / Role', 'Founder & Chairman'],
            ['subtitle', 'Subtitle', 'Chairman, APC Youth Stakeholders Forum'],
            ['email', 'Email', 'founder@kowanamunejoundation.org'],
            ['phone', 'Phone', '+234 …'],
          ] as [keyof FounderData, string, string][]).map(([key, label, placeholder]) => (
            <div key={key}>
              <label className="label">{label}</label>
              <input className="input" value={(data[key] as string) ?? ''} onChange={(e) => set(key, e.target.value)} placeholder={placeholder} />
            </div>
          ))}
        </div>
      </div>

      {/* Photo */}
      <div className="admin-card p-6 mb-6">
        <h2 className="font-display text-lg text-navy-800 mb-5 pb-2 border-b border-navy-100">Portrait Photo</h2>
        <div className="flex items-start gap-6">
          <div className="w-24 h-28 rounded-xl overflow-hidden bg-navy-100 flex items-center justify-center shrink-0">
            {data.photoUrl ? (
              <img src={data.photoUrl} alt="Portrait" className="w-full h-full object-cover object-top" />
            ) : (
              <span className="text-navy-300 text-xs text-center px-2">No photo</span>
            )}
          </div>
          <div className="flex-1 space-y-3">
            <label className="flex items-center gap-2 cursor-pointer btn-outline text-sm w-fit">
              {uploading ? <><div className="w-4 h-4 border-2 border-navy-300 border-t-navy-700 rounded-full animate-spin" /> Uploading…</> : <><Upload className="w-4 h-4" /> Upload New Photo</>}
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="sr-only" disabled={uploading} />
            </label>
            <div>
              <label className="label text-xs">Or paste image URL directly</label>
              <input className="input text-sm" value={data.photoUrl} onChange={(e) => set('photoUrl', e.target.value)} placeholder="https://res.cloudinary.com/..." />
            </div>
          </div>
        </div>
      </div>

      {/* Bio & Vision */}
      <div className="admin-card p-6 mb-6">
        <h2 className="font-display text-lg text-navy-800 mb-5 pb-2 border-b border-navy-100">Biography & Vision</h2>
        <div className="space-y-4">
          <div>
            <label className="label">Full Biography</label>
            <p className="text-xs text-navy-400 mb-2">Use blank lines to separate paragraphs. This text appears on the Founder page.</p>
            <textarea className="textarea min-h-[200px]" rows={10} value={data.bio} onChange={(e) => set('bio', e.target.value)} placeholder="Write the founder's biography here..." />
          </div>
          <div>
            <label className="label">Vision Statement</label>
            <textarea className="textarea" rows={3} value={data.vision} onChange={(e) => set('vision', e.target.value)} placeholder="His vision for Nigeria's youth..." />
          </div>
          <div>
            <label className="label">Featured Quote</label>
            <textarea className="textarea" rows={2} value={data.quote} onChange={(e) => set('quote', e.target.value)} placeholder="A memorable quote displayed prominently..." />
          </div>
        </div>
      </div>

      {/* Social */}
      <div className="admin-card p-6 mb-6">
        <h2 className="font-display text-lg text-navy-800 mb-5 pb-2 border-b border-navy-100">Social Media Links</h2>
        <div className="space-y-3">
          {([
            ['twitterUrl', 'Twitter / X URL'],
            ['facebookUrl', 'Facebook URL'],
            ['instagramUrl', 'Instagram URL'],
          ] as [keyof FounderData, string][]).map(([key, label]) => (
            <div key={key}>
              <label className="label">{label}</label>
              <input className="input" value={(data[key] as string) ?? ''} onChange={(e) => set(key, e.target.value)} placeholder="https://..." />
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="admin-card p-6 mb-6">
        <div className="flex items-center justify-between mb-5 pb-2 border-b border-navy-100">
          <h2 className="font-display text-lg text-navy-800">Key Achievements / Timeline</h2>
          <button onClick={addAchievement} className="btn-ghost text-xs border border-navy-200 rounded-xl">
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>
        {data.achievements.length === 0 ? (
          <p className="text-navy-400 text-sm text-center py-6">No achievements yet. Click "Add" to create timeline entries.</p>
        ) : (
          <div className="space-y-4">
            {data.achievements.map((a, i) => (
              <div key={i} className="grid grid-cols-[80px_1fr_auto] gap-3 items-start p-4 bg-navy-50 rounded-xl">
                <div>
                  <label className="label text-xs">Year</label>
                  <input className="input text-sm" value={a.year} onChange={(e) => setAchievement(i, 'year', e.target.value)} placeholder="2022" />
                </div>
                <div>
                  <label className="label text-xs">Achievement</label>
                  <input className="input text-sm" value={a.title} onChange={(e) => setAchievement(i, 'title', e.target.value)} placeholder="Founded Kowa Namu Ne Foundation" />
                </div>
                <button onClick={() => removeAchievement(i)} className="mt-6 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button onClick={save} disabled={saving} className="btn-primary">
          <Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
}
