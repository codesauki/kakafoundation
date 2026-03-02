import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-navy-gradient">
      {/* Background texture */}
      <div className="absolute inset-0 bg-noise opacity-40" />

      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold-500/8 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-1/4 right-10 w-64 h-64 rounded-full border border-teal-500/20 animate-float opacity-30" />
      <div className="absolute top-1/3 right-20 w-40 h-40 rounded-full border border-gold-500/20 animate-float delay-300 opacity-20" />

      {/* Content */}
      <div className="container-xl relative z-10 pt-24 pb-16">
        <div className="max-w-4xl">

          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-xs font-semibold text-teal-300 tracking-widest uppercase mb-8 animate-fade-up fill-forwards">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            Come With Us · Kowa Namu Ne
          </div>

          {/* Main headline */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.05] mb-8 animate-fade-up fill-forwards delay-100">
            Empowering{' '}
            <span className="relative inline-block">
              <span className="text-gradient-gold">Every</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 10" fill="none" preserveAspectRatio="none">
                <path d="M0 8 Q50 2 100 6 Q150 10 200 4" stroke="url(#goldGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <defs>
                  <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C49A2C" />
                    <stop offset="100%" stopColor="#E2B84A" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <br />Nigerian Youth
          </h1>

          {/* Subtext */}
          <p className="text-xl lg:text-2xl text-white/75 leading-relaxed max-w-2xl mb-10 animate-fade-up fill-forwards delay-200">
            Education. Skills. Healthcare. Opportunity. The Kowa Namu Ne Foundation is building a Nigeria where no young person is left behind.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 mb-12 animate-fade-up fill-forwards delay-300">
            {[
              { num: '36', label: 'States Covered' },
              { num: '50K+', label: 'Lives Touched' },
              { num: '8,500+', label: 'Students Supported' },
              { num: '7', label: 'Programmes' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="font-display text-2xl font-bold text-gold-400">{s.num}</span>
                <span className="text-sm text-white/60 leading-tight max-w-[4rem]">{s.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up fill-forwards delay-400">
            <Link href="/apply" className="btn-gold text-base px-8 py-4 shadow-gold-lg">
              Apply for Scholarship
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/about" className="btn-outline-white text-base px-8 py-4">
              Learn Our Story
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-bounce">
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
