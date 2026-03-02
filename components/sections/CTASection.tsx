import Link from 'next/link';
import { ArrowRight, BookOpen, GraduationCap } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="section-pad-sm bg-teal-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-20" />
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-navy-900/20 rounded-full blur-3xl" />

      <div className="container-xl relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl text-white mb-4">
            Are You a Nigerian Student?
          </h2>
          <p className="text-white/80 text-lg mb-4 leading-relaxed">
            The 2026 Scholarship Cycle is now open. Apply for JAMB, WAEC, or NECO examination sponsorship — free, fast, and available to students across all 36 states.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['Open to all 36 states', 'JAMB / WAEC / NECO', 'Completely free', 'No hidden requirements'].map((f) => (
              <span key={f} className="px-3 py-1.5 bg-white/15 border border-white/25 rounded-full text-white text-xs font-medium">
                ✓ {f}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply" className="btn-gold text-base px-8 py-4 shadow-gold-lg">
              Apply Now — It's Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/education" className="btn-outline-white text-base px-8 py-4">
              Learn How It Works
            </Link>
          </div>

          <p className="text-white/50 text-xs mt-6">Application deadline: June 30, 2026 · 10,000 slots available</p>
        </div>
      </div>
    </section>
  );
}
