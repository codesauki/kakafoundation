import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useSiteSettings } from '@/components/providers/SettingsProvider';

export default function HeroSection() {
  const { scholarshipsEnabled } = useSiteSettings();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Main hero background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Hero Background"
          fill
          priority
          quality={85}
          className="object-cover object-center"
        />
        {/* Smart dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
      </div>

      {/* Texture and glow effects */}
      <div className="absolute inset-0 bg-noise opacity-15" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="container-xl relative z-10 py-24">
        <div className="max-w-3xl">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full text-xs font-semibold text-gold-300 tracking-widest uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            Come With Us · Kowa Namu Ne
          </div>

          {/* Main headline */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.05] mb-6">
            Empowering{' '}
            <span className="text-gradient-gold">Every Nigerian Youth</span>
          </h1>

          {/* Subtext */}
          <p className="text-xl text-white/85 leading-relaxed max-w-2xl mb-10">
            Education. Skills. Healthcare. Opportunity. The Kowa Namu Ne Foundation is building a Nigeria where no young person is left behind.
          </p>

          {/* Key stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {[
              { num: '50K+', label: 'Lives Impacted' },
              { num: '36', label: 'States Reached' },
              { num: '8.5K+', label: 'Students Supported' },
              { num: '7', label: 'Active Programs' },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-lg p-3">
                <div className="font-display text-xl sm:text-2xl font-bold text-gold-400">{s.num}</div>
                <div className="text-xs text-white/70 font-medium leading-tight">{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {scholarshipsEnabled && (
              <Link href="/apply" className="btn-gold text-base px-8 py-4 shadow-lg hover:shadow-gold-lg transition-all">
                Apply for Scholarship
                <ArrowRight className="w-5 h-5" />
              </Link>
            )}
            <Link href="/contact" className="btn-outline-white text-base px-8 py-4">
              Get Involved
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-bounce">
        <span className="text-xs font-medium tracking-widest uppercase">Scroll to explore</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  );
}
