import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CTASection from '@/components/sections/CTASection';
import { galleryImages } from '@/data/gallery';

export const metadata: Metadata = {
  title: 'Photo Gallery — Kowa Namu Ne Foundation',
  description: 'Explore our collection of 199 photos showcasing youth empowerment, community impact, and transformation across Nigeria.',
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <section className="relative pt-32 pb-20 bg-navy-gradient overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-30" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />

          <div className="container-xl relative z-10">
            <Link href="/" className="inline-flex items-center gap-2 text-gold-300 hover:text-gold-200 mb-8 font-medium">
              <ArrowLeft className="w-4 h-4" />
              Back Home
            </Link>

            <h1 className="font-display text-5xl sm:text-6xl text-white mb-4">Photo Gallery</h1>
            <p className="text-white/75 max-w-2xl text-lg">
              {galleryImages.length} captured moments of impact, transformation, and community building across Nigeria
            </p>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </section>

        {/* Gallery Grid */}
        <section className="section-pad bg-white">
          <div className="container-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {galleryImages.map((img) => (
                <div key={img.id} className="group relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all bg-navy-100">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    quality={75}
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button 
                      className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors backdrop-blur-sm"
                      aria-label="Download image"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                  {/* Image number label */}
                  <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm rounded px-2 py-1">
                    <p className="text-white text-xs font-medium">#{img.id}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
