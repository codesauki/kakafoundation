import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { featuredGalleryImages, totalImages } from '@/data/gallery';
import GalleryCarousel from '@/components/ui/GalleryCarousel';

export default function GallerySection() {
  return (
    <section className="section-pad bg-white">
      <div className="container-xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold-50 border border-gold-200 rounded-full text-xs font-semibold text-gold-700 tracking-widest uppercase mb-6">
            ✨ Our Impact
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-navy-900 mb-4">Gallery & Moments</h2>
          <p className="text-navy-600 max-w-2xl mx-auto">
            Explore {totalImages} captured moments of youth empowerment, community impact, and transformation across Nigeria
          </p>
        </div>

        {/* Animated Carousel */}
        <div className="mb-16">
          <GalleryCarousel />
        </div>

        {/* Featured Grid */}
        <div className="mb-12">
          <h3 className="font-display text-2xl text-navy-900 mb-8">Featured Moments</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGalleryImages.map((img, idx) => (
              <div
                key={img.id}
                className="group relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  quality={80}
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="text-white">
                    <p className="text-sm font-medium">Moment {img.id}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View all button */}
        <div className="text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            View All {totalImages} Photos
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
