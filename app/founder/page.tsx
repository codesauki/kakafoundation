import type { Metadata } from 'next';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CTASection from '@/components/sections/CTASection';
import { prisma } from '@/lib/db';

// minimal type for founder achievements
interface Achievement { id: string; year: string; title: string; order: number; }

export const metadata: Metadata = { title: 'About the Founder — Hon. Abdulazeez Kaka' };
export const dynamic = 'force-dynamic';

async function getFounder() {
  try {
    return await prisma.founderProfile.findFirst({ include: { achievements: { orderBy: { order: 'asc' } } } });
  } catch { return null; }
}

export default async function FounderPage() {
  const founder = await getFounder();

  const name = founder?.name ?? 'Hon. Abdulazeez Kaka';
  const title = founder?.title ?? 'Founder & Visionary';
  const subtitle = founder?.subtitle ?? 'Chairman, APC Youth Stakeholders Forum';
  const bio = founder?.bio ?? 'Biography loading from admin panel...';
  const quote = founder?.quote ?? 'When we lift one, we lift all. Come with us — there is room for everyone.';
  const photoUrl = founder?.photoUrl ?? null;
  const achievements: Achievement[] = (founder?.achievements as Achievement[]) ?? [];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero — full bleed dark section */}
        <section className="relative min-h-screen flex items-end bg-navy-gradient overflow-hidden pt-20">
          <div className="absolute inset-0 bg-noise opacity-30" />
          <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-navy-900/80 to-transparent" />
          {/* Decorative */}
          <div className="absolute top-1/4 right-10 w-80 h-80 border border-teal-500/15 rounded-full" />
          <div className="absolute top-1/3 right-24 w-48 h-48 border border-gold-500/15 rounded-full" />

          <div className="container-xl relative z-10 pb-20 pt-16">
            <div className="grid lg:grid-cols-5 gap-12 items-end">

              {/* Portrait — large editorial */}
              <div className="lg:col-span-2 flex justify-center lg:justify-start">
                <div className="relative">
                  {/* Glow behind photo */}
                  <div className="absolute inset-0 bg-teal-500/20 blur-2xl rounded-3xl scale-110" />

                  {/* Gold frame lines */}
                  <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-gold-500" />
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-gold-500" />

                  {/* Photo */}
                  <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden shadow-navy-lg ring-1 ring-white/10">
                    <Image
                      src={photoUrl || '/images/founder-portrait.png'}
                      alt={name}
                      width={400}
                      height={500}
                      priority
                      quality={85}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Name badge */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gold-500 px-6 py-2.5 rounded-full shadow-gold-lg whitespace-nowrap">
                    <span className="text-navy-900 text-xs font-bold">{title}</span>
                  </div>
                </div>
              </div>

              {/* Text content */}
              <div className="lg:col-span-3">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/15 rounded-full text-xs font-semibold text-gold-300 tracking-widest uppercase mb-6">
                  The Visionary Behind KNF
                </div>

                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-3">
                  {name.split(' ').slice(0, -1).join(' ')}
                </h1>
                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-gold-400 leading-tight mb-4">
                  {name.split(' ').slice(-1)[0]}
                </h1>
                <p className="text-teal-300 text-sm font-medium mb-8 tracking-wide">{subtitle}</p>

                {/* Quote */}
                <div className="relative">
                  <Quote className="absolute -top-3 -left-2 w-10 h-10 text-gold-500/30" />
                  <blockquote className="pl-8 border-l-2 border-gold-500/50">
                    <p className="font-display text-xl sm:text-2xl text-white/90 italic leading-relaxed">
                      "{quote}"
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </section>

        {/* Biography */}
        <section className="section-pad bg-white">
          <div className="container-lg">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Bio text */}
              <div className="lg:col-span-2">
                <div className="section-tag mb-5">Biography</div>
                <h2 className="font-display text-3xl text-navy-800 mb-6">A Life in Service</h2>
                <div className="divider-gold mb-8" />
                <div className="prose-foundation space-y-5">
                  {bio.split('\n\n').map((para: string, i: number) => (
                    <p key={i} className="text-navy-600 leading-relaxed">{para}</p>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Achievements */}
                {achievements.length > 0 && (
                  <div className="card p-6">
                    <h3 className="font-display text-lg text-navy-800 mb-5 flex items-center gap-2">
                      <span>🏆</span> Key Milestones
                    </h3>
                    <div className="space-y-4">
                      {achievements.map((a) => (
                        <div key={a.id} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className="w-2 h-2 rounded-full bg-gold-500 mt-1.5 shrink-0" />
                            <div className="w-0.5 flex-1 bg-gold-200 mt-1" />
                          </div>
                          <div className="pb-4">
                            <div className="text-gold-600 text-xs font-bold mb-0.5">{a.year}</div>
                            <div className="text-navy-700 text-sm font-medium">{a.title}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Vision card */}
                {founder?.vision && (
                  <div className="card-gold-top p-6">
                    <h3 className="font-display text-lg text-navy-800 mb-3 flex items-center gap-2">
                      <span>👁️</span> His Vision for Nigeria
                    </h3>
                    <p className="text-navy-500 text-sm leading-relaxed italic">"{founder.vision}"</p>
                  </div>
                )}

                {/* Contact/Social */}
                <div className="card bg-navy-gradient p-6 text-center">
                  <p className="text-navy-300 text-sm mb-4">Connect with the Foundation</p>
                  <a href="/contact" className="btn-gold w-full justify-center text-sm">
                    Get in Touch
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
