import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ApplicationForm from '@/components/application/ApplicationForm';
import { SettingsProvider, useSiteSettings } from '@/components/providers/SettingsProvider';

export const metadata: Metadata = {
  title: 'Apply for Scholarship',
  description: 'Apply for JAMB, WAEC, or NECO examination sponsorship from the Kowa Namu Ne Foundation.',
};

export default function ApplyPage() {
  return (
    <SettingsProvider>
      <ApplyPageContent />
    </SettingsProvider>
  );
}

function ApplyPageContent() {
  const { scholarshipsEnabled, loading } = useSiteSettings();

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-cream-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-navy-600">Loading...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!scholarshipsEnabled) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-cream-100 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">📅</span>
            </div>
            <h1 className="font-display text-2xl text-navy-800 mb-4">Applications Currently Closed</h1>
            <p className="text-navy-600 mb-6">
              Scholarship applications are currently not accepting new submissions. Please check back later for updates on future application cycles.
            </p>
            <Link href="/" className="btn-navy">
              Return to Homepage
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 bg-navy-gradient overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-30" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/8 rounded-full blur-3xl" />
          <div className="container-xl relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs font-semibold text-teal-300 tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Applications Open — 2026 Cycle
            </div>
            <h1 className="font-display text-5xl sm:text-6xl text-white leading-tight mb-4">
              Scholarship Application
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Complete the form below to apply. All fields marked with <span className="text-red-400">*</span> are required. This process takes about 10 minutes.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cream-100 to-transparent" />
        </section>

        {/* Form area */}
        <section className="py-16 bg-cream-100 min-h-screen">
          <div className="container-xl">
            <div className="max-w-3xl mx-auto">
              {/* Info bar */}
              <div className="grid sm:grid-cols-3 gap-3 mb-10">
                {[
                  { icon: '🔒', label: 'Secure & Private', desc: 'Your data is encrypted and protected' },
                  { icon: '💸', label: 'Completely Free', desc: 'No fees at any stage — ever' },
                  { icon: '⏱️', label: '~10 Minutes', desc: 'Simple 5-step application process' },
                ].map((item) => (
                  <div key={item.label} className="card p-4 flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="font-semibold text-navy-800 text-xs">{item.label}</div>
                      <div className="text-navy-400 text-xs">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card p-8 shadow-navy">
                <ApplicationForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
