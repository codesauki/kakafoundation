import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/ui/PageHeader';
import CTASection from '@/components/sections/CTASection';
import { prisma } from '@/lib/db';

interface GalleryItem { id: string; imageUrl: string; title: string; category: string; }

export const metadata: Metadata = { title: 'Gallery' };

async function getGallery() {
  try {
    return await prisma.galleryItem.findMany({
      where: { isPublished: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
  } catch { return []; }
}

const PLACEHOLDERS = [
  { title: 'Scholarship Award Ceremony 2024', category: 'Education' },
  { title: 'Youth Skills Training - Damaturu', category: 'Skills' },
  { title: 'Free Medical Outreach - Yobe State', category: 'Healthcare' },
  { title: 'Innovation Hub Graduation Day', category: 'Innovation' },
  { title: 'Community Dialogue Forum', category: 'Peacebuilding' },
  { title: 'Clean Water Project Inauguration', category: 'Humanitarian' },
  { title: 'Founder Visit to Beneficiaries', category: 'Foundation' },
  { title: 'Student Support Distribution', category: 'Education' },
  { title: 'SME Empowerment Workshop', category: 'Youth' },
];

export default async function GalleryPage() {
  const items = await getGallery();
  const displayItems = items.length > 0 ? items : [];

  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-32 pb-20 bg-navy-gradient overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-30" />
          <div className="container-xl relative z-10">
            <PageHeader tag="Gallery" title="Our Work in" titleHighlight="Pictures" subtitle="A visual journey through the Foundation's programmes, events, and the communities we serve across Nigeria." dark />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </section>

        <section className="section-pad bg-white">
          <div className="container-xl">
            {displayItems.length > 0 ? (
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                {displayItems.map((item: GalleryItem) => (
                  <div key={item.id} className="break-inside-avoid group card overflow-hidden block">
                    <div className="overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3">
                      <div className="text-xs font-semibold text-teal-600 mb-1">{item.category}</div>
                      <div className="text-sm font-medium text-navy-700">{item.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Placeholder grid while no images uploaded */
              <div>
                <div className="text-center mb-10 p-5 bg-amber-50 border border-amber-200 rounded-2xl">
                  <p className="text-amber-700 text-sm font-medium">Gallery images will appear here once uploaded via the Admin Dashboard → Media Library.</p>
                </div>
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                  {PLACEHOLDERS.map((p, i) => (
                    <div key={i} className="break-inside-avoid card overflow-hidden">
                      <div
                        className={`flex items-center justify-center ${i % 3 === 0 ? 'h-48 bg-navy-gradient' : i % 3 === 1 ? 'h-60 bg-teal-gradient' : 'h-52'} ${i % 3 === 2 ? 'bg-gradient-to-br from-gold-200 to-gold-400' : ''}`}
                      >
                        <span className="text-white/30 font-display text-5xl">📸</span>
                      </div>
                      <div className="p-3">
                        <div className="text-xs font-semibold text-teal-600 mb-1">{p.category}</div>
                        <div className="text-sm font-medium text-navy-700">{p.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
