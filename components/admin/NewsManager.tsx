'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Star, StarOff, Search, X } from 'lucide-react';
import { formatDateShort } from '@/lib/utils';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  publishedAt?: string;
  authorName: string;
}

const BLANK: Partial<Article> = {
  title: '', excerpt: '', content: '', category: 'News',
  tags: [], isPublished: false, isFeatured: false, authorName: 'Kowa Namu Ne Foundation',
};

export default function NewsManager() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Partial<Article> | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/news');
      setArticles(await res.json());
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing?.title?.trim()) { setError('Title is required'); return; }
    setSaving(true); setError('');
    try {
      const isNew = !editing.slug;
      const url = isNew ? '/api/news' : `/api/news/${editing.slug}`;
      const method = isNew ? 'POST' : 'PATCH';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setEditing(null);
      load();
    } catch (e: any) {
      setError(e.message);
    } finally { setSaving(false); }
  };

  const toggleField = async (slug: string, field: 'isPublished' | 'isFeatured', current: boolean) => {
    await fetch(`/api/news/${slug}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: !current }),
    });
    load();
  };

  const remove = async (slug: string) => {
    if (!confirm('Delete this article permanently?')) return;
    await fetch(`/api/news/${slug}`, { method: 'DELETE' });
    load();
  };

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  if (editing !== null) {
    return (
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl text-navy-800">{editing.slug ? 'Edit Article' : 'New Article'}</h1>
          <button onClick={() => setEditing(null)} className="btn-ghost"><X className="w-4 h-4" /> Cancel</button>
        </div>

        {error && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm mb-5">{error}</div>}

        <div className="admin-card space-y-5">
          <div>
            <label className="label">Title *</label>
            <input className="input" value={editing.title ?? ''} onChange={(e) => setEditing({ ...editing, title: e.target.value })} placeholder="Article headline" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Category</label>
              <select className="select" value={editing.category ?? 'News'} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
                {['News', 'Programmes', 'Education', 'Healthcare', 'Youth', 'Innovation', 'Humanitarian', 'Peacebuilding'].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Author Name</label>
              <input className="input" value={editing.authorName ?? ''} onChange={(e) => setEditing({ ...editing, authorName: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="label">Cover Image URL</label>
            <input className="input" value={editing.coverImage ?? ''} onChange={(e) => setEditing({ ...editing, coverImage: e.target.value })} placeholder="https://..." />
          </div>
          <div>
            <label className="label">Excerpt / Summary *</label>
            <textarea className="textarea" rows={3} value={editing.excerpt ?? ''} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} placeholder="A short, compelling summary shown in listings..." />
          </div>
          <div>
            <label className="label">Full Content *</label>
            <textarea className="textarea min-h-[300px]" rows={12} value={editing.content ?? ''} onChange={(e) => setEditing({ ...editing, content: e.target.value })} placeholder="Full article content. Use blank lines to separate paragraphs." />
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={editing.isPublished ?? false} onChange={(e) => setEditing({ ...editing, isPublished: e.target.checked })} className="w-4 h-4 accent-teal-500" />
              <span className="text-sm font-medium text-navy-700">Published (visible on site)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={editing.isFeatured ?? false} onChange={(e) => setEditing({ ...editing, isFeatured: e.target.checked })} className="w-4 h-4 accent-gold-500" />
              <span className="text-sm font-medium text-navy-700">Featured (highlighted on homepage)</span>
            </label>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={save} disabled={saving} className="btn-primary">
              {saving ? 'Saving…' : editing.slug ? 'Update Article' : 'Publish Article'}
            </button>
            <button onClick={() => setEditing(null)} className="btn-outline">Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl text-navy-800">News & Articles</h1>
          <p className="text-navy-400 text-sm mt-1">{articles.length} total articles</p>
        </div>
        <button onClick={() => setEditing(BLANK)} className="btn-primary shrink-0">
          <Plus className="w-4 h-4" /> New Article
        </button>
      </div>

      <div className="admin-card p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-300" />
          <input className="input pl-9" placeholder="Search by title or category…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><LoadingSpinner size="lg" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-navy-400">
          <p className="text-lg font-display mb-2">No articles yet</p>
          <p className="text-sm">Click "New Article" to write your first story.</p>
        </div>
      ) : (
        <div className="admin-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-navy-50 text-left">
                {['Title', 'Category', 'Author', 'Date', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-xs font-bold text-navy-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-50">
              {filtered.map((a) => (
                <tr key={a.id} className="admin-table-row">
                  <td className="px-4 py-3">
                    <div className="font-medium text-navy-800 text-sm line-clamp-1 max-w-xs">{a.title}</div>
                    {a.isFeatured && <span className="badge bg-gold-50 text-gold-700 border border-gold-200 text-xs mt-1">⭐ Featured</span>}
                  </td>
                  <td className="px-4 py-3 text-sm text-navy-500">{a.category}</td>
                  <td className="px-4 py-3 text-sm text-navy-500">{a.authorName}</td>
                  <td className="px-4 py-3 text-sm text-navy-400 whitespace-nowrap">
                    {a.publishedAt ? formatDateShort(a.publishedAt) : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`badge ${a.isPublished ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'} border`}>
                      {a.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => toggleField(a.slug, 'isPublished', a.isPublished)} title={a.isPublished ? 'Unpublish' : 'Publish'}
                        className="p-1.5 rounded-lg hover:bg-navy-50 text-navy-400 hover:text-navy-700 transition-colors">
                        {a.isPublished ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button onClick={() => toggleField(a.slug, 'isFeatured', a.isFeatured)} title={a.isFeatured ? 'Unfeature' : 'Feature'}
                        className="p-1.5 rounded-lg hover:bg-gold-50 text-navy-400 hover:text-gold-600 transition-colors">
                        {a.isFeatured ? <StarOff className="w-4 h-4" /> : <Star className="w-4 h-4" />}
                      </button>
                      <button onClick={() => setEditing(a)}
                        className="p-1.5 rounded-lg hover:bg-teal-50 text-navy-400 hover:text-teal-600 transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => remove(a.slug)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-navy-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
