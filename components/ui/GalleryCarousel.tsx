'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages } from '@/data/gallery';

export default function GalleryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const visibleCount = 6; // Display 6 images at once

  const totalSlides = Math.ceil(galleryImages.length / visibleCount);

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(timer);
  }, [isAutoPlay, totalSlides]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlay(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setIsAutoPlay(false);
  };

  const startIndex = currentIndex * visibleCount;
  const visibleImages = galleryImages.slice(startIndex, startIndex + visibleCount);

  return (
    <div className="w-full bg-navy-50 rounded-xl overflow-hidden">
      {/* Images Grid */}
      <div className="grid grid-cols-6 gap-1 bg-navy-100">
        {visibleImages.map((img) => (
          <div key={img.id} className="relative aspect-square overflow-hidden bg-navy-200 group cursor-pointer">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              quality={75}
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between p-4 bg-navy-900">
        <button
          onClick={handlePrev}
          className="p-2 rounded-lg bg-navy-800 hover:bg-navy-700 text-white transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Progress indicator */}
        <div className="flex items-center gap-2">
          <span className="text-white/60 text-sm">
            {currentIndex + 1} / {totalSlides}
          </span>
          <div className="flex gap-1">
            {Array.from({ length: Math.min(totalSlides, 10) }).map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all ${
                  i === currentIndex % 10 ? 'w-6 bg-gold-400' : 'w-2 bg-navy-700'
                }`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="p-2 rounded-lg bg-navy-800 hover:bg-navy-700 text-white transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Auto-play toggle */}
      <div className="px-4 py-3 bg-navy-800 border-t border-navy-700">
        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className="text-xs text-white/70 hover:text-gold-400 transition-colors"
        >
          {isAutoPlay ? '⏸ AutoPlay' : '▶ Paused'}
        </button>
      </div>
    </div>
  );
}
