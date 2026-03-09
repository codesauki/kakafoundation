import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronDown, Award } from 'lucide-react';

export default function HeroSection() {
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
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
      </div>

      {/* Texture and glow effects */}
      <div className="absolute inset-0 bg-noise opacity-20" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="container-xl relative z-10 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left side - Main message */}
          <div className="max-w-2xl">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full text-xs font-semibold text-gold-300 tracking-widest uppercase mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
              Supported By Nigeria's Leadership
            </div>

            {/* Main headline */}
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] mb-6">
              Empowering{' '}
              <span className="text-gradient-gold">Every Nigerian Youth</span>
            </h1>

            {/* Subtext */}
            <p className="text-xl text-white/85 leading-relaxed max-w-xl mb-8">
              With backing from Nigeria's leadership, the Kowa Namu Ne Foundation is transforming lives through education, skills, healthcare, and opportunity across all 36 states.
            </p>

            {/* Key stats */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { num: '50K+', label: 'Lives Impacted' },
                { num: '36', label: 'States Reached' },
                { num: '8.5K+', label: 'Students Supported' },
                { num: '7', label: 'Active Programs' },
              ].map((s) => (
                <div key={s.label} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-lg p-4">
                  <div className="font-display text-2xl font-bold text-gold-400 mb-1">{s.num}</div>
                  <div className="text-xs text-white/70 font-medium">{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/apply" className="btn-gold text-base px-8 py-4 shadow-lg hover:shadow-gold-lg transition-all">
                Apply for Scholarship
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contact" className="btn-outline-white text-base px-8 py-4">
                Get Involved
              </Link>
            </div>
          </div>

          {/* Right side - Supporter cards */}
          <div className="relative h-full flex items-center justify-center lg:justify-end">
            {/* Card container */}
            <div className="relative w-full max-w-md">
              {/* Decorative background element */}
              <div className="absolute -inset-8 bg-gradient-to-br from-gold-500/20 to-teal-500/10 rounded-3xl blur-2xl" />

              {/* Main card */}
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
                {/* Supported By badge */}
                <div className="flex items-center gap-2 mb-8 pb-6 border-b border-white/15">
                  <Award className="w-5 h-5 text-gold-400" />
                  <span className="text-sm font-semibold text-gold-300 uppercase tracking-wider">Backed By</span>
                </div>

                {/* Supporter 1 - President Tinubu */}
                <div className="mb-8">
                  <div className="relative h-32 mb-4 rounded-xl overflow-hidden ring-2 ring-gold-400/30">
                    <Image
                      src="/images/president-tinubu.png"
                      alt="His Excellency President Bola Tinubu"
                      fill
                      quality={80}
                      className="object-cover object-top"
                    />
                  </div>
                  <h3 className="font-semibold text-white text-sm">H.E. President Bola Tinubu</h3>
                  <p className="text-xs text-white/60">President of Nigeria</p>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

                {/* Supporter 2 - Governor Uba Sani */}
                <div className="mb-8">
                  <div className="relative h-32 mb-4 rounded-xl overflow-hidden ring-2 ring-teal-400/30">
                    <Image
                      src="/images/governor-uba-sani.png"
                      alt="Governor Uba Sani"
                      fill
                      quality={80}
                      className="object-cover object-top"
                    />
                  </div>
                  <h3 className="font-semibold text-white text-sm">Governor Uba Sani</h3>
                  <p className="text-xs text-white/60">Governor of Kaduna State</p>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

                {/* Supporter 3 - Barrister Seyi Tinubu */}
                <div>
                  <div className="relative h-32 mb-4 rounded-xl overflow-hidden ring-2 ring-gold-400/30">
                    <Image
                      src="/images/barrister-seyi-tinubu.png"
                      alt="Barrister Seyi Tinubu"
                      fill
                      quality={80}
                      className="object-cover object-top"
                    />
                  </div>
                  <h3 className="font-semibold text-white text-sm">Barrister Seyi Tinubu</h3>
                  <p className="text-xs text-white/60">Executive & Development Advocate</p>
                </div>

                {/* Supporting text */}
                <div className="mt-8 pt-6 border-t border-white/15 text-center">
                  <p className="text-xs text-white/70 leading-relaxed">
                    Leadership united in empowering Nigerian youth and building a stronger nation
                  </p>
                </div>
              </div>
            </div>
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
