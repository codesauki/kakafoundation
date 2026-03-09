'use client';

import Image from 'next/image';
import Link from 'next/link';
import { impactStories } from '@/data/impactStories';

export default function ImpactStoriesSection() {
  return (
    <section className="section-pad bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-tag mb-5">2025 Impact Stories</div>
          <h2 className="section-title mb-4">
            Stories of Change
            <br />
            <span className="text-gradient-gold">Across Kaduna North</span>
          </h2>
          <p className="section-subtitle mx-auto text-center max-w-2xl">
            From economic empowerment to healthcare access and educational transformation,
            meet the three pillars of the Kowa Namu Ne Foundation&apos;s 2025 impact.
          </p>
          <div className="divider-teal mx-auto mt-6" />
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {impactStories.map((story, index) => (
            <article
              key={story.id}
              className="group overflow-hidden rounded-2xl bg-cream-light shadow-sm hover:shadow-xl transition-all duration-500"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Image Container */}
              <div className="relative h-56 md:h-64 overflow-hidden bg-navy-900">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy-900/60" />

                {/* Badge */}
                <div
                  className={`absolute top-4 right-4 px-4 py-2 rounded-full text-white text-xs font-semibold backdrop-blur-sm ${
                    story.color === 'gold'
                      ? 'bg-gold-600/90'
                      : 'bg-teal-600/90'
                  }`}
                >
                  {story.badge}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-7">
                {/* Category */}
                <div className={`inline-block text-xs font-semibold mb-3 ${
                  story.color === 'gold' ? 'text-gold-600' : 'text-teal-600'
                }`}>
                  {story.category}
                </div>

                {/* Title */}
                <h3 className="font-display text-xl lg:text-2xl font-bold text-navy-900 mb-3 leading-tight group-hover:text-gold-600 transition-colors">
                  {story.title}
                </h3>

                {/* Summary */}
                <p className="text-navy-600 text-sm leading-relaxed mb-5">
                  {story.summary}
                </p>

                {/* Highlights */}
                <div className="mb-6 space-y-2">
                  {story.highlights.slice(0, 3).map((highlight, i) => (
                    <div key={i} className="flex gap-2 items-start text-sm text-navy-700">
                      <span
                        className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          story.color === 'gold' ? 'bg-gold-500' : 'bg-teal-500'
                        }`}
                      />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6 pb-6 border-b border-navy-100">
                  {story.stats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <div
                        className={`font-display text-lg lg:text-xl font-bold ${
                          story.color === 'gold'
                            ? 'text-gold-600'
                            : 'text-teal-600'
                        }`}
                      >
                        {stat.number}
                      </div>
                      <div className="text-navy-600 text-xs font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href="/impact"
                  className={`inline-flex items-center gap-2 font-semibold text-sm transition-all duration-300 group/btn ${
                    story.color === 'gold'
                      ? 'text-gold-600 hover:text-gold-700'
                      : 'text-teal-600 hover:text-teal-700'
                  }`}
                >
                  Read Full Report
                  <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-12">
          <Link
            href="/impact"
            className="btn-primary px-8"
          >
            Explore All Impact Stories
          </Link>
        </div>
      </div>
    </section>
  );
}
