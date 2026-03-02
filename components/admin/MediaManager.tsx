'use client';

import { useState, useEffect, useRef } from 'react';
import { Upload, Trash2, Copy, CheckCircle, Image, X } from 'lucide-react';
import { prisma } from '@/lib/db';

interface GalleryItem { id: string; title: string; description?: string; imageUrl: string; publicId: string; category: string; isPublished: boolean; order: number; }

export default function MediaManager() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gallery');
      if (res.ok) setItems(await res.json());
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'gallery');
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const { url, publicId } = await res.json();
        await fetch('/api/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: file.name.replace(/\.[^.]+$/, ''), imageUrl: url, publicId, category: 'General', isPublished: true, order: 0 }),
        });
      } catch {}
    }
    setUploading(false);
    load();
    if (fileRef.current) fileRef.current.value = '';
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  const remove = async (item: GalleryItem) => {
    if (!confirm('Delete this image?')) return;
    await fetch('/api/upload', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ publicId: item.publicId }) });
    await fetch(`/api/gallery/${item.id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl text-navy-800">Media Library</h1>
          <p className="text-navy-400 text-sm mt-1">{items.length} images · stored on Cloudinary</p>
        </div>
        <label className={`btn-primary cursor-pointer ${uploading ? 'opacity-60 cursor-not-allowed' : ''}`}>
          {uploading ? (
            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Uploading…</>
          ) : (
            <><Upload className="w-4 h-4" /> Upload Images</>
          )}
          <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleUpload} className="sr-only" disabled={uploading} />
        </label>
      </div>

      {/* Lightbox */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-navy-900/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-navy-lg max-w-2xl w-full p-4 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute top-3 right-3 p-1.5 rounded-lg bg-navy-50 hover:bg-navy-100 text-navy-500 transition-colors">
              <X className="w-4 h-4" />
            </button>
            <img src={selected.imageUrl} alt={selected.title} className="w-full rounded-xl object-cover max-h-96" />
            <div className="mt-4 space-y-2">
              <div className="font-medium text-navy-800">{selected.title}</div>
              <div className="flex items-center gap-2">
                <input className="input text-xs font-mono flex-1" value={selected.imageUrl} readOnly />
                <button onClick={() => copyUrl(selected.imageUrl)} className="btn-ghost text-xs border border-navy-200 rounded-xl shrink-0">
                  {copied === selected.imageUrl ? <><CheckCircle className="w-4 h-4 text-green-500" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy URL</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 admin-card">
          <Image className="w-12 h-12 text-navy-200 mx-auto mb-4" />
          <p className="font-display text-lg text-navy-500 mb-2">No images yet</p>
          <p className="text-navy-400 text-sm">Upload images using the button above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {items.map((item) => (
            <div key={item.id} className="group relative bg-navy-50 rounded-2xl overflow-hidden aspect-square cursor-pointer" onClick={() => setSelected(item)}>
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/50 transition-all duration-200 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button onClick={(e) => { e.stopPropagation(); copyUrl(item.imageUrl); }}
                  className="p-2 bg-white rounded-xl text-navy-700 hover:bg-gold-50 transition-colors">
                  {copied === item.imageUrl ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
                <button onClick={(e) => { e.stopPropagation(); remove(item); }}
                  className="p-2 bg-white rounded-xl text-navy-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-navy-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs truncate">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
